const orderId = getOrderId();
console.log(orderId);
console.log(typeof orderId);

if (orderId === "undefined") {
    // Affichage commande non validée //
    // Obtenir la balise p en utilisant son ID //
    const confirmation = document.querySelector('#orderId').parentNode;
    // Modifiez le contenu de la balise p en utilisant innerHTML //
    confirmation.innerHTML = "<strong> Votre commande n'est pas validée   !!!</strong>";      
} 
else {
    // Affichage No de commande //
    displayOrderId(orderId); 
    // Vider le localStorage //
    clearLocalStorage(); 
}


// Récupération de l'orderId dans l'URL //
function getOrderId(){
    const urlParams = new URLSearchParams(location.search);
    // Récupérer l'orderId dans l'URL pour sauvegarde avant suppression//
    const orderIdSaved=urlParams.get('orderId'); 
    // supprimer le param "orderId" de l'URL actuelle après récup orderId s'il n'est pas null //
    if (orderIdSaved!== null){
        clearUrlSearchParams(urlParams);
    }    
    // Retourner l'orderId qui était dans l'URL //
    return orderIdSaved;    
}

// Fonction pour supprimer le param "orderId" de l'URL actuelle
function  clearUrlSearchParams(urlParams){
    urlParams.delete("orderId"); 
    console.log("No cde après delete ="+urlParams.get('orderId'))
}

// Fonction pour afficher l'ordeId sur la page html //
function displayOrderId (orderId){
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = orderId;
}

// Fonction Réinitialisation localStorage //
function clearLocalStorage(){ 
    localStorage.clear();
}