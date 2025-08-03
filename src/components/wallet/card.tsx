import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/use-translation";
import { cn } from "@/lib/utils";
import { getColors } from "@/utils/colors";
import { CommunityConfig, Config, Profile } from "@citizenwallet/sdk";
import { Text } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface CardProps {
  cardColor: string;
  profile?: Profile;
  balance?: string;
  small?: boolean;
  config: Config;
  tokenAddress?: string;
  className?: string;
  onTokenChange?: (tokenAddress: string) => void;
  onTopUp?: () => void;
}

export default function Card({
  cardColor,
  profile,
  balance,
  small,
  config,
  tokenAddress,
  className,
  onTokenChange,
  onTopUp,
}: CardProps) {
  const { t } = useTranslation();
  const { community } = config;
  const communityConfig = new CommunityConfig(config);
  const token = communityConfig.getToken(tokenAddress);

  const logo = community.logo;

  // Get all available tokens
  const availableTokens = useMemo(() => {
    return Object.values(config.tokens || {});
  }, [config.tokens]);

  const handleTokenSelect = (selectedTokenAddress: string) => {
    onTokenChange?.(selectedTokenAddress);
  };

  const colors = getColors(cardColor);

  return (
    <div
      className={cn(
        "aspect-[1.59] z-50 relative",
        "flex items-start justify-start",
        "rounded-xl border border-white/80 shadow-[0_8px_16px_rgba(0,0,0,0.3)]",
        "animate-grow-bounce",
        "transition-all ease-in-out duration-200",
        "w-[80%]",
        small ? "opacity-80" : "opacity-100",
        className
      )}
      style={{
        backgroundColor: cardColor,
      }}
    >
      <div className="absolute top-4 left-4 flex flex-col gap-1 animate-fade-in">
        <div className="flex items-center gap-1">
          {profile?.image_small && (
            <Image
              src={profile.image_small}
              alt="profile"
              width={24}
              height={24}
              className="rounded-full border-2 border-white"
            />
          )}
          {profile?.name && (
            <Text size="2" weight="bold" className="text-white">
              {profile.name}
            </Text>
          )}
        </div>
        <Text size="2" weight="bold" className="text-white">
          {profile?.username ? profile?.username : "@anonymous"}
        </Text>
      </div>
      <div className="absolute top-4 right-4 animate-fade-in">
        <Image
          src="/nfc.png"
          alt="nfc"
          width={24}
          height={24}
          className="animate-fade-in"
        />
      </div>

      {/* Top up button */}
      {onTopUp && (
        <div className="absolute bottom-6 left-4 animate-fade-in ">
          <div
            className="bg-white rounded-md p-2 flex items-center gap-2 cursor-pointer"
            onClick={onTopUp}
          >
            <PlusIcon className="w-4 h-4" style={{ color: colors.text }} />
            <Text size="4" weight="bold" style={{ color: colors.text }}>
              {t("add_funds")}
            </Text>
          </div>
        </div>
      )}

      {/* Clickable balance section with token selector */}
      {balance && (
        <div className="absolute bottom-4 right-4 flex items-center justify-center text-white space-x-2 animate-fade-in">
          {availableTokens.length > 1 ? (
            <Select value={tokenAddress} onValueChange={handleTokenSelect}>
              <SelectTrigger className="w-auto bg-transparent border border-white/80 text-white hover:bg-white/10 focus:ring-0 focus:ring-offset-0 px-2 py-1 h-auto rounded-full">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={token.logo ?? logo}
                      alt="community logo"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <Text size="8" weight="bold" className="text-white">
                      {balance}
                    </Text>
                    <div className="w-[4px]" />
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((availableToken) => (
                  <SelectItem
                    key={availableToken.address}
                    value={availableToken.address}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={availableToken.logo ?? logo}
                        alt="community logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <Text size="4" weight="bold">
                        {availableToken.symbol}
                      </Text>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <Image
                src={token.logo ?? logo}
                alt="community logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <Text size="8" weight="bold">
                {balance}
              </Text>
              <div className="w-[4px]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
