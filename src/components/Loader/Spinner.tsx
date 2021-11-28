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

export const PageSpinner: React.FC = () => {
  return <Lottie options={defaultOptions} height={400} width={400} />
}

export const SmallSpinner: React.FC = () => {
  return <Lottie options={defaultOptions} height={100} width={100} />
}
