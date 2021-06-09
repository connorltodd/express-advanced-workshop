const express = require("express");
const app = express();
const port = 5000;

const connection = require("./config");

app.use(express.json());

connection.connect((error) => {
  if (error) console.log(error);
  else console.log(`connected to database on thread ${connection.threadId}`);
});

app.get("/movies", (request, response) => {
  let sql = "SELECT * FROM movies ";
  let sqlValues = [];
  // search by color (and / or ) duration
  const { color, duration } = request.query;

  if (color || duration) {
    if (color && duration) {
      sql += `WHERE color = ? AND duration <= ?`;
      sqlValues = [color, duration];
    } else if (color) {
      sql += `WHERE color = ?`;
      sqlValues = [color];
    } else if (duration) {
      sql += "WHERE duration <= ?";
      sqlValues = [duration];
    }
  }

  connection.query(sql, sqlValues, (error, results) => {
    if (error) response.status(500).send(error);
    else response.status(200).json(results);
  });
});

app.get("/movies/:id", (request, response) => {
  const movieId = request.params.id;
  connection.query(
    "SELECT * FROM movies WHERE id = ?",
    [movieId],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        if (results.length) response.status(200).json(results);
        else
          response
            .status(404)
            .send(`Movie with the id: ${movieId} does not exist`);
      }
    }
  );
});

app.post("/movies", (request, response) => {
  const newMovie = request.body;
  connection.query("INSERT INTO movies SET ?", [newMovie], (error, results) => {
    if (error) response.status(500).send(error);
    else {
      const newMovieId = results.insertId;
      connection.query(
        "SELECT * FROM movies where id = ?",
        [newMovieId],
        (error, results) => {
          if (error) response.status(500).send(error);
          else response.status(200).json(results[0]);
        }
      );
    }
  });
});

app.listen(port, (error) => {
  if (error) console.log(error);
  else console.log(`App listening at ${port}`);
});
