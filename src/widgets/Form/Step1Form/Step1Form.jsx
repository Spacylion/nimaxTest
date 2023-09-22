import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import styles from "./Step1Form.module.scss"
import ToggleOn from "@/app/assets/images/ToggleOn.svg"
import ToggleOff from "@/app/assets/images/ToggleOff.svg"

const Step1Form = ({ formData, onFormChange, onNextStep, roomTypeOptions }) => {
  const [localFormData, setLocalFormData] = useState(formData)

  const calculateTotalPrice = useCallback(() => {
    const roomTypePrices = { Эконом: 1800, Стандарт: 2800, Люкс: 4000 }
    const basePrice = roomTypePrices[localFormData.roomType] || 0
    return Number(
      (basePrice * localFormData.nights +
        (localFormData.child || 0) * (basePrice * 0.5) +
        (localFormData.baby || 0) * basePrice) *
        (1 + localFormData.insurance * 0.1) *
        localFormData.adults
    )
  }, [localFormData])
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice())
  const [errors, setErrors] = useState({})
  const fieldErrors = {}

  const validateField = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "adults":
        if (fieldValue < 1)
          fieldErrors.adults = "Количество взрослых должно быть больше 0"
        break
      case "baby":
        if (fieldValue < 0)
          fieldErrors.baby =
            "Количество детей до 5 лет не может быть отрицательным"
        break
      case "child":
        if (fieldValue < 0)
          fieldErrors.child =
            "Количество детей от 5 до 12 лет не может быть отрицательным"
        break
      case "nights":
        if (fieldValue < 1)
          fieldErrors.nights = "Количество ночей (числовое, мин.знач.: 1)"
        if (fieldValue < 0)
          fieldErrors.nights = "Количество ночей не может быть отрицательным"
        break
      default:
        break
    }
    return fieldErrors
  }

  const errorMessages = {
    adults: "Количество взрослых должно быть больше 0",
    child: "Количество детей от 5 до 12 лет не может быть отрицательным",
    baby: "Количество детей до 5 лет не может быть отрицательным",
    nights: "Количество ночей (числовое, мин.знач.: 1)",
  }

  const isButtonDisabled = () => {
    return (
      localFormData.adults <= 0 ||
      localFormData.nights < 1 ||
      localFormData.roomType === "" ||
      (localFormData.insurance !== true && localFormData.insurance !== false)
    )
  }

  useEffect(() => {
    // Update the total cost within the formData object
    const updatedFormData = {
      ...localFormData,
      total: `${totalPrice} ₽`,
    }

    onFormChange("total", `${totalPrice} ₽`)

    try {
      localStorage.setItem("formData", JSON.stringify(updatedFormData))
    } catch (error) {
      console.error("Error storing data in localStorage:", error)
    }
  }, [totalPrice])

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [
    localFormData.roomType,
    localFormData.nights,
    localFormData.child,
    localFormData.baby,
    localFormData.insurance,
    localFormData.adults,
    calculateTotalPrice,
  ])

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
  }

  const handleBlur = (fieldName, value) => {
    const fieldErrors = validateField(fieldName, value)

    if (Object.keys(fieldErrors).length === 0) {
      const updatedErrors = { ...errors }
      delete updatedErrors[fieldName]
      setErrors(updatedErrors)
    } else {
      setErrors({ ...errors, ...fieldErrors })
      setTimeout(() => {
        const updatedErrors = { ...errors }
        delete updatedErrors[fieldName]
        setErrors(updatedErrors)
      }, 3000)
    }
  }

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
                  {errors.adults && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
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

                  {errors.child && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
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

                  {errors.baby && (
                    <div
                      className={`${styles.error__box} ${styles.customError}`}
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
                          onChange={(e) => handleFormChange("roomType", option)}
                          id='roomType-select'
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
                          id='nights-input'
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
                        id='nights-input'
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
                    <>
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
                      {errors[field.name] && (
                        <div
                          className={`${styles.error__box} ${styles.customError}`}
                        >
                          {errorMessages[field.name]}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Итого:</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <p className={styles.page__form__text}>{totalPrice}</p>
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

Step1Form.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  roomTypeOptions: PropTypes.array.isRequired,
}

export default Step1Form
