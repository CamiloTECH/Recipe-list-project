import { Route, Routes } from "react-router-dom";
import type {} from "redux-thunk/extend-redux";

import {
  CardDetails,
  CreateRecipe,
  Footer,
  Home,
  LandingPage,
  NavBar,
  NotFound
} from "./components";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage key={"landing"} />} />

        <Route
          path="/home"
          element={[
            <NavBar key={"navBar"} />,
            <Home key={"home"} />,
            <Footer key={"footer"} />
          ]}
        />

        <Route
          path="/home/create"
          element={[
            <NavBar key={"navBar"} />,
            <CreateRecipe key={"createRecipe"} />,
            <Footer key={"footer"} />
          ]}
        />

        <Route
          path="/home/details/:id"
          element={[
            <NavBar key={"navBar"} />,
            <CardDetails key={"details"} />,
            <Footer key={"footer"} />
          ]}
        />

        <Route path="*" element={<NotFound key={"NotFound"} />} />
      </Routes>
    </div>
  );
}

export default App;
