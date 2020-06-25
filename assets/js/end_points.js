// Bibliotecas
// const axios = require("axios")


// Chamada API endpoint Pokemon
function habilidade(end_point) {
        
   return axios.get(end_point).then( (response) => {
    
        var lista_descricoes = response.data.effect_entries

        var descricao = lista_descricoes.filter(
            (item) => item.language.name == "en"
        )
        
        // return descricao[0].effect
        return descricao[0].short_effect

    }).catch( (error) => {
        
        console.log("Erro no endpoint: " + end_point + "\n")
        console.log(error)
        return error
    })
}


// Chamada API endpoint  Tipo Pokemon
function tipos(end_point) {
        
    return axios.get(end_point).then( (response) => {

        //Informaçoes de estrago em dobro
        var lista_dobro = []

        response.data.damage_relations.double_damage_to.forEach( item => {
            lista_dobro.push(item.name) 
        })


        //Informaçoes de estrago pela metade
        var lista_meio = []

        response.data.damage_relations.half_damage_to.forEach( item => {
            lista_meio.push(item.name) 
        })


        //Informaçoes sem estrago
        var lista_nao = []

        response.data.damage_relations.no_damage_to.forEach( item => {
            lista_nao.push(item.name) 
        })
        
        
        //Informacoes consolidadas 
        var lista_retorno = {
            dobro : lista_dobro ,
            meio  : lista_meio  ,
            nao   : lista_nao
        }
 
        return lista_retorno

     }).catch( (error) => {
         
         console.log("Erro no endpoint: " + end_point + "\n")
         console.log(error)
         return error
     })
 }
 

// module.exports = {
//     habilidade: habilidade,
//     tipos     : tipos
// }



