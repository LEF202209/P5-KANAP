
const panierDansLocalStorage = JSON.parse(localStorage.getItem("panier"));
// creation variable panier pour gestion des quantités
let cart;
lancerPage();

async function lancerPage() {
    if (panierDansLocalStorage) {
        //variable panier à l'état de tableau
        cart = []
        //récupération données dans le local storage et sur l'API pour chargement dans le tableau
        recupererProducts(panierDansLocalStorage, cart) 
    } else {
        //affichage panier vide sur la page
        const panierVide = document.createElement("h2")
        document.querySelector("#cart__items").appendChild(emptyCart)
        emptyCart.textContent = "Le panier est vide."
        // marque le formulaire de saisie et le bouton commander
        // const hideForm = document.querySelector(".cart__order")
        // hideForm.setAttribute("style","display:none")
    }   
}


//récupération des donnés du localstorage pour insérer dans un tableau 
async function recupererProducts(panierDansLocalStorage, cart) {
    // panierDansLocalStorage.sort((a,b)=> a.name.localeCompare(b.name))

    for (const itemInLocalStorage of panierDansLocalStorage) {     
        const data = await
        fetch(`http://localhost:3000/api/products/${itemInLocalStorage.id}`)
        const catalog = await data.json()
        //injecte les données du local storage et complète les infos manquantes depuis l'api
        cart.push({...itemInLocalStorage, ...catalog})
        
        afficherItems(itemInLocalStorage ,catalog)
    }
}


//affichage produits sur page html
function afficherItems(itemInLocalStorage, catalog) { 
    
    const sectionItem = document.getElementById("cart__items")
    sectionItem.innerHTML +=
        `<article class="cart__item">
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
                    <p class="deleteItem" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.color}">Supprimer </p>
                </div>
            </div>
        </article > `
}


