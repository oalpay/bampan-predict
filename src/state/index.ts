import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'

import predictionsReducer from './predictions'
import blockReducer from './block'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import multicall from './multicall/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'profile']

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    predictions: predictionsReducer,
    // Exchange
    user,
    transactions,
    multicall,
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
