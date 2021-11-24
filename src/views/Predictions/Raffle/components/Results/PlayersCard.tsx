import React, { useEffect } from 'react'
import { Card, Table, Td, Text, Th, LinkExternal, Flex } from '@pancakeswap/uikit'
import truncateHash from 'utils/truncateHash'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { RaffleRoundData, RafflesPlayer } from 'state/raffle/types'
import { useGetRafflePlayers } from 'state/raffle/hooks'
import { fetchPlayers } from 'state/raffle'
import { useAppDispatch } from 'state'
import { chain } from 'lodash'

interface PlayersProps {
  round: RaffleRoundData
}

const PlayersCard: React.FC<PlayersProps> = ({ round }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const playersMap = useGetRafflePlayers(round.round)
  const sortedPlayers: RafflesPlayer[] = chain(playersMap).values().sortBy('totalTicket').value()
  useEffect(() => {
    dispatch(fetchPlayers(round.round))
  }, [dispatch, round.round])
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <Th width="60px">{t('Top 10')}</Th>
            <Th textAlign="center">{t('User')}</Th>
            <Th textAlign="center">{t('Ticket Count')}</Th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((user, i) => {
            return (
              <tr key={user.address}>
                <Td>
                  <Text textAlign="center" fontWeight="bold" color="secondary">{`#${i + 1}`}</Text>
                </Td>
                <Td textAlign="center">
                  <Flex alignItems="center">
                    <LinkExternal href={getBscScanLink(user.address, 'address')}>
                      {truncateHash(user.address)}
                    </LinkExternal>
                  </Flex>
                </Td>
                <Td textAlign="center">{user.totalTicket}</Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Card>
  )
}

export default PlayersCard
