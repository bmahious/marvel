import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, user } from './Firebase/Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { setDoc } from 'firebase/firestore'




const SignUp = (props) => {

const data = {
  pseudo: '',
  email: '',
  password: '',
  confirmPassword :''
}

const [loginData, setLoginData] =  useState(data) 
const [error, setError] =  useState('')

const hundleChange = e => {
  setLoginData({...loginData, [e.target.id] : e.target.value})
} 
const navigate = useNavigate();

const hundleSubmit = e => {
  e.preventDefault();
  const {email, password, pseudo} = loginData 
   createUserWithEmailAndPassword(auth, email, password)
   .then(userAuthenticated => {
     return setDoc(user(userAuthenticated.user.uid), {
       pseudo,
       email
     })
   })
  .then(() => {
    setLoginData({...data})
    navigate('/welcom')
    .catch(error => {
      setError(error)
      setLoginData({...data})
    })
  })
}



// GESTION D'ERRUERS
const errorMsg = error !== '' && <span> {error.message} </span>
// WE CAN MAKE DISTRUCTURING FOR THE VALUE 
const {pseudo, email, password, confirmPassword} = loginData

const btn = pseudo === '' || email === '' ||  password === '' ||  password !== confirmPassword 
? <button disabled> Inscription</button> : <button > Inscription</button> 

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
             <div className='formBoxLeftSignup'>
             </div>
             <div className='formBoxRight'>
                  <div className='formContent'>
                     <h2>INscription</h2>
                     {errorMsg}
                      <form onSubmit={hundleSubmit}>
                          <div className='inputBox'>
                              <input onChange={hundleChange} value={loginData.pseudo} type='text' id="pseudo" required/>
                              <label htmlFor='pseudo'>Pseudo</label>
                          </div>
                          <div className='inputBox'>
                              <input onChange={hundleChange} value={loginData.email}  type='email' id="email" required/>
                              <label htmlFor='email'>Email</label>
                          </div>
                          <div className='inputBox'>
                              <input onChange={hundleChange} value={loginData.password}  type='password' id="password" required/>
                              <label htmlFor='password'>Mot de passe</label>
                          </div>
                          <div className='inputBox'>
                              <input onChange={hundleChange} value={loginData.confirmPassword}  type='password' id="confirmPassword" required/>
                              <label htmlFor='password'>Confirmer le mot de passe</label>
                          </div>
                          { btn }
                      </form>
                      <div className="linkContainer">
                        <Link className="simpleLink" to="/login"> Déja inscrit ? Connectez-vous </Link>
                      </div>
                  </div>
             </div>
        </div>
    </div>
  )
}

export default SignUp