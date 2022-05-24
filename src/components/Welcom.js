import React, {useState, Fragment, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './Firebase/Firebase'
import { useNavigate} from 'react-router-dom'
import Logout from './Logout'
import Quiz from './Quiz'



const Welcom = () => {

  const navigate = useNavigate()
  const [userSession, setUserSession] = useState(null)

  
  useEffect(() => {
    // let listener = auth.onAuthStateChanged( user => ... same thing...
    let listener = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    }) 
    return () => {
      listener()
    }
  }, [navigate])

  return userSession === null ? (
      <Fragment>
          <div className='loader'></div>
          <p>loading</p>
      </Fragment>
  ) : (
      <div className='quiz-bg'>
          <div className='container'>
                <Logout />
                <Quiz />
          </div>
      </div>
  )
}

export default Welcom





              