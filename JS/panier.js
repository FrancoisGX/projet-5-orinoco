panierRecap = () => {
  if (userPanier.length > 0) {
    document.getElementById("panierVide").remove();

    //Création de la structure du tableau récap
    const recap = document.createElement("table");
    recap.setAttribute("class", "col-sm-12 mx-lg-2");
    const ligneTableau = document.createElement("tr");
    const recapPhoto = document.createElement("th");
    const recapNom = document.createElement("th");
    const recapQuantite = document.createElement("th");
    const recapPrixUnitaire = document.createElement("th");
    const recapRemove = document.createElement("th");
    const ligneTotal = document.createElement("tr");
    const colonneTotal = document.createElement("th");
    const recapPrixPaye = document.createElement("td");

    //Structure dans la page
    let recapPanier = document.getElementById("panier-recap");
    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapQuantite);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

    //Contenu des entetes
    recapPhoto.textContent = "Article";
    recapNom.textContent = "Nom";
    recapQuantite.textContent = "Quantité";
    recapPrixUnitaire.textContent = "Prix (unitaire)";
    recapRemove.textContent = "Retirer";

  
    
    //Boucle FOR pour affichage des articles dans le panier
     
    for (let i = 0; i<userPanier.length; i++) {
      //Création des lignes du tableau

      const ligneArticle = document.createElement("tr");
      const photoBloc = document.createElement("div");
      const photoArticle = document.createElement("img");
      const nomArticle = document.createElement("td");
      const produitQuantite = document.createElement("td");
      const prixUnitArticle = document.createElement("td");
      const supprimerArticle = document.createElement("td");
      const removeArticle = document.createElement("i");

      //Attribu
      ligneArticle.setAttribute("id", [i]);
      photoBloc.setAttribute("class", "card bloc_image_panier overflow-hidden border bg-secondary" );
      photoArticle.setAttribute("class", "img-fluid border_img image");
      photoArticle.setAttribute("src", userPanier[i].photo);
      photoArticle.setAttribute("alt", "Photo de l'article commandé");
      nomArticle.setAttribute("class", "px-2 px-lg-4");
      produitQuantite.setAttribute("class", "px-3");
      prixUnitArticle.setAttribute("class", "px-3");
      removeArticle.setAttribute("id", [i]);
      removeArticle.setAttribute("class", "fas fa-trash fa-1x btn-remove  px-1 px-lg-5");
      console.log(i);

      //Supprimer un produit du panier
      removeArticle.addEventListener("click", (event) => {this.supprProduit(i);})

      //Agencement de la structure
      recap.appendChild(ligneArticle);
      ligneArticle.appendChild(photoBloc);
      photoBloc.appendChild(photoArticle);
      ligneArticle.appendChild(nomArticle);
      ligneArticle.appendChild(produitQuantite);
      ligneArticle.appendChild(prixUnitArticle);
      ligneArticle.appendChild(supprimerArticle);
      supprimerArticle.appendChild(removeArticle);

      //Contenu des lignes des produits
      nomArticle.textContent = userPanier[i].nomProduit;
      produitQuantite.textContent = userPanier[i].quantite;
      prixUnitArticle.textContent = userPanier[i].prix  + " €";
      console.log(userPanier[i].nomProduit);
    };


    //Ligne somme total
    recap.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneTotal);
    colonneTotal.textContent = "Total à payer";
    ligneTotal.appendChild(recapPrixPaye);

    recapPrixPaye.setAttribute("id", "sommeTotal");
    recapPrixPaye.setAttribute("colspan", "4");
    colonneTotal.setAttribute("colspan", "2");

    //Calcule de l'addition total
    let sommeTotal = 0;
    userPanier.forEach((userPanier) => {
      sommeTotal += userPanier.prix*userPanier.quantite ;
    });

    //Affichage du prix total à payer
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};

supprProduit = (i) =>{
  console.log("Administration : Enlever le produit à l'index " + i);
    //recupérer le array
    userPanier.splice(i, 1); 
    console.log("Administration : " + userPanier);
    //vide le localstorage
    localStorage.clear();
    console.log("Administration : localStorage vidé");
    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log("Administration : localStorage mis à jour");
    window.location.reload();
};


//--------FORMULAIRE---------//

