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

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;

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
      }
      break;
    }
    case "description": {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'Beskrivning' får inte innehålla mer än 100 tecken. ";
      }
      break;
    }
    case "dueDate": {
      if (value.length == 0) {
        dueDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk. ";
      }
      break;
    }
  }

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove("hidden");
}

function onSubmit(e) {
  e.preventDefault(); //förhindrar att den skicka med formuläret

  if (titleValid && descriptionValid && dueDateValid) {
    //Truti enbär att alla värderna går in om dom är sanna enligt let variablarna
    console.log("Submit");
    saveTask();
  }

  function saveTask() {}
}
