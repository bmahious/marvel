import React, {useState, Fragment, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth, user} from './Firebase/Firebase'
import { getDoc } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'
import Logout from './Logout'
import Quiz from './Quiz'



const Welcom = () => {

  const navigate = useNavigate()
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})

  
  useEffect(() => {
    // let listener = auth.onAuthStateChanged( user => ... same thing...
    let listener = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    }) 
    // condition si l'utilisateur est authentifié
    if (!!userSession) {
        // réference collection 
        const colRef = user(userSession.uid)
        getDoc(colRef)
        .then(doc => {
          if (doc.exists()) {
            const myData = doc.data()
            setUserData(myData)
            
          }
        } )
        
        .catch(error =>{
          console.log(error) 
        })
    }
    
    return () => {
      listener()
    }
  }, [navigate, userSession])

  return userSession === null ? (
      <Fragment>
          <div className='loader'></div>
          <p>loading</p>
      </Fragment>
  ) : (
      <div className='quiz-bg'>
          <div className='container'>
                <Logout />
                <Quiz userData={userData} />
          </div>
      </div>
  )
}

export default Welcom





              