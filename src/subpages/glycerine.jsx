import React from "react";

const Glycerine = () => {
      return (
        <div style={{ height: "100vh", backgroundColor: "#121212", color: "white" }}>
          <h2 style={{ textAlign: "center", padding: "1rem" }}>Glycerin PDF</h2>
          <iframe
            src="/glycerine.pdf"
            width="100%"
            height="90%"
            style={{
              border: "none",
              filter: "invert(90%)", // optional for dark mode PDF viewer
            }}
            title="Glycerin PDF"
          ></iframe>
        </div>
      );
    

};
export default Glycerine