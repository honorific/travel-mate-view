import {Container, Step, StepButton, Stepper} from '@mui/material'
import React from 'react'
import {useState} from 'react'

const AddRoom = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    {label: 'Location', completed: false},
    {label: 'Details', completed: false},
    {label: 'images', completed: false},
  ])
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
    </Container>
  )
}

export default AddRoom
