/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn, Diet } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  title: "milanea a la napolitana",
  summary: "summary",
  image: "image",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>Recipe.sync({ force: true }).then(() => Recipe.create(recipe)));

  describe("GET /", () => {
    it("should get 200 and a array of recipes", () => agent
        .get("/")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.have.length(101);
        })).timeout(10000);
  });

  describe("GET /recipes?name", () => {
    it("should get 404 and a message if the name is not found", () => agent
        .get("/recipes?name=asjsjsajs")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.eql([{ error: "No recipes found" }]);
        })).timeout(10000);

    it("should get 404 and a message if the name is null", () => agent
        .get("/recipes?name")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.eql([{ error: "No hay parametro de busqueda" }]);
        })).timeout(10000);

    it("should get 200 and a array if name is valid", () => agent
        .get("/recipes?name=Milanea a la napolitana")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.have.length(1);
        })).timeout(10000);
  });

  describe("GET /recipes/:id", () => {
    it("should get 404 and a message if the id is not found", () => agent
        .get("/recipes/ass")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.eql({ error: `Recipe with ID ass not found` });
        })).timeout(10000);

    it("should get 200 and a object if id is valid", () => agent
        .get("/recipes/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          const data = Object.keys(res.body);
          expect(data).to.have.length(8);
          expect(data).to.eql([
            "title",
            "summary",
            "score",
            "healthScore",
            "diets",
            "dishes",
            "steps",
            "image",
          ]);
        })).timeout(10000);
  });

  describe("GET /recipes/db/:id", () => {
    it("should get 404 and a message if the id is not found", () =>
      agent
        .get("/recipes/db/ass")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.eql({ error: `Recipe with ID ass not found` });
        }));

    it("should get 200 and a object if id is valid", async () => {
      const newRecipe = await Recipe.create(recipe);
      return agent
        .get(`/recipes/db/${newRecipe.id}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.title).to.eql("milanea a la napolitana");
        });
    });
  });

  describe("GET /types", () => {
    before(async () => await Diet.sync({ force: true }));

    it("should get 200 and a array if the types are found", () => agent
        .get(`/types`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.have.length(10);
        })).timeout(10000);
  });

  describe("POST /recipes", () => {
    beforeEach(async () => await Recipe.sync({ force: true }));

    it("should get 200 and a object if all data is complete", () => agent
        .post(`/recipes`)
        .send({
          title: "Recipe 1",
          summary: "summary 1",
          image: "image 1",
          diets: [1, 2, 3, 4],
          healthScore: 34,
          steps: "steps 1",
        })
        .expect(200)
        .expect("Content-Type", /json/));

    it("should get 400 and error if all data is not complete", () => agent
        .post(`/recipes`)
        .send({
          summary: "summary 1",
          image: "image 1",
          diets: [1, 2, 3, 4],
          healthScore: 34,
          steps: "steps 1",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.eql({
            error: "You must enter the complete data",
          });
        }));

  });
  
});
