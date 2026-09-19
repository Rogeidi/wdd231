const mLocal = document.querySelector('#local');
const mDescricao = document.querySelector('#descricao');
const mTemperatura = document.querySelector('#temperatura');
const mImagem = document.querySelector('#imagem');


const mChave = "b945e0a44b2d754fe6ff92d4546d89dc"
const mLat = "-22.73"
const mLon = "-47.33"
const mLang = "pt_BR"


const mURL = `https://api.openweathermap.org/data/2.5/weather?lat=${mLat}&lon=${mLon}&appid=${mChave}&units=metric&lang=${mLang}`


async function apiFetch() {
    try {
        const resposta = await fetch(mURL);

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            exibirResultados(dados);
        }
        else {
            throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log("Mensagem de Error >> " + erro);
    }

}

function exibirResultados(dados) {
    mLocal.innerHTML = dados.name
    mDescricao.innerHTML = dados.weather[0].description;
    mTemperatura.innerHTML = `${dados.main.temp}°C`;
    const iconsrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`;
    mImagem.setAttribute('src', iconsrc);
    mImagem.setAttribute('alt', dados.weather[0].description);
}

apiFetch();