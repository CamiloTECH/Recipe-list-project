import { Route, Routes } from "react-router-dom";
import type {} from "redux-thunk/extend-redux";

import {
  CardDetails,
  CreateRecipe,
  Home,
  LandingPage,
  NavBar,
  NotFound,
  SearchBar
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage key={"landing"} />} />

      <Route
        path="/home"
        element={[
          <NavBar key={"navBar"} />,
          <SearchBar key={"searchBar"} />,
          <Home key={"home"} />
        ]}
      />

      <Route
        path="/home/create"
        element={[
          <NavBar key={"navBar"} />,
          <CreateRecipe key={"createRecipe"} />
        ]}
      />

      <Route
        path="/home/details/:id"
        element={[<NavBar key={"navBar"} />, <CardDetails key={"details"} />]}
      />

      <Route path="*" element={<NotFound key={"NotFound"} />} />
    </Routes>
  );
}

export default App;
