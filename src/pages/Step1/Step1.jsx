import { useState } from "react"
import styles from "./Step1.module.scss" // Import the SCSS module

const Step1 = () => {
  const [adults, setAdults] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [nights, setNights] = useState(0)
  const [insurance, setInsurance] = useState(true)

  return (
    <div className={styles["step1-container"]}>
      <h1 className={styles["step1-title"]}>Бронирование номера</h1>
      <div className={styles["step1-content"]}>
        <div className={styles["step1-form-group"]}>
          <label className={styles["step1-label"]}>Количество взрослых</label>
          <div className={styles["step1-input-group"]}>
            <input
              type='number'
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["step1-form-group"]}>
          <label className={styles["label"]}>
            Количество детей от 5 до 12 лет
          </label>
          <div className={styles["input-group"]}>
            <input
              type='number'
              value={child}
              onChange={(e) => setChild(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Количество детей до 5 лет</label>
          <div className={styles["input-group"]}>
            <input
              type='number'
              value={baby}
              onChange={(e) => setBaby(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Тип номера</label>
          <div className={styles["radio-group"]}>
            <label>
              <input type='radio' name='roomType' value='Эконом' checked />{" "}
              Эконом
            </label>
            <label>
              <input type='radio' name='roomType' value='Стандарт' /> Стандарт
            </label>
            <label>
              <input type='radio' name='roomType' value='Люкс' /> Люкс
            </label>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Количество ночей</label>
          <div className={styles["input-group"]}>
            <input
              type='number'
              value={nights}
              onChange={(e) => setNights(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Страховка</label>
          <div className={styles["checkbox-group"]}>
            <label>
              <input
                type='checkbox'
                checked={insurance}
                onChange={(e) => setInsurance(e.target.checked)}
              />{" "}
            </label>
          </div>
        </div>
        <div className={styles["total-cost"]}>Итого: 1 234 ₽</div>
      </div>
      <button className={styles["next-button"]}>Далее</button>
    </div>
  )
}

export default Step1
