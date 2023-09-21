import { useState, useEffect } from "react" // Import React
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { saveStep1FormData } from "@/redux/store/actions/actions" // Assuming this import is correct

// Import LOCAL_STORAGE_KEY from the correct path
import { LOCAL_STORAGE_KEY, loadFormData } from "@/services/localStorageService"

// Import Step1Form from the correct path
import { Step1Form } from "@/widgets"

const Step1 = ({ onNextStep }) => {
  const formData = useSelector((state) => state.step1.formData)
  const dispatch = useDispatch()
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    dispatch(saveStep1FormData(updatedFormData))

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData))
  }

  useEffect(() => {
    const savedFormData = loadFormData()
    if (savedFormData) {
      dispatch(saveStep1FormData(savedFormData))
    }
  }, [dispatch])

  const handleNextStep = () => {
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
