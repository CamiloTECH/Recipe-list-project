import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import LandingPage from "../components/LandingPage/LandingPage";

configure({ adapter: new Adapter() });

describe("<LandingPage />", () => {
  let landingPage;
  beforeEach(() => {
    landingPage = shallow(<LandingPage />);
  });

  it('Debería renderizar un <Link to="" que vaya a /home />.', () => {
    expect(landingPage.find(Link).length).toBe(1);
  });

  it('Debería tener un Link con el texto "Start" que cambie la ruta hacia "/home"', () => {
    expect(landingPage.find(Link).at(0).prop("to")).toEqual("/home");
    expect(landingPage.find(Link).at(0).text()).toEqual("Start");
  });
});
