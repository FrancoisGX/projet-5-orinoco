getProduit = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
        ) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else {
          console.log("Probleme avec l'api");
        }
      };
      request.open("GET", "http://localhost:3000/api/cameras/" + idProduit);
      request.send();
    });
  };
  
  let idProduit = "";