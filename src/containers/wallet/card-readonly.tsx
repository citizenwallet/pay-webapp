"use client";

import OrderCard from "@/components/orderCard";
import CardBar from "@/components/wallet/CardBar";
import { useIsScrolled } from "@/hooks/scroll";
import { useThemeUpdater } from "@/hooks/theme";
import { useFocusEffect } from "@/hooks/useFocusEffect";
import { useScrollableWindowFetcher } from "@/hooks/useScrollableWindow";
import { useAccount } from "@/state/account/actions";
import { useOrders } from "@/state/orders/actions";
import { useProfiles } from "@/state/profiles/actions";
import { getBaseUrl } from "@/utils/deeplink";
import { CommunityConfig, Config } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
interface ContainerProps {
  config: Config;
  accountAddress: string;
  serialNumber: string;
  project?: string;
  cardColor: string;
  tokenAddress?: string;
}

export default function ReadOnly({
  config,
  accountAddress,
  serialNumber,
  project,
  cardColor,
  tokenAddress
}: ContainerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { community } = config;

  const communityConfig = useMemo(() => new CommunityConfig(config), [config]);

  const token = useMemo(
    () => communityConfig.getToken(tokenAddress),
    [communityConfig, tokenAddress]
  );


  const isScrolled = useIsScrolled();

  const baseUrl = getBaseUrl();

  const [state, actions] = useAccount(baseUrl, config);
  const [profilesState, profilesActions] = useProfiles(config);
  const [ordersState, ordersActions] = useOrders(baseUrl);

  useThemeUpdater(community, cardColor);

  useEffect(() => {
    actions.getAccount(accountAddress);
  }, [accountAddress, actions]);

  const account = state((state) => state.account);
  const orders = ordersState((state) => state.orders);
  const loadingOrders = ordersState((state) => state.loading);



  useEffect(() => {
    (async () => {
      if (account) {
        await actions.getTransfers(account, token.address, true);
        await ordersActions.loadOrders(account, token.address);
        setLoading(false);
      }
    })();
  }, [account, actions, ordersActions, token.address]);

  useFocusEffect(() => {
    let unsubscribe: () => void | undefined;

    if (account) {
      profilesActions.loadProfile(account);
      actions.fetchBalance(token.address);
      unsubscribe = actions.listen(account, token.address);
    }

    return () => {
      unsubscribe?.();
    };
  }, [account, token.address]);

  const handleTokenChange = useCallback(
    (tokenAddress: string) => {
      let path = `/card/${serialNumber}`;
      if (project) {
        path += `?project=${project}`;
      }
      if (tokenAddress) {
        path += path.includes("?")
          ? `&token=${tokenAddress}`
          : `?token=${tokenAddress}`;
      }
      router.replace(path);
    },
    [serialNumber, project, router]
  );



  const fetchMoreOrders = useCallback(async () => {
    if (!account) return false;
    return ordersActions.getOrders(account, token.address);
  }, [ordersActions, account, token]);

  const scrollableRef = useScrollableWindowFetcher(fetchMoreOrders);

  const balance = state((state) => state.balance);
  const profile = profilesState((state) => state.profiles[account]);

  return (
    <main
      ref={scrollableRef}
      className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl"
    >


      <CardBar
        readonly
        small={isScrolled}
        cardColor={cardColor}
        profile={profile}
        account={account}
        balance={balance}
        config={config}
        accountActions={actions}
        tokenAddress={token.address}
        onTokenChange={handleTokenChange}
      />

      <Flex direction="column" className="w-full pt-[490px]" gap="3">
        {!loadingOrders && orders.length === 0 && (
          <Flex
            justify="center"
            align="center"
            direction="column"
            className="w-full max-w-full py-4 active:bg-muted rounded-lg transition-colors duration-500 ease-in-out bg-white"
            gap="3"
          >
            <Image
              src="/coins.png"
              alt="card"
              width={140}
              height={140}
              className="pb-8"
            />
            <Text>No transactions yet</Text>
          </Flex>
        )}
        {loadingOrders && orders.length === 0 && (
          <Flex
            justify="center"
            align="center"
            direction="column"
            className="w-full max-w-full py-4 active:bg-muted rounded-lg transition-colors duration-500 ease-in-out bg-white"
            gap="3"
          >
            <Loader2 className="animate-spin" />
          </Flex>
        )}

        {orders.length > 0 && orders.map((order) => (
          <OrderCard
            key={order.id}
            data={order}
            token={token}
          />
        ))}

      </Flex>
    </main>
  );
}
