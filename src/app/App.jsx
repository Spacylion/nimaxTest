// App.js
import { useState } from "react"
import { Step1, Step2, Step3, Submit } from "../pages"

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState()

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFormChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value })
  }

  const handlePayment = () => {
    setCurrentStep(4)
  }

  const handleBookAgain = () => {
    setCurrentStep(1)
  }

  return (
    <>
      {currentStep === 1 && (
        <Step1
          onNextStep={handleNextStep}
          formData={formData}
          onFormChange={handleFormChange}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          formData={formData}
          onFormChange={handleFormChange}
        />
      )}
      {currentStep === 3 && (
        <Step3
          onPrevStep={handlePrevStep}
          onPayment={handlePayment}
          formData={formData}
        />
      )}
      {currentStep === 4 && <Submit onReset={handleBookAgain} />}
    </>
  )
}

export default App
