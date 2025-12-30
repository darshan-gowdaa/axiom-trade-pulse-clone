import { type Token, type TokenStatus } from '@/types';
import { generateId } from './formatters';

const BRAINROT_TERMS = [
  'Skibidi', 'Rizz', 'Fanum', 'Ohio', 'Sigma', 'Gyatt', 'Grimace', 'Kai', 'Livvy', 
  'Gronk', 'Baby Gronk', 'Mewing', 'Looksmax', 'Chug Jug', 'W', 'L', 'Ratio', 'Based','Gooning', 'Edging', 'Bussy', 'Coomer', 'Thicc', 'Down Bad', 'Glizzy', 'Throat', 'Hawk Tuah', 'Cooked', 'Lock In', 'Crash Out'
];

const CORPORATE_TERMS = [
  'Apple', 'Microsoft', 'Nvidia', 'Amazon', 'Google', 'Meta', 'Tesla', 'Visa', 'JPMorgan', 'Walmart', 'BlackRock', 'Vanguard', 'Coinbase', 'Binance'
];

const CRYPTO_TERMS = [
  'BTC', 'ETH', 'SOL', 'PEPE', 'DOGE', 'SHIB', 'BAYC', 'MAYC', 'Punk', 'Milady', 
  'Remilio', 'Pudgy', 'Azuki', 'WIF', 'BONK', 'MOG', 'POPCAT', 'BOME', 'SLERF'
];

