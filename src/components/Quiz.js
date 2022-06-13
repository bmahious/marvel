import React, { Component } from 'react'
import { QuizMarvel } from './QuizMarvel'
import Levels from './Levels'
import ProgressBar from './ProgressBar'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import QuizOver from './QuizOver'

toast.configure();

const initialState = {
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
  quizEnd : false,
  percent : 0
}

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
    this.storedDataRef = React.createRef();
  }



  
  //  *** LIFE CYCLE METHODS ***

  componentDidMount() { 
    const  { levelNames, quizLevel } = this.state
    this.loadQuestions(levelNames[quizLevel])
  }


  componentDidUpdate(prevProps, prevState) { 
    const  { storedQuestions, idQuestion } = this.state
    if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
   
      this.setState({
        question : storedQuestions[idQuestion].question,
        options : storedQuestions[idQuestion].options
      })
    }
    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      
        this.setState({
           question : storedQuestions[idQuestion].question,
           options : storedQuestions[idQuestion].options,
           userAnswer : null,
           disabled : true
        })
    } 
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showPseudo(this.props.userData.pseudo)
    }
  } 

  //  *** END OF LIFE CYCLE METHODS ***

 // ***      METHODS    ***

  loadQuestions = level => {
    const  {maxQuestions } = this.state
    
    const fetchedArray = QuizMarvel[0].quizz[level] 

    if (fetchedArray.length >= maxQuestions) {
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
    const  { showWelcomMsg } = this.state
    if (!showWelcomMsg) {
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
    const  { maxQuestions, idQuestion, userAnswer } = this.state
    if (idQuestion === maxQuestions -1) {
       this.gameOver();
    } else {
      this.setState( prevState => ({
          idQuestion : prevState.idQuestion + 1
      }))
    }
    // SCORE 
    const goodAnswer = this.storedDataRef.current[idQuestion].answer;
    if (userAnswer === goodAnswer) {
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

//getPercent = 100 / (this.state.maxQuestions / this.state.score );
// getPercent = ( this.state.score / this.state.maxQuestions) * 100;

//getPercent = (maxQuest, ourScore) => (maxQuest / ourScore) * 100;
getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

// this.getPercent




  gameOver = (prevState) =>{
    const  { quizLevel, maxQuestions, score} = this.state
    
  const gradePercent = this.getPercent(maxQuestions, score)
 
    
    if (gradePercent >= 50) {
      this.setState({
        quizEnd : true,
        quizLevel:  quizLevel +1,
        percent : gradePercent,
    
      })
    } else {
      this.setState({
        percent : gradePercent,
        quizEnd : true,
      })
    }
    console.log(gradePercent)
  }

  goNextLevel = param => {
    const  { levelNames } = this.state
      this.setState({ ...initialState, quizLevel : param})
      this.loadQuestions(levelNames[param])
  }

  // ***    END  OF  METHODS    ***


  render() {


    const  {
      levelNames,
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      disabled,
      userAnswer,
      score,
      quizEnd,
      percent
    } = this.state
    const displayOptions = options.map((option, index) => {

      return (
        <p 
            key={index} 
            onClick={() => this.submitAnswer(option)} 
            className={`answerOptions ${userAnswer === option ? 'selected' : null}`}> 
            {option} 
        </p>
      )
    })

    return quizEnd ? (
      < QuizOver 
        ref={this.storedDataRef} 
        score={score} 
        maxQuestions={maxQuestions} 
        levelNames={levelNames}
        quizLevel={quizLevel}
        goNextLevel={this.goNextLevel}
        percent={percent}
      />
    ) : (
       <div>
            < Levels 
            levelNames={levelNames} 
            quizLevel={quizLevel}
            />
            < ProgressBar 
              idQuestion={idQuestion} 
              maxQuestions={maxQuestions} 
            />
            <h2> {question}  </h2>
              {displayOptions}
              
            <button 
              disabled={disabled} 
              onClick={this.nextQuestion}
              className='btnSubmit'>
               {idQuestion < maxQuestions -1 ? 'Suivant' : 'Terminer'}    
            </button>
        </div>
    )
  
  }
}

export default Quiz




    // const {levelNames, quizLevel, mawQuestions, storedQuestions, question, 
  //         options, idQuestion, disabled, userAnswer, score    } = this.state