# Axiom Trade - Pulse Interface Replica

A production-grade, pixel-perfect replica of the [Axiom Trade Pulse](https://axiom.trade/pulse) interface built with Next.js 14, TypeScript, and Tailwind CSS.

![Pulse Screenshot](/.github/screenshot.png)

## 🚀 Features

- **Real-time Updates**: Simulated WebSocket price updates with green/red flash animations
- **Three-Column Layout**: New Pairs, Final Stretch, and Migrated token feeds
- **Virtual Scrolling**: Efficient rendering of 100+ tokens using @tanstack/react-virtual
- **Responsive Design**: Mobile tab switcher, tablet grid, desktop three-column layout
- **Atomic Design Architecture**: Reusable components organized as atoms, molecules, organisms
- **Type-Safe**: Strict TypeScript with zero `any` types

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| State | Redux Toolkit |
| Data | TanStack Query v5 |
| Performance | @tanstack/react-virtual |
| UI Primitives | shadcn/ui (Radix-based) |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main Pulse page
│   └── globals.css         # Design tokens & global styles
├── components/
│   ├── atoms/              # Button, Badge, Spinner, TokenAvatar, PriceCell
│   ├── molecules/          # PriceChange, SocialLinks, ProgressBar, MetricBlock
│   ├── organisms/          # TokenCard, TokenColumn, Header, TabSwitcher
│   ├── Providers.tsx       # Redux + React Query providers
│   └── PulseContent.tsx    # Main content component
├── hooks/                  # Custom React hooks
│   ├── useWebSocket.ts     # Simulated real-time updates
│   ├── useIsMobile.ts      # Responsive detection
│   └── useRedux.ts         # Typed Redux hooks
├── store/                  # Redux state management
│   ├── tokenSlice.ts       # Token data & price updates
│   └── uiSlice.ts          # UI preferences & settings
├── types/                  # TypeScript interfaces
│   ├── token.types.ts      # Token, PriceUpdate, FilterPreset
│   └── ui.types.ts         # DisplaySettings, SortConfig
└── utils/                  # Utility functions
    ├── formatters.ts       # Currency, time, address formatting
    ├── constants.ts        # Colors, presets, breakpoints
    └── mockData.ts         # Realistic token generator
```

## 🎨 Design Tokens

Extracted from the live Axiom Trade site:

| Token | Value |
|-------|-------|
| Background | `#06070B` |
| Primary Blue | `#526FFF` |
| Success Green | `#12AF80` |
| Error Red | `#F25461` |
| Text Primary | `#FCFCFC` |
| Text Secondary | `#C8C9D1` |
| Font Family | Geist |

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 768px | Single column with tab switcher |
| 768px - 1024px | Two-column grid |
| > 1024px | Full three-column layout |

## ⚡ Performance

- Virtual scrolling for smooth 60fps scrolling
- React.memo on TokenCard for minimal re-renders
- Skeleton loading states to prevent layout shifts
- 300ms price flash animations with CSS

## 📝 License

MIT
