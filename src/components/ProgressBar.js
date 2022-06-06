import React from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {

  const actualQuestion = idQuestion + 1
  
  const getWidth = (totalQuestions, questionId) => {
    return ((100 * questionId ) / totalQuestions )
  }
  const getPercent = getWidth(maxQuestions, actualQuestion)
  
  console.log(getPercent)
  return (
    <>
    
    <div className='percentage'>
        <div className='progressPercent'>   {`Question ${actualQuestion} / ${maxQuestions}`}</div>
         <div className='progressPercent'> {`Progression ${getPercent} %`}</div> 
    </div>
    <div className='progressBar '>
        <div className='progressBarChange' style={{width: `${getPercent}%` }}></div>
    </div>
    </>
  )
}

export default React.memo(ProgressBar)