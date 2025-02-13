import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}

export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}

export const getRaffleAddress = () => {
  return getAddress(addresses.raffle)
}
