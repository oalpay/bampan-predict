import React from 'react'
import { Td, Text } from '@pancakeswap/uikit'
import { PredictionPlayer, PredictionUser } from 'state/types'
import ResultAvatar from './ResultAvatar'
import { NetWinnings } from './styles'

interface DesktopRowProps {
  rank?: number
  user: PredictionPlayer
}

const DesktopRow: React.FC<DesktopRowProps> = ({ rank, user, ...props }) => (
  <tr {...props}>
    {rank ? (
      <Td>
        <Text textAlign="center" fontWeight="bold" color="secondary">{`#${rank}`}</Text>
      </Td>
    ) : (
      <Td />
    )}
    <Td>
      <ResultAvatar user={user} />
    </Td>
    <Td>
      <NetWinnings
        amount={Number(user.totalAmountWon)}
        textPrefix={user.totalAmountWon > 0 ? '+' : ''}
        textColor={user.totalAmountWon > 0 ? 'success' : 'failure'}
      />
    </Td>
    <Td textAlign="center">
      {`${(100 * user.won / user.roundsPlayed).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`}
    </Td>
    <Td textAlign="center">
      <strong>{user.won.toLocaleString()}</strong>
    </Td>
    <Td textAlign="center">{user.roundsPlayed.toLocaleString()}</Td>
  </tr>
)

export default DesktopRow
