export const SolanaLogo = ({ className, width, height }: { className?: string, width?: number | string, height?: number | string }) => (
  <img 
    src="https://axiom.trade/images/sol-fill.svg" 
    alt="Solana"
    className={className}
    style={{ width, height }}
  />
);
