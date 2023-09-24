/* eslint-disable no-case-declarations */
import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./Step2Form.module.scss"

const Step2Form = ({ formData, onNextStep, onPrevStep }) => {
  const [errors, setErrors] = useState({})

  const [localFormData, setLocalFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || formData
  )

  // Function to validate a field
  const validateField = (fieldName, fieldValue) => {
    const fieldErrors = {}

    switch (fieldName) {
      case "lastName":
        if (fieldValue.trim() === "") {
          fieldErrors.lastName = "Фамилия не может быть пустой."
        } else if (/^\d+$/.test(fieldValue)) {
          fieldErrors.lastName = "Фамилия не может содержать только цифры."
        }
        break
      case "firstName":
        if (fieldValue.trim() === "") {
          fieldErrors.firstName = "Имя не может быть пустым."
        } else if (/^\d+$/.test(fieldValue)) {
          fieldErrors.firstName = "Имя не может содержать только цифры."
        }
        break
      case "middleName":
        if (/^\d+$/.test(fieldValue)) {
          fieldErrors.middleName = "Отчество не может содержать только цифры."
        }
        break
      case "phoneNumber":
        if (!/^\d+$/.test(fieldValue)) {
          fieldErrors.phoneNumber =
            "Номер телефона должен содержать только цифры."
        }
        break
      case "birthDate":
        const birthDate = new Date(fieldValue)
        const minDate = new Date("1930-01-01")
        const maxDate = new Date("2005-01-01")
        if (
          isNaN(birthDate.getTime()) ||
          birthDate < minDate ||
          birthDate > maxDate
        ) {
          fieldErrors.birthDate = "Введите корректную дату рождения."
        }
        break
      default:
        break
    }
    return fieldErrors
  }

  // Function to handle form change
  const handleFormChange = (fieldName, value) => {
    const updatedValue =
      fieldName === "insurance" ? !localFormData.insurance : value
    const updatedFormData = {
      ...localFormData,
      [fieldName]:
        updatedValue !== undefined ? updatedValue : localFormData[fieldName],
    }
    setLocalFormData(updatedFormData)
    try {
      localStorage.setItem("formData", JSON.stringify(updatedFormData))
    } catch (error) {
      console.error("Error storing data in localStorage:", error)
    }

    // Clear the error for the field when it's changed
    const updatedErrors = { ...errors }
    delete updatedErrors[fieldName]
    setErrors(updatedErrors)
  }

  const handleBlur = (fieldName, value) => {
    const fieldErrors = validateField(fieldName, value)

    if (Object.keys(fieldErrors).length === 0) {
      const updatedErrors = { ...errors }
      delete updatedErrors[fieldName]
      setErrors(updatedErrors)
    } else {
      setErrors({ ...errors, ...fieldErrors })

      const inputElement = document.getElementById(`${fieldName}-input`)
      if (inputElement) {
        inputElement.classList.add("error")
        setTimeout(() => {
          inputElement.classList.remove("error")
        }, 3000)
      }
    }
  }

  const isButtonDisabled = () => {
    return (
      localFormData.lastName.trim() === "" ||
      localFormData.firstName.trim() === "" ||
      localFormData.phoneNumber.trim() === "" ||
      localFormData.birthDate === ""
    )
  }

  const handleNextStep = () => {
    if (isButtonDisabled()) {
      return
    }
    onNextStep()
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__main}>
        <div className={styles.page__info}>
          <div className={styles.page__info__title}>
            <h1 className={styles.title}>Бронирование номера</h1>
          </div>
          <div className={styles.page__info__subtitle}>
            <p className={styles.subtitle}>Данные покупателя</p>
          </div>
        </div>
        <div className={styles.page__main__step__wrapper}>
          <div className={styles.page__main__step__wrapper__form1}>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Фамилия</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors["lastName"] ? styles.error : ""
                    }`}
                    type='text'
                    placeholder='Иванов'
                    value={localFormData.lastName}
                    onBlur={() =>
                      handleBlur("lastName", localFormData.lastName)
                    }
                    onChange={(e) =>
                      handleFormChange("lastName", e.target.value)
                    }
                    id='lastName-input'
                  />
                  {errors["lastName"] && (
                    <div className={styles.error__box}>
                      {errors["lastName"]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Имя</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors["firstName"] ? styles.error : ""
                    }`}
                    type='text'
                    placeholder='Иван'
                    value={localFormData.firstName}
                    onBlur={() =>
                      handleBlur("firstName", localFormData.firstName)
                    }
                    onChange={(e) =>
                      handleFormChange("firstName", e.target.value)
                    }
                    id='firstName-input'
                  />
                  {errors["firstName"] && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
                    >
                      {errors["firstName"]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Отчество</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors["middleName"] ? styles.error : ""
                    }`}
                    type='text'
                    placeholder='Иванович'
                    value={localFormData.middleName}
                    onBlur={() =>
                      handleBlur("middleName", localFormData.middleName)
                    }
                    onChange={(e) =>
                      handleFormChange("middleName", e.target.value)
                    }
                    id='middleName-input'
                  />
                  {errors["middleName"] && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
                    >
                      {errors["middleName"]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Номер телефона</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors["phoneNumber"] ? styles.error : ""
                    }`}
                    type='tel'
                    placeholder='+7 999 123-4567'
                    value={localFormData.phoneNumber}
                    onBlur={() =>
                      handleBlur("phoneNumber", localFormData.phoneNumber)
                    }
                    onChange={(e) =>
                      handleFormChange("phoneNumber", e.target.value)
                    }
                    id='phoneNumber-input'
                  />
                  {errors["phoneNumber"] && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
                    >
                      {errors["phoneNumber"]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Дата рождения</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors["birthDate"] ? styles.error : ""
                    }`}
                    type='date'
                    min='1930-01-01'
                    max='2005-01-01'
                    value={localFormData.birthDate}
                    onBlur={() =>
                      handleBlur("birthDate", localFormData.birthDate)
                    }
                    onChange={(e) =>
                      handleFormChange("birthDate", e.target.value)
                    }
                    id='birthDate-input'
                  />
                  {errors["birthDate"] && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
                    >
                      {errors["birthDate"]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.page__main__step__wrapper__buttons} ${styles.mobile__btn}`}
          >
            <div className={styles.page__main__step__wrapper__button}>
              <button onClick={onPrevStep} className={styles.button__back}>
                Назад к расчету стоимости
              </button>
            </div>
            <div className={styles.page__main__step__wrapper__button}>
              <button
                onClick={handleNextStep}
                className={styles.button}
                disabled={isButtonDisabled()}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Step2Form.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
}

export default Step2Form
