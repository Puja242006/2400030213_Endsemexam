
import React from "react";

const products = [
  {
    id: 1,
    name: "Smartphone",
    image: "Screenshot 2025-09-27 145756.png",
    price: "₹15,999",
  },
  {
    id: 2,
    name: "Smartphone",
    image: "Screenshot 2025-09-27 145815.png",
    price: "₹49,999",
  },
  {
    id: 3,
    name: "Smartphone",
    image: "Screenshot 2025-09-27 145901.png",
    price: "₹2,499",
  },
  {
    id: 4,
    name: "Smartphone",
    image: "Screenshot 2025-09-27 145935.png",
    price: "₹4,999",
  },
];

const Electronics = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Electronics
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // ✅ 2 per row
          gap: "15px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              background: "white",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "200px", 
                height: "200px",
                objectFit: "contain",
                marginBottom: "8px",
              }}
            />
            <h2 style={{ fontSize: "14px", margin: "5px 0" }}>{product.name}</h2>
            <p style={{ fontSize: "13px", color: "gray", marginBottom: "8px" }}>
              {product.price}
            </p>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
