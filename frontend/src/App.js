import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch,Routes,Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/Home/Home";


function App() {



  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });


  }, []);


  return (
    <Router>
      <Header />

       <Home/>

      <Footer />
    </Router>
  );
}

export default App;