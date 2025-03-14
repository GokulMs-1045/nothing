import React, { useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import ProductInfo from "./ProductInfo";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";
import ProductHeader from "./ProductHeader";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryMode, setDeliveryMode] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [deliveryType, setDeliveryType] = useState("");
  const [regularDeliveryOption, setRegularDeliveryOption] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    city: "",
    state: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/productData.json"); // Adjust API
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]); // Set first image as main
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (
      !deliveryMode ||
      !paymentMode ||
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.zip ||
      !formData.city ||
      !formData.state ||
      !formData.address ||
      !product
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (paymentMode === "Online" && !base64Image) {
      alert("Please upload a payment screenshot.");
      return;
    }

    const orderData = {
      productImage: mainImage,
      returnPolicy: {
        image: product.returnPolicyImage,
        text: product.returnPolicyText,
      },
      title: product.title,
      price: product.price * quantity,
      quantity: quantity,
      selectedMonth,
      selectedDate: selectedDate ? selectedDate.toString() : null,
      selectedTime: `${selectedTime} ${timePeriod}`,
      deliveryType,
      regularDeliveryOption:
        deliveryType === "regular" ? regularDeliveryOption : null,
      selectedDay:
        deliveryType === "regular" && regularDeliveryOption !== "everyday"
          ? selectedDay
          : null,
      deliveryMode,
      paymentMode,
      paymentScreenshot: paymentMode === "Online" ? base64Image : null,
      shippingAddress: { ...formData },
    };

    try {
      const response = await fetch("https://your-api-endpoint.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className={styles.productDetailsPage}>
      <ProductHeader />
      {product ? (
        <>
          <ProductInfo
            product={product}
            mainImage={mainImage}
            setMainImage={setMainImage}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <DeliveryOptions
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            regularDeliveryOption={regularDeliveryOption}
            setRegularDeliveryOption={setRegularDeliveryOption}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <PaymentOptions
            deliveryMode={deliveryMode}
            setDeliveryMode={setDeliveryMode}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            base64Image={base64Image}
            setBase64Image={setBase64Image}
            formData={formData}
            setFormData={setFormData}
          />
          <button
            type="submit"
            className={styles.buyButton}
            onClick={handleSubmit}
          >
            BUY
          </button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetails;
