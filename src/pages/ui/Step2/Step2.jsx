import PropTypes from "prop-types"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveFormData } from "@/redux/actions/formActions"
import { Step2Form } from "@/widgets"

const Step2 = ({ onNextStep, onPrevStep }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData || {})
  const [errors, setErrors] = useState({})

  const handlePrevStep = () => {
    onPrevStep()
  }

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    dispatch(saveFormData(updatedFormData))
  }

  return (
    <div>
      <Step2Form
        formData={formData}
        onFormChange={handleFormChange}
        onNextStep={onNextStep}
        onPrevStep={handlePrevStep}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  )
}

Step2.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
}

export default Step2
