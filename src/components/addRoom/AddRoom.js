import {
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect} from 'react'
import {useState} from 'react'
import AddLocation from './addLocation/AddLocation'
import AddImages from './addImages/AddImages'
import AddDetails from './addDetailes/AddDetails'
import {useValue} from '../../context/ContextProvider'

const AddRoom = () => {
  const {
    state: {images, details},
  } = useValue()
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    {label: 'Location', completed: false},
    {label: 'Details', completed: false},
    {label: 'images', completed: false},
  ])

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false
    const index = findUnfinished()
    if (index !== -1) return false
    return true
  }

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed)
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1)
    } else {
      const stepIndex = findUnfinished()
      setActiveStep(stepIndex)
    }
  }

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      if (steps[2].completed) setComplete(2, false)
    }
  }, [images])

  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      if (steps[1].completed) setComplete(1, false)
    }
  }, [details])

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status
      return [...steps]
    })
  }

  return (
    <Container sx={{my: 4}}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{mb: 3}}>
        {steps.map((step, index) => {
          return (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          )
        })}
      </Stepper>
      <Box>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
      </Box>
      <Stack
        direction='row'
        sx={{pt: 2, pb: 7, justifyContent: 'space-around'}}
      >
        <Button
          color='inherit'
          disabled={!activeStep}
          onClick={() => setActiveStep((activeStep) => activeStep - 1)}
        >
          Back
        </Button>
        <Button color='inherit' disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Container>
  )
}

export default AddRoom
