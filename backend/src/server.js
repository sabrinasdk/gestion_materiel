import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/database.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API Gestion Matériel opérationnelle",
  });
});

// Tester MySQL
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS date_serveur");

    res.json({
      success: true,
      message: "Connexion MySQL réussie",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Erreur de connexion MySQL",
    });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
