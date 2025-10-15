import React from "react";

const products = [
  {
    id: 1,
    name: "Kidswear",
    image: "Screenshot 2025-09-27 153009.png",
    price: "₹499",
  },
  {
    id: 2,
    name: "Kidswear",
    image: "Screenshot 2025-09-27 153022.png",
    price: "₹699",
  },
  {
    id: 3,
    name: "Kidswear",
    image: "Screenshot 2025-09-27 153040.png",
    price: "₹1,299",
  },
  {
    id: 4,
    name: "Kidswear",
    image: "Screenshot 2025-09-27 153059.png",
    price: "₹999",
  },
];

const Kids = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Kids Section
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", 
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

export default Kids;
