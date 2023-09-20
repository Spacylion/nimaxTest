import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Step1Form from "../widgets/Form/Step1Form"
import { useDispatch, useSelector } from "react-redux"
import { calculateTotalCost } from "../redux/reducers/step1Slice"
import { saveFormData, loadFormData } from "../services/localStorageService"

const Step1 = ({ onNextStep }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.step1.formData)
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])

  useEffect(() => {
    // Load form data from local storage
    const savedData = loadFormData()
    if (savedData) {
      dispatch(calculateTotalCost(savedData))
    }
  }, [dispatch])

  const handleFormChange = (fieldName, value) => {
    dispatch(calculateTotalCost({ ...formData, [fieldName]: value }))
  }

  const handleNextStep = () => {
    // Save form data to local storage
    saveFormData(formData)
    onNextStep()
  }

  return (
    <div>
      <Step1Form
        formData={formData}
        onFormChange={handleFormChange}
        onNextStep={handleNextStep}
        roomTypeOptions={roomTypeOptions}
      />
    </div>
  )
}

Step1.propTypes = {
  onNextStep: PropTypes.func.isRequired,
}

export default Step1
