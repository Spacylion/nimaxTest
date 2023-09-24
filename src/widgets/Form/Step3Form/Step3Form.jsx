import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styles from "./Step3Form.module.scss"
import { simulatePayment } from "@/services/api/api"

const Step3Form = ({ formData, onPrevStep, onPayment }) => {
  const handlePrevStep = () => {
    onPrevStep()
  }
  const [localFormData, setLocalFormData] = useState(formData)

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("formData"))
    if (dataFromLocalStorage) {
      setLocalFormData(dataFromLocalStorage)
    }
  }, [])

  console.log("localFormData", localFormData)
  const formatRoomInfo = () => {
    return `Номер "${localFormData.roomType}" на ${localFormData.nights} ночь`
  }

  const formatGuestsInfo = () => {
    const adults = localFormData.adults || 0
    const children = localFormData.child || 0
    const babies = localFormData.baby || 0

    return `${adults} взрослых, ${children} ребенка от 12 лет и ${babies} ребенок младше 12 лет`
  }

  const formatInsuranceInfo = () => {
    return localFormData.insurance
      ? "Страховка включена"
      : "Страховка не включена"
  }

  const formatTotalInfo = () => {
    return `К оплате: ${localFormData.total}`
  }
  const handlePayment = () => {
    simulatePayment(localFormData)
      .then((paymentResult) => {
        if (paymentResult.success) {
          localStorage.removeItem("formData")
          onPayment()
        } else {
          console.error("Payment error:", paymentResult.error)
        }
      })
      .catch((error) => {
        console.error("Payment error:", error.message)
      })
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
                value: `${localFormData.firstName} ${localFormData.lastName} ${localFormData.middleName}`,
              },
              {
                value: localFormData.phoneNumber,
              },
              {
                value: formatRoomInfo(),
              },
              {
                value: formatGuestsInfo(),
              },
              {
                value: formatInsuranceInfo(),
              },
              {
                value: formatTotalInfo(),
              },
            ].map((item, index) => (
              <div
                key={index}
                className={styles.page__main__step__wrapper__payment__row}
              >
                <div className={styles.label}>{item.label}</div>
                <div className={styles.text}>{item.value}</div>
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
              <button onClick={handlePayment} className={styles.button}>
                Оплатить
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
