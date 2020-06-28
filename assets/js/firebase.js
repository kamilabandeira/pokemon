// const firebase = require("firebase");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA86g5cYmFPsr5JIr0gE6N8coaTgvUWeew",
    authDomain: "pokemon-bdb9e.firebaseapp.com",
    databaseURL: "https://pokemon-bdb9e.firebaseio.com",
    projectId: "pokemon-bdb9e",
    storageBucket: "pokemon-bdb9e.appspot.com",
    messagingSenderId: "590424274786",
    appId: "1:590424274786:web:1e0457d874f1879c85de3b",
    measurementId: "G-0GFBN2V8PY"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

function salvaFavorito() {
  var pokemon = document.getElementById("nomePokemonEscondido").value  

  firebase.database().ref("favoritos").push({nome_pokemon: pokemon}).then( (resulte) => {
    console.log("Sucesso: " + resulte)

  }).catch((error) => {
    console.log("Error: " + error)

  })   
}
