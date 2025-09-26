# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server at http://localhost:3000
- `npm run build` - Build the production-ready static site (outputs to `/out` directory)
- `npm run start` - Start the production server (after building)

### Code Quality
- `npm run lint` - Run ESLint with Next.js rules and Prettier formatting
- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode for development

### Testing a Single Test
- `npm test -- path/to/test.test.tsx` - Run a specific test file
- `npm test -- --testNamePattern="test name"` - Run tests matching a pattern

## Architecture Overview

This is a Next.js 14 application using the App Router that helps users find sports teams based on color preferences. The site is configured for static export and hosted as static files.

### Core User Flow
1. User selects two colors using popover color pickers
2. Colors are stored in URL query parameters using `nuqs`
3. Color matching algorithm finds teams with similar colors
4. Results are displayed with adjustable count (1-20 teams)

### Key Architectural Decisions

**Static Architecture**: The app is built as a fully static site (`output: "export"`) with all data pre-loaded from `/public/teams.json`. This enables CDN hosting without a server.

**State Management**: Uses URL query parameters for color selections (via `nuqs`), ensuring sharable links and browser navigation work correctly. No global state management is needed.

**Color Matching**: The `nearestColorsTeams` function in `/app/lib/nearestColorsTeams.ts` uses the Delta E algorithm to calculate perceptual color distances between user selections and team colors.

**Performance**: 
- Debounced color inputs (100ms) prevent excessive recalculations
- SWR for data fetching with built-in caching
- CSS Modules for scoped styling without runtime overhead

**Component Structure**:
- Page components live directly in `/app`
- Shared components in `/app/components` with accompanying CSS modules
- Custom hooks in `/app/hooks`
- Utility functions in `/app/lib`
- TypeScript types in `/app/types`

**Testing Strategy**: Jest with Testing Library for component and utility testing. Tests are co-located with code in `__tests__` directories.