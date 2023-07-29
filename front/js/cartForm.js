export {listenButtonOrder}

// Fonction listenButtonOrder pour écouter click sur bouton 'Commande' //
function listenButtonOrder(cart) {
  // Récupération de l'élément HTML formulaire //
  const form = document.querySelector('.cart__order__form');
  // Ajout d'un écouteur d'événements au clic sur le bouton de soumission //
  const submitBtn = document.querySelector('#order');
  submitBtn.addEventListener('click', function(event) {
  // Empêcher le formulaire de se soumettre //
  event.preventDefault();
  // Appel à la fonction "contrôle des données & Envoi (liste Id produits+formulaire) au Back End" //
  submitForm(cart, form);
  })
}

// Fonction pour Contrôle des données &Envoi [liste Id produits+formulaire] au Back End //
function submitForm(cart, form) {
  const contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };
  const error = [];
  // Appel à la fonction validateField pour contrôle chq champ du formulaire //
  validateField(contact.firstName, isValidName, firstNameErrorMsg, error, 'prénom');
  validateField(contact.lastName, isValidName, lastNameErrorMsg, error, 'nom');
  validateField(contact.address, isValidAddress, addressErrorMsg, error, 'adresse postale');
  validateField(contact.city, isValidCity, cityErrorMsg, error, 'ville');
  validateField(contact.email, isValidEmail, emailErrorMsg, error, 'adresse email');
  // Si erreur formulaire rencontrée
  if (error.length > 0) {
    console.log(`Le formulaire contient des erreurs : ${error.join(', ')}`);
    return alert('Erreur de saisie, veuillez vérifier le formulaire!');
  }
  // Si pas d'erreur formulaire
  else
  {
    // Appel à la focntion checkErrorQtyInCart pour contrôler les quantités produits ds cart //
    // Page panier
    const errorQty = checkErrorQtyInCart(cart); 
    // Si tout est correct et pas d'erreur de quantité, soumettre le formulaire //
    if (errorQty===false) {
      console.log("envoi serveur");
      // Appel à la fonction idInCart pour récupérer l'id des produits//
      const ids= idInCart(cart);
      // Poster formulaire de contact et les ids au Back End //
      sendFormUser(contact, ids);
    }
    else 
    {
      alert("Vérifier les quantités, 100 maximum par produit !")
    }
  }
}
// Fonction validateField pour vérifier le contenu des champs formulaires //
function validateField(value,validationFunction, errorElement, errorArray, errorText) {
  // Vérifier si le champ est vide ou invalide // 
  if (value === '') {
    errorElement.textContent = `Veuillez saisir votre ${errorText}.`;
    errorArray.push(errorText);
  } else if (!validationFunction(value)) {
    errorElement.textContent = `Veuillez saisir un(e) ${errorText} valide.`;
    errorArray.push(errorText);
  } else {
    errorElement.textContent = '';
  }
}

// Fonction utilitaire pour vérifier si un nom ou prénom est valide
function isValidName(name) {
  //const nameRegex = new RegExp(`^[a-zA-Zàâçéèêëîïôûùüÿñæœ]{2,50}$`);
  const nameRegex = /^[A-Z a-z àâçéèêëîïôûùüÿñæœ']{2,50}$/;
  return (nameRegex.test(name));
}

// Fonction utilitaire pour vérifier si une adresse est valide
function isValidAddress(address) {
  const addressRegex = /^[A-Z a-z 0-9.,_-àâçéèêëîïôûùüÿñæœ']{3,150}$/;
  return addressRegex.test(address);
}

// Fonction utilitaire pour vérifier si une ville est valide
function isValidCity(city) {
  const cityRegex = /^[A-Z a-z\s_-àâçéèêëîïôûùüÿñæœ']{1,50}$/;
  return cityRegex.test(city);
}

// Fonction utilitaire pour vérifier si une adresse email est valide
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Controler la quantité de chaque  produit dans le cart : 100 maximum //
function checkErrorQtyInCart(cart) {
  let errorQty = false;
  cart.forEach((produit) => {
      if (produit.quantity >100) {
        errorQty = true ;
        return errorQty;
      }     
  })
  return errorQty;
}

//Récupération de l'id produits pour renvoi dans l'objet sendFormData //
function idInCart(cart) {
  const ids = [];
  cart.forEach((produit) => {
      const id = produit.id;
      ids.push(id)
  })
  return ids
}

// Fonction pour envoi au Back End (formulaire de contact & ids) avec fetch et methode POST //
async function sendFormUser(contact, ids) {
  const sendFormData  = {
        contact: contact,
        products: ids,
  }
  try {
    const rawResponse = await fetch('http://localhost:3000/api/products/order', {  
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendFormData),
    }); 
    const data = await rawResponse.json();
    retrieveOrderNumber(data);
  } 
  catch (error) {
  console.log(error);
  alert("Une erreur est survenue, merci de revenir plus tard.");
  }
}

function retrieveOrderNumber(data){
  // Redirection vers la page de confirmation //
  location.href = "confirmation.html?orderId="+data.orderId;
}

