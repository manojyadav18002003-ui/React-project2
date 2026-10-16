import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card.jsx'

const App = () => {

  const [userData, setUserData] = useState([]);

  const [index, setIndex] = useState(1)

  const getData = async ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    setUserData(response.data)
  }

  useEffect(function (){
    getData()
  }, [index])

  let printUserData = <h3 className='text-gray-400 text-xs absolute top-1/2 right-1/2 font-semibold translate-x-1/2 translate-y-1/2'>Loading...</h3>

  if(userData.length>0){
    printUserData = userData.map(function(elem){
      return <div >
        <Card elem={elem}/>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>  
      <h1 className='fixed bg-red-500  text-6xl'>{index}</h1>
      <div className='flex h-[82%] flex-wrap gap-4 p-2'>
        {printUserData}
      </div>

      <div className='flex justify-center items-center p-2 gap-6'>
        <button onClick={()=>{
          if(index>1){
            setIndex(index-1)
            setUserData([])
          }
        }} 
        className='bg-amber-400 text-black rounded px-4 py-2 text-semibold text-sm cursor-pointer'>
          Prev
          </button>
          <h1>Page {index}</h1>
        <button onClick={()=>{
          setUserData([])
          setIndex(index+1)
        }}
        className='bg-amber-400 text-black rounded px-4 py-2 text-bold text-sm cursor-pointer'>Next</button>
      </div>
    </div>
  )
}

export default App
