// Récupération de l'orderId dans l'URL //
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
afficherOrderId(orderId)
localStorage.clear()

//fonction affichage de l'ordeId sur la page html //
function afficherOrderId (orderId){
const orderIdElement = document.getElementById("orderId");
orderIdElement.textContent = orderId;
}