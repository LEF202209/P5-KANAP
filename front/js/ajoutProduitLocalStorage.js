export {ajoutArticle}

function ajoutArticle(nvProduit) {
  const idProduit = nvProduit.id;
  const nameProduit = nvProduit.name;
  const colorProduit = nvProduit.color;
  const quantityProduit = nvProduit.quantity;
  // localStorage.clear();
  let panier = JSON.parse(localStorage.getItem('panier'))
  if  (panier != null) {
    let produitExiste = false;
    for (let i = 0; i < panier.length; i++) {
      if (panier[i].id === nvProduit.id && panier[i].color === nvProduit.color) {
        panier[i].quantity = parseInt(panier[i].quantity) + parseInt(nvProduit.quantity);
        produitExiste = true;
        break;
      }
    }

    // Si le produit n'existe pas encore dans le panier, l'ajouter
    if (!produitExiste) {
      console.log(nvProduit)
      panier.push(nvProduit);
    }

  // Stocker le panier mis à jour dans le stockage local
  localStorage.setItem('panier', JSON.stringify(panier));
  alert("produit ajouté au panier");
}else {
  panier = []
  panier.push(nvProduit);
  localStorage.setItem('panier', JSON.stringify(panier));
  alert("produit ajouté au panier");
  }
}
