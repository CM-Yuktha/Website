import React from "react";

const CalciumChloride = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#121212", color: "white" }}>
      <h2 style={{ textAlign: "center", padding: "1rem" }}>Calcium Chloride PDF</h2>
      <iframe
        src="/Calcium chloride.pdf"
        width="100%"
        height="90%"
        style={{
          border: "none",
          filter: "invert(90%)", // optional for dark mode PDF viewer
        }}
        title="Calcium Chloride PDF"
      ></iframe>
    </div>
  );
};

export default CalciumChloride;
