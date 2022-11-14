import React from 'react'

const SingleCategory = ({movie, detectClicked}) => {

   const handleClicked =()=>{
    detectClicked(movie)
   }

  return (
<div>
<img title={movie?.name} onClick={handleClicked} className="cursor-pointer h-36 w-60 mx-2 border-dashed border-2 border-white" src={movie?.img} alt="" />

</div>  )
}

export default SingleCategory