import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import salad from "../img/salad.png";

import NavBar from "../components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let navBar;
  beforeEach(() => {
    navBar = shallow(<NavBar />);
  });

  it("Deberia renderizar tres <NavLink/>", () => {
    expect(navBar.find(NavLink).length).toBe(3);
  });

  it('Debería tener un Link con el texto "RECIPE" que cambie la ruta hacia "/home"', () => {
    expect(navBar.find(NavLink).at(0).prop("to")).toEqual("/home");
    expect(navBar.find(NavLink).at(0).text()).toEqual("RECIPES");
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {
    expect(navBar.find(NavLink).at(1).prop("to")).toEqual("/home");
    expect(navBar.find(NavLink).at(1).text()).toEqual("Home");
  });

  it('Debería tener un Link con el texto "Create a new recipe" que cambie la ruta hacia "/home/add"', () => {
    expect(navBar.find(NavLink).at(2).prop("to")).toEqual("/home/add");
    expect(navBar.find(NavLink).at(2).text()).toEqual("Create a new recipe");
  });

  it('Debería renderizar en un tag "img" la imagen provista en la carpeta "img/salad"', () => {
    expect(navBar.find("img").at(0).prop("src")).toEqual(salad);
  });

  it('La imagen debería tener un atributo "alt" con el texto "logotipo"', () => {
    expect(navBar.find("img").at(0).prop("alt")).toEqual("logotipo");
  });


  it('Debería renderizar en un tag "p" con el texto RECIPES', () => {
    expect(navBar.find("p").at(0).text()).toEqual("RECIPES");
  });
});
