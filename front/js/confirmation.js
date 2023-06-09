const orderId = getOrderId();
displayOrderId(orderId);
clearLocalStorage();

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