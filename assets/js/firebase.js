// const firebase = require("firebase")

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
firebase.initializeApp(firebaseConfig)


//Salva pokemon na collection favoritos
async function salvaFavorito() {
  var pokemon = document.getElementById("nomePokemonEscondido").value  

  await firebase.database().ref("favoritos").push({nome_pokemon: pokemon}).then( (result) => {
    console.log("Sucesso: " + result)

  }).catch((error) => {
    console.log("Error ao salvar favorito: ")
    console.log(error)

  })

  //Controle para esconder o botao follow
  verificaFavorito()
}


//Remove pokemon do collectio de favorito 
async function removeFavorito() {
  var pokemon = document.getElementById("nomePokemonEscondido").value  

  var favoritos_ref = firebase.database().ref("favoritos")

  await favoritos_ref.once("value").then( (snapshot) => {

    snapshot.forEach(item => {
      var dados = item.val()

      //Pokemon EXISTE na collection favoritos
      if(dados.nome_pokemon == pokemon) {
        var id_remover = item.key

        favoritos_ref.child(id_remover).remove().then( (result) => {
          console.log("Removido com sucesso ")

        }).catch( (error) => {
          console.log("Error ao remover favorito: ")
          console.log(error)

        })   
      }      
    }) 
    
  }).catch( (error) => {
    console.log("Erro ao consultar favoritos para remover")
    console.log(error)

  })

  //Controle para esconder o botao follow
  verificaFavorito()
}


//Funcao assincrona, pois a consulta de dados no firebase (once) e assincrona, assim e possivel utilizar o comando "await" para guardar o retorno da consulta
async function verificaFavorito() {
  var pokemon = document.getElementById("nomePokemonEscondido").value  
  var achou = false
  
  await firebase.database().ref("favoritos").once("value").then( (snapshot) => {

    snapshot.forEach(item => {
      var dados = item.val()  
      
      //Pokemon EXISTE na collection favoritos
      if(dados.nome_pokemon == pokemon) {
         achou = true
      }      
    })

  }).catch( (error) => {
    console.log("Erro ao consultar favoritos")
    console.log(error)

  })

  //Logica para controlar a visualizacao do botao "follow" e "unfollow"
  if(achou) {
    document.getElementById("btnFollow").hidden = true  // esconde
    document.getElementById("btnUnFollow").hidden = false    // mostra 

  } else {
    document.getElementById("btnFollow").hidden = false  //mostra  
    document.getElementById("btnUnFollow").hidden = true    // esconde 

  }  
}

