import Image from 'next/image';

interface SolanaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const SolanaLogo = ({ className, width = 14, height = 14 }: SolanaLogoProps) => (
  <Image
    src="https://axiom.trade/images/sol-fill.svg"
    alt="Solana"
    className={className}
    width={typeof width === 'string' ? parseInt(width) : width}
    height={typeof height === 'string' ? parseInt(height) : height}
    style={{ minWidth: width, minHeight: height }}
    unoptimized
  />
);
