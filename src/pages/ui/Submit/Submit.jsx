import PropTypes from "prop-types"
import { SubmitForm } from "@/widgets"

const Submit = ({ onReset }) => {
  return <SubmitForm onReset={onReset} />
}

Submit.propTypes = {
  onReset: PropTypes.func.isRequired,
}

export default Submit
