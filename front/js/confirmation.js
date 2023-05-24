// Récupération de l'orderId dans l'URL //
const urlParams = new URLSearchParams(location.search);
const orderId = urlParams.get('orderId');
displayOrderId(orderId)
// Réinitialisation localStorage //
localStorage.clear()

//fonction affichage de l'ordeId sur la page html //
function displayOrderId (orderId){
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = orderId;
}