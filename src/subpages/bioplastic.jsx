const Bioplastic = () => {

    return (
        <div style={{ height: "100vh", backgroundColor: "#121212", color: "white" }}>
          <h2 style={{ textAlign: "center", padding: "1rem" }}>Bio Plastic PDF</h2>
          <iframe
            src="/pdf1.pdf"
            width="100%"
            height="90%"
            style={{
              border: "none",
              filter: "invert(90%)", // optional for dark mode PDF viewer
            }}
            title="Bio Plastic PDF"
          ></iframe>
        </div>
      );

};
export default Bioplastic 