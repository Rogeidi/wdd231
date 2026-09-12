document.addEventListener("DOMContentLoaded", () => {
    carregarEmpresas();
    atualizarRodape();
    configurarMenuHamburger();
});

function configurarMenuHamburger() {
    const botaoHam = document.getElementById("ham-btn");
    const barraNav = document.getElementById("nav-bar");

    if (botaoHam && barraNav) {
        botaoHam.addEventListener("click", () => {
            barraNav.classList.toggle("aberto");

            if (barraNav.classList.contains("aberto")) {
                botaoHam.textContent = "✕";
            }
            else {
                botaoHam.textContent = "☰";
            }
        });
    }
}

function carregarEmpresas() {
    const container = document.getElementById("diretorio-empresas");

    fetch("dados/membros.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo de dados das carregarEmpresas.");
            }
            return response.json();
        })
        .then(dados => {
            container.innerHTML = "";

            dados.empresas.forEach(empresa => {
                const cartao = document.createElement("div");
                cartao.className = "cartao-empresa";

                cartao.innerHTML = `
                    <h3>${empresa.nome}</h3>
                    <p><strong>📍 Localidade:</strong> ${empresa.cidade}</p>
                    <p><strong>🏷️ Categoria:</strong> ${empresa.categoria}</p>
                    <p><strong>🏢 Região:</strong> ${empresa.distrital}</p>
                    <p><strong>📞 Telefone:</strong> ${empresa.telefone}</p>
                `;

                container.appendChild(cartao);
            });
        })
        .catch(erro => {
            console.error("Erro no fetch:", erro);
            container.innerHTML = "<p class='erro'>Não foi possível carregar o diretório de empresas no momento.</p>";

        });
}

function atualizarRodape() {
    const anoAtualElemento = document.getElementById("anoAtual");
    if (anoAtualElemento) {
        const ano = new Date().getFullYear();
        anoAtualElemento.innerHTML = `&copy; ${ano} | Rogeidi | Americana SP`;
    }

    const ultimaModificacaoElemento = document.getElementById("ultimaModificacao");
    if (ultimaModificacaoElemento) {
        const dataModificacao = new Date(document.lastModified);
        const opcoesFormatacao = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const dataFormatada = dataModificacao.toLocaleDateString('pt-BR', opcoesFormatacao);

        ultimaModificacaoElemento.textContent = `Última Modificação: ${dataFormatada}`
    }
}