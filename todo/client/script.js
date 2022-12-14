//const todoForm = document.getElementById("todoForm");
//console.log("Hej", todoForm.title);
// Kan nå allt i ett formulär id och name

todoForm.title.addEventListener("input", (e) => validateField(e.target)); //Skickas direkt ett fält istället för event ta emot event obj i en arrow och skicka en target till
todoForm.title.addEventListener("blur", (e) => validateField(e.target)); // Är samma sak som när man ställer sig i fältet och lämnar som ovanför
todoForm.description.addEventListener("input", (e) => validateField(e.target));
todoForm.description.addEventListener("blur", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("input", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("blur", (e) => validateField(e.target));

todoForm.addEventListener("submit", onSubmit);

const todoListElement = document.getElementById("todoList"); //UL listan från HTML
const todoListElementFinished = document.getElementById("finished"); // Input listans html

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;
const api = new Api("http://localhost:5000/tasks"); //grund url till vårt api

/* */
function validateField(field) {
  //Tar imott e = eventet som alltid skickas aoutmatiskt från "input" på todofrom.title
  const { name, value } = field; //hämtar ut dom egenskaperna ur just field objectet

  let = validationMessage = "";
  //Beroende på namn ska det valideras
  switch (name) {
    case "title": {
      //kolla av input längre än 2 tecken
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' måste innehålla minst 2 tecken. ";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage =
          "Fältet 'Titel' får inte innehålla mer än 100 tecken. ";
      } else {
        titleValid = true;
      }
      break;
    }
    case "description": {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'Beskrivning' får inte innehålla mer än 100 tecken. ";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case "dueDate": {
      if (value.length == 0) {
        dueDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk. ";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove("hidden");
}

/*Function för att SKAPA(C)  */
function onSubmit(e) {
  e.preventDefault(); //förhindrar att den skicka med formuläret

  if (titleValid && descriptionValid && dueDateValid) {
    //Truti enbär att alla värderna går in om dom är sanna enligt let variablarna
    console.log("Submit");
    saveTask();
  }
}

/* */
function saveTask() {
  const task = {
    //plockar ut det som ska sparas ner
    //Hämtat upp värdet från alla fält
    title: todoForm.title.value, //Det som står i title fältet dess value säter i title task formatet
    description: todoForm.description.value,
    dueDate: todoForm.dueDate.value,
    completed: false,
  };

  //skickar tasks till api creat som heter data sedan gör om det till JSON sträng. then för att ta emot return från api som är ett promise
  api.create(task).then((task) => {
    if (task) {
      renderList();
    }
  });
}

/* Ta emot ny task och lägga till den i listan  function för att LÄSA(R)*/
function renderList() {
  console.log("rendering");
  api.getAll().then((tasks) => {
    /* Generera lista av uppgifter */
    //__________

    // tasks.sort((first, second) => first.dueDate - second.dueDate);
    // promise.then()
    // console.log.then(users);
    //___________
    todoListElement.innerHTML = ""; //tar bort html i Ul börja från 0
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        todoListElement.insertAdjacentHTML("beforeend", renderTask(task)); //skall lägga in html i slutet från renderTask()
      });
    }
  });
}

/* HTML */
function renderTask({ id, title, description, dueDate, completed }) {
  //Kommer att plocka ut just de egenskaper man vill ha se mina val
  //Html CODE
  let html = `
    <li class="select-none mt-2 py-2 border-b border-sky-300">
     <div class="flex items-center">
      <h3 class="mb-3 flex-1 text-l font-bold text-purple-500 uppercase">${title}</h3>
      <div>
       <span `;
  completed && (html += `class="text-green-900 font-semibold"`);
  html += `>${dueDate}</span>
       <input 
         value="${id}"
         type="checkbox"
         onchange="uppdateTask(this)"         
         class="inline-block text-xs rounded-md bg-pink-400 hover:bg-pink-500 py-1 px-3 rounded-md ml-2" `;
  completed && (html += ` checked`);
  html += `>
         <label `;
  completed && (html += `class="text-green-900 font-semibold"`);
  html += `>Finished</label>           
       <button onclick="deleteTask(${id})" class="inline-block text-xs rounded-md bg-pink-400 hover:bg-pink-500 py-1 px-3 rounded-md ml-2">Delete</button>
       </div>
     </div>`;
  // Om descriptons skriv med kommer det att visas eller inte
  description &&
    (html += `
        <p class="ml-8 mt-2 text-xs italic">${description}</p> 
        `);
  html += `
    </li>`;

  return html; //returnerar ut html koden
}

function deleteTask(id) {
  console.log(id);
  api.remove(id).then((result) => {
    renderList(); //visar All uppgifter direkt vid laddning av sidan alltså en uppdate av sidan
  });
}

function uppdateTask(checkbox) {
  console.log(checkbox.value);
  api.uppdate(checkbox.value).then((result) => {
    renderList(); //visar All uppgifter direkt vid laddning av sidan alltså en uppdate av sidan
  });
}

renderList(); //visar All uppgifter direkt vid laddning av sidan alltså en uppdate av sidan
