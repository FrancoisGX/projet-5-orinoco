//Affichage des informations de la commande sur la page order
infoOrder = () =>{
	if(sessionStorage.getItem("order") != null){
    //Parse du session storage
    let order = JSON.parse(sessionStorage.getItem("order"));
    //Remplissage du contenu html
    document.getElementById("lastName").innerHTML = order.contact.lastName
    document.getElementById("orderId").innerHTML = order.orderId
    
    //Suppression du sessionStorage => else si la page est actualisé / si elle est directement ouverte par l'url
    sessionStorage.removeItem("order");
}else{
  //redirection vers l'accueil
  alert("Aucune commande passée, vous êtes arrivé ici par erreur");
  window.open("index.html");
}
}