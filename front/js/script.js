
const sectionItems = document.getElementById("items");

getData();

//Connexion à l'API et récupération des données de l'API via fetch avec la requête GET //
function getData () {
  const apiUrl = 'http://localhost:3000/api/products';
  fetch(apiUrl)
    .then (function(response){
      // Récupération des données de l'API dans un fichier.json
      return response.json();   
    })
    .then(function(data) {
      // Affiche les données de l'API dans la console pour vérification //
      console.log(data);
      // Appel à la fonction displayItems pour afficher les données dans HTML //
      displayItems(data);
    })
    .catch (function(err){
      err='Catalogue actuellement inaccessible, merci de revenir plus tard.';
      alert(err);
    });
};


function displayItems(sofas) {
  let displayHTML= "";
  // Boucle pour afficher tous les articles récupérés //
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

    // Insérer chaque article dans l'élément 'items'
    sectionItems.innerHTML += displayHTML;
  };
};