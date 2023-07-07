export {listenButtonOrder}

function listenButtonOrder(cart) {
  // Récupération du formulaire //
  const form = document.querySelector('.cart__order__form');
  // Ajout d'un écouteur d'événements au clic sur le bouton de soumission //
  const submitBtn = document.querySelector('#order');
  submitBtn.addEventListener('click', function(event) {
  // Empêcher le formulaire de se soumettre //
  event.preventDefault();
  // Appel à la fonction pour Envoi données (produits sélectionnées+formulaire) au Back End //
  submitForm(cart, form);
  })
}

// Fonction pour Envoi des données (produits sélectionnées+formulaire) au Back End //
function submitForm(cart,form){
  // Récupération des valeurs des champs du formulaire
  const contact = {
    firstName : form.firstName.value,
    lastName : form.lastName.value,
    address : form.address.value,
    city : form.city.value,
    email : form.email.value,
  }
  // Declaration et initialisation des messages d'erreurs //
  const error = []
  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  firstNameErrorMsg.textContent='';
  const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg'); 
  lastNameErrorMsg.textContent='';
  const addressErrorMsg = document.querySelector('#addressErrorMsg');
  addressErrorMsg.textContent='';
  const cityErrorMsg = document.querySelector('#cityErrorMsg');
  cityErrorMsg.textContent='';
  const emailErrorMsg = document.querySelector('#emailErrorMsg');
  emailErrorMsg.textContent='';

  // Vérification des valeurs des champs //

  //Prénom// 
  if (contact.firstName === '') {
    // Init contenu champ - message d'erreur prénom - dans HTML // 
    firstNameErrorMsg.textContent = 'Veuillez saisir votre prénom.';
    error.push("prénom");
  } else if (!isValidName(contact.firstName)) {
    // Init contenu champ - message d'erreur prénom -  dans HTML //
    firstNameErrorMsg.textContent = 'Veuillez saisir un prénom valide.';
    error.push("prénom")
  }

  //Nom// 
  if (contact.lastName === '') {
    // Init contenu champ - message d'erreur nom - dans HTML //
    lastNameErrorMsg.textContent = 'Veuillez saisir votre nom.';
    error.push("nom");
  }else if (!isValidName(contact.lastName)) {
    // Init contenu champ - message d'erreur nom - dans HTML //
    lastNameErrorMsg.textContent = 'Veuillez saisir un nom valide.';
    error.push("nom"); 
  }

  //Adresse// 
  if (contact.address === '') {
    // Init contenu champ - message d'erreur adresse postale - dans HTML //
    addressErrorMsg.textContent = 'Veuillez saisir votre adresse.';
    error.push("adresse postale");
  }else if (!isValidAddress(contact.address)) {
    // Init contenu champ - message d'erreur adresse postale - dans HTML //
    addressErrorMsg.textContent = 'Veuillez saisir une adresse valide.';
    error.push("adresse postale"); 
  }

  //Ville//
  if (contact.city === '') {
    // Init contenu champ - message d'erreur ville - dans HTML //
    cityErrorMsg.textContent = 'Veuillez saisir votre ville.';
    error.push("ville");
  } else if (!isValidCity(contact.city)) {
    // Init contenu champ - message d'erreur ville - dans HTML //
    cityErrorMsg.textContent = 'Veuillez saisir une ville valide.';
    error.push("ville");
  }

  //Adresse mail //
  if (contact.email === '') {
    // Init contenu champ - message d'erreur adresse mail - dans HTML //
    emailErrorMsg.textContent = 'Veuillez saisir votre email.';
    error.push("adresse email");
  } else if (!isValidEmail(contact.email)) {
    // Init contenu champ - message d'erreur adresse mail - dans HTML //
    emailErrorMsg.textContent = 'Veuillez saisir une adresse email valide.';
    error.push("adresse email");
  }

  // Si une erreur est détectée, ne pas soumettre le formulaire! //
  // Vérifier si le formulaire est valide //
  if (error.length > 0) {
    console.log(`Le formulaire contient des erreurs : ${error.join(", ")}`); 
    return alert("Erreur de saisie, veuillez vérifier le formulaire!");
  }
  else
  {
    // controler les quantités des produits dans le cart //
    const errorQty = errorQtyInCart(cart); 
    // Si tout est correct et pas d'erreur de quantité, soumettre le formulaire //
    if (errorQty===false) {
      console.log("envoi serveur");
      console.log(contact);  
      // récupérer l'id des produits//
      const ids= idInCart(cart);
      // poster formulaire de contact et les ids //
      console.log(ids);
      sendFormUser(contact, ids);
    }
    else 
    {
      alert("Vérifier les quantités, 100 maximum par produit !")
    }
  }
}

// Fonction utilitaire pour vérifier si une adresse email est valide
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction utilitaire pour vérifier si un nom ou prénom est valide
function isValidName(name) {
  // const nameRegex = new `^[a-zA-Zàâçéèêëîïôûùüÿñæœ\\s-]{${miniNom},${maxiNom}}$`;
  // const nameRegex = /^[A-Za-z'-]{${miniNom},${maxiNom}}$/;
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

// Controler la quantité de chaque  produit dans le cart : 100 maximum //
function errorQtyInCart(cart) {
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

// Fonction pour poster formulaire de contact et les ids avec la methode POST //
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

