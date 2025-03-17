import React, { useState, useEffect } from "react";
import styles from "./ProductInfo.module.css";

function ProductInfo() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("/productData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0]); // Set first image as main
        setTotalPrice(data.price); // Set initial total price
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setTotalPrice(newQuantity * product.price);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        setTotalPrice(newQuantity * product.price);
        return newQuantity;
      }
      return prev;
    });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.productImageSection}>
        <div className={styles.productContainer}>
          {/* Main Image */}
          <img src={mainImage} alt="Product" className={styles.productImage} />

          {/* Thumbnail Images */}
          <div className={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`image ${index + 1}`}
                className={styles.thumbnailImage}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className={styles.returnPolicy}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae7e5989407b3c1b27fa7800efc65f56e6899b4d07b0bc62a767c8984c3f6362"
            alt="Return Policy"
            className={styles.returnIcon}
          />
          <span className={styles.rettext}>{product.returnPolicy}</span>
        </div>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productTitleSection}>
          <h2 className={styles.productTitle}>{product.title}</h2>
        </div>
        <div className={styles.productDescriptiondiv}>
          <p className={styles.productDescription}>{product.description}</p>
        </div>

        <div className={styles.productMetaInfo}>
          {/* Price Info */}
          <div className={styles.priceInfo}>
            <span className={styles.label}>Price</span>
            <span className={styles.value}>$ {totalPrice}</span>
          </div>

          {/* Quantity Info */}
          <div className={styles.quantityInfo}>
            <span className={styles.label}>Quantity</span>
            <div className={styles.quantityControls}>
              <button className={styles.decreaseBtn} onClick={decreaseQuantity}>
                -
              </button>
              <input
                type="text"
                className={styles.quantityInput}
                value={quantity}
                readOnly
              />
              <button className={styles.increaseBtn} onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
