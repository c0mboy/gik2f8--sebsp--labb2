const express = require("express");
const app = express();
const fs = require("fs/promises"); //fs betyder att man kan komminuceria med en fil server

const PORT = 5000;

// midelware hjälp grejer lägger på server för att enklare kan hantera request och konfig
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Method", "*");

    next();
  });

app.get("/task", async (req, res) => {
  try {
    const tasks = await fs.readFile("./tasks.json");
    res.send(JSON.parse(tasks));
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
