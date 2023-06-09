import { addProduct } from './addProductLocalStorage.js';

// Obtenir les paramètres d'URL de la page actuelle//
const urlSearchParams = new URLSearchParams(location.search);

// param Id//
const productId = urlSearchParams.get('id');
console.log(productId)
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => {return response.json()})
  // afficher les données de l'article récupérées
  .then(data => showData(data))
  .catch(e => {alert('Erreur de récupération informations canapé');alert (e)});

  // fonction affichage d'un canapé //
  function showData(data) {
  // declaration de l'objet canapé //
  const product={
    altTxt:data.altTxt,
    colors:data.colors,
    description:data.description,
    imageUrl:data.imageUrl,
    name:data.name,
    price:data.price
  }

    // Récupération de l'élément du DOM qui accueillera l'image
    const divImg = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    // imageElement.src = product.imageUrl;
    // imageElement.alt = product.altTxt;
    // initialisation de l'attribut src de l'image  //
    imageElement.setAttribute('src',product.imageUrl);
    // initialisation de l'attribut alt de l'image  //
    imageElement.setAttribute('alt',product.altTxt);
    // création de la balise img dans la classe .item__img
    divImg.appendChild(imageElement);
    // initialisation nom du produit
    const titleElement = document.querySelector("#title");
    titleElement.textContent = product.name;
     // initialisation prix du produit
    const priceElement = document.querySelector("#price");
    priceElement.textContent = product.price;
    // initialisation description du produit
    const descriptionElement = document.querySelector("#description");
    descriptionElement.textContent = product.description;

    // initialisation quantité du produit à 1 par défaut
    const quantityElement = document.querySelector("#quantity");
    quantityElement.value = 1;
    // Initialisation des options select
    const select = document.getElementById('colors');
    // Récupérer l'élément select
    selectColorsList(product,select)
    // changement titre de la page //
    changeTitlePage(product)
    // Ecoute clic sur bouton ajouter //
    listenButtonAdd(product,select)
};

function selectColorsList(sofa,select){
    // bouble de lecture et récupération des couleurs
    for (let i = 0; i < sofa.colors.length; i++) {
        const option = document.createElement('option');
        // option.value = product.colors[i];
        option.text = sofa.colors[i]
        option.setAttribute('value',sofa.colors[i]);
        //Ajout chaque nouvelle option dans l'attribut select //
        select.appendChild(option);
     }
     return select;
}

function changeTitlePage(sofa){
  const newTitle = sofa.name;
  document.querySelector("title").textContent = newTitle;
}
 
function listenButtonAdd(sofa,select) {
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", function (e) {
  // annuler l'exécution du lien //
  e.preventDefault();
  // constante couleur sélectionnée
  const colorValue = select.value;
  // constante quantité saisie
  const quantityValue = document.querySelector("#quantity").value;

 // contrôle saisie couleur //
  if (colorValue=="") {
    alert("Veuillez selectionner une couleur")
// contrôle saisie quantité //
  }else if (quantityValue<1 || quantityValue>100) {
    alert("Veuillez saisir une quantité entre 1 et 100")
  }else {
  // Création de l’objet du nouveau produit avec couleur et qté entregistrés // 
  const newProduct = {
      id: productId,
      name: sofa.name,
      color: colorValue,
      quantity: quantityValue
      };
  // ajout objet product (canapé selectionné + couleur + quantité dans le localStorage) //
  addProduct (newProduct);
  // charger une nouvelle page 'Panier' dans la fenêtre courante 
  location.href ='cart.html'
  //ouvrir la page cart.html dans une nouvelle fenêtre du navigateur 
  //window.open("cart.html", "_blank");
  } 
  });
}


