
async function cameraList() {
  const cameras = await getProduit();
  console.log(cameras)
  // Lien avec la page index HTML 
  const listeProduit = document.getElementById("listeProduit");
  
  // Structure de la page index HTML 
  cameras.forEach((produit) => {
    const produitCarte = document.createElement("div");
    const produitCarteBody = document.createElement("div");
    const produitPhoto = document.createElement("img");
    const produitLien = document.createElement("a");
    const produitTexte = document.createElement("div");
    const produitNom = document.createElement("h3");
    const produitDescription = document.createElement("p");
    const produitPrix = document.createElement("p");
    // Ajout des attributs pour les balises
    produitCarte.setAttribute("class", "card overflow-hidden ombre my-5 mx-4 dimension_carte");
    produitCarteBody.setAttribute("class", "card-body color_background_second");
    produitPhoto.setAttribute("class", "img-fluid");
    produitPhoto.setAttribute("src", produit.imageUrl);
    produitPhoto.setAttribute("alt", "camera,appareil photo");
    produitLien.setAttribute("href", "produit.html?id=" + produit._id);
    produitLien.setAttribute("class", "stretched-link");
    produitTexte.setAttribute("class", "card-body color_background_second");
    produitNom.setAttribute("class", "card-title");
    produitDescription.setAttribute("class", "card-text");
    produitPrix.setAttribute("class", "card-text font-weight-bold");
  
    // Arborescence des éléments
    listeProduit.appendChild(produitCarte);
    produitCarte.appendChild(produitCarteBody);
    produitCarteBody.appendChild(produitPhoto);
    produitCarteBody.appendChild(produitLien);
    produitCarte.appendChild(produitTexte);
    produitTexte.appendChild(produitNom);
    produitTexte.appendChild(produitDescription);
    produitTexte.appendChild(produitPrix);
  
    // Contenu des balises
    produitNom.innerText = produit.name;      
    produitDescription.innerText=produit.description;
    produitPrix.innerText="Prix: " + produit.price / 100 +" €";
  });
}


