import React, {useState, useEffect} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Firebase/Firebase'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btn, setBtn] = useState(false)
  const [error, setError] = useState('')



  useEffect(() => {
    if(email !== '' && password.length > 5) {
      setBtn(true)
    }else if(btn){
      setBtn(false)
    }
  }, [email, password, btn])



  const navigate = useNavigate()

  const hundleEmail = e => {
    setEmail(e.target.value)
  }
  const hundlePassword = e => {
    setPassword(e.target.value)
  }
  const hundleSubmitLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log(user)
      setEmail('')
      setPassword('')
      navigate('/welcom', {replace: true})
    })
    .catch(error=> {
      setError(error)
    })
   
  }

  return (
    <div className='signUploginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftLogin'></div>
            <div className='formBoxRight'>
              <div className='formContent'>

                {error !== '' &&  <span> {error.message} </span>}

                  <h2>Connexion</h2>
                      <form onSubmit={hundleSubmitLogin}>
                        <div className='inputBox'>
                          <input onChange={hundleEmail} value={email} type='email' id="email" required/>
                          <label htmlFor='email'>Email</label>
                        </div>
                        <div className='inputBox'>
                          <input onChange={hundlePassword} value={password} type='password' id="password" required/>
                          <label htmlFor='password'>Mot de passe</label>
                        </div>
                        { btn ?  <button>Connexion</button>  : <button disabled>Connexion</button> }
                        {/* WE CAN ALSO DISPLAY THE BUTTON WITH RHE FOLLOWING CONDITION */}
                        {/* {  <button disabled={btn ? false : true}>Connexion</button>   } */}
                      </form>
                      <div className="linkContainer">
                        <Link className="simpleLink" to="/signup">
                          Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant
                        </Link>
                        <br />
                        <Link className="simpleLink" to="/forgetpassword">
                          Mot de passe oublié ? Récupérez-le en cliquant ici 
                        </Link>
                      </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login