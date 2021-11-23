import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'

const TextEllipsis = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
`

export default TextEllipsis
