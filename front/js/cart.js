import { listenButtonOrder } from './cartForm.js';
// Récupérer les données du localStorage //
const panierDansLocalStorage = localStorage.getItem("panier");
// Convertir les données en objet javascript //
const panierDansLocalStorageObj = JSON.parse(panierDansLocalStorage);
// creation variable panier pour gestion des quantités
let cart;
// Fonction pour charger la page
chargerPage();

async function chargerPage() {
    // vérifier si les données ont été trouvées
    if (panierDansLocalStorageObj) {
        //variable panier à l'état de tableau
        cart = []
        //récupération données dans le local storage et sur l'API pour chargement dans le tableau
        recupererProducts(panierDansLocalStorageObj, cart)
        updateTotaux(cart) 
        listenButtonOrder (cart)
    } else {
        //affichage panier vide sur la page
        const panierVide = document.createElement("h2")
        document.querySelector("#cart__items").appendChild(panierVide)
        panierVide.textContent = "Le panier est vide."
        // marque le formulaire de saisie et le bouton commander
        // const hideForm = document.querySelector(".cart__order")
        // hideForm.setAttribute("style","display:none")
    }   
}


//récupération des données du localstorage pour insérer dans un tableau 
async function recupererProducts(panierDansLocalStorageObj, cart) {
    // panierDansLocalStorage.sort((a,b)=> a.name.localeCompare(b.name))

    for (const itemDansLocalStorage of panierDansLocalStorageObj) {     
        const data = await
        // connexion à l'API pour récupérer le catalogue des produits //
        fetch(`http://localhost:3000/api/products/${itemDansLocalStorage.id}`)
        const catalogue = await data.json()
        //injecte les données du local storage et complète les infos manquantes depuis l'api
        // priorité donnée aux propriétés de itemDansLocalStorage si pptés en double
        cart.push({...catalogue,...itemDansLocalStorage})
        console.log(cart)
        afficherItems(itemDansLocalStorage ,catalogue)
    }
}


//affichage produits sur page html
function afficherItems(itemDansLocalStorage, catalog) { 
    
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
        changementQuantite(sectionItem,cart)
        suppressionArticle(cart)
}

function changementQuantite(sectionItem,cart){
    // Ajouter un écouteur d'événement pour chaque champ de quantité dans l'interface utilisateur
    let quantiteFields = document.querySelectorAll('.itemQuantity');
    // alert ('en chgt qté');
    for (let field of quantiteFields) {
      field.addEventListener('change', onQuantiteChange);
    }
    
    // Mettre à jour les totaux initiaux au chargement de la page
    updateTotaux(cart);
    }

// Fonction pour mettre à jour les totaux à partir des données du panier
function updateTotaux(cart) {
    // Récupérer les éléments HTML correspondant aux totaux
    let totalQuantityElem = document.getElementById('totalQuantity');
    let totalPriceElem = document.getElementById('totalPrice');
  
    // Initialiser les totaux de quantité et de prix
    let totalQuantity = 0;
    let totalPrice = 0;
  
    // Parcourir tous les articles dans le panier et mettre à jour les totaux
    for (let article of cart) {
      totalQuantity += Number(article.quantity);
      totalPrice += article.price * Number(article.quantity);
    }
  
    // Afficher les totaux dans les éléments HTML correspondants
    totalQuantityElem.textContent = totalQuantity;
    totalPriceElem.textContent = totalPrice.toFixed(2);  // Arrondir à 2 décimales pour afficher le prix en euros
  }
  
  // Fonction pour mettre à jour les totaux lorsque la quantité d'un article est modifiée
  function onQuantiteChange(event) {
    // Récupérer l'article correspondant à l'élément HTML qui a déclenché l'événement
    let articleId = event.target.dataset.id;
    let articleColor = event.target.dataset.color;
    let panier = JSON.parse(localStorage.getItem('panier'));
    let articleLocalStorage = panier.find(a => a.id === articleId && a.color === articleColor);
    let articleCart = cart.find(a => a.id === articleId && a.color === articleColor);
    // Mettre à jour la quantité de l'article dans le panier
    if (articleLocalStorage){
        articleLocalStorage.quantity = parseInt(event.target.value);
    }  

    // Sauvegarder les données mises à jour dans le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
   
    // Mettre à jour le tableau cart
    if (articleCart){
        articleCart.quantity = parseInt(event.target.value);
    } 
    // Mettre à jour les totaux
    updateTotaux(cart);
  }

  function suppressionArticle(cart){
    //Récupération de tous les boutons 'Supprimer'
   const suppressionBtns = document.querySelectorAll('.deleteItem');
   // Parcours de chaque bouton supprimer
   suppressionBtns.forEach(function(btn) {
    // Ajout d'un écouteur d'événements au clic sur chaque bouton
    btn.addEventListener('click', trtSupprArticle);
    })
}
function trtSupprArticle (event) {
      // Empêcher le formulaire de se soumettre
    // event.preventDefault();
    // Récupération de l'id de l'article à "Supprimer"

    const idToDelete = event.target.dataset.id;
    const colorToDelete = event.target.dataset.color;

    // Vérification si l'article existe dans le LocalStorage
    if (localStorage.getItem('cart')) {

        // Recherche de l'index de l'article à supprimer dans le tableau de données
        const indexToDelete = cart.findIndex(item => item.id === idToDelete && item.color === colorToDelete);

        // Si l'article est trouvé, suppression de l'article du tableau de données
        if (indexToDelete !== -1) {
            cart.splice(indexToDelete, 1);

            // Mise à jour des données du panier dans le LocalStorage
            localStorage.setItem('panier', JSON.stringify(cart));
            // const cart = JSON.parse(localStorage.getItem('panier'));
            console.log(cart);
            // Mettre à jour les totaux
            updateTotaux(cart);
        }
    }

    // Récupération de l'élément HTML à supprimer
    const cartItem = document.querySelector(`[data-id="${idToDelete}"][data-color="${colorToDelete }"]`);
  
    // Suppression de l'article dans le HTML
    cartItem.closest('.cart__item').remove();
     
}

