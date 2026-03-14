import { Metadata } from 'next';
import { PulseContent } from '@/components/PulseContent';

export const metadata: Metadata = {
  title: 'Live Token Tracker',
  description: 'Track real-time prices, liquidity, and volume of top Solana tokens on Mobula Pulse.',
  alternates: {
    canonical: '/pulse',
  },
};

export default function PulsePage() {
    return <PulseContent />;
}
