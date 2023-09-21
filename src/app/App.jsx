import { useState } from "react"
import { Step1, Step2, Step3, Submit } from "../pages"
import { DATA, loadFormData } from "@/services/localStorageService"

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(loadFormData() || {})

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    setFormData(updatedFormData)
    localStorage.setItem(DATA, JSON.stringify(updatedFormData))
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
