function nombreProduitPanier() {
    let nombreProduit = 0;
    userPanier.forEach(function(produit) {
      nombreProduit += produit.quantite ;
    })
    console.log(nombreProduit);
    document.getElementById("nombrePanier").textContent = nombreProduit;
}
