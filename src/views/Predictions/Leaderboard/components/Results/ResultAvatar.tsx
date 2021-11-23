import React from 'react'
import { Box, Flex, FlexProps, Link, SubMenu, SubMenuItem, useModal, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import {PredictionPlayer, PredictionUser} from 'state/types'
import { useTranslation } from 'contexts/Localization'
import WalletStatsModal from '../WalletStatsModal'
import TextEllipsis from "../../../Vote/components/TextEllipsis";

interface ResultAvatarProps extends FlexProps {
  user: PredictionPlayer
}

const AvatarWrapper = styled(Box)`
  order: 2;
  margin-left: 8px;

  ${({ theme }) => theme.mediaQueries.lg} {
    order: 1;
    margin-left: 0;
    margin-right: 4px;
  }
`

const UsernameWrapper = styled(Box)`
  order: 1;

  ${({ theme }) => theme.mediaQueries.lg} {
    order: 2;
  }
`

const ResultAvatar: React.FC<ResultAvatarProps> = ({ user, ...props }) => {
  const { t } = useTranslation()
  const [onPresentWalletStatsModal] = useModal(<WalletStatsModal account={user.objectId} />)

  return (
    <SubMenu
      component={
        <Flex alignItems="center" {...props}>
          <UsernameWrapper
            width={['240px', null, null, null, null, '40px']}
            height={['32px', null, null, null, null, '26px']}
          >
            <TextEllipsis width='220px' title={user.objectId}>${user.objectId}</TextEllipsis>
          </UsernameWrapper>
        </Flex>
      }
      options={{ placement: 'bottom-start' }}
    >
      <SubMenuItem onClick={onPresentWalletStatsModal}>{t('View Stats')}</SubMenuItem>
      <SubMenuItem as={Link} href={getBscScanLink(user.objectId, 'address')} bold={false} color="text" external>
        {t('View on BscScan')}
      </SubMenuItem>
    </SubMenu>
  )
}

export default ResultAvatar
