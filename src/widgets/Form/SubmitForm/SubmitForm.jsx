import PropTypes from "prop-types"
import styles from "./SubmitForm.module.scss"
import ConfirmTick from "@/app/assets/images/ConfirmTick.svg"

const SubmitForm = ({ onReset }) => {
  const handleReset = () => {
    localStorage.removeItem("step1FormData")
    localStorage.removeItem("step2FormData")
    onReset()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__frame}>
        <div className={styles.wrapper__frame__layout}>
          <div className={styles.wrapper__frame__layout__page}>
            <div className={styles.submit__content}>
              <div className={styles.submit__content__img}>
                <img
                  src={ConfirmTick}
                  alt='Confirm'
                  id='Confirm'
                  className={styles.ConfirmTick}
                />
              </div>
              <div className={styles.submit__content__text}>
                <p className={styles.text}>Заказ успешно оплачен.</p>
              </div>
            </div>
            <div className={styles.submit__content__bottom}>
              <button
                onClick={handleReset}
                className={styles.submit__content__bottom__button}
              >
                Забронировать еще
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SubmitForm.propTypes = {
  onReset: PropTypes.func.isRequired,
}

export default SubmitForm
