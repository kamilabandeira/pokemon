
var pokemons 
var poke_imagens = {}

//Search
document.addEventListener('DOMContentLoaded', function() {        //EventListener vai esperar o codigo aparecer para executar o (DOM..)
  
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=251")
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

  //Funcao para Botao de busca
  function selecionarPokemon() {
    var input = document.querySelector('#autocomplete-input')
    axios.get(`https://pokeapi.co/api/v2/pokemon/${input.value}/`)
      .then(response => {

        document.querySelector('#nomePokemon').innerHTML = response.data.name.toUpperCase()

        document.querySelector('#imagemPrincipalPokemon').src = response.data.sprites.front_default

        var lista = document.querySelector('#listaHabilidades')
        var habilidades = response.data.abilities.map(ab => `<p>${ab.ability.name}</p>`)
        lista.innerHTML = habilidades.join('')                
      }) 
    }

  function selecionarPokemon_2() {

    var input = document.querySelector('#autocomplete-input')

    if (input.length == 0) {
      return false
    } 

    axios.get("https://pokeapi.co/api/v2/pokemon/" + input.value).then( (response) => {
      //Nome do pokemon
      document.querySelector('#nomePokemon').innerHTML = "_" + response.data.name.toLowerCase() 

      //Imagem principal do pokemon
      document.querySelector('#imagemPrincipalPokemon').src = response.data.sprites.front_default

      //Imagens carrosel
      // document.querySelector('#imagemCarouselUm').src = response.data.sprites.back_default
      // document.querySelector('#imagemCarouselDois').src = response.data.sprites.back_shiny
      // document.querySelector('#imagemCarouselTres').src = response.data.sprites.front_shiny
      // document.querySelector('#imagemCarouselQuatro').src = response.data.sprites.front_female
      // document.querySelector('#imagemCarouselCinco').src = response.data.sprites.back_female
      // document.querySelector('#imagemCarouselSeis').src = response.data.sprites.back_shiny_female
      // document.querySelector('#imagemCarouselSete').src = response.data.sprites.front_shiny_female


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
      

      // response.data.types.forEach(item => {

      //     //Chamada API endpoit Tipos
      //     tipos(item.type.url).then( (result_tipo) => {            

      //         var relacao_danos = {
      //             nome        : item.type.name,
      //             causa_danos : result_tipo
      //         }

      //         // Função para salvar os Tipos
      //         // salvaTipo(relacao_danos)

      //     }).catch( (error) => {
      //         var end_point = item.type.url
      //         console.log("Erro no endpoint: " + end_point + "\n")
      //         console.log(error)
      //     })
      // })    

    }).catch( (error) => {
        var end_point = "https://pokeapi.co/api/v2/pokemon/" + input.value
        console.log("Erro no endpoint: " + end_point + "\n")
        console.log(error)
    })

    //Tratamento para deixar o pesquisar vazio novamente
    input.value = ""
  }



 
//Carousel
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {'fullWidth':true, 'indicators':true, 'padding':5});
})