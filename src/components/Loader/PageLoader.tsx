import React from 'react'
// import Lottie from 'react-lottie'
import styled from 'styled-components'
import Page from '../Layout/Page'
import animationData from './testanim.json'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

// <Lottie options={defaultOptions} height={400} width={400} />

const PageLoader: React.FC = () => {
  return <Wrapper>loading...</Wrapper>
}

export default PageLoader
