const orderId = getOrderId();
console.log(orderId);
console.log(typeof orderId);

if (orderId === "undefined") {
     // affichage commande non validée //
    //  const commandeNonValidee = document.createElement("h2")
     
    //  commandeNonValidee.textContent = "Votre commande n'est pas validée!!!"
    //  commandeNonValidee.setAttribute("style","font-weight:bold")
    //  document.querySelector("#limitedWidthBlock").appendChild(commandeNonValidee);  
     // ne pas afficher la div confirmation de commande //
    //   const orderConf = document.querySelector(".confirmation")
    //   orderConf.setAttribute("style","display:none")
    // Obtenez la balise p en utilisant son ID
    const confirmation = document.querySelector('#orderId').parentNode;

    // Modifiez le contenu de la balise p en utilisant innerHTML
    confirmation.innerHTML = "Votre commande n'est pas validée!!!";      
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