import React from 'react'
import { Box } from '@pancakeswap/uikit'
import { PredictionPlayer, PredictionUser } from 'state/types'
import MobileRow from './MobileRow'

interface MobileResultsProps {
  results: PredictionPlayer[]
}

const MobileResults: React.FC<MobileResultsProps> = ({ results }) => {
  return (
    <Box mb="24px">
      {results.map((result, index) => (
        <MobileRow key={result.objectId} rank={index + 4} user={result} />
      ))}
    </Box>
  )
}

export default MobileResults
