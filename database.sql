-- DATABASE Name: family_recipe
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "firstName" VARCHAR (20) NOT NULL,
  "lastname" VARCHAR (20) NOT NULL,
  "emailaddress" VARCHAR (40) NOT NULL
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "recipe_name" VARCHAR (80) NOT NULL,
  "picture" VARCHAR (500),
  "prep_time" VARCHAR (40),
  "cook_time" VARCHAR (40) NOT NULL,
  "brief_description" VARCHAR (500) NOT NULL,
  "instructions" VARCHAR (4000) NOT NULL,
  "date_posted" DATE,
  "date_updated" DATE,
  "user_id" INT
);

CREATE TABLE "ingredients" (
  "id" SERIAL PRIMARY KEY,
  "ingredient" VARCHAR (80) NOT NULL,
  "recipe_id" INT
);

CREATE TABLE "type_of_dish" (
  "id" SERIAL PRIMARY KEY,
  "dish_types" VARCHAR NOT NULL
);

CREATE TABLE "access_level" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "access" INT,
  "access_title" VARCHAR
);

CREATE TABLE "units" (
  "id" SERIAL PRIMARY KEY,
  "quantity" INT NOT NULL,
  "unit" VARCHAR,
  "ingredient_id" INT
);

CREATE TABLE "recipe_dish" (
  "id" SERIAL PRIMARY KEY,
  "dish_id" INT,
  "recipe_id" INT
);

ALTER TABLE "ingredients" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "access_level" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "units" ADD FOREIGN KEY ("ingredient_id") REFERENCES  "ingredients" ("id") ;

ALTER TABLE "recipe_dish" ADD FOREIGN KEY ("dish_id") REFERENCES "type_of_dish" ("id");

ALTER TABLE "recipe_dish" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");