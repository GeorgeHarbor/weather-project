# Redux Toolkit — Coords State Plan

## Context

The app lets users click a location on the map and see weather for it. Right now:
- `Map.tsx` pans on click but dispatches nothing — no state update happens
- All 4 weather cards hardcode `{ lat: 10, lon: 25 }` in their `queryFn`
- `App.tsx` has a `useState<Coords>` that is defined but never passed to any component
- The map marker is also hardcoded at `[10, 25]`

Redux Toolkit solves this cleanly: one global `coords` slice that `Map` writes to on click, and all weather cards read from to drive their React Query fetches.

---

## Files to change

| File | Action |
|------|--------|
| `src/store/coordsSlice.ts` | **Create** — slice with `setCoords` action |
| `src/store/index.ts` | **Create** — store + exported `RootState` / `AppDispatch` types |
| `src/main.tsx` | **Edit** — wrap tree in `<Provider store={store}>` |
| `src/App.tsx` | **Edit** — remove unused `useState<Coords>` |
| `src/components/Map.tsx` | **Edit** — dispatch `setCoords` on click, drive marker from store |
| `src/components/cards/CurrentWeather.tsx` | **Edit** — read coords from store, add to queryKey |
| `src/components/cards/HourlyForecast.tsx` | **Edit** — same |
| `src/components/cards/DailyForecast.tsx` | **Edit** — same |
| `src/components/cards/AdditionalInfo.tsx` | **Edit** — same |

---

## Steps

### 1. Install packages
```
npm install @reduxjs/toolkit react-redux
```

### 2. Create `src/store/coordsSlice.ts`
```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coords } from '../types'

const coordsSlice = createSlice({
  name: 'coords',
  initialState: { lat: 10, lon: 25 } as Coords,
  reducers: {
    setCoords: (_, action: PayloadAction<Coords>) => action.payload,
  },
})

export const { setCoords } = coordsSlice.actions
export default coordsSlice.reducer
```

### 3. Create `src/store/index.ts`
```ts
import { configureStore } from '@reduxjs/toolkit'
import coordsReducer from './coordsSlice'

export const store = configureStore({
  reducer: { coords: coordsReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 4. Edit `src/main.tsx`
Wrap the existing `QueryClientProvider` tree with `<Provider store={store}>`.

### 5. Edit `src/App.tsx`
Remove the unused `useState<Coords>` and its import.

### 6. Edit `src/components/Map.tsx`
- `useSelector` to get `coords` for the marker position
- `useDispatch` + dispatch `setCoords({ lat, lng })` inside the click handler
- Replace all hardcoded `[10, 25]` with values from the store

### 7. Edit all 4 weather cards
Pattern is identical for each:
```ts
const coords = useSelector((state: RootState) => state.coords)

useSuspenseQuery({
  queryKey: ['weather', coords.lat, coords.lon],  // coords in key triggers refetch
  queryFn: () => getWeather(coords),
})
```

---

## Verification
1. `npm run dev` — app loads, weather shows for default coords `(10, 25)`
2. Click a new location on the map — marker moves, all 4 cards refetch and display weather for the new location
3. `npm run build` — TypeScript compiles with no errors
