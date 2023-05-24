
const sectionItems = document.getElementById("items");

getData();

//Connexion à l'API et récupération des données de l'API via fetch
function getData () {
  const apiUrl = 'http://localhost:3000/api/products';
  fetch(apiUrl)
    .then (function(response){
      return response.json();   
    })
    .then(function(data) {
      console.log(data);
      displayItems(data);
    })
    .catch (function(err){
      err='Connexion ratée';
      alert(err);
    });
};


function displayItems(sofas) {
 let displayHTML= "";
  for (let sofa of sofas) {
// Créer le code HTML pour l'affichage de l'article
    displayHTML=  `
    <a href="./product.html?id=${sofa._id}">
  <article>
    <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
    <h3 class='productName'>${sofa.name}</h3>
    <p class='productDescription'>${sofa.description}</p>
  </article>
  </a>
`;

// Utiliser une expression régulière pour supprimer les balises HTML
//  const productText = displayHTML.replace(/(<([^>]+)>)/gi, "");

// Afficher le contenu sans les balises 
 // alert(productText);

// Insérer le code HTML dans article
sectionItems.innerHTML += displayHTML;
// sectionItems.insertAdjacentHTML('beforeend', displayHTML);
  };
};