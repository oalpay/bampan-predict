import React from 'react'
import Lottie from 'react-lottie'
import animationData from './testanim.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const PageLoader: React.FC = () => {
  return <Lottie options={defaultOptions} height={400} width={400} />
}

export default PageLoader
