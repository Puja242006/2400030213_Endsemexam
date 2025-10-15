import React from "react";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    image: "Screenshot 2025-09-27 152332.png",
    price: "₹799",
  },
  {
    id: 2,
    name: "Jeans",
    image: "Screenshot 2025-09-27 152350.png",
    price: "₹1,499",
  },
  {
    id: 3,
    name: "Sneakers",
    image: "Screenshot 2025-09-27 152415.png",
    price: "₹2,999",
  },
  {
    id: 4,
    name: "Jacket",
    image: "Screenshot 2025-09-27 152446.png",
    price: "₹3,499",
  },
];

const Fashion = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Fashion
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

export default Fashion;
