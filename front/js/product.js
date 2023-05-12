import { ajoutArticle } from './ajoutProduitLocalStorage.js';
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

fetch(`http://localhost:3000/api/products/${articleId}`)
  .then(response => response.json())
  .then(data => affichageData(data)
    // afficher les données de l'article récupérées
  );

  function affichageData(data) {
  const produit ={
    altTxt:data.altTxt,
    colors:data.colors,
    description:data.description,
    imageUrl:data.imageUrl,
    name:data.name,
    price:data.price
  }

  // Récupération de l'élément du DOM qui accueillera l image
    const divImg = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = produit.imageUrl;
    imageElement.alt = produit.altTxt;
    divImg.appendChild(imageElement);

    const titleElement = document.querySelector("#title");
    titleElement.textContent = produit.name;

    const priceElement = document.querySelector("#price");
    priceElement.textContent = produit.price;

    const descriptionElement = document.querySelector("#description");
    descriptionElement.textContent = produit.description;

     // Récupérer l'élément select
     const select = document.getElementById('colors');

    for (let i = 0; i < produit.colors.length; i++) {
        const option = document.createElement('option');
        option.value = produit.colors[i];
        option.text = produit.colors[i]
        select.appendChild(option);
     }
    changementTitrePage(produit)
    listenBoutonAjouter(produit,select)
};
 
function listenBoutonAjouter(produit,select) {
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", function (event) {
  event.preventDefault();
  const colorElement = select.value;

  const quantiteElement = document.querySelector("#quantity").value;

  if (colorElement=="") {
    alert("Veuillez selectionner une couleur")
  }else if (quantiteElement<1 || quantiteElement>100) {
    alert("Veuillez saisir une quantité entre 1 et 100")
  }else {
  // Création de l’objet du nouveau produit. 
  const nouveauProduit = {
      id: articleId,
      name: produit.name,
      color: colorElement,
      quantity: quantiteElement
  }
    ajoutArticle (nouveauProduit);
    // charger une nouvelle page dans la fenêtre courante 
    window.location.href ='cart.html'
    //ouvrir la page cart.html dans une nouvelle fenêtre du navigateur 
    // window.open("cart.html", "_blank");
  } 
  });
}

function changementTitrePage(produit){
  const nouveauTitre = produit.name;
  document.querySelector("title").textContent = nouveauTitre;
  // alert("en titre page");
}
