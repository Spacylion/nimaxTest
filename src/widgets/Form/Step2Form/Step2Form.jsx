import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./Step2Form.module.scss"

const Step2Form = ({
  formData,
  onFormChange,
  onNextStep,
  onPrevStep,
  errors,
}) => {
  const [localFormData, setLocalFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || formData
  )

  const fieldErrors = {}

  const validateField = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "lastName":
        if (fieldValue.trim() === "")
          fieldErrors.lastName = "Фамилия не может быть пустой."
        else delete fieldErrors.lastName
        break
      default:
        break
    }
    return fieldErrors
  }

  const handleBlur = (fieldName, value) => {
    const fieldErrors = validateField(fieldName, value)
    const updatedFormData = { ...localFormData, ...fieldErrors }
    setLocalFormData(updatedFormData)
    onFormChange(updatedFormData)
  }

  const handleFormChange = (fieldName, value) => {
    const updatedFormData = { ...localFormData, [fieldName]: value }
    setLocalFormData(updatedFormData)
  }

  const handleNextStep = () => {
    const validationErrors = {}

    if (!localFormData.lastName?.trim())
      validationErrors.lastName = "Введите фамилию"

    if (Object.keys(validationErrors).length > 0)
      onFormChange({ ...localFormData, ...validationErrors })
    else onNextStep()
  }

  const handlePrevStep = () => {
    onPrevStep()
  }

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(localFormData))
  }, [localFormData])

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
                <input
                  className={`${styles.input} ${
                    errors["lastName"] ? styles.error : ""
                  }`}
                  type='text'
                  placeholder='Иванов'
                  value={localFormData.lastName}
                  onBlur={() => handleBlur("lastName", localFormData.lastName)}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                />
                {errors["lastName"] && (
                  <div className={`${styles.error__box} ${styles.customError}`}>
                    {errors["lastName"]}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Имя</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={`${styles.input} ${
                    errors["firstName"] ? styles.error : ""
                  }`}
                  type='text'
                  placeholder='Иван'
                  value={formData.firstName}
                  onChange={(e) => onFormChange("firstName", e.target.value)}
                />
                {errors["firstName"] && (
                  <div className={`${styles.error__box} ${styles.customError}`}>
                    {errors["firstName"]}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Отчество</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={`${styles.input} ${
                    errors["middleName"] ? styles.error : ""
                  }`}
                  type='text'
                  placeholder='Иванович'
                  value={formData.middleName}
                  onChange={(e) => onFormChange("middleName", e.target.value)}
                />
                {errors["middleName"] && (
                  <div className={`${styles.error__box} ${styles.customError}`}>
                    {errors["middleName"]}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Номер телефона</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={`${styles.input} ${
                    errors["phoneNumber"] ? styles.error : ""
                  }`}
                  type='tel'
                  placeholder='+7 999 123-4567'
                  value={formData.phoneNumber}
                  onChange={(e) => onFormChange("phoneNumber", e.target.value)}
                />
                {errors["phoneNumber"] && (
                  <div className={`${styles.error__box} ${styles.customError}`}>
                    {errors["phoneNumber"]}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Дата рождения</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={`${styles.input} ${
                    errors["birthDate"] ? styles.error : ""
                  }`}
                  type='date'
                  min='1930-01-01'
                  max='2005-01-01'
                  value={formData.birthDate}
                  onChange={(e) => onFormChange("birthDate", e.target.value)}
                />
                {errors["birthDate"] && (
                  <div className={`${styles.error__box} ${styles.customError}`}>
                    {errors["birthDate"]}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${styles.page__main__step__wrapper__buttons} ${styles.mobile__btn}`}
          >
            <div className={styles.page__main__step__wrapper__button}>
              <button onClick={handlePrevStep} className={styles.button__back}>
                Назад к расчету стоимости
              </button>
            </div>
            <div className={styles.page__main__step__wrapper__button}>
              <button onClick={handleNextStep} className={styles.button}>
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
}
export default Step2Form
