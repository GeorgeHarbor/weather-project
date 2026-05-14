import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const citySlice = createSlice({
  name: 'city',
  initialState: 'Kraljevo',
  reducers: {
    setCity: (_, action: PayloadAction<string>) => action.payload,
  },
})

export const { setCity } = citySlice.actions

export default citySlice.reducer
