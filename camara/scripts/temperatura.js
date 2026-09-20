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

            gerarPrevisao3Dias(dados.main.temp);
        }
        else {
            throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log("Mensagem de Error >> " + erro);
    }

}

function exibirResultados(dados) {
    if (mLocal) mLocal.innerHTML = dados.name;

    if (mDescricao){
        const desc = dados.weather[0].description;
        mDescricao.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
    }

    if (mTemperatura) {
        mTemperatura.innerHTML = `${dados.main.temp}°C`;
    }

    if (mImagem) {
        const iconsrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`;
        mImagem.setAttribute('src', iconsrc);
        mImagem.setAttribute('alt', dados.weather[0].description);
    }   
    
}

function gerarPrevisao3Dias(tempAtual) {
    const container3Dias = document.getElementById("previsao-3-dias");
    if (!container3Dias) return;
    container3Dias.innerHTML = ""; 

    const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const hoje = new Date();
  
    for (let i = 1; i <= 3; i++) {
        const proximaData = new Date();
        proximaData.setDate(hoje.getDate() + i); 
        
        const nomeDia = diasSemana[proximaData.getDay()];
        
        const tempSimulada = (tempAtual + (i === 1 ? -1.5 : i === 2 ? 1.2 : -0.8)).toFixed(2);

        const blocoDia = document.createElement("div");
        blocoDia.classList.add("dia-previsao");
        blocoDia.innerHTML = `
            <p class="rotulo-dia"><strong>${nomeDia}</strong></p>
            <p class="temp-dia">${tempSimulada}°C</p>
        `;
        
        container3Dias.appendChild(blocoDia);
    }
}

apiFetch();