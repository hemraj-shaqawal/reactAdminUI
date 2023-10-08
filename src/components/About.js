import React, { useContext } from 'react'
import userContext from '../Utils/UserContext'

function About() {
  const { user, setUser } = useContext(userContext);
  return (
    <>
        <div className=''>About</div>
        <div>{user.name}</div>
        <input type='text' onChange={(e) => setUser({
            ...user,
            name: e.target.value
        })}/>
    </>
  )
}

export default About