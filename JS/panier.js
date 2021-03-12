panierCreation = () => {
  if (userPanier.length > 0) {
    document.getElementById("panierVide").remove();

    //Création de la structure du tableau récapitulatif
    let recap = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let recapPhoto = document.createElement("th");
    let recapNom = document.createElement("th");
    let recapPrixUnitaire = document.createElement("th");
    let recapRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneTotal = document.createElement("th");
    let recapPrixPaye = document.createElement("td");

    //Placement de la structure dans la page
    let recapPanier = document.getElementById("panier-recap");
    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

    //contenu des entetes
    recapPhoto.textContent = "Article";
    recapNom.textContent = "Nom";
    recapPrixUnitaire.textContent = "Prix";
    recapRemove.textContent = "Annuler ?";

  
    
    //Boucle FOR pour affichage des articles dans le panier
     
    for (let i = 0; i<userPanier.length; i++) {
    
      //Création des lignes du tableau

      let ligneArticle = document.createElement("tr");
      let photoBloc = document.createElement("div");
      let photoArticle = document.createElement("img");
      let nomArticle = document.createElement("td");
      let prixUnitArticle = document.createElement("td");
      let supprimerArticle = document.createElement("td");
      let removeArticle = document.createElement("i");

      //Attribution des class ou Id
      ligneArticle.setAttribute("id", "article" + [i]);
      photoBloc.setAttribute("class", "card bloc_image_panier overflow-hidden border bg-secondary" );
      photoArticle.setAttribute("class", "img-fluid border_img image");
      photoArticle.setAttribute("src", userPanier[i].imageUrl);
      photoArticle.setAttribute("alt", "Photo de l'article commandé");
      removeArticle.setAttribute("id", "remove" + [i]);
      removeArticle.setAttribute("class", "fas fa-trash fa-1x");
      removeArticle.setAttribute("title", "Supprimer article ?");
      console.log(i);

      //Supprimer un produit du panier
      removeArticle.addEventListener("click", (event) => {this.annulerProduit(i);})

      //Agencement de la structure HTML
      recap.appendChild(ligneArticle);
      ligneArticle.appendChild(photoBloc);
      photoBloc.appendChild(photoArticle);
      ligneArticle.appendChild(nomArticle);
      ligneArticle.appendChild(prixUnitArticle);
      ligneArticle.appendChild(supprimerArticle);
      supprimerArticle.appendChild(removeArticle);

      //Contenu de chaque ligne
      nomArticle.textContent = userPanier[i].name;
      prixUnitArticle.textContent = userPanier[i].price / 100 + " €";
      console.log(userPanier[i].name);
    };


    //Dernière ligne du tableau : Total
    recap.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneTotal);
    ligneTotal.setAttribute("id", "ligneSomme");
    colonneTotal.textContent = "Total à payer";
    ligneTotal.appendChild(recapPrixPaye);

    recapPrixPaye.setAttribute("id", "sommeTotal");
    recapPrixPaye.setAttribute("colspan", "4");
    colonneTotal.setAttribute("id", "colonneTotal");
    colonneTotal.setAttribute("colspan", "2");

    //Calcule de l'addition total
    let sommeTotal = 0;
    userPanier.forEach((userPanier) => {
      sommeTotal += userPanier.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};

annulerProduit = (i) =>{
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