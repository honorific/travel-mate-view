import {
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material'
import {Box} from '@mui/system'
import React from 'react'
import {useState} from 'react'
import AddLocation from './addLocation/AddLocation'
import addImages from './addImages/AddImages'
import addDetails from './addDetailes/addDetails'

const AddRoom = () => {
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
            1: <addDetails />,
            2: <addImages />,
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
