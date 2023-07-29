import { listenButtonOrder } from './cartForm.js';

// Récupérer les données du localStorage //
const panierInLocalStorage = localStorage.getItem("panier");
// Convertir les données en objet javascript //
const panierInLocalStorageObj = JSON.parse(panierInLocalStorage);
// creation variable panier pour gestion des quantités //
let cart;
// Appel à la fonction pour charger la page //
loadPage();

// fonction loadPage pour charger la page Panier //
async function loadPage() {
    // Variable panier à l'état de tableau vide //
    cart = []
    // vérifier si des données ont été trouvées dans le localStorage //
    // si panier n'est pas vide //
    if (panierInLocalStorageObj) {
        // Récupération données du stockage local &API pour chargement dans le tableau cart//
        retrieveProducts(panierInLocalStorageObj, cart)
        // Appel à la fonction calcul des cumuls quantités et montant //
        updateTotals(cart)
        // Appel à la fonction : écoute clic bouton 'commander' //  
        listenButtonOrder (cart)
    } else {
        // Sinon -  Affichage 'panier vide' dans la page Panier //
        const panierVide = document.createElement("h2")
        panierVide.textContent = "Le panier est vide."
        // Affiche le titre h2 "Panier est vide" à la place des cartes 
        document.getElementById("cart__items").appendChild(panierVide) 
        // Appel à la fonction pour recalculer des totaux quantité et montant //
        updateTotals(cart)  
        // Ne pas afficher le formulaire de saisie et le bouton commander //
        const UserForm = document.querySelector(".cart__order")
        UserForm.setAttribute("style","display:none")
    }   
}

// Fonction pour récupérer les données du stockage local pour insérer dans un tableau // 
async function retrieveProducts(panierInLocalStorageObj, cart) {
    // Tri des produits par ID //
    panierInLocalStorageObj.sort(compareById);
    // Boucle de lecture du contenu du Stockage local //
    for (const itemInLocalStorage of panierInLocalStorageObj) {     
        const data = await
        // Connexion à l'API pour récupérer le catalogue d'un Produit //
        fetch(`http://localhost:3000/api/products/${itemInLocalStorage.id}`)
        // Attend que les données JSON soit extraites de réponse HTTP avt de stocker ces données //
        const catalogue = await data.json()
        // Injecte les données du localStorage et complète les infos manquantes depuis l'API
        // Image & Prix du Produit absents du localStorage //
        // spreading ... - fusion de ces 2 objets //
        // Priorité aux données de itemInLocalStorage si pptés en double //
        cart.push({...catalogue,...itemInLocalStorage})
        // Appel à la fonction displaysItems pour afficher les produits dans la page HTML//
        displayItems(itemInLocalStorage ,catalogue)
    }
}

// Fonction de comparaison pour trier par ID
function compareById(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
}
  
// Fonction pour Afficher les produits du sur page Panier //
function displayItems(itemInLocalStorage, catalog) { 
    const sectionItem = document.getElementById("cart__items")
    sectionItem.innerHTML +=
        `<article class="cart__item" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.color}">
            <div class="cart__item__img">
                <img src="${catalog.imageUrl}" alt="${catalog.altTxt}">
            </div >
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${catalog.name}</h2>
                     <p>${itemInLocalStorage.color}</p>
                    <p>${catalog.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage.quantity}" data-color="${itemInLocalStorage.color}" data-id="${itemInLocalStorage.id}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.color}" >Supprimer </p>
                </div>
            </div>
        </article > `
        // Appel à la fonction pour modifier la quantité d'un produit //
        changeQuantity(cart);
        // Appel à la fonction pour supprimer un produit //
        deleteProduct(cart);
}

// Fonction pour modifier la quantité
function changeQuantity(cart){
    // Sélectionner le champ quantité sur toutes les lignes produits //
    let quantiteFields = document.querySelectorAll('.itemQuantity');
    // Boucle sur champs "quantite" des lignes produits //
    for (let field of quantiteFields) {
      // Ajouter un écouteur d'événement sur l'évènement "Change" ds chq champ de qté //
      field.addEventListener('change', onQuantityChange);
    }    
    // Appel à la fonction updateTotals pour Mise à jour des totaux //
    updateTotals(cart);
}
  
