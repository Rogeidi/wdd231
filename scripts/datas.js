document.addEventListener("DOMContentLoaded", () => {
    const elemtoAno = document.getElementById('anoAtual');
    if (elemtoAno) {
        const anoAtual = new Date().getFullYear();
        elemtoAno.textContent = `${anoAtual} |Rogeidi | Americana sp`;

    }

    const elemtoModificacao = document.getElementById('ultimaModificacao');
    if (elemtoModificacao) {
        const ultimaModif = document.lastModified;
        elemtoModificacao.textContent = `Última modificação: ${ultimaModif}`;

    }
});