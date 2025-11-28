import React, { useEffect, useState } from 'react'


const Weather = () => {
  return (
    <div>
      <div className="app">
  <h2>Weather Cards</h2>

  {/* ===== Form Section ===== */}
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const city = e.target.city.value.trim();
      if (!city) {
        alert("City is required!");
        return;
      }

      const card = {
        id: Date.now(),
        city,
        country: e.target.country.value.trim(),
        temp: e.target.temp.value,
        feels: e.target.feels.value,
        condition: e.target.condition.value.trim(),
        humidity: e.target.humidity.value,
        wind: e.target.wind.value,
        unit: e.target.unit.value,
        updated: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("weatherCards") || "[]");
      existing.push(card);
      localStorage.setItem("weatherCards", JSON.stringify(existing));
      e.target.reset();
      window.location.reload(); // reload to show updated list
    }}
  >
    <input name="city" placeholder="City *" required />
    <input name="country" placeholder="Country" />
    <input name="temp" type="number" placeholder="Temperature" />
    <input name="feels" type="number" placeholder="Feels Like" />
    <input name="condition" placeholder="Condition (e.g., Sunny)" />
    <input name="humidity" type="number" placeholder="Humidity (%)" />
    <input name="wind" type="number" placeholder="Wind Speed" />
    <select name="unit">
      <option>°C</option>
      <option>°F</option>
    </select>
    <button type="submit">Add</button>
  </form>

  {/* ===== Display Section ===== */}
  <div style={{ marginTop: 20 }}>
    {(() => {
      const cards = JSON.parse(localStorage.getItem("weatherCards") || "[]");
      if (cards.length === 0)
        return <p>No cards yet. Add weather info above.</p>;

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          {cards.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                padding: "12px",
                position: "relative",
              }}
            >
              <button
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "6px",
                  border: "none",
                  background: "transparent",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const updated = cards.filter((x) => x.id !== c.id);
                  localStorage.setItem("weatherCards", JSON.stringify(updated));
                  window.location.reload();
                }}
              >
                ×
              </button>

              <h3>{c.city}{c.country ? `, ${c.country}` : ""}</h3>
              <h1>{c.temp || "--"} {c.unit}</h1>
              <p>Feels like: {c.feels || "--"} {c.unit}</p>
              <p>Condition: {c.condition || "N/A"}</p>
              <p>Humidity: {c.humidity || "--"}%</p>
              <p>Wind: {c.wind || "--"}</p>
              <small>
                Updated {Math.floor((Date.now() - new Date(c.updated)) / 60000)} min ago
              </small>
            </div>
          ))}
        </div>
      );
    })()}
  </div>

  {/* ===== Clear All Button ===== */}
  <button
    style={{ marginTop: 16 }}
    onClick={() => {
      if (window.confirm("Clear all cards?")) {
        localStorage.removeItem("weatherCards");
        window.location.reload();
      }
    }}
  >
    Clear All
  </button>
</div>

    </div>
  )
}

export default Weather
