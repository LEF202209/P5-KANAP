import { listenButtonOrder } from './cartForm.js';
// Récupérer les données du localStorage //
const panierDansLocalStorage = localStorage.getItem("panier");
// Convertir les données en objet javascript //
const panierDansLocalStorageObj = JSON.parse(panierDansLocalStorage);

// creation variable panier pour gestion des quantités //
let cart;
// Fonction pour charger la page //
loadPage();

async function loadPage() {
    // vérifier si des données ont été trouvées dans le localStorage //
    if (panierDansLocalStorageObj) {
        //variable panier à l'état de tableau vide //
        cart = []
        // récupération données dans le local storage et sur l'API pour chargement dans le tableau
        retrieveProducts(panierDansLocalStorageObj, cart)
        // fonction : calcul des cumul quantités et montant //
        updateTotals(cart)
        // fonction : écoute clic bouton 'commander' //  
        listenButtonOrder (cart)
    } else {
        // affichage panier vide sur la page //
        const panierVide = document.createElement("h2")
        panierVide.textContent = "Le panier est vide."
        document.querySelector("#cart__items").appendChild(panierVide)    
        // marque le formulaire de saisie et le bouton commander
         const UserForm = document.querySelector(".cart__order")
        UserForm.setAttribute("style","display:none")
    }   
}

//récupération des données du localstorage pour insérer dans un tableau 
async function retrieveProducts(panierDansLocalStorageObj, cart) {
console.log('-----------------------');
   console.log (panierDansLocalStorageObj);
    // Tri des produits par ID
    panierDansLocalStorageObj.sort(comparerParId);
    for (const itemDansLocalStorage of panierDansLocalStorageObj) {     
        const data = await
        // connexion à l'API pour récupérer le catalogue des produits //
        fetch(`http://localhost:3000/api/products/${itemDansLocalStorage.id}`)
        const catalogue = await data.json()
        //injecte les données du local storage et complète les infos manquantes depuis l'api
        // priorité donnée aux propriétés de itemDansLocalStorage si pptés en double
        cart.push({...catalogue,...itemDansLocalStorage})
        console.log(cart)
        displayItems(itemDansLocalStorage ,catalogue)
    }
}

// Fonction de comparaison pour trier par ID
function comparerParId(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  

//affichage produits sur page html
function displayItems(itemDansLocalStorage, catalog) { 
    
    const sectionItem = document.getElementById("cart__items")
    sectionItem.innerHTML +=
        `<article class="cart__item" data-id="${itemDansLocalStorage.id}" data-color="${itemDansLocalStorage.color}">
            <div class="cart__item__img">
                <img src="${catalog.imageUrl}" alt="${catalog.altTxt}">
            </div >
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${catalog.name}</h2>
                     <p>${itemDansLocalStorage.color}</p>
                    <p>${catalog.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemDansLocalStorage.quantity}" data-color="${itemDansLocalStorage.color}" data-id="${itemDansLocalStorage.id}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${itemDansLocalStorage.id}" data-color="${itemDansLocalStorage.color}" >Supprimer </p>
                </div>
            </div>
        </article > `
        changeQuantity(sectionItem,cart)
        deleteProduct(cart)
}

function changeQuantity(sectionItem,cart){
    // Ajouter un écouteur d'événement pour chaque champ de quantité dans l'interface utilisateur
    let quantiteFields = document.querySelectorAll('.itemQuantity');
    for (let field of quantiteFields) {
      field.addEventListener('change', onQuantiteChange);
    }    
    // Mettre à jour les totaux après modification quantité
    updateTotals(cart);
    }

// Fonction pour mettre à jour les totaux à partir des données du panier
function updateTotals(cart) {
    // Récupérer les éléments HTML correspondant aux totaux
    let totalQuantityElem = document.getElementById('totalQuantity');
    let totalPriceElem = document.getElementById('totalPrice');
  
    // Initialiser les totaux de quantité et de prix
    let totalQuantity = 0;
    let totalPrice = 0;
  
    // Parcourir tous les articles dans le panier et mettre à jour les totaux
    for (let product of cart) {
      totalQuantity += Number(product.quantity);
      totalPrice += product.price * Number(product.quantity);
    }
  
    // Afficher les totaux dans les éléments HTML correspondants
    totalQuantityElem.textContent = totalQuantity;
    totalPriceElem.textContent = totalPrice.toFixed(2);  // Arrondir à 2 décimales pour afficher le prix en euros
  // desactivation du bouton Commander si cumul quantités commandées égal à zéro
  const orderButton = document.querySelector("#order");
  if (totalQuantity === 0) {
    orderButton.disabled = true;
  } else {
    orderButton.disabled = false;
  }
}

  
  // Fonction pour mettre à jour les totaux lorsque la quantité d'un article est modifiée
  function onQuantiteChange(event) {
    // Récupérer l'article correspondant à l'élément HTML qui a déclenché l'événement
    let productId = event.target.dataset.id;
    let productColor = event.target.dataset.color;
    let panier = JSON.parse(localStorage.getItem('panier'));
    let productLocalStorage = panier.find(a => a.id === productId && a.color === productColor);
    let productCart = cart.find(a => a.id === productId && a.color === productColor);
    // Mettre à jour la quantité de l'article dans le panier
    if (productLocalStorage){
        productLocalStorage.quantity = parseInt(event.target.value);
    }  

    // Sauvegarder les données mises à jour dans le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
   
    // Mettre à jour le tableau cart
    if (productCart){
        productCart.quantity = parseInt(event.target.value);
    } 
    // Mettre à jour les totaux
    updateTotals(cart);
  }

  function deleteProduct(cart){
    //Récupération de tous les boutons 'Supprimer'
    const deleteBtns = document.querySelectorAll('.deleteItem');
    // Parcours de chaque bouton 'supprimer' //
    // deleteElt contient la ligne HTML à supprimer //
    deleteBtns.forEach(function(deleteElt) {
    // Ajout d'un écouteur d'événements au clic sur chaque bouton
    deleteElt.addEventListener('click', trtDeleteProduct);
    })
}

function trtDeleteProduct (event) {
    // Récupération de l'id & de la couleur de l'article à "Supprimer"
    const idToDelete = event.target.dataset.id;
    const colorToDelete = event.target.dataset.color;

    // Vérification si l'article existe dans le LocalStorage
    if (localStorage.getItem('panier')) {
        // Recherche de l'index de l'article à supprimer dans le tableau des données //
        const indexToDelete = cart.findIndex(item => item.id === idToDelete && item.color === colorToDelete);

        // Si l'article est trouvé, suppression de l'article du tableau de données
        if (indexToDelete !== -1) {
            cart.splice(indexToDelete, 1);
            // Mise à jour des données du panier dans le LocalStorage
            localStorage.setItem('panier', JSON.stringify(cart));
        }
    }
    // Récupération de l'élément HTML à supprimer
    const cartItem = document.querySelector(`[data-id="${idToDelete}"][data-color="${colorToDelete }"]`);  
    // Suppression de l'article dans le HTML
    cartItem.closest('.cart__item').remove();
    alert("Article supprimé du panier");
    //si panier vide, effacement du local storage et rafraichissement de la page

    if (cart.length === 0) {
        localStorage.clear()
        location.reload()
    }

    // Mettre à jour les totaux
    updateTotals(cart);
     
}

