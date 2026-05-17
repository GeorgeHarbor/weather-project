# Weather Project

A weather dashboard built with React, TypeScript, and Vite. Displays current conditions, forecasts, air quality data, and an interactive map — all driven by the OpenWeatherMap API.

## Features

- **Current weather** — temperature, humidity, wind, UV index, and more
- **Hourly & daily forecasts** — scrollable cards with weather icons
- **Air quality / AQI panel** — per-pollutant breakdown (SO₂, NO₂, PM10, PM2.5, O₃, CO, NO, NH₃) with color-coded quality levels
- **Interactive map** — MapTiler + Leaflet with switchable map layers (Clouds, Wind, Precipitation, Temperature, Pressure)
- **Location search** — look up any city by name
- **Loading skeletons** — full skeleton UI while data fetches, with fade-in animation
- **Responsive side panel** — slide-in AQI panel with toggle button

## Tech Stack

| Area | Library |
|------|---------|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI + shadcn |
| State | Redux Toolkit |
| Data fetching | TanStack Query (Suspense mode) |
| Map | Leaflet + MapTiler SDK |
| Validation | Zod |
| Icons | Lucide React |

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_API_KEY=your_openweathermap_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
```

3. Start the dev server:

```bash
npm run dev
```

## API Keys

- **OpenWeatherMap** — used for weather, forecast, geocoding, and air pollution data. Requires a [One Call API 3.0](https://openweathermap.org/api/one-call-3) subscription.
- **MapTiler** — used for the map tiles and layer overlays.

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Type-check and build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```
