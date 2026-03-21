<div align="center">
    <h1>
    <img src="public/favicon.ico" height="32" alt="Axiom Logo" />
    Axiom Trade Pulse Clone
  </h1>
  <h3>Pixel-Perfect Token Discovery & Trading Interface</h3>

  <p>
    An exact replica of the <a href="https://axiom.trade/pulse">Axiom Trade Pulse</a> interface, engineered for high-performance DeFi trading simulation.
    <br />
    <br />
    <strong>
    <h2>Vercel Deployment:
    <a href="https://axiom-pulse-clone-gamma.vercel.app"><strong>View Live Website »</strong></a>
    <br/>Demo Video:
    <a href="https://youtu.be/NAwyB5NXSAg">View Demo Video</a>
  </p>
</div>

---

<div align="center">
Built with ❤️ using
<a href="https://docs.mobula.io?ref=dg">Mobula</a> —
The most powerful DeFi data API
</div>

---

<div align="center">

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
[![Mobula](https://img.shields.io/badge/Data%20API-Mobula-6C3CE1?style=for-the-badge)](https://docs.mobula.io?ref=dg)

</div>

<br />

# ⚡ About The Project

**Axiom Trade Pulse Clone** is a high-fidelity frontend recreation of the professional token discovery dashboard used by Axiom Trade. This project serves as a benchmark for **modern React performance patterns**, demonstrating how to handle high-frequency data updates (mocked) while maintaining 60fps animations and sub-100ms interaction latency.

Unlike typical clones, this project adheres to a strict **"Pixel-Perfect"** standard, matching the original site's dimensions, colors, and typography within a 2px tolerance. It is fully responsive, adapting complex tabular data from 4K desktops down to mobile screens without sacrificing usability. Live token data and market metrics are powered by [Mobula](https://docs.mobula.io?ref=dg), a high-performance DeFi data API.

## 🎯 Key Objectives
- **Zero Layout Shift**: Meticulous usage of skeletons and pre-allocated dimensions to prevent CLS.
- **State Scalability**: Leveraging Redux Toolkit for complex UI state (filters, layout modes) and React Query for asynchronous data management.
- **Design System Integrity**: Implementation of a rigid Atomic Design system to ensure component reusability and maintainability.

## 📸 Screenshots

### Overview
<div align="center">
  <img width="68%" alt="Full Page Desktop View" src="https://github.com/user-attachments/assets/1fc6a712-74aa-4d5b-a4ae-04c160f2cf15" />
  &nbsp
  <img width="20%" alt="Mobile Responsive Layout" src="https://github.com/user-attachments/assets/eff1395a-ff18-422f-859a-342c53a8740c" />
</div>



### Features

#### Interactive Header
![Interactive Header Navigation](https://github.com/user-attachments/assets/0ce7e188-dcc1-4dbd-bc5d-6cedb0b16d49)

#### Tooltips
![Interactive Tooltips](https://github.com/user-attachments/assets/5b9b708a-4e6c-4b62-8698-80cca2dc1aea)

#### Table Hover Effects
![Table Row Hover Effects](https://github.com/user-attachments/assets/8763d6dc-b475-4bbd-b930-a591a87d088e)

#### Status Bar
![Bottom Status Bar](https://github.com/user-attachments/assets/2f342317-9b6d-48e4-8516-f98f7eeeca3d)

#### Skeleton Loading
![Skeleton Loading State](https://github.com/user-attachments/assets/5507e294-3bb1-4262-bd47-0b5e52e1ebcb)

#### Dynamic Page Switching
![SOL to BNB Page Transition](https://github.com/user-attachments/assets/260b3f9c-cdd8-458e-beb9-b9feecdc8975)

#### Filter Modal
![Filter Modal Functionality](https://github.com/user-attachments/assets/8980bb89-9082-46b1-8653-8cde6bbfa8ec)

  
#### Mobile View & Responsive Design
<div align="center">
  <img width="18%" alt="Mobile Layout Functionality" src="https://github.com/user-attachments/assets/ccd3b239-d9c0-43f6-82cd-44fcd758be7a" />
  &nbsp
  <img width="80%" alt="Auto Layout Adjustment" src="https://github.com/user-attachments/assets/19443843-99fd-4bf7-9e1f-2ac139bc7b2a" />
</div>


---

# ✨ Core Features

### 🖥️ High-Performance Interface
- **Real-Time Simulation**: Mock WebSocket architecture (`useWebSocket`) simulates live token events with realistic distinct timing for "New Pairs" vs. "Migrated" tokens, powered by [Mobula](https://docs.mobula.io?ref=dg) for live token event data.
- **Micro-Interactions**: Custom "Flash" animations (green/red) on price updates, mimicking live order book movements.
- **Virtualized Rendering**: Optimized for rendering long lists of tokens without DOM bloat.

### 🎨 Advanced UX/UI
- **Responsive Data Tables**: A complex grid system that transforms into a card-based layout on mobile devices.
- **Dynamic Filtering**: Real-time filtering by Chain (SOL/BASE/ETH) and Timebox (1m/5m/1h/24h). Chain and token data sourced via [Mobula](https://docs.mobula.io?ref=dg).
- **Interactive Skeletons**: Custom-built shimmer effects that match the exact geometry of the loading content.
- **Global Search**: Debounced search functionality with instant feedback.

---

# Project Structure & Component Architecture

The codebase follows strictly **Atomic Design** principles.

# 📂 Fully Expanded Project Layout


```
src/
├── app/                              # Next.js App Router
│   ├── pulse/                        # Main Dashboard Route
│   │   └── page.tsx                  # Dashboard Page Component
│   ├── globals.css                   # Global Tailwind Directives
│   ├── layout.tsx                    # Root Layout (Providers Wrapper)
│   └── page.tsx                      # Root Redirect Logic
│
├── components/                       # Atomic Design System
│   ├── atoms/                        # Base Primitives
│   │   ├── AxiomLogo.tsx             
│   │   ├── Badge.tsx                 
│   │   ├── Button.tsx                
│   │   ├── ChainLogo.tsx             
│   │   ├── ChainText.tsx            
│   │   ├── MetricBlock.tsx          
│   │   ├── NavButton.tsx             
│   │   ├── NotificationDot.tsx      
│   │   ├── OptimizedImage.tsx       
│   │   ├── Skeleton.tsx             
│   │   ├── SolanaLogo.tsx           
│   │   └── Tooltip.tsx              
│   │
│   ├── molecules/                    # Compound Components
│   │   ├── AccountSettingsDropdown.tsx
│   │   ├── AvatarDropdown.tsx      
│   │   ├── ChainDropdown.tsx        
│   │   ├── ChainSelector.tsx         
│   │   ├── FilterModal.tsx           
│   │   ├── MetricPill.tsx           
│   │   ├── MultiChainBadge.tsx      
│   │   ├── PresetPill.tsx           
│   │   ├── TokenAvatarCard.tsx      
│   │   ├── WalletDropdown.tsx       
│   │   └── WalletSolPill.tsx        
│   │
│   ├── organisms/                    # Complex Page Sections
│   │   ├── BottomStatusBar.tsx      
│   │   ├── Header.tsx              
│   │   ├── MobileMenu.tsx           
│   │   ├── MobileNavBar.tsx       
│   │   ├── PulseToolbar.tsx         
│   │   ├── TokenCard.tsx            
│   │   └── TokenColumn.tsx          
│   │
│   └── skeletons/                    # Loading States
│       ├── HeaderSkeleton.tsx
│       ├── PulseToolbarSkeleton.tsx
│       └── TokenColumnSkeleton.tsx
│
├── hooks/                            # Custom Logic Hooks
│   ├── useChain.ts                   # Chain Context Helper
│   ├── useIsMobile.ts                # Viewport Logic
│   ├── usePerformance.ts             # Web Vitals Tracking
│   ├── useRedux.ts                   # Typed Redux Hooks
│   ├── useTokenCardState.ts          # Card Interaction Logic
│   ├── useTokens.ts                  # Query Data Fetching
│   └── useWebSocket.ts               # Mock Socket Simulation
│
├── store/                            # Redux State
│   ├── filterSlice.ts                # Filter State Logic
│   ├── store.ts                      # Store Configuration
│   ├── tokenSlice.ts                 # Token Data Slice
│   └── uiSlice.ts                    # UI Interaction State
│
├── types/                            # TypeScript Definitions
│   └── index.ts                      # Shared Interfaces
│
└── utils/                            # Utilities
    └── index.ts                      # Helper Functions
```

Below is a detailed breakdown of every component in the system.
 
### ⚛️ Atoms
*Base UI primitives that cannot be broken down further.*

| File | Description |
| :--- | :--- |
| `AxiomLogo.tsx` | SVG rendering of the official Axiom Trade logo. |
| `Badge.tsx` | Reusable status indicator with varied color schemes (e.g., "Trending"). |
| `Button.tsx` | Core accessible button component with variants (primary, ghost, outline). |
| `ChainLogo.tsx` | Dynamically renders blockchain logos (Solana, Base, Ethereum) based on props. |
| `ChainText.tsx` | Standardized text typography for displaying chain names. |
| `MetricBlock.tsx` | Small reusable layout for displaying numeric data pairs (Label + Value). |
| `NavButton.tsx` | Navigation item component with active/inactive states for the sidebar. |
| `NotificationDot.tsx` | Red indicator pulse for alerts or unread statuses. |
| `OptimizedImage.tsx` | Performance-wrapped `next/image` component with blur placeholder logic. |
| `Skeleton.tsx` | Base shimmer animation primitive used to build complex loading states. |
| `SolanaLogo.tsx` | Optimized vector graphic for the Solana chain icon. |
| `Tooltip.tsx` | Portal-aware tooltip component that positions itself intelligently around elements. |

### 🧪 Molecules
*Groups of atoms working together as a functional unit.*

| File | Description |
| :--- | :--- |
| `AccountSettingsDropdown.tsx` | Popover menu for managing user preferences and language settings. |
| `AvatarDropdown.tsx` | User profile menu containing session actions and profile links. |
| `ChainDropdown.tsx` | Dropdown selector for switching the active blockchain context. |
| `ChainSelector.tsx` | Network switch controller used in the main header. |
| `FilterModal.tsx` | Complex modal form for advanced token filtering (Liquidity, Vol, MCap). |
| `MetricPill.tsx` | Capsule-shaped display for key metrics like Liquidity or Volume. |
| `MultiChainBadge.tsx` | Visual indicator for tokens available across multiple networks. |
| `PresetPill.tsx` | Clickable filter preset toggle (e.g., "M5", "H1", "H6"). |
| `TokenAvatarCard.tsx` | Composition of token image, name, and symbol with fallback handling. |
| `WalletDropdown.tsx` | Interactive menu for wallet actions (Copy Address, Disconnect, View Explorer). |
| `WalletSolPill.tsx` | Header widget showing current wallet balance and SOL price status. |

### 🧬 Organisms
*Complex distinct sections of the interface.*

| File | Description |
| :--- | :--- |
| `BottomStatusBar.tsx` | Global sticky footer displaying system status, gas fees, and market ticks. |
| `Header.tsx` | Main application navigation bar containing search, wallet, and settings. |
| `MobileMenu.tsx` | Full-screen overlays navigation menu for mobile viewports. |
| `MobileNavBar.tsx` | Simplified bottom navigation bar for mobile UX. |
| `PulseToolbar.tsx` | The central control bar for the Pulse page; handles all sorting and filtering inputs. |
| `TokenCard.tsx` | High-complexity row component displaying all live data for a single token. |
| `TokenColumn.tsx` | Virtualized list container managing a specific category of tokens (e.g., "New Pairs"). |

### 💀 Skeletons
*Loading states mirroring the exact dimensions of Organisms.*

| File | Description |
| :--- | :--- |
| `HeaderSkeleton.tsx` | Loading placeholder for the top navigation bar. |
| `PulseToolbarSkeleton.tsx` | Loading placeholder for the filter and sort toolbar. |
| `TokenColumnSkeleton.tsx` | Loading placeholder for the main token lists. |

---

# 🛠️ Tech Stack

Built on the **Bleeding Edge** of the React ecosystem (2025 Standards).

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.1.1` | App Router, Server Components, SSR |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Static Typing & Interface Definitions |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.0` | Zero-runtime styling, Design Tokens |
| **Global State** | [Redux Toolkit](https://redux-toolkit.js.org/) | `2.x` | Client-side UI State (Filters, Modals) |
| **Server State** | [TanStack Query](https://tanstack.com/query) | `5.x` | Data Fetching, Caching, Synchronization |
| **Icons** | [Remix Icon](https://remixicon.com/) | `4.7` | Consistent, pixel-perfect vector icons |
| **Data API** | [Mobula](https://docs.mobula.io?ref=dg) | Latest | Token Discovery, Live Market Data, DeFi Metrics |

---

# 📊 Performance
<img src="https://github.com/user-attachments/assets/2f97fd42-c83d-4471-989c-4bfc3fef6614" height="400" /> 
<img src="https://github.com/user-attachments/assets/22dca8a6-da14-4a9d-b232-e703fbe9ea97" height="400" />

| Metric | Target | Current | Status |
| :--- | :--- | :--- | :--- |
| **Lighthouse Score** | 90+ | **99** | ✅ Passing |
| **FCP (First Contentful Paint)** | < 1.0s | **0.3s** | ✅ Passing |
| **Interaction Latency** | < 100ms | **20ms** | ✅ Passing |
| **Layout Shift** | 1 | **0.003** | ✅ Passing |


---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Package Manager**: npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/darshan-gowdaa/axiom-trade-pulse-clone.git
   cd axiom-trade-pulse-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.
