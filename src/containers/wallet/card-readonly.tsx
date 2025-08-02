"use client";

import OrderCard, { OrderData } from "@/components/orderCard";
import CardBar from "@/components/wallet/CardBar";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import { useIsScrolled } from "@/hooks/scroll";
import { useThemeUpdater } from "@/hooks/theme";
import { useFocusEffect } from "@/hooks/useFocusEffect";
import { useScrollableWindowFetcher } from "@/hooks/useScrollableWindow";
import { useAccount } from "@/state/account/actions";
import { useOrders } from "@/state/orders/actions";
import { useProfiles } from "@/state/profiles/actions";
import { getBaseUrl } from "@/utils/deeplink";
import { CommunityConfig, Config, Profile } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
interface ContainerProps {
  config: Config;
  accountAddress: string;
  serialNumber: string;
  project?: string;
  initialCardColor: string;
  tokenAddress?: string;
  initialProfile?: Profile;
  initialBalance?: string;
}

export default function ReadOnly({
  config,
  accountAddress,
  serialNumber,
  project,
  initialCardColor,
  tokenAddress,
  initialProfile,
  initialBalance,
}: ContainerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cardColor, setCardColor] = useState(initialCardColor);

  const { community } = config;

  const communityConfig = useMemo(() => new CommunityConfig(config), [config]);

  const token = useMemo(
    () => communityConfig.getToken(tokenAddress),
    [communityConfig, tokenAddress]
  );

  const isScrolled = useIsScrolled();

  const baseUrl = getBaseUrl();

  const [state, actions] = useAccount(baseUrl, config, accountAddress);
  const [profilesState, profilesActions] = useProfiles(config);
  const [ordersState, ordersActions] = useOrders(baseUrl);

  useThemeUpdater(community, cardColor);

  const orders = ordersState((state) => state.orders);
  const loadingOrders = ordersState((state) => state.loading);

  useEffect(() => {
    (async () => {
      if (accountAddress) {
        await ordersActions.loadOrders(accountAddress, token.address, true);

        const cardColor =
          ColorMappingOverrides[project ?? "default"] ??
          communityConfig.community.theme?.primary ??
          "#272727";

        console.log(cardColor);
        console.log(project);

        setCardColor(cardColor);
        setLoading(false);
      }
    })();
  }, [accountAddress, ordersActions, token.address, project, communityConfig]);

  useFocusEffect(() => {
    let unsubscribe: () => void | undefined;

    if (accountAddress) {
      profilesActions.loadProfile(accountAddress);
      actions.fetchBalance(token.address);
      unsubscribe = ordersActions.listen(accountAddress, token.address);
    }

    return () => {
      unsubscribe?.();
    };
  }, [profilesActions, actions, ordersActions, accountAddress, token.address]);

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

  const handleSelectOrder = useCallback(
    (order: OrderData) => {
      ordersActions.setSelectedOrder(order);
    },
    [ordersActions]
  );

  const handleOrderRendered = useCallback(
    (order: OrderData) => {
      profilesActions.loadProfileFromUsername(order.place.slug);
    },
    [profilesActions]
  );

  const fetchMoreOrders = useCallback(async () => {
    if (!accountAddress) return false;
    return ordersActions.getOrders(accountAddress, token.address);
  }, [ordersActions, accountAddress, token]);

  const scrollableRef = useScrollableWindowFetcher(fetchMoreOrders);

  const balance = state((state) => state.balance ?? initialBalance ?? "0.00");
  const profile = profilesState(
    (state) => state.profiles[accountAddress] ?? initialProfile
  );

  const profiles = profilesState((state) => state.profiles);

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
        account={accountAddress}
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

        {orders.length > 0 &&
          orders.map((order) => (
            <OrderCard
              key={order.id}
              data={order}
              token={token}
              profiles={profiles}
              onSelectOrder={handleSelectOrder}
              onOrderRendered={handleOrderRendered}
            />
          ))}
      </Flex>
    </main>
  );
}
