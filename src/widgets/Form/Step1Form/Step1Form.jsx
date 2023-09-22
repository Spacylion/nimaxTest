import { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import styles from "./Step1Form.module.scss"
import ToggleOn from "@/app/assets/images/ToggleOn.svg"
import ToggleOff from "@/app/assets/images/ToggleOff.svg"

const Step1Form = ({ formData, onFormChange, onNextStep, roomTypeOptions }) => {
  const [localFormData, setLocalFormData] = useState(formData)
  const [errors, setErrors] = useState({})
  const [errorMessages, setErrorMessages] = useState({})

  const calculateTotalPrice = ({
    adults,
    child,
    baby,
    roomType,
    nights,
    insurance,
  }) => {
    const roomTypePrices = {
      Эконом: 1800,
      Стандарт: 2800,
      Люкс: 4000,
    }

    const basePrice = roomTypePrices[roomType] || 0
    const totalPrice =
      (basePrice * nights +
        (child || 0) * (basePrice * 0.5) +
        (baby || 0) * basePrice) *
      (1 + insurance * 0.1) *
      adults

    return totalPrice.toFixed(0) + " ₽"
  }

  const validateField = (fieldName, formData) => {
    const fieldErrors = {}

    if (fieldName === "adults" && formData.adults < 1) {
      fieldErrors.adults = "Количество взрослых должно быть больше 0"
    }
    if (fieldName === "baby" && formData.baby < 0) {
      fieldErrors.baby = "Количество детей до 5 лет не может быть отрицательным"
    }
    if (fieldName === "child" && formData.child < 0) {
      fieldErrors.child =
        "Количество детей от 5 до 12 лет не может быть отрицательным"
    }
    if (fieldName === "nights" && formData.nights < 1) {
      fieldErrors.nights = "Количество ночей (числовое, мин.знач.: 1)"
    }
    if (fieldName === "nights" && formData.nights < 0) {
      fieldErrors.nights = "Количество ночей не может быть отрицательным"
    }

    return fieldErrors
  }

  const isNextStepBlocked =
    Object.keys(errors).length === 0 &&
    localFormData.adults > 0 &&
    (localFormData.child >= 0 || localFormData.child === "") &&
    (parseInt(localFormData.baby, 10) >= 0 || localFormData.baby === "") &&
    localFormData.nights >= 1 &&
    localFormData.roomType !== "" &&
    (localFormData.insurance === true ||
      localFormData.insurance === false ||
      localFormData.insurance === "true" ||
      localFormData.insurance === "false")

  const totalPrice = useMemo(
    () => calculateTotalPrice(localFormData),
    [localFormData]
  )

  useEffect(() => {
    onFormChange("total", totalPrice) // Update the total in the parent component
  }, [totalPrice, onFormChange])

  useEffect(() => {
    onFormChange("total", localFormData.total)
  }, [localFormData.total, onFormChange])

  useEffect(() => {
    const maxBabyValue = localFormData.adults * 3
    const babyInput = document.getElementById("baby-input")
    if (babyInput) {
      babyInput.max = maxBabyValue.toString()
    }
  }, [localFormData.adults])

  const handleFormChange = (fieldName, value) => {
    let updatedValue = value
    if (fieldName === "insurance") {
      updatedValue = !localFormData.insurance
    }
    setLocalFormData((prevLocalFormData) => ({
      ...prevLocalFormData,
      [fieldName]: updatedValue,
    }))
  }

  const handleBlur = (fieldName, value) => {
    const updatedFormData = {
      ...localFormData,
      [fieldName]: value,
    }

    try {
      localStorage.setItem("formData", JSON.stringify(updatedFormData))
    } catch (error) {
      // Handle the error
    }
  }

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData")
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setLocalFormData(parsedFormData)
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.page__main}>
        <div className={styles.page__info}>
          <div className={styles.page__info__title}>
            <h1 className={styles.title}>Бронирование номера</h1>
          </div>
          <div className={styles.page__info__subtitle}>
            <p className={styles.subtitle}>Расчет стоимости</p>
          </div>
        </div>
        <div className={styles.page__main__step__wrapper}>
          <div className={styles.page__main__step__wrapper__form1}>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Количество взрослых</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors.adults ? styles.error : ""
                    }`}
                    type='number'
                    placeholder='1'
                    value={localFormData.adults}
                    onChange={(e) => handleFormChange("adults", e.target.value)}
                    onBlur={() => handleBlur("adults", localFormData.adults)}
                    id='adults-input'
                  />
                  {errorMessages.adults && (
                    <div
                      className={`${styles.error__box} ${
                        errorMessages.adults ? "visible" : ""
                      }`}
                    >
                      {errorMessages.adults}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>
                  Количество детей от 5 до 12 лет
                </p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors.child ? styles.error : ""
                    }`}
                    type='number'
                    placeholder='0'
                    value={localFormData.child}
                    onChange={(e) => handleFormChange("child", e.target.value)}
                    onBlur={() => handleBlur("child", localFormData.child)}
                    id='child-input'
                  />
                  {errorMessages.child && (
                    <div
                      className={`${styles.error__box} ${
                        errorMessages.child ? "visible" : ""
                      }`}
                    >
                      {errorMessages.child}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>
                  Количество детей до 5 лет
                </p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.inputContainer}>
                  <input
                    className={`${styles.input} ${
                      errors.baby ? styles.error : ""
                    }`}
                    type='number'
                    placeholder='0'
                    value={localFormData.baby}
                    onChange={(e) => handleFormChange("baby", e.target.value)}
                    onBlur={() => handleBlur("baby", localFormData.baby)}
                    id='baby-input'
                    max={localFormData.adults * 3}
                  />
                  {errorMessages.baby && (
                    <div
                      className={`${styles.error__box} ${
                        errorMessages.baby ? "visible" : ""
                      }`}
                    >
                      {errorMessages.baby}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Тип номера</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                {window.innerWidth <= 320 ? (
                  <select
                    value={localFormData.roomType}
                    onChange={(e) =>
                      handleFormChange("roomType", e.target.value)
                    }
                    onBlur={() =>
                      handleBlur("roomType", localFormData.roomType)
                    }
                    className={`${styles.input} ${styles.select}`}
                  >
                    {roomTypeOptions.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    {roomTypeOptions.map((option, optionIndex) => (
                      <label key={optionIndex} className={styles.radioLabel}>
                        <input
                          type='radio'
                          value={option}
                          checked={localFormData.roomType === option}
                          onChange={(e) =>
                            handleFormChange("roomType", e.target.value)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </>
                )}
              </div>
            </div>
            {[
              {
                label: "Количество ночей",
                name: "nights",
                errorMessage: "Количество ночей (числовое, мин.знач.: 1)",
                placeholder: "0",
              },
              {
                label: "Страховка",
                name: "insurance",
                render: () => (
                  <>
                    {window.innerWidth <= 320 ? (
                      <>
                        <img
                          src={localFormData.insurance ? ToggleOn : ToggleOff}
                          alt='Toggle'
                          onClick={() =>
                            handleFormChange(
                              "insurance",
                              !localFormData.insurance
                            )
                          }
                          className={styles.toggleIcon}
                        />
                        <span className={styles.page__form__text}>
                          Страховка
                        </span>
                      </>
                    ) : (
                      <input
                        type='checkbox'
                        className={styles.checkbox}
                        checked={localFormData.insurance}
                        onChange={() =>
                          handleFormChange(
                            "insurance",
                            !localFormData.insurance
                          )
                        }
                      />
                    )}
                  </>
                ),
              },
            ].map((field) => (
              <div className={styles.page__form__row} key={field.name}>
                <div className={styles.page__form__row__child__1}>
                  <p className={styles.page__form__text}>{field.label}</p>
                </div>
                <div className={styles.page__form__row__child__2}>
                  {field.render ? (
                    field.render()
                  ) : (
                    <input
                      className={`${styles.input} ${
                        errors[field.name] ? styles.error : ""
                      }`}
                      type='number'
                      placeholder={field.placeholder}
                      value={localFormData[field.name]}
                      onChange={(e) =>
                        handleFormChange(field.name, e.target.value)
                      }
                      onBlur={() =>
                        handleBlur(field.name, localFormData[field.name])
                      }
                    />
                  )}
                  {errorMessages[field.name] && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
                    >
                      {errorMessages[field.name]}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Итого:</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <p className={styles.page__form__text}>{localFormData.total}</p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.page__main__step__wrapper__buttons} ${styles.mobile__btn}`}
          >
            <div className={styles.page__main__step__wrapper__button}>
              <button
                onClick={onNextStep}
                className={styles.button}
                disabled={!isNextStepBlocked}
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

Step1Form.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  roomTypeOptions: PropTypes.array.isRequired,
}

export default Step1Form
