var pokemons 
var poke_imagens = {}
  

//Search
document.addEventListener('DOMContentLoaded', function() {        //EventListener vai esperar o codigo aparecer para executar o (DOM..)
  
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=700")
		.then(response => {       
      var pokemons = response.data.results
      pokemons.forEach(poke => {
				var split = poke.url.split('/')
				var numero = split[split.length-2]
				var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numero + '.png'
				poke_imagens[poke.name] = url
    })    
  })
  
		var elems = document.querySelectorAll('.autocomplete');		
		var instances = M.Autocomplete.init(elems, { data: poke_imagens });
  })

  
  function selecionarPokemon() {

    var input = document.querySelector('#autocomplete-input')

    if (input.length == 0) {
      return false
    } 

    axios.get("https://pokeapi.co/api/v2/pokemon/" + input.value).then( (response) => {
      //Nome do pokemon
      document.querySelector('#nomePokemon').innerHTML = "_" + response.data.name.toLowerCase() 

      //Imagem principal do pokemon
      document.querySelector('#imagemPrincipalPokemon').src = response.data.sprites.front_default
      
      //Lista de habilidades do pokemon
      document.getElementById('listaHabilidades').innerHTML = ""
      // <p><span class="profile-real-name">Eletric:</span> Choque que paralisa o adversário</p>

      response.data.abilities.forEach( item => { 

          // Chamada API endpoint Habilidade
          habilidade(item.ability.url).then( (result_desc_hab) => {

              // Funcao para salvar as descricoes das habilidades
              var p = document.createElement('p')
              p.innerHTML = '<span class="profile-real-name"> ' + item.ability.name + ': </span>' + result_desc_hab                  

              document.getElementById('listaHabilidades').appendChild(p) 

          }).catch( (error) => {
              var end_point = item.ability.url
              console.log("Erro no endpoint: " + end_point + "\n")
              console.log(error)
          })
          
      })
           
    }).catch( (error) => {
        var end_point = "https://pokeapi.co/api/v2/pokemon/" + input.value
        console.log("Erro no endpoint: " + end_point + "\n")
        console.log(error)
    })

    //Tratamento para deixar o pesquisar vazio novamente
    input.value = ""

    document.getElementById("tela_pokemons").hidden = false  //mostra tela de pokemon 
    document.getElementById("tela_inicial").hidden = true    // esconde tela inicial
  }

 
