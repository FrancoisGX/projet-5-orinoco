async function cameraDetail() {
    idProduit = location.search.substring(4);
    const produitSelect = await getProduit();
    console.log(produitSelect)
    /* Lien avec la page produit*/
    let detailProduit = document.getElementById("detailProduit");
    
    /* Structure index produit */
    const contenantPhoto = document.createElement("div");
    const blocPhoto = document.createElement("div");
    const produitPhoto = document.createElement("img");
    const contenantDetail = document.createElement("div");
    const produitNom = document.createElement("h2");
    const produitDescription = document.createElement("p");
    const detailOption = document.getElementById("detailOption");
    const produitPrix = document.createElement("p");
    const ajoutPanier = document.getElementById("ajoutPanier")
  
    
    /* Ajout des attributs au balise produit */
    contenantPhoto.setAttribute("class", "col-12 col-md-6 d-flex justify-content-center ");
    blocPhoto.setAttribute("class", "card bloc_image overflow-hidden border ombre bg-secondary");
    produitPhoto.setAttribute("img", "img-fluid border_img image");
    produitPhoto.setAttribute("src", produitSelect.imageUrl);
    produitPhoto.setAttribute("alt", "Photo de " + produitSelect.name);
    produitNom.setAttribute("class", "col-12 taille-police-h2");
    produitDescription.setAttribute("class", "col-12 taille-police-p");
    produitPrix.setAttribute("class", "col-12 taille-police-p");
    contenantDetail.setAttribute("class", "col-12 col-md-6 mt-2" );
    
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

function ajouterPanier(){
  //Au clic de l'user pour mettre le produit dans le panier
  const ajouterPanier = document.getElementById("ajoutPanier");
  ajouterPanier.addEventListener("click",async function () {
  const produitSelect = await getProduit();

  //Mettre l'option de l'utilisateur dans une variable
  const idSelect = document.querySelector("#optionSelect");
  const choixSelect = idSelect.value;

  //Récupération des valeurs du produit
  const detailCamera = {
    nomProduit: produitSelect.name,
    id_Produit: produitSelect._id,
    optionProduit: choixSelect,
    quantite: 1,
    photo:produitSelect.imageUrl,
    prix: produitSelect.price / 100
  } 
  console.log(detailCamera)

//Récupération du panier dans le localStorage et ajout du produit dans le panier avant recoit dans le localStorage
  const verif = userPanier.find(produit => detailCamera.id_Produit == produit.id_Produit )
  if(verif != undefined){
    console.log(verif);
    verif.quantite++;
  }else{
    userPanier.push(detailCamera);
    console.log(verif);
  }
  
  localStorage.setItem("userPanier", JSON.stringify(userPanier));
  alert("Vous avez ajouté ce produit dans votre panier")
  location.reload();

});
}

console.log(userPanier);
