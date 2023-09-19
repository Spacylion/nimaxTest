import { useState } from "react"
import styles from "./Step1.module.scss" // Import the SCSS module

const Step1 = () => {
  const [adults, setAdults] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [nights, setNights] = useState(0)
  const [insurance, setInsurance] = useState(true)

  const [roomType, setRoomType] = useState("Эконом")

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value)
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
                <input
                  className={styles.input}
                  type='number'
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </div>
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
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                />
              </div>
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
                  value={baby}
                  onChange={(e) => setBaby(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.page__form__text}>Тип номера</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <div className={styles.page__form__row__child__2__radiobutton}>
                  <input
                    className={styles.input__radio}
                    type='radio'
                    name='roomType'
                    value='Эконом'
                    checked={roomType === "Эконом"}
                    onChange={handleRoomTypeChange}
                  />
                  <p className={styles.page__form__text}>Эконом</p>
                </div>
                <div className={styles.page__form__row__child__2__radiobutton}>
                  <input
                    className={styles.input__radio}
                    type='radio'
                    name='roomType'
                    value='Стандарт'
                    checked={roomType === "Стандарт"}
                    onChange={handleRoomTypeChange}
                  />
                  <p className={styles.page__form__text}>Стандарт</p>
                </div>
                <div className={styles.page__form__row__child__2__radiobutton}>
                  <input
                    className={styles.input__radio}
                    type='radio'
                    name='roomType'
                    value='Люкс'
                    checked={roomType === "Люкс"}
                    onChange={handleRoomTypeChange}
                  />
                  <p className={styles.page__form__text}>Люкс</p>
                </div>
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.step1Label}>Количество ночей</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={styles.input}
                  type='number'
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p className={styles.step1Label}>Страховка</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <input
                  className={styles.checkbox}
                  type='checkbox'
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                />
              </div>
            </div>

            <div className={styles.page__form__row}>
              <div className={styles.page__form__row__child__1}>
                <p>Итого:</p>
              </div>
              <div className={styles.page__form__row__child__2}>
                <p className={styles.sumnumber}>1 234 ₽</p>
              </div>
            </div>
          </div>

          <div className={styles.page__main__step__wrapper__buttons}>
            <div className={styles.page__main__step__wrapper__button}>
              <button className={styles.button}>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1
