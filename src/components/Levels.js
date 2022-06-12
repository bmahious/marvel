import React, {useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames, quizLevel}) => {

  const [getstep, setGetStep] = useState([])

  useEffect(() => {

    const gettingSteps = levelNames.map(step =>{
      return(
        {title: step.toUpperCase()}
      )
    })

 // En une seul ligne aussi : const gettingSteps = levelNames.map(step => ({title: step}))
    setGetStep(gettingSteps)

  }, [levelNames])

  console.log(getstep)

  



  return (
    <div className='levelsContainer' style={{ background : 'transparent'}}>
        {/* <h2 className='headingLevels'> {levelNames[quizLevel]} </h2> */}
        
          <Stepper 
             steps={ getstep } 
             activeStep={quizLevel} 
             cirletop={0}
             activeTitleColor= {'#d31017'}
             activeColor= {'#d31017'}
             completeTitleColor={'#E0E0E0'}
             defaultTitleColor={'#E0E0E0'}
             completeColor={'#E0E0E0'}
             completeBarColor={'#E0E0E0'}
             barStyle={'dashed'}
             size={45}
             circleFontSize={20}
          />
       
    </div>
  )
}

export default React.memo(Levels)


              