export {ajoutArticle}

function ajoutArticle(produitDansCarte){
        //création variables pour le produit ajouté
        const idProduct = produitDansCarte.id;
        const nameProduct = produitDansCarte.name;
        const colorProduct = produitDansCarte.color;
        const quantityProduct = produitDansCarte.quantity;
        //récurépation local storage en objet JS
        let tabCarte =JSON.parse(localStorage.getItem("carte"))
        
        if (tabCarte != null)  {
            //insere le produit dans le local storage
              tabCarte.push(produitDansCarte);
              localStorage.setItem("carte", JSON.stringify(tabCarte));
              alert(`L'ajout de ${quantityProduct} ${nameProduct} a été pris en compte`);
          }
        else{
          //sinon creation d'un tableau vide et on injecte l'objet
          tabCarte = []
          tabCarte.push(produitDansCarte);
          localStorage.setItem("carte", JSON.stringify(tabCarte));
          alert(`L'ajout de ${quantityProduct} ${nameProduct} a été pris en compte`);
        }  
}

