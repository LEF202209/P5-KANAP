export {listenButtonOrder}

function listenButtonOrder(cart) {
// Récupération du formulaire et du bouton de soumission
const form = document.querySelector('.cart__order__form');
const submitBtn = document.querySelector('#order');

// Ajout d'un écouteur d'événements au clic sur le bouton de soumission
submitBtn.addEventListener('click', function(event) {
  // Empêcher le formulaire de se soumettre
  event.preventDefault();
  soumissionForm(cart, form);
  })
}

function soumissionForm(cart,form)
{
  // Récupération des valeurs des champs du formulaire
  const contact = {
    firstName : form.firstName.value,
    lastName : form.lastName.value,
    address : form.address.value,
    city : form.city.value,
    email : form.email.value,
  }
// Vérification des valeurs des champs
  const error = []
  firstNameErrorMsg.textContent='';
  lastNameErrorMsg.textContent='';
  addressErrorMsg.textContent='';
  cityErrorMsg.textContent='';
  emailErrorMsg.textContent='';
 
  if (contact.firstName === '') {
    const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');  
    firstNameErrorMsg.textContent = 'Veuillez saisir votre prénom.';
    error.push("prénom");
  }else if (!isValidName(contact.firstName)) {
    firstNameErrorMsg.textContent = 'Veuillez saisir un prénom valide.';
    error.push("prénom")
  }
  
  if (contact.lastName === '') {
    const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
    lastNameErrorMsg.textContent = 'Veuillez saisir votre nom.';
    error.push("nom");
  }else if (!isValidName(contact.lastName)) {
    lastNameErrorMsg.textContent = 'Veuillez saisir un nom valide.';
    error.push("nom"); 
  }

  if (contact.address === '') {
    const addressErrorMsg = document.querySelector('#addressErrorMsg');
    addressErrorMsg.textContent = 'Veuillez saisir votre adresse.';
    error.push("adresse postale");
  }else if (!isValidAddress(contact.address)) {
    addressErrorMsg.textContent = 'Veuillez saisir une adresse valide.';
    error.push("adresse postale"); 
  }

  if (contact.city === '') {
    const cityErrorMsg = document.querySelector('#cityErrorMsg');
    cityErrorMsg.textContent = 'Veuillez saisir votre ville.';
    error.push("ville");
  } else if (!isValidCity(contact.city)) {
    const cityErrorMsg = document.querySelector('#cityErrorMsg');
    cityErrorMsg.textContent = 'Veuillez saisir une ville valide.';
    error.push("ville");
  }

  if (contact.email === '') {
    const emailErrorMsg = document.querySelector('#emailErrorMsg');
    emailErrorMsg.textContent = 'Veuillez saisir votre email.';
    error.push("adresse email");
  } else if (!isValidEmail(contact.email)) {
    const emailErrorMsg = document.querySelector('#emailErrorMsg');
    emailErrorMsg.textContent = 'Veuillez saisir une adresse email valide.';
    error.push("adresse email");
  }

  // Si une erreur est détectée, arrêter le traitement
  // Vérifier si le formulaire est valide
  alert("erreur-longueur");
  alert(error.length );
if (error.length > 0) {
    console.log(`Le formulaire contient des erreurs : ${error.join(", ")}`); 
    return alert("Erreur de saisie, veuillez vérifier le formulaire!");
} else {
    // Si tout est correct, soumettre le formulaire
    console.log("envoi serveur");
    console.log(contact)
    
  }

    const ids= idDansCart(cart);
    envoyerDonneesUtilisateur(contact, ids);
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
  const nameRegex = /^[A-Z a-z -àâçéèêëîïôûùüÿñæœ']{2,50}$/;
  return (nameRegex.test(name));
}

// Fonction utilitaire pour vérifier si une adresse est valide
function isValidAddress(address) {
  const addressRegex = /^[A-Z a-z 0-9._-àâçéèêëîïôûùüÿñæœ']{3,150}$/;
  return addressRegex.test(address);
}

// Fonction utilitaire pour vérifier si une ville est valide
function isValidCity(city) {
  const cityRegex = /^[A-Z a-z\s_-àâçéèêëîïôûùüÿñæœ']{2,50}$/;
  return cityRegex.test(city);
}


//envoi des donnés utilisateur et id du produit
// function envoyerDonneesUtilisateur(contact, ids) {
//     const sendFormData  = {
//         contact: contact,
//         products: ids,
//     }
//     //conditions de validation du formulaire avant envoi
//         console.log("envoi serveur");
//         //requête post au serveur
//         fetch(`http://localhost:3000/api/products/order`, {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(sendFormData),
//         })
//         .then((res) => res.json())
//         .then((data) => recupereNumCde(data))
//         .catch(() => {
//             alert("Une erreur est survenue, merci de revenir plus tard.");
//         })
//     }
// //




async function envoyerDonneesUtilisateur(contact, ids) {
      const sendFormData  = {
          contact: contact,
          products: ids,
      }
   try {
     alert ("en envoi order");
    // const rawResponse = await fetch(`http://localhost:3000/api/products/order`, {
      const rawResponse = await fetch('http://localhost:3000/api/products/order', {  
    method: "POST",
      headers: {
      'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendFormData),
    });
   
     
    const data = await rawResponse.json();
    recupereNumCde(data);
  } catch (error) {
    alert ("error serveur");
    alert(error);
    console.log(error);
    alert("Une erreur est survenue, merci de revenir plus tard.");
  }
}
function recupereNumCde(data){
  console.log("données")
  console.log(data);
  alert("je vais afficher num cde");
  alert (data.orderId);
  // location.href ="confirmation.html"+"?orderId="+data.orderId
}


//récupération des id pour renvoi dans l'objet products
function idDansCart(cart) {
  alert("function id dans carte")
    const ids = [];
    cart.forEach((produit) => {
        const id = produit.id;
        ids.push(id)
    })
    return ids
}


