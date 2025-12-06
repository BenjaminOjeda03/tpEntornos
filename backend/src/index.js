const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

// Conexión a MySQL usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "benja",
  password: process.env.MYSQL_PASSWORD || "280519.Benjamin",
  database: process.env.MYSQL_DATABASE || "entornos"
});

// Conectarse a MySQL
db.connect(err => {
  if (err) {
    console.error("Error al conectar MySQL:", err);
    process.exit(1); // Termina si no se puede conectar
  }
  console.log("Conexión exitosa a MySQL");

  // Crear tabla si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tareas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      estado ENUM('ToDo','Doing','Done') DEFAULT 'ToDo'
    );
  `;
  db.query(createTableQuery, (err) => {
    if (err) console.error("Error creando tabla tareas:", err);
    else console.log("Tabla 'tareas' lista");
  });
});

// Ruta de prueba
app.get("/", (req, res) => res.send("API funcionando"));

// POST /tareas
app.post("/tareas", (req, res) => {
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

// GET /tareas
app.get("/tareas", (req, res) => {
  db.query("SELECT * FROM tareas", (err, rows) => {
    if (err) {
      console.error("Error al obtener tareas:", err);
      return res.status(500).json({ fatal: true, error: err.message });
    }
    res.json(rows);
  });
});

// Levantar servidor
const port = process.env.BACKEND_PORT || 3000;
app.listen(port, () => console.log(`Backend corriendo en puerto ${port}`));
