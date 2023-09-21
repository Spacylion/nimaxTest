import PropTypes from "prop-types"
import styles from "./Step2Form.module.scss"

const Step2Form = ({ formData, onFormChange, onNextStep, onPrevStep }) => {
  const handleNextStep = () => {
    onNextStep()
  }

  const handlePrevStep = () => {
    onPrevStep()
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
            {[
              {
                label: "Фамилия",
                fieldName: "lastName",
                value: formData.lastName,
                inputType: "text",
                placeholder: "Иванов",
              },
              {
                label: "Имя",
                fieldName: "firstName",
                value: formData.firstName,
                inputType: "text",
                placeholder: "Иван",
              },
              {
                label: "Отчество",
                fieldName: "middleName",
                value: formData.middleName,
                inputType: "text",
                placeholder: "Иванович",
              },
              {
                label: "Номер телефона",
                fieldName: "phoneNumber",
                value: formData.phoneNumber,
                inputType: "tel",
                placeholder: "+7 999 123-4567",
              },
              {
                label: "Дата рождения",
                fieldName: "birthDate",
                value: formData.birthDate,
                inputType: "date",
                min: "1930-01-01",
                max: "2005-01-01",
              },
            ].map((item, index) => (
              <div key={index} className={styles.page__form__row}>
                <div className={styles.page__form__row__child__1}>
                  <p className={styles.page__form__text}>{item.label}</p>
                </div>
                <div className={styles.page__form__row__child__2}>
                  <input
                    className={styles.input}
                    type={item.inputType}
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={(e) =>
                      onFormChange(item.fieldName, e.target.value)
                    }
                    {...(item.inputType === "date"
                      ? { min: item.min, max: item.max }
                      : {})}
                  />
                </div>
              </div>
            ))}
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
  onPrevStep: PropTypes.func.isRequired, // Added onPrevStep prop
}

export default Step2Form
