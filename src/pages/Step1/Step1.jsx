import { useState } from "react"
import styles from "./Step1.module.scss" // Import the SCSS module

const Step1 = () => {
  const [adults, setAdults] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [nights, setNights] = useState(0)
  const [insurance, setInsurance] = useState(true)

  return (
    <div className={styles.wrapper}>
      <div className={styles.step1Container}>
        <div className={styles.step1Container__wrapper}>
          <h1 className={styles.step1Title}>Бронирование номера</h1>
          <p className={styles.step1Subtitle}>Расчет стоимости</p>
          <div className={styles.step1Content}>
            <div className={styles.step1ContentMain}>
              <div className={styles.step1Row}>
                <p className={styles.step1Label}>Количество взрослых</p>
                <div className={styles.step1InputGroup}>
                  <input
                    type='number'
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.step1Row}>
                <p className={styles.step1Label}>
                  Количество детей от 5 до 12 лет
                </p>
                <div className={styles.step1InputGroup}>
                  <input
                    type='number'
                    value={child}
                    onChange={(e) => setChild(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.step1Row}>
                <p className={styles.step1Label}>Количество детей до 5 лет</p>
                <div className={styles.step1InputGroup}>
                  <input
                    type='number'
                    value={baby}
                    onChange={(e) => setBaby(e.target.value)}
                  />
                </div>
                <div className={styles.step1Row}>
                  <p className={styles.step1Label}>Тип номера</p>
                  <div className={styles.step1RadioGroup}>
                    <input
                      type='radio'
                      name='roomType'
                      value='Эконом'
                      checked
                    />{" "}
                    Эконом
                    <input type='radio' name='roomType' value='Стандарт' />{" "}
                    Стандарт
                    <input type='radio' name='roomType' value='Люкс' /> Люкс
                  </div>
                </div>
              </div>
              <div className={styles.step1Row}>
                <p className={styles.step1Label}>Количество ночей</p>
                <div className={styles.step1InputGroup}>
                  <input
                    type='number'
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                  />
                </div>
                <div className={styles.step1Row}>
                  <p className={styles.step1Label}>Страховка</p>
                  <div className={styles.step1CheckboxGroup}>
                    <input
                      type='checkbox'
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.step1TotalCost}>Итого: 1 234 ₽</div>
            </div>
            <button className={styles.step1NextButton}>Далее</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1
