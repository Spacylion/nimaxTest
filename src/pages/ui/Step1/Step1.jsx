import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { saveStep1FormData } from "@/redux/store/actions/actions"
import { DATA, loadFormData } from "@/services/localStorageService"
import { Step1Form } from "@/widgets"

const Step1 = ({ onNextStep }) => {
  const [formData, setFormData] = useState({
    adults: "",
    child: "",
    baby: "",
    roomType: "",
    nights: "",
    insurance: false,
    total: "0 ₽",
  })

  const dispatch = useDispatch()
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])

  const handleFormChange = useCallback((fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }))
  }, [])

  useEffect(() => {
    const savedFormData = loadFormData()
    if (savedFormData && savedFormData.step1) {
      setFormData(savedFormData.step1)
    }
  }, [])

  const handleNextStep = useCallback(() => {
    dispatch(saveStep1FormData(formData))
    localStorage.setItem(DATA, JSON.stringify(formData))

    onNextStep()
  }, [dispatch, formData, onNextStep])

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
