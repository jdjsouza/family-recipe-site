const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this get is for a random recipe to be displayed on the homepage

// router.get('/random', (req, res) => {
//   const queryText = 'SELECT id, recipe_name, picture, description FROM recipes';
//   pool
//     .query(queryText)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('Error getting random recipes', err);
//       res.sendStatus(500);
//     });
// });

// Get all recipes (name, pic, brief_desc) created by a specific creator

router.get('/user/:id', (req, res) => {
  const queryText = `SELECT id, recipe_name, picture, brief_description FROM recipes
  WHERE "user_id" = $1
  ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting creator recipes', err);
      res.sendStatus(500);
    });
});

// Get all recipes (name, pic, brief_desc) with a specific dish type

// router.get('/dish/:id', (req, res) => {
//   const queryText = 'SELECT id, recipe_name, picture, description FROM recipes';
//   pool
//     .query(queryText)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('Error getting specific dish recipes', err);
//       res.sendStatus(500);
//     });
// });

// Get all recipes (name, pic, brief_desc) with a ingredient

// router.get('/dish/:id', (req, res) => {
//   const queryText = 'SELECT id, recipe_name, picture, description FROM recipes';
//   pool
//     .query(queryText)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('Error getting specific dish recipes', err);
//       res.sendStatus(500);
//     });
// });

// This will be used to pull all the info for a the details page
// the call ID will be passed from multiple pages: browse by creator, browse by specific dish type, search results

// router.get('/details/:id', (req, res) => {
//   const queryText = 'SELECT id, recipe_name, picture, description FROM recipes';
//   pool
//     .query(queryText)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('Error getting random recipes', err);
//       res.sendStatus(500);
//     });
// });

// POST recipe will send info to multiple tables

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created recipe
  const insertRecipeQuery = `
  INSERT INTO "recipes" ("recipe_name", "picture", "prep_time", "cook_time", 
  "brief_description", "instructions", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING "id";`;

  // FIRST QUERY MAKES RECIPE
  pool
    .query(insertRecipeQuery, [
      req.body.recipe_name,
      req.body.picture,
      req.body.prep_time,
      req.body.cook_time,
      req.body.brief_description,
      req.body.instructions,
      req.body.user_id,
    ])
    .then((result) => {
      for (let i = 0; i < req.body.dish_id.length; i++) {
        console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!

        const createdRecipeId = result.rows[0].id;

        // Depending on how you make your junction table, this insert COULD change.
        const insertRecipeDishQuery = `
      INSERT INTO "recipe_dish" ("recipe_id", "dish_id")
      VALUES  ($1, $2);
      `;
        // SECOND QUERY MAKES RECIPE TO DISH TYPE RELATION IN JUNCTION TABLE
        pool
          .query(insertRecipeDishQuery, [createdRecipeId, req.body.dish_id[i]])
          .then((result) => {
            //Now that both are done, send back success!
            res.sendStatus(201);
          })
          .catch((err) => {
            // catch for second query
            console.log('second query post', err);
            res.sendStatus(500);
          });
      }
    })
    .then((result) => {
      for (let i = 0; i < req.body.materials.length; i++) {
        console.log('Third Query New Recipe Id:', result.rows[0].id); //ID IS HERE!

        const insertRecipeDishQuery = `
      INSERT INTO "ingredients" ("recipe_id", "ingredient", "quantity"),
      VALUES  ($1, $2, $3)
      RETURNING "id";`;

        // THIRD QUERY ADDS INGREDIENTS TO INGREDIENT TABLE
        pool
          .query(insertRecipeDishQuery, [
            createdRecipeId,
            req.body.materials[i].ingredient,
            req.body.materials[i].quantity,
          ])
          .then((result) => {
            const createdIngredientId = result.rows[0].id;
            const insertUnitQuery = `
      INSERT INTO "ingredient_units" ("units_id" "ingredients_id")
      VALUES  ($1, $2)
      RETURNING "id";
      `;
            pool
              .query(insertUnitQuery, [
                createdIngredientId,
                req.body.materials[i].unit_id,
              ])
              .then((result) => {
                res.sendStatus(201);
              })
              .catch((err) => {
                console.log('fourth super nested post', err);
                res.sendStatus(500);
              });
            //Now that both are done, send back success!
            res.sendStatus(201);
          })
          .catch((err) => {
            // catch for third query
            console.log('third query post', err);
            res.sendStatus(500);
          });
      }
    })
    // .then((result) => {
    //   for (let i = 0; i < req.body.materials.length; i++) {
    //     console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!

    //     const createdIngredientId = result.rows[0].id;

    //       const insertUnitQuery = `
    //     INSERT INTO "ingredient_units" ("units_id" "ingredients_id")
    //     VALUES  ($1, $2)
    //     RETURNING "id";
    //     `;
    //     // FOURTH QUERY JUNCTION INGREDIENTS TABLE AND UNIT TABLE
    //     pool
    //       .query(insertRecipeDishQuery, [
    //         createdIngredientId,
    //         req.body.unitId[i],
    //       ])
    //       .then((result) => {
    //         //Now that both are done, send back success!
    //         res.sendStatus(201);
    //       })
    //       .catch((err) => {
    //         // catch for fourth query
    //         console.log('fourth query post', err);
    //         res.sendStatus(500);
    //       });
    //   }
    // })
    // Catch for first query
    .catch((err) => {
      console.log('first query post', err);
      res.sendStatus(500);
    });
});

module.exports = router;
