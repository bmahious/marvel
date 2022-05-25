import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './Firebase/Firebase'
import {useNavigate} from 'react-router-dom'

const ForgetPassword = () => {

const navigate = useNavigate()

const [email, setEmail] = useState('')
const [error, setError] = useState(null)
const [success, setSuccess] = useState(null)

const hundleSubmitForget = e => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
    .then (() => {
        setSuccess(`nous avons envoyé un mail à ${email}`)
        setEmail('')
        setError(null)
        setTimeout(() => {
            navigate('/login')
        }, 10000)
    }).catch(error =>{
        setError(error)
    })
}
const hundleEmail = e => {
 setEmail(e.target.value)
}
 const disabled = email === ''

  return (
   
        <div className='signUploginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftForget'></div>
            <div className='formBoxRight'>
              <div className='formContent'>
                    { success && <span className='span_success'> {success} </span> }
                    { error && <span> {error.message} </span> }
                  <h2>Mot de passe oublié</h2>
                      <form onSubmit={hundleSubmitForget}>
                        <div className='inputBox'>
                          <input onChange={hundleEmail} value={email} type='email' id="email" required/>
                          <label htmlFor='email'>Email</label>
                        </div>
                        <button disabled={disabled} >Récupérez votre mot de passe</button>
                      </form>
                      <div className="linkContainer">
                        <Link className="simpleLink" to="/signup">
                          Dèja inscrit ? connectez-vous
                        </Link>
                      </div>
              </div>
            </div>
        </div>
    </div>
   
  )
}

export default ForgetPassword