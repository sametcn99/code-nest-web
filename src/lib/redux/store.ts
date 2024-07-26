import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer'

/**
 * Configure the Redux store using the rootReducer.
 * configureStore is a function provided by Redux Toolkit that simplifies the store setup.
 */
const reduxStore = configureStore({
  /**
   * Set the root reducer for the store.
   * @type {Function}
   */
  reducer: rootReducer,
})

/**
 * Define RootState type using the ReturnType utility type to infer the state shape from the root reducer.
 * @typedef {ReturnType<typeof reduxStore.getState>} RootState
 */
export type RootState = ReturnType<typeof reduxStore.getState>

/**
 * Define AppDispatch type representing the store's dispatch function.
 * @typedef {typeof reduxStore.dispatch} AppDispatch
 */
export type AppDispatch = typeof reduxStore.dispatch

/**
 * Export the configured Redux store as the default export of this module.
 */
export default reduxStore
