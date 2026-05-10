// createSlice generates action creators and reducers for a slice of Redux state
// PayloadAction types the action's .payload field
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Coords is a type with { lat: number, lon: number }
import { Coords } from '../types'

const coordsSlice = createSlice({
  name: 'coords', // prefix for generated action type strings, e.g. "coords/setCoords"
  initialState: { lat: 10, lon: 25 } as Coords, // default coords before user sets a location
  reducers: {
    // Replaces the entire coords state with the incoming payload
    // _ ignores the previous state since we're doing a full replacement
    // action: PayloadAction<Coords> means action.payload is typed as Coords
    setCoords: (_, action: PayloadAction<Coords>) => action.payload,
  },
})

// Export the action creator so components can dispatch setCoords({ lat, lon })
export const { setCoords } = coordsSlice.actions

// Export the reducer to register it in the store
export default coordsSlice.reducer
