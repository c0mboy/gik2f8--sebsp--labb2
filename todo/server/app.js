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
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await fs.readFile("./tasks.json");
    res.send(JSON.parse(tasks));
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;

    const listBuffer = await fs.readFile("./tasks.json");
    const currentTasks = JSON.parse(listBuffer);
    // sätter id
    let maxTaskId = 1;
    if (currentTasks && currentTasks.length > 0) {
      maxTaskId = currentTasks.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
        maxTaskId
      );
    }
    //variabel för att att använda flera gångermed +1 på id och spread operator
    const newTask = { id: maxTaskId + 1, ...task };
    const newList = currentTasks ? [...currentTasks, newTask] : [newTask];
    console.log(newList);
    //Skriver det i filen och gör om det till en sträng
    await fs.writeFile("./tasks.json", JSON.stringify(newList));
    //res.send([task, ...currentTasks]); // Spread operator allt som finns i currentasks kommer läggas som tilläg i task
    res.send(newTask);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const listBuffer = await fs.readFile("./tasks.json"); // läser upp dom befintliga filerna
    const currentTasks = JSON.parse(listBuffer);

    if (currentTasks.length > 0) {
      //Om det inte finns filer
      await fs.writeFile(
        "./tasks.json",
        JSON.stringify(currentTasks.filter((task) => task.id != id))
      );
      res.send({ message: `Uppgift med id ${id} togs bort.` });
    } else {
      res.status(404).send({ error: "Ingen uppgift att ta bort" });
      //Annars skickar vi status 500 och string
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//Uppdate Working title
// app.uppdate("/tasks", async (req, res) => {
//   try {
//     const req = new XMLHttpRequest();
//     req.open("PUT", "/tasks/" + data.id); // or request.open("PATCH", "/tasks/" + data.id);
//     req.setRequestHeader("Content-Type", "application/json");
//     req.send(JSON.stringify(data));
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
