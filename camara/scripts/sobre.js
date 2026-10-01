import { locais } from "../dados/locais-turisticos.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const mensagemElemento = document.getElementById("visita-mensagem");
    const ultimaVisita = localStorage.getItem("ultimaVisita");
    const agora = Date.now();

    if (!ultimaVisita) {
        mensagemElemento.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
    
        const diferencaTempo = agora - parseInt(ultimaVisita, 10);
        const diferenciaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

        if (diferenciaDias < 1) {
            mensagemElemento.textContent = "Já voltou? Que legal!";

        } else if (diferenciaDias === 1) {
            mensagemElemento.textContent = "Seu último acesso foi há 1 dia.";

        } else {
            mensagemElemento.textContent = `Seu último acesso foi há ${diferenciaDias} dias. Bem-vindo de volta!`;
        }
    }

    localStorage.setItem("ultimaVisita", agora.toString());

    const container = document.getElementById("cards-container");

    container.innerHTML = "";

    locais.forEach((local, index) => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.classList.add(`card-${index + 1}`);

        card.innerHTML = `
            <h2>${local.nome}</h2>
            <figure>
                <img src="${local.foto}" alt="Foto de ${local.nome} em Americana" loading="lazy">
            </figure>
            <address>${local.endereco}</address> 
            <p>${local.descricao}</p>
            <a href="associacao.html" class= "btn-saiba-mais">Saiba mais</a>
            `;
        container.appendChild(card);
    });
});