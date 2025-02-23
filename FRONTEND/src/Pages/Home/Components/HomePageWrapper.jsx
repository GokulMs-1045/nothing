import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Styles/HomePageWrapper.css";

const products = [
  { name: "Blue Chair", price: "84.54 $" },
  { name: "Sony Lens", price: "150.75 $" },
  { name: "Xiaomi PowerBank", price: "70.99 $" },
  { name: "SEA-DWELLER", price: "999.43 $" },
  { name: "Macbook Pro M1", price: "1999.99 $" },
  { name: "Puma Shoes", price: "84.54 $" },
  { name: "JBL SoundBar", price: "399.99 $" },
  { name: "Nike Shoes", price: "84.54 $" },
];

function Home() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="hero-products-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="logo">logo</h1>
          <h1>Buy Best Products From Your Locality</h1>
          <p>Discover amazing products with fast shipping & best prices.</p>
          <div className="buttons">
            <Link to="/login">
              <button className="btn-primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-secondary">Signup</button>
            </Link>
          </div>
        </div>
        <div className="hero-placeholder">
          <div className="placeholder-box">Placeholder</div>
        </div>
      </div>

      {/* Products Section - Directly Below */}
      <div className="products-section">
        <h2>Newest Products</h2>
        <div className="products-container">
          <button className="scroll-arrow left" onClick={scrollLeft}>
            <FaArrowLeft />
          </button>
          <div className="products" ref={scrollRef}>
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-placeholder">Image</div>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
              </div>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={scrollRight}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}


export default Home;