const STATIC_TOKENS: Partial<Token>[] = [
  { name: 'Help Find TubTub', symbol: 'TubTub', marketCap: 3400, volume24h: 577, txCount: 6, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=TubTub' },
  { name: 'MonkeyDLuffy', symbol: 'Luffy', marketCap: 3400, volume24h: 923, txCount: 10, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=Luffy' },
  { name: 'Frogy', symbol: 'FROGY', marketCap: 3420, volume24h: 3000, txCount: 28, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=FROGY' },
  { name: 'bucks', symbol: 'bucks', marketCap: 3430, volume24h: 4000, txCount: 71, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=bucks' },
  { name: 'the cult of SOL', symbol: 'INVICTUS', marketCap: 3400, volume24h: 216, txCount: 3, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=INVICTUS' },
  { name: 'Dev is active', symbol: 'AGENT', marketCap: 3400, volume24h: 0, txCount: 3, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=AGENT' },
  { name: 'WANTA XMAS', symbol: 'XMAS', marketCap: 49500, volume24h: 11000, txCount: 45, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=XMAS' },
  { name: 'Olympic Snowflake Mascot', symbol: 'TINA', marketCap: 49900, volume24h: 11000, txCount: 55, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=TINA' },
  { name: 'Agent City', symbol: 'AGENT_CITY', marketCap: 55000, volume24h: 12000, txCount: 100, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=AGENT_CITY' },
  { name: 'XMASKNIGHT', symbol: 'MEGAKNIGH', marketCap: 57900, volume24h: 15000, txCount: 253, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=MEGAKNIGH' },
  { name: 'OddsLayer', symbol: 'ODD', marketCap: 46500, volume24h: 11000, txCount: 162, status: 'new', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=ODD' },

  // Final Stretch
  { name: 'Slay House', symbol: 'SLAY', marketCap: 32000, volume24h: 65000, txCount: 911, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=SLAY' },
  { name: 'DUMPSANTA', symbol: 'DUMPSANTA', marketCap: 27400, volume24h: 15000, txCount: 329, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=DUMPSANTA' },
  { name: 'MULLER', symbol: 'MULLER', marketCap: 25200, volume24h: 233000, txCount: 3460, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=MULLER' },
  { name: 'CollabraChain', symbol: 'COLLA', marketCap: 24800, volume24h: 119000, txCount: 1612, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=COLLA' },
  { name: 'GREEDCOIN', symbol: 'GREED$', marketCap: 22900, volume24h: 14000, txCount: 388, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=GREED$' },
  { name: 'Mascarade', symbol: 'Mascarade', marketCap: 11800, volume24h: 16000, txCount: 4172, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=Mascarade' },
  { name: 'Modex420o', symbol: 'MODEXO', marketCap: 22300, volume24h: 120000, txCount: 1897, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=MODEXO' },
  { name: 'SILVER', symbol: 'SILVER', marketCap: 22100, volume24h: 6000, txCount: 71, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=SILVER' },
  { name: 'TURK', symbol: 'TC', marketCap: 21400, volume24h: 101000, txCount: 1933, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=TC' },
  { name: 'STiFF Coin', symbol: 'STiFF', marketCap: 21400, volume24h: 6000, txCount: 102, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=STiFF' },
  { name: 'Luna Rose', symbol: 'LROSE', marketCap: 20800, volume24h: 203000, txCount: 3247, status: 'finalStretch', imageUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=LROSE' },
];

export const generateRandomNameAndSymbol = () => {
  const p1 = BRAINROT_TERMS[Math.floor(Math.random() * BRAINROT_TERMS.length)] || 'Based';
  const useCorporate = Math.random() > 0.5;
  const p2 = useCorporate 
    ? CORPORATE_TERMS[Math.floor(Math.random() * CORPORATE_TERMS.length)] || 'Coin'
    : CRYPTO_TERMS[Math.floor(Math.random() * CRYPTO_TERMS.length)] || 'Pepe';
  
  const name = Math.random() > 0.5 ? `${p1} ${p2}` : `${p2} ${p1}`;
  const symbol = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4) + (Math.random() > 0.5 ? 'X' : '');

  return { name, symbol };
};

export const generateNameAndSymbol = (index?: number) => {
  if (index !== undefined && index < STATIC_TOKENS.length) {
    return { 
      name: STATIC_TOKENS[index].name!,
      symbol: STATIC_TOKENS[index].symbol!
    };
  }
  return generateRandomNameAndSymbol();
};

export const generateCreatorName = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const start = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const end = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${start}...${end}`;
};

export function generateAddress(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

function getStaticToken(index: number, desiredStatus: TokenStatus): Token {
  const candidates = STATIC_TOKENS.filter(t => t.status === desiredStatus);
  const staticData = candidates[index];

  if (staticData) {
    return {
      id: generateId(),
      address: generateAddress(),
      name: staticData.name!,
      symbol: staticData.symbol!,
      imageUrl: staticData.imageUrl!,
      marketCap: staticData.marketCap!,
      volume24h: staticData.volume24h!,
      txCount: staticData.txCount!,
      priceInSol: Math.random() * 0.01 + 0.001,
      priceChange24h: (Math.random() - 0.5) * 20,
      bondingCurveProgress: Math.random() * 100,
      createdAt: Date.now() - (Math.random() * 3600000),
      socials: {
        twitter: Math.random() > 0.5 ? `https://twitter.com/${staticData.symbol}` : undefined,
      },
      safety: {
        isVerified: Math.random() > 0.7,
        auditScore: 80 + Math.floor(Math.random() * 20),
        liquidityLocked: true,
        contractRenounced: Math.random() > 0.5,
      },
      status: desiredStatus,
    };
  }


  const { name, symbol } = generateRandomNameAndSymbol();
  let marketCap: number;
  let bondingProgress: number;
  
  if (desiredStatus === 'new') {
      marketCap = Math.random() * 100000;
      bondingProgress = Math.random() * 50;
  } else if (desiredStatus === 'finalStretch') {
      marketCap = 50000 + Math.random() * 100000;
      bondingProgress = 80 + Math.random() * 20;
  } else {
      marketCap = 100000 + Math.random() * 2000000;
      bondingProgress = 100;
  }

  return {
    id: generateId(),
    address: generateAddress(),
    name,
    symbol,
      imageUrl: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(name)}`,
    marketCap,
    volume24h: marketCap * (0.1 + Math.random() * 0.5),
    txCount: Math.floor(Math.random() * 5000) + 100,
    priceInSol: Math.random() * 0.01,
    priceChange24h: (Math.random() - 0.5) * 100,
    bondingCurveProgress: Math.random() * 100,
    createdAt: Date.now() - Math.random() * 86400000,
    socials: {
      twitter: Math.random() > 0.5 ? `https://twitter.com/${symbol}` : undefined,
    },
    safety: {
      isVerified: Math.random() > 0.7,
      auditScore: Math.floor(Math.random() * 100),
      liquidityLocked: Math.random() > 0.5,
      contractRenounced: Math.random() > 0.8,
    },
    status: desiredStatus,
  };
}

export function generateMockTokens(count: number, status: TokenStatus): Token[] {
  return Array.from({ length: count }, (_, i) => getStaticToken(i, status));
}

export function generateNewToken(status: TokenStatus): Token {
  if (Math.random() > 0.3) {
     return getStaticToken(Math.floor(Math.random() * STATIC_TOKENS.length), status);
  }
  
  const { name, symbol } = generateRandomNameAndSymbol();
  
  return {
      id: generateId(),
      address: generateAddress(),
      name,
      symbol,
      imageUrl: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(name)}`,
      marketCap: 10000,
      volume24h: 5000,
      txCount: 10,
      priceInSol: 0.001,
      priceChange24h: 0,
      bondingCurveProgress: 0,
      createdAt: Date.now(),
      status
  } as Token;
}
