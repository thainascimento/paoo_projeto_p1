const axios = require('axios') // importando axios para fazer requisições na internet

const cidade = "Rio de Janeiro" // definindo a cidade para verificar a lat e a long
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`

axios
.get(url) // faz a requisição para a api (promise)
.then(res => res.data) // pega só os dados da api (data=dados res=response)
.then(data => {

    const latitude = data.results[0].latitude // pega a latitude do primeiro resultado retornado
    const longitude = data.results[0].longitude // pega a longitude do primeiro res retornado

    console.log("Coordenadas:", latitude, longitude) // console que mostra o resultado das coodenadas da cidade 

})
.catch(() => { // o catch caso a promisse de erro
    console.log("Erro ao buscar coordenadas") 
})

