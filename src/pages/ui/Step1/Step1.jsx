import { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { saveFormData } from "@/redux/actions/formActions"
import {
  loadFormData,
  saveFormData as saveLocalStorageFormData,
} from "@/services/localStorageService"
import { Step1Form } from "@/widgets"

const Step1 = ({ onNextStep }) => {
  const dispatch = useDispatch()
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])
  const formDataRedux = useSelector((state) => state.formData)

  useEffect(() => {
    const savedFormData = loadFormData("formData") // Change the key to "formData"
    if (savedFormData) {
      dispatch(saveFormData(savedFormData))
    }
  }, [dispatch])

  const [formData, setFormData] = useState(formDataRedux)
  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    setFormData(updatedFormData)
    saveFormData("formData", updatedFormData) // Change the key to "formData"
    saveLocalStorageFormData("formData", updatedFormData) // Change the key to "formData" for local storage
  }

  const handleNextStep = useCallback(() => {
    onNextStep()
  }, [onNextStep])

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
