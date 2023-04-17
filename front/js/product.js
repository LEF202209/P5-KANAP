// const article = document.querySelector('.article');

// article.addEventListener('click', () => {
//   // récupérer les données de l'article via l'API
//   fetch('http://localhost:3000/api/products')
//     .then(response => response.json())
//     .then(data => {
//       // rediriger l'utilisateur vers la page de l'article
//       window.location.href = 'article.html?id=' + data.id;
//     });
// });
//Dans la page de l'article, récupérez l'ID de l'article à partir de l'URL et utilisez-le pour afficher l'article dans la page//
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
alert ("articleId")

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
  alert (data.price)
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

     // Ajouter une option pour chaque élément dans les données
    //  produit.forEach(colors => {
    //    const option = document.createElement('option');
    //    option.value = colors.value;
    //    select.appendChild(option);
    for (let i = 0; i < produit.colors.length; i++) {
        const option = document.createElement('option');
        option.value = produit.colors[i];
        option.text = produit.colors[i]
        select.appendChild(option);
     }
    alert (produit.colors)
    // divImg.appendChild(imageElement);
  // mettre à jour le contenu des éléments HTML avec les données de l'article
//   titleElement.textContent = data.title;
//   contentElement.textContent = data.content;
//   authorElement.textContent = 'By ' + data.author;
};