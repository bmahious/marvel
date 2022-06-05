import React, {useRef, useEffect, useState, Fragment} from 'react'
import {Link} from 'react-router-dom' 

const Landing = () => {

const [btn, setBtn] = useState(false)

useEffect(() => {
  refWolverine.current.classList.add('startingImg')

  setTimeout(() =>{
    refWolverine.current.classList.remove('startingImg')
    setBtn(true)
  }, 1000)
}, [])

const hundleMouseLeft = () => {
  refWolverine.current.classList.add('leftImg')
}
const hundleMouseOutLeft = () => {
  refWolverine.current.classList.remove('leftImg')
}
const hundleMouseRight = () => {
  refWolverine.current.classList.add('rightImg')
}
const hundleMouseOutRight = () => {
  refWolverine.current.classList.remove('rightImg')
}

const DisplayBtn = btn && (
  <Fragment>
          <div className='leftBox'>
            <Link onMouseOver={hundleMouseLeft} onMouseOut={hundleMouseOutLeft} className='btn-welcome' to='/signup'> Inscription</Link>
          </div>
          <div className='rightBox'>
            <Link onMouseOver={hundleMouseRight} onMouseOut={hundleMouseOutRight} className='btn-welcome' to='/login'> Connexion</Link>
          </div>
  </Fragment>
)

const refWolverine = useRef(null)

  return (
    <main ref={refWolverine} className='welcomePage'>
      {  DisplayBtn  }
    </main>
  )
}

export default Landing