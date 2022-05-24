import React, {useState, useEffect} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()

   const [checked, setChecked] = useState(false) 
   useEffect(() => {
        if(checked) {
            console.log('déconnexion')
            signOut(auth)
            .then(() =>{
                setTimeout(() =>{
                    navigate('/') 
                }, 1000)
            })
        }
   }, [checked, navigate])

   const handleChange = event => {
       setChecked(event.target.checked)
    //    if (event.target.checked) {
    //     setChecked(true)
    //    }else{
        //         setChecked(true)
        //   }
   }


  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input onChange={handleChange} type="checkbox" checked={checked} /> 
            <span className='slider round'></span>
        </label>
    </div>
  )
}

export default Logout