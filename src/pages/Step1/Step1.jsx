import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./Step1.module.scss"
import ToggleOn from "../../app/assets/images/ToggleOn.svg"
import ToggleOff from "../../app/assets/images/ToggleOff.svg"

const Step1 = ({ onNextStep, formData, onFormChange }) => {
  const [roomTypeOptions] = useState(["Эконом", "Стандарт", "Люкс"])
  const [roomType, setRoomType] = useState("Эконом")

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value)
  }

  const handleInputChange = (fieldName, value) => {
    onFormChange(fieldName, value)
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
            {[
              {
                label: "Количество взрослых",
                fieldName: "adults",
                value: formData.adults,
              },
              {
                label: "Количество детей от 5 до 12 лет",
                fieldName: "child",
                value: formData.child,
              },
              {
                label: "Количество детей до 5 лет",
                fieldName: "baby",
                value: formData.baby,
              },
              {
                label: "Тип номера",
                fieldName: "roomType",
                value: roomType,
                inputType: window.innerWidth <= 320 ? "select" : "radio",
                options: roomTypeOptions,
              },
              {
                label: "Количество ночей",
                fieldName: "nights",
                value: formData.nights,
              },
              {
                label: "Страховка",
                fieldName: "insurance",
                value: formData.insurance,
                inputType: window.innerWidth <= 320 ? "toggle" : "checkbox",
              },
              {
                label: "Итого:",
                fieldName: "total",
                value: "1 234 ₽",
              },
            ].map((item, index) => (
              <div key={index} className={styles.page__form__row}>
                <div className={styles.page__form__row__child__1}>
                  <p className={styles.page__form__text}>{item.label}</p>
                </div>
                <div
                  className={`${styles.page__form__row__child__2} ${styles.rowinRow}`}
                >
                  {item.inputType === "toggle" ||
                  item.inputType === "checkbox" ? (
                    <div className={styles.toggleContainer}>
                      <img
                        src={item.value ? ToggleOff : ToggleOn}
                        alt={item.value ? "Toggle Off" : "Toggle On"}
                        onClick={() =>
                          handleInputChange(item.fieldName, !item.value)
                        }
                        className={styles.toggleIcon}
                      />
                    </div>
                  ) : item.label === "Итого:" ? (
                    <p className={styles.page__form__text}>{item.value}</p>
                  ) : item.inputType === "select" ? (
                    <select
                      value={item.value}
                      onChange={(e) =>
                        handleInputChange(item.fieldName, e.target.value)
                      }
                      className={styles.input}
                    >
                      {item.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : item.inputType === "radio" ? (
                    item.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={
                          styles.page__form__row__child__2__radiobutton
                        }
                      >
                        <input
                          className={styles.input__radio}
                          type='radio'
                          name={item.fieldName}
                          value={option}
                          checked={item.value === option}
                          onChange={(e) =>
                            handleInputChange(item.fieldName, e.target.value)
                          }
                        />
                        <label className={styles.page__form__text}>
                          {option}
                        </label>
                      </div>
                    ))
                  ) : (
                    <input
                      className={styles.input}
                      type='number'
                      value={item.value}
                      onChange={(e) =>
                        handleInputChange(item.fieldName, e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${styles.page__main__step__wrapper__buttons} ${styles.mobile__btn}`}
          >
            <div className={styles.page__main__step__wrapper__button}>
              <button onClick={onNextStep} className={styles.button}>
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Step1.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
}

export default Step1
