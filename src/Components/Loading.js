import React from 'react'
import { FiLoader } from 'react-icons/fi' 

export default function Loading() {
  return (
    <div  className='loading'>
        <FiLoader className='icon-loading'/>
        <div>Loading ...</div>
    </div>
  )
}
