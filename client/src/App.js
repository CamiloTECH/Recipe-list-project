import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Search from "./components/Search/Search";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/home/Home";
import CardDetail from "./components/CardDetails/CardDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<NavBar />}>

          <Route path="/home" element={<Search />}>
            <Route path="/home/" element={<Home />} />
          </Route> 

          <Route path="/home/add" element />
          <Route path="/home/details/:id" element={<CardDetail/>} />
        </Route>
        
        <Route path="*" element={<NavBar />} />
      </Routes>
    </>
  );
}

export default App;
