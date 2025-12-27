interface SolanaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const SolanaLogo = ({ className, width = 14, height = 14 }: SolanaLogoProps) => (
  <img
    src="https://axiom.trade/images/sol-fill.svg"
    alt="Solana"
    className={className}
    width={width}
    height={height}
    style={{ width, height, minWidth: width, minHeight: height }}
  />
);
