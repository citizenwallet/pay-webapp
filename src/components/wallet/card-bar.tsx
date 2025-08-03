import { cn } from "@/lib/utils";
import { AccountLogic } from "@/state/account/actions";
import { Config, Profile } from "@citizenwallet/sdk";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import WalletAction from "./Action";
import Card from "./card";

interface ActionBarProps {
  readonly?: boolean;
  cardColor: string;
  profile?: Profile;
  account: string;
  balance: string;
  small?: boolean;
  config: Config;
  accountActions: AccountLogic;
  tokenAddress?: string;
  onTokenChange?: (tokenAddress: string) => void;
}

export default function ActionBar({
  readonly = false,
  cardColor,
  profile,
  account,
  balance,
  small,
  config,
  accountActions,
  tokenAddress,
  onTokenChange,
}: ActionBarProps) {
  const { plugins = [] } = config;

  const handlePluginClick = (url: string) => {
    const baseUrl = new URL(window.location.href).origin;
    const fullUrl = `${url}?account=${account}&redirectUrl=${encodeURIComponent(
      baseUrl
    )}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Flex
      direction="column"
      className="fixed z-50 top-0 bg-transparent-to-white-90 w-full max-w-xl items-center justify-between text-sm pr-4 pb-10"
    >
      <Card
        cardColor={cardColor}
        profile={profile}
        balance={balance}
        small={small}
        config={config}
        tokenAddress={tokenAddress}
        onTokenChange={onTokenChange}
      />

      <Flex
        justify="center"
        gap={small ? "4" : "8"}
        className={cn(
          "w-full  max-w-5xl items-center justify-between text-sm",
          small ? "pt-2 pb-4 pr-4" : "pt-4 pr-4"
        )}
      >
        {plugins
          .filter((plugin) =>
            plugin.token_address ? plugin.token_address === tokenAddress : true
          )
          .map((plugin) => (
            <WalletAction
              key={plugin.name}
              compact={small}
              icon={
                <Image
                  src={plugin.icon}
                  alt={plugin.name}
                  width={24}
                  height={24}
                />
              }
              label={plugin.name}
              onClick={() => handlePluginClick(plugin.url)}
            />
          ))}
      </Flex>

      {/* <Box className="bg-transparent-to-white h-10 w-full"></Box> */}
    </Flex>
  );
}
