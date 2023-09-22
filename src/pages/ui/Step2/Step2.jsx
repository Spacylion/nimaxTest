import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveFormData } from "@/redux/actions/formActions"
import { Step2Form } from "@/widgets"

const Step2 = ({ onNextStep, onPrevStep }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData || {}) // Initialize with an empty object if undefined
  const [errors, setErrors] = useState({})

  const handleNextStep = () => {
    // Perform validation here and update the 'errors' state
    const validationErrors = {}

    if (!formData.lastName?.trim()) {
      validationErrors.lastName = "Введите фамилию"
    }

    if (!formData.firstName?.trim()) {
      validationErrors.firstName = "Введите имя"
    }

    if (
      !/^\+7\s\d{3}\s\d{3}-\d{4}$/.test(formData.phoneNumber) ||
      formData.phoneNumber.length !== 15
    ) {
      validationErrors.phoneNumber = "Введите корректный номер телефона"
    }

    if (!formData.birthDate) {
      validationErrors.birthDate = "Введите дату рождения"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      onNextStep()
    }
  }

  const handlePrevStep = () => {
    onPrevStep()
  }

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    dispatch(saveFormData(updatedFormData))
  }

  useEffect(() => {
    // You can load the initial form data from Redux here if needed
    // const initialFormData = { ... };
    // dispatch(saveFormData(initialFormData));
  }, [dispatch])

  useEffect(() => {
    // You can save the form data to Redux here if needed
    // dispatch(saveFormData(formData));
  }, [formData])

  return (
    <div>
      <Step2Form
        formData={formData}
        onFormChange={handleFormChange}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        errors={errors} // Pass the 'errors' state to Step2Form
      />
    </div>
  )
}

Step2.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
}

export default Step2
