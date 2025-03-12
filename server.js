const express = require("express");

const app = express();
const PORT = 3000;

// Datos hardcoded
const alumnos = [
  { nombre: "José Koyoc", matricula: "A21216301" },
  { nombre: "Mariana Pech", matricula: "A21216302" },
  { nombre: "Ricardo Canul", matricula: "A21216303" },
  { nombre: "Andrea Uc", matricula: "A21216304" },
  { nombre: "Felipe Dzib", matricula: "A21216305" },
  { nombre: "Sofía Tzec", matricula: "A21216306" }
];

const profesores = [
  { nombre: "Dr. Francisco López", numeroEmpleado: "P2001" },
  { nombre: "Mtra. Gabriela Martínez", numeroEmpleado: "P2002" },
  { nombre: "Ing. Juan Carlos Rodríguez", numeroEmpleado: "P2003" },
  { nombre: "Lic. Patricia Herrera", numeroEmpleado: "P2004" },
  { nombre: "Mtro. Ernesto Ramírez", numeroEmpleado: "P2005" },
  { nombre: "Dra. Marcela Gutiérrez", numeroEmpleado: "P2006" }
];

// Rutas
app.get("/alumnos", (req, res) => {
  res.json(alumnos);
});

app.get("/profesores", (req, res) => {
  res.json(profesores);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor SICEI corriendo en http://localhost:${PORT}`);
});

