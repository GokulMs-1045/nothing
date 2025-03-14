import React from 'react'
import styles from "./ProductHeader.module.css";

function ProductHeader() {
  return (
    <div>
      <div className={styles.BlankBar}></div>
      <div className={styles.mainContent}>
        <button className={styles.requestButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b91c28f22030bc6e75dd3080ffab6d449f2a947db38e75d5ae0d5860e0783f17?placeholderIfAbsent=true&apiKey=12db58e10d014d4b924e100ec4138c28"
            alt=""
            className={styles.requestIcon}
          />
          Req New Products
        </button>
        <div className={styles.actionIcons}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73689a4f1ea3e0262f3e97e94f0706b2a5d4d4dc0384f769651403ea12513873?placeholderIfAbsent=true&apiKey=12db58e10d014d4b924e100ec4138c28"
            alt=""
            className={styles.actionIcon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83518054aa84bfb118cf60ffceba1b53788454b4c6dc795f4b2a6670f46909dc?placeholderIfAbsent=true&apiKey=12db58e10d014d4b924e100ec4138c28"
            alt=""
            className={styles.actionIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductHeader
