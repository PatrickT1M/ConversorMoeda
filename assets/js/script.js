const form = document.getElementById("Converterform");
const moedas = document.getElementById("moedas");
const valorDinheiro = document.getElementById("valorDinheiro");
const valorConvertido = document.getElementById("valorConvertido");
const moedaConvertida = document.getElementById("moedaConvertida");

const carregando = document.querySelector(".carregando");
const result = document.querySelector(".result");
const error = document.querySelector(".error");


const API_MONEY_URL = "https://v6.exchangerate-api.com/v6/820b93749e45ee7b786454b7/latest/";


async function Converter() {
    carregando.style.display = "block";
    error.style.display = "none";
    result.style.display = "none"


    try {
        const response = await fetch(API_MONEY_URL + moedas.value);
        const data = await response.json()
        const rate = data.conversion_rates[moedaConvertida.value];
        const conversao = (valorDinheiro.value * rate).toFixed(2);
        valorConvertido.value = conversao;
        result.style.display = "block"


        result.innerHTML = `
        <div>
            ${valorDinheiro.value} ${moedas.value} = ${valorConvertido.value} ${moedaConvertida.value}
        </div>
        <small style="margin-top:10px">1 ${moedas.value} = ${rate} ${moedaConvertida.value}</small>
        `


    } catch (err) {
        error.style.display = "block"
        error.innerHTML = `
        <div>
            Falha ao converter moeda! Tente Novamente
        </div>
        `
        

    }

    carregando.style.display = "none"

}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    Converter();
});