import React from 'react'

const Levels = ({levelNames, quizLevel}) => {
  return (
    <div className='levelsContainer'>
        <h2 className='headingLevels'> {levelNames[quizLevel]} </h2>
    </div>
  )
}

export default Levels