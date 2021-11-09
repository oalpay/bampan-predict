import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getRaffleAddress,
} from 'utils/addressHelpers'

// ABI

import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'

import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import erc721CollctionAbi from 'config/abi/erc721collection.json'
import RaffleAbi from 'config/abi/raffle.json'
import { ChainLinkOracleContract, PredictionsContract } from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}

export const getPredictionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), signer) as PredictionsContract
}

export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getErc721CollectionContract = (signer?: ethers.Signer | ethers.providers.Provider, address?: string) => {
  return getContract(erc721CollctionAbi, address, signer)
}

export const getRaffleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(RaffleAbi, getRaffleAddress(), signer)
}
