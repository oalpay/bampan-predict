import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Card, CardBody, Flex, Heading, HelpIcon, Text, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePredictionsContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`
interface BountyCardProps {
  handle: any
}

const BountyCard: React.FC<BountyCardProps> = ({ handle }) => {
  const predictionContract = usePredictionsContract()

  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastError } = useToast()

  const [isTxPending, setIsTxPending] = useState(false)

  const handleCompleteVoting = async () => {
    try {
      const tx = await callWithGasPrice(predictionContract, 'completeOracleVoting')
      setIsTxPending(true)
      const receipt = await tx.wait()
      handle()
    } catch {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setIsTxPending(false)
    }
  }

  const { t } = useTranslation()

  const TooltipComponent = () => (
    <>
      <Text mb="16px">{t('The community can complete the voting')}</Text>
      <Text mb="16px">
        {t(
          'Although our backend scripts are running the voting completion scripts, the system is not dependent on centralized backend. Community can run the contracts publicly available function from here and receive Raffle tickets as a reward.',
        )}
      </Text>
    </>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column" height="100%">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Complete Oracle Voting')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex flexDirection="column" justify-content="space-evenly" align-items="flex-end" mr="12px">
            <Heading>{t('Voting is complete! Execute and receive tickets!')}</Heading>
            <Button my="24px" onClick={handleCompleteVoting} scale="sm" id="clickClaimVaultBounty">
              {t('Complete Voting')}
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
