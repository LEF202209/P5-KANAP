// On importe la fonction addProduct du code js addProductLocalStorage //
import { addProduct } from './addProductLocalStorage.js';

// Obtenir les paramètres d'URL de la page actuelle//
const urlSearchParams = new URLSearchParams(location.search);

// Extraire la veleur de l'Id  avec le paramètre 'id' contenu dans l'url //
const productId = urlSearchParams.get('id');

// Si le paramètre 'id' n'est pas null, alors on va récupérer les données de l'API //
if (productId!= null) {
  // Appel à la fonction fetchDataProduct pour Récupérer les données de l'API //
  fetchDataProduct(productId)
}
else {
  // Sinon on affiche un message d'erreur à l'utilisateur //
  alert ("Pas de produit selectionné!")
}

// Fonction pour Récupérer les données de l'API  avec le paramètre {product-ID}//
function fetchDataProduct(idProduct){
  // Connexion à l'API avec l'url personnalisée contenant l'id du produit choisi//
  // Avec la Requête get // 
  fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then(response => {return response.json()})
  // Appel à la fonction showData pour afficher les données de l'article récupérées //
  .then(data => showData(data))
  .catch(e => {
    // Sinon envoyer message d'erreur à la console et à l'utilisateur //
    console.log('Erreur de récupération informations canapé');
    alert('Erreur de récupération informations canapé');
  });
}
// Fonction pour afficher un canapé //
function showData(data) {
  // Déclaration de l'objet canapé et sauvegarde des données récupérées dans l'objet //
  const product={
    altTxt:data.altTxt,
    colors:data.colors,
    description:data.description,
    imageUrl:data.imageUrl,
    name:data.name,
    price:data.price
  }
  // Appel à la focnction displayHTML pour afficher l'article dans HTML //
  displayHTML(product);
}

// Fonction pour afficher les données de l'article dans HTML depuis l'objet canapé//
function displayHTML (product){
  // Récupération de l'élément du DOM qui accueillera l'image //
  const divImg = document.querySelector(".item__img");
  divImg.innerHTML +=`<img src="${product.imageUrl}" alt=${product.altTxt}></img>`
  // Initialisation du nom du produit
  const titleElement = document.querySelector("#title");
  titleElement.textContent = product.name;
  // Initialisation du prix du produit
  const priceElement = document.querySelector("#price");
  priceElement.textContent = product.price;
  // Initialisation de la description du produit //
  const descriptionElement = document.querySelector("#description");
  descriptionElement.textContent = product.description;
  // Initialisation de la quantité du produit à 1 par défaut //
  const quantityElement = document.querySelector("#quantity");
  quantityElement.value = 1;
  // Initialisation des options select //
  const select = document.getElementById('colors');
  // Appel fonction pour Récupérer les otions de select //
  selectColorsList(product,select)
  // Appel fonction pour changer le titre de la page //
  changeTitlePage(product)
  // Appel à la fonction pour écouter le clic sur bouton "ajouter au panier" //
  listenButtonAdd(product,select)
};

// Fonction pour Récupérer les options de select //
function selectColorsList(sofa,select){
  // Boucle de lecture et récupération des couleurs //
  if (sofa.colors && sofa.colors.length > 0) {
    for (let i = 0; i < sofa.colors.length; i++) {
        //Ajout de chaque nouvelle option dans l'attribut select //
        select.innerHTML+=`<option value="${sofa.colors[i]}">${sofa.colors[i]}</option>`;
    }
    return select;
  }
}

// Fonction pour changer le titre de la page //
function changeTitlePage(sofa){
  const newTitle = sofa.name;
  document.querySelector("title").textContent = newTitle;
}

// Fonction pour écouter le clic sur bouton "ajouter au panier" //
function listenButtonAdd(sofa,select) {
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", function (e) {
  // Annuler l'exécution du lien //
  e.preventDefault();
  // Constante pour récupérer la couleur sélectionnée //
  const colorValue = select.value;
  // Constante pour initialiser la quantité saisie //
  const quantityValue = document.querySelector("#quantity").value;
  // Contrôle saisie couleur //
  if (colorValue=="") {
    alert("Veuillez selectionner une couleur")
  }
  else
  {
    // Contrôle saisie quantité //
    if (quantityValue<1 || quantityValue>100) {
      alert("Veuillez saisir une quantité entre 1 et 100")
    }
    else
    {
      // Création de l’objet du nouveau produit avec couleur et qté entregistrés sans le prix // 
      const newProduct = {
        id: productId,
        name: sofa.name,
        color: colorValue,
        quantity: quantityValue
      }
      // Appel à la fonction permettant d'ajouter l'objet product // 
      //(canapé selectionné + couleur + quantité dans le localStorage et dans le panier)//
      addProduct (newProduct);
      // charger une nouvelle page 'Panier' dans la fenêtre courante 
      location.href ='cart.html'
      //ouvrir la page cart.html dans une nouvelle fenêtre du navigateur 
      //window.open("cart.html", "_blank");
    }
  }
  });
}
