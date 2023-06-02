export {addProduct}

function addProduct(newProduct) {
  // récupèration de la valeur associée à la clé "panier" dans l'objet localStorage
  let panier = JSON.parse(localStorage.getItem('panier'))
  // si le panier n'est pas vide //
  if  (panier != null) {
    let productFind = false;
    for (let i = 0; i < panier.length; i++) {
      // Si produit trouvé ds le panier=>même Id&color=>maj cumul qté avec qté saisie //
      if (panier[i].id === newProduct.id && panier[i].color === newProduct.color) {
        panier[i].quantity = parseInt(panier[i].quantity) + parseInt(newProduct.quantity);
        productFind = true;
        localStorage.setItem('panier', JSON.stringify(panier));
        alert(`L'ajout de ${newProduct.quantity} canapé(s) supplémentaire(s) a été pris en compte pour le modèle :  ${newProduct.name} de couleur ${newProduct.color}`);
        break;
      }
    }
    // Si le produit n'existe pas encore dans le panier, l'ajouter dans le panier//
    if (!productFind) {
      console.log(newProduct)
      panier.push(newProduct);
      localStorage.setItem('panier', JSON.stringify(panier));
      alert(`L'ajout de ${newProduct.quantity} canapé(s) a été pris en compte pour le modèle : ${newProduct.name} de couleur ${newProduct.color}`);
    }
  // si le panier est vide
  }else {
    panier = []
    // on push le nouveau produit sélectionné
    panier.push(newProduct);
     // Stocker le panier mis à jour dans le stockage local
    localStorage.setItem('panier', JSON.stringify(panier));
    alert(`L'ajout de ${newProduct.quantity} canapé(s) a été pris en compte pour le modèle : ${newProduct.name} de couleur ${newProduct.color}`);
    }
 // Stocker le panier mis à jour dans le stockage local
  // localStorage.setItem('panier', JSON.stringify(panier));
  // alert("Article ajouté au panier");
}
