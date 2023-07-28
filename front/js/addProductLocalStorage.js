export {addProduct}

// Fonction addProduct pour ajouter le nv produit selectionné dans le localStorage //
function addProduct(newProduct) {
  // Récupèration des données associées à la clé "panier" dans l'objet localStorage //
  // La chaîne JSON est ensuite convertie en un objet javascript par JSON.parse()
  let panier = JSON.parse(localStorage.getItem('panier'))
  // si le panier n'est pas vide //
  if  (panier != null) {
    let productFind = false;
    for (let i = 0; i < panier.length; i++) {
      // Si produit trouvé ds le panier=>même Id&color=>maj cumul ancienne qté avec qté saisie //
      if (panier[i].id === newProduct.id && panier[i].color === newProduct.color) {
        panier[i].quantity = parseInt(panier[i].quantity) + parseInt(newProduct.quantity);
        productFind = true;
        // Conversion Objet js panier en une chaîne de caractères JSON par la méthode JSON.stringify()//
        // Stockage  chaîne de caractères JSON dans l'objet localStorage
        localStorage.setItem('panier', JSON.stringify(panier));
        alert(`L'ajout de ${newProduct.quantity} canapé(s) supplémentaire(s) a été pris en compte pour le modèle :  ${newProduct.name} de couleur ${newProduct.color}`);
        break;
      }
    }
    // Si le produit n'existe pas encore dans le panier, l'ajouter dans le panier//
    if (!productFind) {
      addProductToLocalStorage(newProduct,panier);
    }
  }
  // si le panier est vide //
  else 
  {
    panier = []
    addProductToLocalStorage(newProduct,panier)
  }
}

function addProductToLocalStorage(newProduct,panier) {
  // on push le nouveau produit sélectionné //
  panier.push(newProduct);
  // Maj stockage local //
  localStorage.setItem('panier', JSON.stringify(panier));
  // Message d'information à l'utilisateur
  alert(`L'ajout de ${newProduct.quantity} canapé(s) a été pris en compte pour le modèle : ${newProduct.name} de couleur ${newProduct.color}`);
}