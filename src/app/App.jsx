import { useState } from "react"
import { Step1, Step2, Step3, Submit } from "../pages"
import { loadFormData, saveFormData } from "@/services/localStorageService"

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formDataStep1, setFormDataStep1] = useState(
    loadFormData("step1") || {}
  ) // Load step1 data
  const [formDataStep2, setFormDataStep2] = useState(
    loadFormData("step2") || {}
  ) // Load step2 data

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFormChangeStep1 = (fieldName, value) => {
    const updatedFormData = { ...formDataStep1, [fieldName]: value }
    setFormDataStep1(updatedFormData)
    saveFormData("step1", updatedFormData) // Save step1 data
  }

  const handleFormChangeStep2 = (fieldName, value) => {
    const updatedFormData = { ...formDataStep2, [fieldName]: value }
    setFormDataStep2(updatedFormData)
    saveFormData("step2", updatedFormData) // Save step2 data
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
          formData={formDataStep1}
          onFormChange={handleFormChangeStep1} // Use the appropriate handler
        />
      )}
      {currentStep === 2 && (
        <Step2
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          formData={formDataStep2}
          onFormChange={handleFormChangeStep2} // Use the appropriate handler
        />
      )}
      {currentStep === 3 && (
        <Step3
          onPrevStep={handlePrevStep}
          onPayment={handlePayment}
          formData={formDataStep1} // You can pass either formDataStep1 or formDataStep2 here as needed
        />
      )}
      {currentStep === 4 && <Submit onReset={handleBookAgain} />}
    </>
  )
}

export default App
