import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  #prediction-history-button{
    background: rgb(25 43 75 / 70%);
    display: block;
    margin-left: 8px;
    box-shadow: 0px 8px 2px rgb(0 0 0 / 4%);
    border-radius: 10px;
    width: 80px;
    height: 80px;
    text-align: center;
    padding-top: 5px;
  }
`

export default GlobalStyle
