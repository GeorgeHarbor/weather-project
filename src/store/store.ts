// configureStore creates the Redux store and combines all reducers
import { configureStore } from '@reduxjs/toolkit'
import coordsReducer from './coordsSlice.ts'

// The store holds the entire application state tree
// Each key in reducer becomes a top-level key in state, e.g. state.coords
export const store = configureStore({
  reducer: { coords: coordsReducer },
})

// RootState is the type of the full state tree — use this when typing useSelector
// e.g. (state: RootState) => state.coords
export type RootState = ReturnType<typeof store.getState>

// AppDispatch is the type of store.dispatch — use this when typing useDispatch
// e.g. const dispatch = useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch
