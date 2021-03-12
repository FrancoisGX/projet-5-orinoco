async function cameraDetail() {
    idProduit = location.search.substring(4);
    const produitSelect = await getProduit();
    
    /* Lien avec la page index produit*/
    let detailProduit = document.getElementById("detailProduit");
    
    /* Structure index produit */
    const contenantPhoto = document.createElement("div");
    const blocPhoto = document.createElement("div");
    const produitPhoto = document.createElement("img");
    const contenantDetail = document.createElement("div");
    const produitNom = document.createElement("h2");
    const produitDescription = document.createElement("h3");
    const detailOption = document.getElementById("detailOption");
    const produitPrix = document.createElement("p");
    const ajoutPanier = document.getElementById("ajoutPanier")
  
    
    /* Ajout des attributs au balise produit */
    contenantPhoto.setAttribute("class", "col-12 col-md-6 d-flex justify-content-center ");
    blocPhoto.setAttribute("class", "card bloc_image overflow-hidden border ombre bg-secondary");
    produitPhoto.setAttribute("img", "img-fluid border_img image");
    produitPhoto.setAttribute("src", produitSelect.imageUrl);
    produitPhoto.setAttribute("alt", "Photo de " + produitSelect.name);
    contenantDetail.setAttribute("class", "col-6" );
    
    /* Arborescence des éléments produit */
    detailProduit.appendChild(contenantPhoto);
    contenantPhoto.appendChild(blocPhoto);
    blocPhoto.appendChild(produitPhoto);
    detailProduit.appendChild(contenantDetail);
    contenantDetail.appendChild(produitNom);
    contenantDetail.appendChild(produitDescription);
    contenantDetail.appendChild(detailOption);
    contenantDetail.appendChild(produitPrix);
    contenantDetail.appendChild(ajoutPanier);
  
    /* Contenu des balises produit */
    produitNom.innerText = produitSelect.name;      
    produitDescription.innerText=produitSelect.description;
    produitPrix.innerText="Prix: " + produitSelect.price / 100 +" €";
  
    produitSelect.lenses.forEach((produit) => {
      let choixOption = document.createElement("option");
      document.getElementById("optionSelect").appendChild(choixOption).innerHTML = produit;
    });    
}

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem("userPanier"));
/* Creation d'un panier utilisateur */
if(localStorage.getItem("userPanier")){
	console.log("Admin : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Admin: Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let userPanier = [];
  	localStorage.setItem("userPanier", JSON.stringify(userPanier));
  };

addPanier = () =>{
  //Au clic de l'user pour mettre le produit dans le panier
  let ajouterPanier = document.getElementById("ajoutPanier");
  ajouterPanier.addEventListener("click", async function() {
  const produits = await getProduit();
  //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
  userPanier.push(produits);
  localStorage.setItem("userPanier", JSON.stringify(userPanier));
  alert("Vous avez ajouté ce produit dans votre panier")
  location.reload();
});
};

function nombreProduitPanier() {
  let nombreProduit = document.getElementById("nombrePanier");
  nombreProduit.textContent = userPanier.length;
}
console.log(userPanier);