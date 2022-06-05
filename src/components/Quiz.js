import React, { Component } from 'react'
import { QuizMarvel } from './QuizMarvel'
import Levels from './Levels'
import ProgressBar from './ProgressBar'

class Quiz extends Component {


  state = {
    levelNames : ['debutant', 'confirme', 'expert'],
    quizLevel : 0,
    maxQuestions : 10,
    storedQuestions : [],
    question : null,
    options : [],
    idQuestion : 0,
    disabled : true,
    userAnswer : null
  }
   
  loadQuestions = level => {
    // const {levelNames, quizLevel, mawQuestions, storedQuestions, question, options} = this.state

    const fetchedArray = QuizMarvel[0].quizz[level] 

    if (fetchedArray.length >= this.state.maxQuestions) {
      const newArray = fetchedArray.map(({answer, ...keepRest}) => keepRest )
      this.setState({
        storedQuestions : newArray
      })
    } else {
      console.log('pas assez de data')
    }
    
  }

  componentDidMount() { 
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
   
   }
  componentDidUpdate(prevProps, prevState) { 
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      
    
      this.setState({
        question : this.state.storedQuestions[this.state.idQuestion].question,
        options : this.state.storedQuestions[this.state.idQuestion].options
      })
    }
  } 
  submitAnswer = selectedAnswer => {
      this.setState({
        userAnswer : selectedAnswer,
        disabled : false
      })
  }
  render() {

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p 
            key={index} 
            onClick={() => this.submitAnswer(option)} 
            className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}> 
            {option} 
        </p>
      )
    })

    const {pseudo} = this.props.userData
    return (
      <div>
         < Levels />
         < ProgressBar />
         <h2> {this.state.question} </h2>
           {displayOptions}
         <button disabled={this.state.disabled} className='btnSubmit'> Suivant </button>
      </div>
    )
  }
}

export default Quiz