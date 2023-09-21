import PropTypes from "prop-types"
import { Step3Form } from "@/widgets"

const Step3 = ({ onPrevStep, onPayment, formData }) => {
  return (
    <Step3Form
      formData={formData}
      onPrevStep={onPrevStep}
      onPayment={onPayment}
    />
  )
}

Step3.propTypes = {
  onPrevStep: PropTypes.func.isRequired,
  onPayment: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
}

export default Step3
