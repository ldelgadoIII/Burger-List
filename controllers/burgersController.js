const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

// DISPLAY
router.get("/", (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// CREATE
router.post("/api/burgers", (req, res) => {
  burger.create(
    ["name", "devour"],
    [req.body.name, req.body.devour],
    (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

// UPDATE
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burger.update(
    {
      devour: req.body.devour,
    },
    condition,
    (result) => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// DELETE
router.delete("/api/burgers/:id", (req, res) => {
  const condition = `${req.params.id}`;

  burger.delete(condition, (result) => {
    console.log(result);
    if (result.affectedRows == 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
