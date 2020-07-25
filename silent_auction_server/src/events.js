const express = require("express");

function createRouter(db) {
  const router = express.Router();
  const owner = "";

  router.post("/donations", (req, res, next) => {
    db.query(
      "INSERT INTO donations ( item_number, item_name, donated_by, description, purchased_by) VALUES (?,?,?,?,?)",
      [
        req.body.item_name,
        req.body.item_number,
        req.body.donated_by,
        req.body.description,
        req.body.purchased_by,
      ],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
        } else {
          res.status(200).json({ status: "ok" });
        }
      }
    );
  });

  router.get("/donations", function (req, res, next) {
    db.query(
      "SELECT item_number, item_name, donated_by, description, purchased_by FROM donations ORDER BY item_number",
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "error" });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
