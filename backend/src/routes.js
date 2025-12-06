const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // GET todas las tareas
  router.get("/tareas", (req, res) => {
    db.query("SELECT * FROM tareas", (err, rows) => {
      if (err) {
        console.error("Error al obtener tareas:", err);
        return res.status(500).json({ fatal: true, error: err.message });
      }
      res.json(rows);
    });
  });

  // POST crear tarea
  router.post("/tareas", (req, res) => {
    const { titulo, estado } = req.body;

    if (!titulo) {
      return res.status(400).json({ fatal: true, error: "El campo 'titulo' es obligatorio" });
    }

    const insertQuery = "INSERT INTO tareas (titulo, estado) VALUES (?, ?)";
    db.query(insertQuery, [titulo, estado || "ToDo"], (err, result) => {
      if (err) {
        console.error("Error al insertar tarea:", err);
        return res.status(500).json({ fatal: true, error: err.message });
      }
      res.json({ id: result.insertId, titulo, estado: estado || "ToDo" });
    });
  });

  return router;
};
