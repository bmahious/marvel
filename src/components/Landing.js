import React, {useRef, useEffect, useState, Fragment} from 'react'

const Landing = () => {

const [btn, setBtn] = useState(false)

useEffect(() => {
  refWolverine.current.classList.add('startingImg')

  setTimeout(() =>{
    refWolverine.current.classList.remove('startingImg')
    setBtn(true)
  }, 2000)
}, [])

const DisplayBtn = btn && (
  <Fragment>
          <div className='leftBox'>
            <button className='btn-welcome'> Inscription</button>
          </div>
          <div className='rightBox'>
            <button className='btn-welcome'> Connexion</button>
          </div>
  </Fragment>
)

const refWolverine = useRef(null)
console.log(refWolverine)

  return (
    <main ref={refWolverine} className='welcomePage'>
      {  DisplayBtn  }
    </main>
  )
}

export default Landing