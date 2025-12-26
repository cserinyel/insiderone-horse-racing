# 🏇 Horse Racing Simulator

A dynamic and interactive horse racing simulation built with Vue 3 and TypeScript. Watch randomly generated horses compete across multiple laps with realistic race mechanics, complete with countdown timers, position tracking, and comprehensive race results.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?style=flat&logo=vitest)
![Cypress](https://img.shields.io/badge/Cypress-15.8-17202C?style=flat&logo=cypress)

## ✨ Features

- **Random Horse Generation** - 20 uniquely named horses with random colors and condition ratings (1-100)
- **Multi-Lap Races** - 6 laps with varying distances (1200m - 2200m)
- **Real-time Position Tracking** - Watch horses progress across the track with smooth animations
- **Race Phases** - Dynamic speed calculations with start burst, cruise, and sprint phases
- **Countdown Timer** - 3-second countdown before each lap begins
- **Pause/Resume** - Full control to pause and resume races at any time
- **Race Schedule** - View upcoming laps with participating horses
- **Dark/Light Theme** - Toggle between dark and light modes with system preference detection
- **Visibility Pause** - Race automatically pauses when tab loses focus

## 🛠️ Tech Stack

### Core Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript superset
- **[Vuex 4](https://vuex.vuejs.org/)** - State management pattern + library

### Build Tools
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[vue-tsc](https://github.com/vuejs/language-tools)** - TypeScript compiler for Vue SFCs

### Testing
- **[Vitest](https://vitest.dev/)** - Blazing fast unit test framework
- **[Vue Test Utils](https://test-utils.vuejs.org/)** - Official testing utilities for Vue.js
- **[Cypress](https://www.cypress.io/)** - End-to-end testing framework
- **[happy-dom](https://github.com/capricorn86/happy-dom)** - Fast DOM implementation for testing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd horse-racing

# Install dependencies
yarn install
# or
npm install
```

## 🚀 Development

```bash
# Start the development server
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

```bash
# Type-check and build for production
yarn build
# or
npm run build

# Preview the production build locally
yarn preview
# or
npm run preview
```

The build output will be in the `dist/` directory.

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests in watch mode
yarn test
# or
npm run test

# Run unit tests once
yarn test:run
# or
npm run test:run

# Run unit tests with coverage report
yarn test:coverage
# or
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

### End-to-End Tests

```bash
# Open Cypress interactive test runner
yarn cy:open
# or
npm run cy:open

# Run Cypress tests headlessly
yarn cy:run
# or
npm run cy:run
```

> **Note:** Make sure the development server is running before executing E2E tests.

## 🎮 How to Play

1. **Generate Schedule** - Click the "Generate Schedule" button to create a new race with random horse assignments
2. **Start Race** - Click "Start Race" to begin the competition
3. **Watch the Action** - Observe the countdown, then watch horses race across the track
4. **Track Progress** - View the schedule panel for upcoming laps and results panel for completed laps
5. **Control the Race** - Use Pause/Resume buttons to control the race flow
6. **Race Again** - After all 6 laps complete, generate a new schedule to race again

## ⚙️ Race Mechanics

### Horse Attributes
- **Name** - Unique name from a pool of 50 creative names
- **Color** - Distinct color for easy identification on the track
- **Condition** - Random value (1-100) affecting horse speed

### Speed Calculation
Horse speed is determined by:
- **Base condition** - Higher condition = faster base speed
- **Race phases** - Different speed bonuses at different track positions:
  - Start (0-15%): +8% speed bonus
  - Cruise (15-75%): No bonus
  - Sprint (75-100%): +12% speed bonus
- **Random variation** - ±15% randomness for unpredictability
- **Condition push** - Low-condition horses get a boost to ensure race completion

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn test` | Run unit tests (watch mode) |
| `yarn test:run` | Run unit tests once |
| `yarn test:coverage` | Run tests with coverage |
| `yarn cy:open` | Open Cypress test runner |
| `yarn cy:run` | Run Cypress tests headlessly |

## 🎨 Theming

The application supports both dark and light themes:
- **System Detection** - Automatically detects system preference on first visit
- **Persistent** - Theme choice is saved in localStorage
- **Toggle** - Use the sun/moon icon in the topbar to switch themes

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Vue 3 + TypeScript + Vite
