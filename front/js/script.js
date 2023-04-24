
const sectionItems = document.getElementById("items");

getData();

//Connexion vers l'API et récupération des données de l'API via fetch
async function getData () {
  const apiUrl = 'http://localhost:3000/api/products';
  return fetch(apiUrl)
    .then (function(response){
        console.log(response);
        return response.json();
       
    })
    .then(function(valeur) {
      console.log(valeur);
      showItems(valeur);
    })
    .catch (function(error){
      error='Connexion ratée';
      alert(error);
    });
};

function displayItems(value) {
  const canapes =  value;

  for (let product of value) {
    console.log(product);
    // const article = canapes[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".items");
    // const articleLink = document.createElement('a');
    // Création d’une balise dédiée à un canapé
    const canapeElement = document.createElement("article");
    canapeElement.classList.add("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;
 
    const nameElement = document.createElement("h3");
    nameElement.innerText = product.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = product.description;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${product.price} € (${product.price < 35 ? "€" : "€€€"})`;

    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(canapeElement);
    // On rattache l’image à pieceElement (la balise article)
    canapeElement.appendChild(imageElement);
    canapeElement.appendChild(nameElement);
    canapeElement.appendChild(descriptionElement);
    canapeElement.appendChild(prixElement);


 };
};

function showItems(value) {
 let showHtml= "";
  for (let product of value) {
    

// Créer le code HTML pour l'article
    showHtml=  `
    <a href="./product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class='productName'>${product.name}</h3>
    <p class='productDescription'>${product.description}</p>
  </article>
  </a>
`;
// console.dir(showHtml);
// Utiliser une expression régulière pour supprimer les balises HTML
 const productText = showHtml.replace(/(<([^>]+)>)/gi, "");

// Afficher le contenu sans les balises 
 // alert(productText);

// Insérer le code HTML dans article
sectionItems.insertAdjacentHTML('beforeend', showHtml);
  };
};