import { type Token, type TokenStatus } from '@/types';
import { generateId } from './formatters';

const BRAINROT_TERMS = [
  'Skibidi', 'Rizz', 'Fanum', 'Ohio', 'Sigma', 'Gyatt', 'Grimace', 'Kai', 'Livvy', 
  'Gronk', 'Baby Gronk', 'Mewing', 'Looksmax', 'Chug Jug', 'W', 'L', 'Ratio', 'Based',
  'Gooning', 'Edging', 'Bussy', 'Coomer', 'Thicc', 'Down Bad', 'Glizzy', 'Throat', 'Hawk Tuah'
];

const CORPORATE_TERMS = [
  'Apple', 'Microsoft', 'Nvidia', 'Amazon', 'Google', 'Meta', 'Tesla', 'Berkshire', 
  'TSMC', 'Visa', 'JPMorgan', 'Walmart', 'Saudi Aramco'
];

const CRYPTO_TERMS = [
  'BTC', 'ETH', 'SOL', 'PEPE', 'DOGE', 'SHIB', 'BAYC', 'MAYC', 'Punk', 'Milady', 
  'Remilio', 'Pudgy', 'Azuki', 'WIF', 'BONK', 'MOG'
];

const generateNameAndSymbol = () => {
  const p1 = BRAINROT_TERMS[Math.floor(Math.random() * BRAINROT_TERMS.length)];
  const useCorporate = Math.random() > 0.5;
  const p2 = useCorporate 
    ? CORPORATE_TERMS[Math.floor(Math.random() * CORPORATE_TERMS.length)]
    : CRYPTO_TERMS[Math.floor(Math.random() * CRYPTO_TERMS.length)];
  
  // Random order: "Skibidi Apple" vs "Apple Skibidi"
  const name = Math.random() > 0.5 ? `${p1} ${p2}` : `${p2} ${p1}`;
  
  // Symbol: First 2 chars of each word or just 3-5 chars from name
  const symbol = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4) + (Math.random() > 0.5 ? 'X' : '');

  return { name, symbol };
};

/**
 * Generate a random Solana-like address
 */
function generateAddress(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

/**
 * Generate a random token
 */
function generateToken(status: TokenStatus): Token {
  const { name, symbol } = generateNameAndSymbol();
  
  // Vary values based on status
  let marketCap: number;
  let bondingProgress: number;
  let createdOffset: number;
  
  switch (status) {
    case 'new':
      marketCap = Math.random() * 100000;
      bondingProgress = Math.random() * 50;
      createdOffset = Math.random() * 300000; // 0-5 minutes ago
      break;
    case 'finalStretch':
      marketCap = 50000 + Math.random() * 100000;
      bondingProgress = 80 + Math.random() * 20;
      createdOffset = 300000 + Math.random() * 1800000; // 5-35 minutes ago
      break;
    case 'migrated':
      marketCap = 100000 + Math.random() * 2000000;
      bondingProgress = 100;
      createdOffset = 1800000 + Math.random() * 86400000; // 30 min - 24 hours ago
      break;
  }
  
  return {
    id: generateId(),
    address: generateAddress(),
    name,
    symbol,
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(name + ' logo abstract 3d render vibrant')}`,
    marketCap,
    volume24h: marketCap * (0.1 + Math.random() * 0.5),
    txCount: Math.floor(Math.random() * 5000) + 100,
    priceInSol: Math.random() * 0.01,
    priceChange24h: (Math.random() - 0.5) * 100,
    bondingCurveProgress: bondingProgress,
    createdAt: Date.now() - createdOffset,
    socials: {
      twitter: Math.random() > 0.3 ? `https://twitter.com/${symbol.toLowerCase()}` : undefined,
      telegram: Math.random() > 0.5 ? `https://t.me/${symbol.toLowerCase()}` : undefined,
      website: Math.random() > 0.6 ? `https://${symbol.toLowerCase()}.io` : undefined,
    },
    safety: {
      isVerified: Math.random() > 0.7,
      auditScore: Math.floor(Math.random() * 100),
      liquidityLocked: Math.random() > 0.5,
      contractRenounced: Math.random() > 0.8,
    },
    status,
  };
}

/**
 * Generate initial mock tokens
 */
export function generateMockTokens(count: number, status: TokenStatus): Token[] {
  return Array.from({ length: count }, () => generateToken(status));
}

/**
 * Generate a new token for real-time updates
 */
export function generateNewToken(status: TokenStatus): Token {
  return generateToken(status);
}
