import React from "react";
import Home from "./components/Home";
import Procedure from "../src/pages/Procedure";
import About from "../src/pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Teams from "./pages/Teams";
import Documentation from "./pages/Documentation";
import Bioplastic from "./subpages/bioplastic";
import Glycerine from "./subpages/glycerine";
import Sodiumalginate from "./subpages/sodiumalginate";
import CalciumChloride from "./subpages/calciumchloride";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/procedure" element={<Procedure />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/documentation/bioplastic" element={<Bioplastic />} />
        <Route path="/documentation/glycerine" element={<Glycerine />} />
        <Route path="/documentation/sodiumalginate" element={<Sodiumalginate />} />
        <Route path="/documentation/calciumchloride" element={<CalciumChloride />} />

      </Routes>
    </Router>
  );
};

export default App;
