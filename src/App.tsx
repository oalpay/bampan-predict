import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import Navbar from 'components/Navbar'

import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'
import GlobalStyle from './style/Global'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Predictions = lazy(() => import('./views/Predictions'))
const NotFound = lazy(() => import('./views/NotFound'))
const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
const Raffle = lazy(() => import('./views/Predictions/Raffle'))
const Vote = lazy(() => import('./views/Predictions/Vote'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useScrollOnRouteChange()
  useUserAgent()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Navbar />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <Predictions />
          </Route>
          <Route path="/prediction" exact>
            <Predictions />
          </Route>
          <Route path="/predictions/leaderboard">
            <PredictionsLeaderboard />
          </Route>
          <Route path="/raffle">
            <Raffle />
          </Route>
          <Route path="/vote">
            <Vote />
          </Route>
          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
