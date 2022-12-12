import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
  <div className='min-h-screen pt-10 lg:pt-0'>
    <ContentLoader className='md:w-[50%]'
    // width={450}
    // height={400}
    viewBox="0 0 450 400"
    backgroundColor="black"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
    <ContentLoader className='md:w-[30%]'
    // width={450}
    // height={400}
    viewBox="0 0 450 400"
    backgroundColor="black"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
  </div>
)

Skeleton.metadata = {
  name: 'pavel.genuine', // My name
  github: 'pavel.genuine', // Github username
  description: 'A simple favorite from the DoorDash local favorites.', // Little tagline
  filename: 'pavel.genuineDoorDashFavorite', // filename of your loader
}

export default Skeleton