// Fonction pour contrôler et mettre à jour la quantité d'un article modifiée //
function onQuantityChange(event) {
    // Récupérer l'article correspondant à l'élément HTML qui a déclenché l'événement modifié //
    // valeur Id & Couleur //
    let productId = event.target.dataset.id;
    let productColor = event.target.dataset.color;
    // Récupérer les données du localStorage //
    let panier = JSON.parse(localStorage.getItem('panier'));
    // Récupérer l'élément du tableau Cart et localStorage à modifier //
    let productLocalStorage = panier.find(a => a.id === productId && a.color === productColor);
    let productCart = cart.find(a => a.id === productId && a.color === productColor);
    // Récupérer la nouvelle quantité saisie //
    let newQuantity = parseInt(event.target.value);
    // Vérifier que la nouvelle quantité est bien entre 1 et 100 //
    // Si ce n'est pas le cas
    if (!(newQuantity >= 1 && newQuantity <= 100)) { 
        alert("La quantité doit être comprise entre 1 et 100, la quantité retenue est : "+productLocalStorage.quantity);
        // Réinitialiser la valeur de l'input à la valeur actuelle dans le panier //
        event.target.value = productLocalStorage.quantity;
    } 
    else
    // Si la nouvelle quantité saisie est valide // 
    {
        // Mettre à jour la quantité de l'article dans les tableaux stockage local  //
        if (productLocalStorage){
            // Vérifier que la quantité est entre 1 et 100 //
            productLocalStorage.quantity = newQuantity;
            // Mettre à jour le localstorage // 
            localStorage.setItem('panier', JSON.stringify(panier));
        }  
        // Mettre à jour l'élément du tableau cart //
        if (productCart){
            productCart.quantity= newQuantity;
        }
        // Appel à la focntion updateTotals pour Mettre à jour les totaux // 
        updateTotals(cart);
    }
}

// Fonction écouter l'évènement 'click' sur le bouton 'supprimer' de toutes les lignes //
function deleteProduct(cart){
    //Récupération de tous les boutons 'Supprimer' //
    const deleteBtns = document.querySelectorAll('.deleteItem');
    // Parcours de chaque bouton 'supprimer' //
    // deleteElt contient la ligne HTML à supprimer //
    deleteBtns.forEach(function(deleteElt) {
    // Ajout d'un écouteur d'évènements au clic sur chaque bouton
    deleteElt.addEventListener('click', onProductDelete);
    })
}

// Fonction supprimer un article du localStorage et du panier //
function onProductDelete (event) {
    // Récupération de l'id & de la couleur de l'article à "Supprimer"
    const idToDelete = event.target.dataset.id;
    const colorToDelete = event.target.dataset.color;

    // Vérification si l'article existe dans le LocalStorage
    if (localStorage.getItem('panier')) {
        // Recherche de l'index de l'article à supprimer dans le tableau des données cart //
        const indexToDelete = cart.findIndex(item => item.id === idToDelete && item.color === colorToDelete);

        // Si l'article est trouvé, suppression de l'article du tableau de données //
        if (indexToDelete !== -1) {
            cart.splice(indexToDelete, 1);
            // Mise à jour des données du panier du LocalStorage //
            localStorage.setItem('panier', JSON.stringify(cart));
        }
    }
    // Récupération de l'élément HTML à supprimer //
    const cartItem = document.querySelector(`[data-id="${idToDelete}"][data-color="${colorToDelete }"]`);  
    // Suppression de l'article de la page HTML- closest() pour cibler le produit //
    cartItem.closest('.cart__item').remove();
    alert("Article supprimé du panier");
    // Si panier vide, effacement du local storage et rafraichissement de la page HTML //
    if (cart.length === 0) {
        localStorage.clear()
        location.reload()
    }
    // Appel à la fonction pour Mettre à jour les totaux // 
    updateTotals(cart);     
}

// Fonction pour mettre à jour les totaux à partir des données du panier //
function updateTotals(cart) {
    // Récupérer les éléments HTML correspondant aux totaux
    let totalQuantityElem = document.getElementById('totalQuantity');
    let totalPriceElem = document.getElementById('totalPrice');
  
    // Initialiser les totaux de quantité et de prix à 0 //
    let totalQuantity = 0;
    let totalPrice = 0;
  
    // Parcourir tous les articles dans le panier pour cumuler les montants et les quantités //
    for (let product of cart) {
      totalQuantity += Number(product.quantity);
      totalPrice += product.price * Number(product.quantity);
    }
  
    // Afficher les totaux dans les éléments HTML correspondants //
    totalQuantityElem.textContent = totalQuantity;
    // Arrondir à 2 décimales pour afficher le prix en euros//
    totalPriceElem.textContent = totalPrice.toFixed(2);  
}
