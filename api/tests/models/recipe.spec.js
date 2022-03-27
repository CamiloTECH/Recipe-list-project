const { Recipe, conn, Diet } = require("../../src/db.js");
const { expect } = require("chai");

describe("Models", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Recipe Model", () => {
    beforeEach(async () => await Recipe.sync({ force: true }));

    describe("Title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({
          summary: "summary",
          image: "image",
        })
          .then(() => done(new Error("The title property cannot be null")))
          .catch(() => done());
      });
    });

    describe("Summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({
          title: "Title",
          image: "image",
        })
          .then(() => done(new Error("The summary property cannot be null")))
          .catch(() => done());
      });
    });

    describe("Image", () => {
      it("should throw an error if image is null", (done) => {
        Recipe.create({
          title: "Title",
          summary: "summary",
        })
          .then(() => done(new Error("The image property cannot be null")))
          .catch(() => done());
      });
    });

    describe("Enter data", () => {
      it("should throw an error if all data is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("The information cannot be null")))
          .catch(() => done());
      });

      it("should work when its a valid data", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "summary",
          image: "image",
        })
          .then(() => done())
          .catch((err) => done(err));
      });
    });

    describe("Score and HealthScore", () => {
      it("should throw an error if data type of score and healthScore is string", (done) => {
        Recipe.create({
          title:"Title",
          summary:"summary",
          image:"image",
          score:"string",
          healthScore:"string"
        })
          .then(() => done(new Error("The score property cannot be a string")))
          .catch(() => done());
      });
    });
  });

  describe("Diet Model", () => {
    beforeEach(async () => await Diet.sync({ force: true }));

    describe("Name", () => {
      it("should throw an error if name is null", (done) => {
        Diet.create({})
          .then(() => done(new Error("The name property cannot be null")))
          .catch(() => done());
      });

      it("should work when its a valid name", (done) => {
        Diet.create({
          name: "gluten free",
        })
          .then(() => done())
          .catch((err) => done(err));
      });

      it("should throw an error if there are two equal names", (done) => {
        Diet.create({
          name: "gluten free",
        })

        Diet.create({
          name: "gluten free",
        })
          .then(() => done(new Error("There cannot be two names equals")))
          .catch(() => done());
      });
    });
  });
});
