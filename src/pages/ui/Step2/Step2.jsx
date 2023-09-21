import PropTypes from "prop-types"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveStep2FormData } from "@/redux/store/actions/actions"
import { Step2Form } from "@/widgets"

const Step2 = ({ onNextStep, onPrevStep }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.step2.formData)

  const handleNextStep = () => {
    onNextStep()
  }

  const handlePrevStep = () => {
    onPrevStep()
  }

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    dispatch(saveStep2FormData(updatedFormData))

    localStorage.setItem("step2FormData", JSON.stringify(updatedFormData))
  }

  useEffect(() => {
    const saveFormDataToLocalStorage = (formData) => {
      localStorage.setItem("step2FormData", JSON.stringify(formData))
    }

    const loadFormDataFromLocalStorage = () => {
      const savedFormData = localStorage.getItem("step2FormData") || "{}"
      const parsedData = JSON.parse(savedFormData)
      return parsedData
    }
    const formDataFromLocalStorage = loadFormDataFromLocalStorage()

    dispatch(saveStep2FormData(formDataFromLocalStorage))

    saveFormDataToLocalStorage(formDataFromLocalStorage)
  }, [dispatch])

  return (
    <div>
      <Step2Form
        formData={formData}
        onFormChange={(fieldName, value) => handleFormChange(fieldName, value)}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
      />
    </div>
  )
}

Step2.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
}

export default Step2
