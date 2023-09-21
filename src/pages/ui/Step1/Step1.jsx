import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Step1Form } from "@/widgets"
import { useSelector, useDispatch } from "react-redux"
import { saveStep1FormData } from "@/redux/store/actions/actions"

const Step1 = ({ onNextStep }) => {
  const formData = useSelector((state) => state.step1.formData)
  const dispatch = useDispatch()
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    dispatch(saveStep1FormData(updatedFormData))

    localStorage.setItem("step1FormData", JSON.stringify(updatedFormData))
  }

  useEffect(() => {
    const savedFormData = localStorage.getItem("step1FormData") || "{}"
    const parsedData = JSON.parse(savedFormData)
    dispatch(saveStep1FormData(parsedData))
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
