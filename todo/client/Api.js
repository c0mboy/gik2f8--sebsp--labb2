class Api {
  url = "";

  constructor(url) {
    this.url = url;
  }

  //starta server  cd todo/server & node app.js
  // Create = POST
  create(data) {
    const JSONData = JSON.stringify(data);
    console.log(`Sending ${JSONData} to ${this.url}`);

    const request = new Request(this.url, {
      method: "POST",
      body: JSONData, // Innehållet faktista data
      headers: {
        "content-type": "application/json", //berättar för servern att det kommer JSON datai body
      },
    });

    return fetch(request)
      .then((result) => result.json()) // för att göra om resultatet till JSON
      .then((data) => data) // Skicka ut data  ur hela then kedjan
      .catch((err) => console.log(err)); //Ifall det blir fel för konsol
  }

  //Hämtar all data från urlen skapar ett request objekt med alla inställningar. methoden är GET
  //Read = GET
  getAll() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // delete = DELETE
  remove(id) {
    console.log(`Removing task whit id:${id}`);

    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  // uppdate = PUT working title
  uppdate(uppdateID) {
    const JSONData = JSON.stringify({ id: uppdateID });
    console.log("Uppdateing task id:", JSONData);

    return fetch(`${this.url}/${uppdateID}`, {
      method: "PUT", //put
      body: JSONData, // Innehållet faktista data
      headers: {
        "content-type": "application/json", //berättar för servern att det kommer JSON datai body
      },
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}