//Check des différents input du formulaire
checkFormulaire = () => {
  //Controle Regex
  const checkNumber = /[0-9]/;
  const checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  let checkMessage = "";
  //Récupération des inputs

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const adresse = document.getElementById("adresse").value;
  const ville = document.getElementById("ville").value;
  const missNom = document.getElementById('missNom');
  const missPrenom = document.getElementById('missPrenom');
  const missEmail = document.getElementById('missEmail');
  const missAdress = document.getElementById('missAdress');
  const missCity = document.getElementById('missCity');

  //tests des différents input du formulaire
  //Test du nom
  if (nom == ""){
    document.getElementById("nom").style.border="2px solid red";
    checkMessage ="erreur";
  } else if ( checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true ) {
      missNom.textContent = 'Format incorrect';
      missNom.style.color = 'red';
      checkMessage ="erreur"
      document.getElementById("nom").style.border="2px solid red";
  } else {
    document.getElementById("nom").style.border="none";
    missNom.textContent = "";
    console.log("Nom accepté");
  }
  //Test du prénom
  if (prenom == ""){
    document.getElementById("prenom").style.border="2px solid red";
    checkMessage ="erreur";
  } else if (checkNumber.test(prenom) == true ||checkSpecialCharacter.test(prenom) == true) {
    missPrenom.textContent = 'Format incorrect';
    missPrenom.style.color = 'red';
    checkMessage ="erreur";
    document.getElementById("prenom").style.border="2px solid red";
  } else {
    document.getElementById("prenom").style.border="none";
    missPrenom.textContent = "";
    console.log("Prénom accepté");
  }
  //Test du mail
  if (email==""){
    document.getElementById("email").style.border="2px solid red";
    checkMessage ="erreur";
  }else if (checkMail.test(email) == false) {
    missEmail.textContent = 'Format incorrect';
    missEmail.style.color = 'red';
    checkMessage ="erreur";
    document.getElementById("email").style.border="2px solid red";
  } else {
    document.getElementById("email").style.border="none";
    missEmail.textContent = "";
    console.log("Adresse mail acceptée");
  }
  //Test de l'adresse
  if (adresse == ""){
    document.getElementById("adresse").style.border="2px solid red";
    checkMessage ="erreur";
  }else if (checkSpecialCharacter.test(adresse) == true) {
    missAdress.textContent = 'Format incorrect';
    missAdress.style.color = 'red';
    checkMessage ="erreur";
    document.getElementById("adresse").style.border="2px solid red";
  } else {
    console.log(" Adresse postale acceptée");
    document.getElementById("adresse").style.border="none";
    missAdress.textContent = "";
  }
  //Test de la ville
  if (ville == ""){
    document.getElementById("ville").style.border="2px solid red";
    checkMessage ="erreur";
  } else if (checkSpecialCharacter.test(ville) == true ||checkNumber.test(ville) == true) {
    missCity.textContent = 'Format incorrect';
    missCity.style.color = 'red';
    checkMessage ="erreur";
    document.getElementById("ville").style.border="2px solid red";
  } else {
    document.getElementById("ville").style.border="none";
    missCity.textContent = "";
    console.log("Ville acceptée");
  }
  if(checkMessage !=""){
    console.log("Alert: Formulaire incorrect");
  }else{
    contact = {
      firstName : nom,
      lastName : prenom,
      address : adresse,
      city : ville,
      email : email,
    };
    return contact;
  }
};

let products = [];
//Vérification du panier
checkPanier = () =>{
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("userPanier"));
  //Si le panier est vide ou null
 if(etatPanier.length < 1 || etatPanier == null){
	console.log("Administration: ERROR =>le localStorage ne contient pas de panier")
	alert("Votre panier est vide");
	return false;
}else{
	console.log("Administration : Le panier n'est pas vide")
    //Si le panier n'est pas vide on renvoi l'id
    JSON.parse(localStorage.getItem("userPanier")).forEach((produit) =>{
    	products.push(produit.id_Produit);
    });
    console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
    return true;
}
};

  let contact;
  //Au click sur le bouton commander
  validFormulaire = () =>{
    //Ecoute de l'event click du formulaire
    let btnForm = document.getElementById("commander");
    btnForm.addEventListener("click", function(){
      //Lancement des verifications du panier et du form => si Ok envoi
      if(checkPanier() == true && checkFormulaire() != null){
      	console.log("Administration : L'envoi peut etre fait");
      //Création de l'objet à envoyer
      let objet = {
      	contact,
      	products
      };
      console.log("Administration : " + objet);
     //Conversion en JSON
     let envoiForm = JSON.stringify(objet);
     envoiFormulaire(envoiForm, url);
     //Envoi de l'objet via la function
     console.log(objet);

     //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
     contact = {};
     products = [];
     localStorage.clear();
 }else{
   alert("une erreur est survenue")
 	console.log("Administration : ERROR");
 };
});
};

let url= "http://localhost:3000/api/cameras/order";
//Envoi du formulaire
  //Fonction requet post de l'API
  const envoiFormulaire = (envoiForm, url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
          sessionStorage.setItem("order", this.responseText);
          window.location = "./order.html";
          resolve(JSON.parse(this.responseText));
          console.log(envoiForm);
        } else {
          console.log("Probleme avec l'api");
          alert("Probleme avec l'api")
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(envoiForm);
      console.log(envoiForm);
    });
  };