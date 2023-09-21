import PropTypes from "prop-types"
import styles from "./Step3Form.module.scss"

const Step3Form = ({ formData, onPrevStep, onPayment }) => {
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
            <p className={styles.subtitle}>Подтверждение заказа</p>
          </div>
        </div>
        <div className={styles.page__main__step__wrapper}>
          <div className={styles.page__main__step__wrapper__payment}>
            {[
              {
                label: "ФИО",
                value: formData.fullName,
              },
              {
                label: "телефон",
                value: formData.phoneNumber,
              },
              {
                label: "Номер «Люкс» на 10 ночей",
                value: `${formData.roomType} на ${formData.nights} ночей`,
              },
              {
                label:
                  "2 взрослых, 2 ребенка от 12 лет и 1 ребенок младше 12 лет",
                value: `Взрослых: ${formData.adults}, Детей от 12 лет: ${formData.children}, Детей младше 12 лет: ${formData.babies}`,
              },
              {
                label: "Страховка включена",
                value: formData.insurance ? "Да" : "Нет",
              },
              {
                label: "К оплате",
                value: `1 234 ₽`,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={styles.page__main__step__wrapper__payment__row}
              >
                <p className={styles.bold__text}>{item.label}</p>
                <p className={styles.text}>{item.value}</p>
              </div>
            ))}
          </div>

          <div
            className={`${styles.page__main__step__wrapper__buttons} ${styles.mobile__btn}`}
          >
            <div className={styles.page__main__step__wrapper__button__back}>
              <button
                onClick={handlePrevStep}
                className={`${styles.button__back}`}
              >
                Назад к данным покупателя
              </button>
            </div>
            <div className={styles.page__main__step__wrapper__button}>
              <button onClick={onPayment} className={styles.button}>
                оплатить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Step3Form.propTypes = {
  formData: PropTypes.object.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onPayment: PropTypes.func.isRequired,
}

export default Step3Form
