import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export default function SkeletonCard({
  cardColor,
  logo,
  className,
  scale = 0.8,
}: {
  cardColor: string;
  logo?: string;
  className?: string;
  scale?: number;
}) {
  return (
    <div
      className={cn(
        `scale-[${scale}] aspect-[1.59] z-50 relative`,
        "flex items-start justify-start",
        "rounded-xl border border-white/80 shadow-[0_8px_16px_rgba(0,0,0,0.3)]",
        "w-[80%]",
        className
      )}
      style={{
        backgroundColor: cardColor,
      }}
    >
      <div className="absolute top-4 left-4 flex flex-col gap-2 animate-fade-in">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-24 h-4" />
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

      {/* Clickable balance section with token selector */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center text-white space-x-2 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Image
            src={logo ?? "/coin.png"}
            alt="community logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <Skeleton className="w-24 h-4" />
          <div className="w-[4px]" />
        </div>
      </div>
    </div>
  );
}
