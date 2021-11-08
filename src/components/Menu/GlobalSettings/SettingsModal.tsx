import React from 'react'
import styled from 'styled-components'
import { Text, PancakeToggle, Flex, Modal, InjectedModalProps, ThemeSwitcher } from '@pancakeswap/uikit'
import { useAudioModeManager } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import GasSettings from './GasSettings'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  return (
    <Modal
      title={t('Settings')}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: '420px' }}
    >
      <ScrollableContainer>
        <Flex pb="24px" flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
            {t('Global')}
          </Text>
          <Flex justifyContent="space-between">
            <Text mb="24px">{t('Dark mode')}</Text>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          </Flex>
          <GasSettings />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text>{t('Flippy sounds')}</Text>
            <QuestionHelper
              text={t('Fun sounds to make a truly immersive pancake-flipping trading experience')}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <PancakeToggle checked={audioPlay} onChange={toggleSetAudioMode} scale="md" />
        </Flex>
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
