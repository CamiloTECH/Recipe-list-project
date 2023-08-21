import { Navigate, Route, Routes } from "react-router-dom";

import CardDetail from "./components/CardDetails/CardDetails.jsx";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import Home from "./components/home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Search from "./components/Search/Search.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<NavBar />}>
          <Route path="/home" element={<Search />}>
            <Route path="/home/" element={<Home />} />
          </Route>

          <Route path="/home/add" element={<CreateRecipe />} />
          <Route path="/home/details/:id" element={<CardDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;
