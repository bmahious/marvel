import React, {Fragment, useEffect, useState} from 'react'
import {GiTrophyCup} from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const QuizOver = React.forwardRef(({maxQuestions, score, levelNames, quizLevel, goNextLevel, percent}, ref) => {


  const [asked, setAsked] = useState([])

const percentage = 100 / (maxQuestions / score)
// also (maxQuestions / score) * 100
//console.log(percentage)



  useEffect(() => {
      setAsked(ref.current)
  }, [ref])

 const average = maxQuestions/2

 if (score  < average) {
     setTimeout(() => {
        goNextLevel(quizLevel)
     }, 3000)
 } 

 console.log(percent)
 const showBtnLevel = score >= average ? (
    <Fragment> 
      <div className='stepsBtnContainer'>
      {
        
        quizLevel < levelNames.length ? ( 
          <Fragment>
              <p className='successMsg'> Bravo ! passez au niveau suivant !</p>
              <button  
              onClick={() => goNextLevel(quizLevel)}
              className='BtnResult success'>
                 Niveau Suivant 
              </button>
          </Fragment>
        ) : (
          <Fragment>
              <p className='successMsg'> <GiTrophyCup size='25px'/>     Bravo ! vous êtes un expert</p>
              <button  
              onClick={() => goNextLevel(0)}
              className='BtnResult gameOver'>
                 Retour à l'accueil
              </button>
          </Fragment>
        )
        
      }
       </div>

          <div className='percentage'>
              <div className='progressPercent'> {`Réussite : ${percentage}%`} </div>
              <div className='progressPercent'> {`Note : ${score} / ${maxQuestions}`} </div>
          </div>

    </Fragment>
) : (
   
    <Fragment>
    
        <div className='stepsBtnContainer'>
              <p className='rred'> oups ! vous n'anez pas la moyenne !</p>
              <Link to='/welcom'> 
              <button className='BtnResult gameOver'> accueil </button>
          </Link>
        </div>
        <div className='percentage'>
              <div className='progressPercent'> {`Réussite : ${percentage}%`} </div>
              <div className='progressPercent'> {`Note : ${score} / ${maxQuestions}`} </div>
        </div>
    </Fragment>
      
    )

    const questionArray =   percentage >= 50 ? (
      asked.map(resp => {
  
        return(
          <tr key={resp.id}>
            <td >{resp.question}</td>
            <td >{resp.answer}  </td>
            <td><button className='btnInfo'>Info</button></td>
          </tr>
        )
      })
      
    ) : (
      <tr>
            <td colSpan='3'>
              <Loader />
            </td>
         
        </tr>
    )

  return (
    <Fragment>
        
          
          {showBtnLevel} 
   

        <hr />
        <p> Les réponses aux questions posées </p>
        <div className='answerContainer'>
          <table className='answers'>
            <thead>
              <tr>
                <th>Question</th>
                <th>Réponse</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {questionArray}
            </tbody>
          </table>
        </div>
    </Fragment>
  )
})



export default React.memo(QuizOver)