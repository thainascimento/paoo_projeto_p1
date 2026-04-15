const axios = require('axios') // importando axios para fazer requisições na internet. tem q usar o cmd npm instal axios no termnal

const cidade = "Paris" // definindo a cidade para verificar a lat e a long
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`

axios
.get(url) // faz a requisição para a api (promise)
.then(res => res.data) // pega só os dados da api (data=dados res=response)
.then(data => { // tratando a promise com o then e catch. (o then para resultado ok)

    const latitude = data.results[0].latitude // pega a latitude do primeiro resultado retornado
    const longitude = data.results[0].longitude // pega a longitude do primeiro res retornado

    obterCondicoes (latitude, longitude) // executa obterCondicoes com latitude e longitude para ser utilizzado na parte 2
    consultaWiki(cidade)

    console.log("Coordenadas:", latitude, 'LAT', longitude, 'LONG') // console que mostra o resultado das coodenadas da cidade 

})
.catch(() => { // o catch caso a promisse de erro
    console.log("Erro ao buscar coordenadas") // console q vai dizer que deu erro ao buscar as coordenadas.
})

// iniciando a segunda parte 

const obterCondicoes = async (latitude, longitude) => { // a função async que recebe latitude e longitude para buscar a condicao do clima atual 
    try { // try pra tentar rodar o cod sem erro 
        const urlCondicoes = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        // def o url 
         const res = await axios.get(urlCondicoes) // faz a requisição para a api usando await (espera o resultado)
         const dados = res.data.current_weather // pega só os dados do current wheater dentro da resposta

         console.log('Condições atuais') // console só pra dixer que abaixo terão as condições do clima
         console.log('Temperatura:', dados.temperature,'°C') // console q mostra a temp 
         console.log('Vento:', dados.windspeed) // console q mostra o vento
    } catch (e) { // o catch, se erro 
        console.log('Erro ao buscae as condições') // se der erro, esse é o console do catch

    }
}
// parte 3
const consultaWiki = (cidade) => {

    const urlWiki = `https://pt.wikipedia.org/api/rest_v1/page/summary/Paris` // URL da Wikipedia com o nome da cidade

    axios
    .get(urlWiki) // faz a requisição para a API da Wikipedia
    .then(res => res.data) // pega apenas os dados da resposta (data)
    .then(data => { // trata os dados retornados da API

        console.log("Resumo wikipedia") // indica início da saída
        console.log("Titulo:", data.title) // exibe o título da página
        console.log("Resumo:", data.extract) // exibe o resumo da cidade

    })
    .catch(() => { // caso ocorra erro na requisição
        console.log("Erro ao mostrar o resumo do wikipedia") // se erro, mensagem 

    })

}
/* const consultaWiki = async (cidade) => {

    const urlWiki = `https://pt.wikipedia.org/api/rest_v1/page/summary/Paris` // monta a URL da Wikipedia
    try {
        const res = await axios.get(urlWiki) // faz a requisição para a API
        const dados = res.data // pega os dados da resposta

        console.log("Resumo wiki") // início da saída
        console.log("Titulo:", dados.title) // exibe o título da cidade
        console.log("Resumo:", dados.extract) // exibe o resumo da cidade

    } catch (e) {
        console.log("Erro ao mostrar o resumo do wiki") // mensagem em caso de falha
    }

} */