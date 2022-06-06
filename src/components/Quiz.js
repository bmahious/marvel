import React, { Component } from 'react'
import { QuizMarvel } from './QuizMarvel'
import Levels from './Levels'
import ProgressBar from './ProgressBar'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import QuizOver from './QuizOver'

toast.configure();

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
    userAnswer : null,
    score : 0,
    showWelcomMsg : false,
    quizEnd : false
  }

     
  storedDataRef = React.createRef();

  
  //  *** LIFE CYCLE METHODS ***

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
    if (this.state.idQuestion !== prevState.idQuestion) {
      
        this.setState({
           question : this.state.storedQuestions[this.state.idQuestion].question,
           options : this.state.storedQuestions[this.state.idQuestion].options,
           userAnswer : null,
           disabled : true
        })
    } 
    if (this.props.userData.pseudo) {
      this.showPseudo(this.props.userData.pseudo)
    }
  } 

  //  *** END OF LIFE CYCLE METHODS ***

 // ***      METHODS    ***

  loadQuestions = level => {


    const fetchedArray = QuizMarvel[0].quizz[level] 

    if (fetchedArray.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArray
      const newArray = fetchedArray.map(({answer, ...keepRest}) => keepRest )
      this.setState({
        storedQuestions : newArray
      })
    } else {
      console.log('pas assez de data')
    }
    
  }

  showPseudo = pseudo => {
    if (!this.state.showWelcomMsg) {
      this.setState({
        showWelcomMsg : true
      })
          toast.warn(`Bienvenue ${pseudo} 🙋🏻`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } 
    
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions -1) {
       this.gameOver();
    } else {
      this.setState( prevState => ({
          idQuestion : prevState.idQuestion + 1
      }))
    }
    // SCORE 
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
        this.setState(prevState => ({
           score : prevState.score + 1
        }))
        toast.success('Great good answer ! 👍🏻', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    } else {
      toast.error('Mauvaise réponse ! 👎🏻', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  submitAnswer = selectedAnswer => {
      this.setState({
        userAnswer : selectedAnswer,
        disabled : false
      })
  }

  gameOver = () =>{
    this.setState({
      quizEnd : true
    })
  }

  // ***    END  OF  METHODS    ***


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

    return this.state.quizEnd ? (
      < QuizOver />
    ) : (
       <div>
            < Levels />
            < ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions} />
            <h2> {this.state.question}  </h2>
              {displayOptions}
              
            <button 
              disabled={this.state.disabled} 
              onClick={this.nextQuestion}
              className='btnSubmit'>
               {this.state.idQuestion < this.state.maxQuestions -1 ? 'Suivant' : 'Terminer'}    
            </button>
        </div>
    )
  
  }
}

export default Quiz




    // const {levelNames, quizLevel, mawQuestions, storedQuestions, question, 
  //         options, idQuestion, disabled, userAnswer, score    } = this.state