import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.jsx";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let card;
  let cardOne = {
    diets: ["gluten free", "vegan"],
    id: 12,
    image: "https://static3.depositphotos.com/1000747/226/v/600/depositphotos_2268107-stock-illustration-fast-food.jpg",
    title: "Rice",
  };
  let cardTwo = {
    diets: ["vegetarian", "whole30"],
    id: 20,
    image: "https://cdn.colombia.com/gastronomia/2012/01/13/pasta-campesina-2877-1.jpg",
    title: "Pasta",
  };

  beforeEach(() => {
    card = (recipe) => shallow(
        <Card
          key={recipe.id}
          diets={recipe.diets}
          id={recipe.id}
          image={recipe.image}
          title={recipe.title}
        />
      );
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen de la receta', () => {
    expect(card(cardOne).find("img").at(0).prop("src")).toEqual(cardOne.image);
    expect(card(cardTwo).find("img").at(0).prop("src")).toEqual(cardTwo.image);
  });

  it('Debería renderizar un tag "img" y utilizar como alt el texto "Comida" ', () => {
    expect(card(cardOne).find("img").at(0).prop("alt")).toEqual("Comida");
    expect(card(cardTwo).find("img").at(0).prop("alt")).toEqual("Comida");
  });

  it('Debería renderizar un "p" que contenga el nombre de la receta', () => {
    expect(card(cardOne).find("p").at(0).text()).toBe(cardOne.title);
    expect(card(cardTwo).find("p").at(0).text()).toBe(cardTwo.title);
  });

  it("Deberia renderizar un 'p' que contenta el texto Diet:", () => {
    expect(card(cardOne).find("p").at(1).text()).toBe("Diet:");
  });

  it("Deberia renderizar un 'ul' que contenga la lista de tipos de dieta", () => {
    expect(card(cardOne).find("ul").length).toBe(1);
    expect(card(cardTwo).find("ul").length).toBe(1);
  });

  it("Deberia renderizar un 'li' por cada tipo de dieta", () => {
    expect(card(cardOne).find("li").length).toBe(2);
    expect(card(cardTwo).find("li").length).toBe(2);
  });

  it("Deberia renderizar un 'li' con el nombre del tipo de dieta", () => {
    expect(card(cardOne).find("li").at(0).text()).toBe(cardOne.diets[0]);
    expect(card(cardOne).find("li").at(1).text()).toBe(cardOne.diets[1]);
    expect(card(cardTwo).find("li").at(0).text()).toBe(cardTwo.diets[0]);
    expect(card(cardTwo).find("li").at(1).text()).toBe(cardTwo.diets[1]);
  });

  it('Debería renderizar un tag "Link" que debe tener como texto "See more details" ', () => {
    expect(card(cardOne).find(Link).at(0).text()).toEqual("See more details");
    expect(card(cardTwo).find(Link).at(0).text()).toEqual("See more details");
  });

  it('Debería renderizar un tag "Link" que dirija a /home/details/:id, para ver los detalles de la receta', () => {
    expect(card(cardOne).find(Link).at(0).prop("to")).toEqual(`/home/details/${cardOne.id}`);
    expect(card(cardTwo).find(Link).at(0).prop("to")).toEqual(`/home/details/${cardTwo.id}`);
  });
});
