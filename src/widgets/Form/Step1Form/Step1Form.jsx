// Step1Form.js
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./Step1Form.module.scss"
import ToggleOn from "@/app/assets/images/ToggleOn.svg"
import ToggleOff from "@/app/assets/images/ToggleOff.svg"

const Step1Form = ({ formData, onFormChange, onNextStep, roomTypeOptions }) => {
  const [errors, setErrors] = useState({})
  const { adults, child, baby, roomType, nights, insurance, total } = formData

  useEffect(() => {
    handleBlur()
  }, [adults, child, baby, roomType, nights, insurance])

  const handleInputChange = (fieldName, value) => {
    const updatedFormData = {
      ...formData,
      step1: {
        ...formData.step1,
        [fieldName]: value,
      },
    }

    if (fieldName === "roomType") {
      onFormChange(fieldName, value)
    } else {
      onFormChange(fieldName, value, updatedFormData)
      if (fieldName !== "roomType") {
        handleBlur()
      }
    }

    setErrors(validateForm(updatedFormData))
  }

  const handleBlur = () => {
    const totalPrice = calculateTotalPrice(
      adults,
      child,
      baby,
      roomType,
      nights,
      insurance
    )
    onFormChange("total", totalPrice)
  }

  const calculateTotalPrice = (
    adults,
    children,
    babies,
    roomType,
    nights,
    insurance
  ) => {
    const roomTypePrices = {
      Эконом: 1800,
      Стандарт: 2800,
      Люкс: 4000,
    }

    const basePrice = roomTypePrices[roomType] || 0
    const totalPrice =
      (basePrice * nights +
        children * basePrice * 0.5 +
        babies * basePrice * 0) *
      (1 + insurance * 0.1)

    return totalPrice.toFixed(0) + " ₽"
  }

  const validateForm = (formData) => {
    const errors = {}

    if (formData.adults < 1) {
      errors.adults = "Количество взрослых должно быть больше 0"
    }
    if (formData.baby > 3) {
      errors.baby = "На одного взрослого допустимо не более 3 детей до 5 лет"
    }

    return errors
  }

  const isNextStepBlocked = Object.keys(errors).length > 0

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
                <input
                  className={styles.input}
                  type='number'
                  value={formData.adults} // Use formData.adults for the value
                  onChange={(e) => handleInputChange("adults", e.target.value)}
                  onBlur={handleBlur}
                  placeholder='Введите количество'
                />
              </div>
              {errors.adults && (
                <div className={styles.error}>{errors.adults}</div>
              )}
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>
                  Количество детей от 5 до 12 лет
                </p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={styles.input}
                  type='number'
                  value={formData.child}
                  onChange={(e) => handleInputChange("child", e.target.value)}
                  onBlur={handleBlur}
                  placeholder='Введите количество'
                />
              </div>
              {errors.child && (
                <div className={styles.error}>{errors.child}</div>
              )}
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>
                  Количество детей до 5 лет
                </p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={styles.input}
                  type='number'
                  value={formData.baby}
                  onChange={(e) => handleInputChange("baby", e.target.value)}
                  onBlur={handleBlur}
                  placeholder='Введите количество'
                />
              </div>
              {errors.baby && <div className={styles.error}>{errors.baby}</div>}
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Тип номера</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <select
                  value={roomType}
                  onChange={(e) =>
                    handleInputChange("roomType", e.target.value)
                  }
                  onBlur={handleBlur}
                  className={styles.input}
                >
                  {roomTypeOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Количество ночей</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={styles.input}
                  type='number'
                  value={nights}
                  onChange={(e) => handleInputChange("nights", e.target.value)}
                  onBlur={handleBlur}
                  placeholder='Введите количество'
                />
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Страховка</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <>
                  <img
                    src={insurance ? ToggleOn : ToggleOff}
                    alt='Toggle'
                    onClick={() => handleInputChange("insurance", !insurance)}
                    className={styles.toggleIcon}
                  />
                  <span className={styles.page__form__text}>Страховка</span>
                </>
              </div>
            </div>
            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Итого:</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <p className={styles.page__form__text}>{total}</p>
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
                disabled={isNextStepBlocked}
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
