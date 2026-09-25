document.addEventListener("DOMContentLoaded", () => {

    const parametros = new URLSearchParams(window.location.search);

    const nome = parametros.get("nome") || "Não informado";
    const sobrenome = parametros.get("sobrenome") || "Nao informado";
    const email = parametros.get("email") || "Naõ informado";
    const celular = parametros.get("celular") || "Naõ informado";
    const organizacao = parametros.get("organizacao") || "Naõ informado";


    const nivelRaw = parametros.get("membership_level") || "Não informado";
    let nivelTexto = nivelRaw;
    if (nivelRaw === "np") nivelTexto = "Associação NP (Sem fins lucrativos)";
    if (nivelRaw === "bronze") nivelTexto = "Associação Bronze";
    if (nivelRaw === "silver") nivelTexto = "Associação Prata";
    if (nivelRaw === "gold") nivelTexto = "Associação Ouro";

    const dscRaw = parametros.get("descricao") || "Não informado";
    const descricao = decodeURIComponent(dscRaw).replace(/\+/g, ' ');


    const timeRaw = parametros.get("timestamp") || "Não informado";
    const timestamp = decodeURIComponent(timeRaw).replace(/\+/g, ' ');


    const containerResumo = document.getElementById("resumo-dados");

    if (containerResumo) {
        containerResumo.innerHTML = `
            <div class = "bloco-dado">
                <p><strong>Nome:</strong> <span>${nome}</span></p>
            </div>
            <div class="bloco-dado">
                <p><strong>Sobrenome:</strong> <span>${sobrenome}</span></p>
            </div>
            <div class="bloco-dado">
                <p><strong>E-mail:</strong> <span>${email}</span></p>
            </div>
            <div class="bloco-dado">
                <p><strong>Celular:</strong> <span>${celular}</span></p>
            </div>
            <div class="bloco-dado">
                <p><strong>Empresa/Organização:</strong> <span>${organizacao}</span></p>
            </div>
            <div class="bloco-dado">
                <p><strong>Data e hora de Envio (timestamp):</strong> <span>${timestamp}</span></p>
            </div>

        `;
    }
});