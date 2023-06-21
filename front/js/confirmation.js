const orderId = getOrderId();
console.log(orderId);
console.log(typeof orderId);

if (orderId === "undefined") {
    // Affichage commande non validée //
    // Obtenez la balise p en utilisant son ID //
    const confirmation = document.querySelector('#orderId').parentNode;
    // Modifiez le contenu de la balise p en utilisant innerHTML //
    confirmation.innerHTML = "Votre commande n'est pas validée   !!!";      
    } else {
    // Affichage No de commande //
    displayOrderId(orderId); 
    // Vider le localStorage //
    clearLocalStorage();  
}


// Récupération de l'orderId dans l'URL //
function getOrderId(){
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('orderId');
}

//fonction affichage de l'ordeId sur la page html //
function displayOrderId (orderId){
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = orderId;
}

// function Réinitialisation localStorage //
function clearLocalStorage(){ 
localStorage.clear();
}