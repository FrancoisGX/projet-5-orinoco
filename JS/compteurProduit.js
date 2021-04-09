function nombreProduitPanier() {
    let nombreProduit = 0;
    userPanier.forEach(function(produit) {
      nombreProduit += produit.quantite ;
    })
    console.log(nombreProduit);
    document.getElementById("nombrePanier").textContent = nombreProduit;
}
// Fonction pour afficher le nombre de produit dans le panier a coté de l'icone panier dans la barre nav