import React, { useCallback, useMemo, useState } from 'react'
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../Utils/IsLoadingSlice';

function Home() {
  const dispatch = useDispatch();
  let isLoading = useSelector((store) => store.Loader.isLoading)
  
  const [number , setNumber] = useState(1)
  const [dark] = useState(true)
  // use Memo or Memoizarion of value
  const doubleNO = useMemo(()=> showFunc(number),[number]);
  const isTheme = {
    width:'100%',
    backgroundColor: dark?'black':'white',
    color: dark?'white':'black'
  }

  // useCallback or Memoizarion of function and it will call only when our number state change, 
  // it's link making logic in isolization so that performance of page will be increase.
  const items = useCallback(() => {
    return  [number, parseInt(number)+1, parseInt(number)+2]
  },[number]);
  
  return (
    <>
      <div className='container mx-auto'>
        <div>Home</div>    
        <input type='text' className='border bottom-3' value={number} onChange={(e) => setNumber(e.target.value)} />
        <div style={isTheme}>{doubleNO}</div>
        <button onClick={() => {
          dispatch(setIsLoading())
        }}>Click Me {`${isLoading}`} </button>
        <List getItems={items()}></List>

      </div>
    </>    
  )
}

export default Home

const showFunc = (num) => {
  for(let i =0;i< 1000000000;i++){}
  return 2*num
}