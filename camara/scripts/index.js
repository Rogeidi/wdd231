document.addEventListener("DOMContentLoaded", () => {
    configurarDataAtual()
    carregarDestaques();
    atualizarRodape();
    configurarMenuHamburger();
});

function configurarDataAtual() {
    const hoje = new Date();
    const opcoes = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    };
    let dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    const elemntoData = document.getElementById('data-atual');
    if (elemntoData) {
        elemntoData.textContent = dataFormatada;
    }
}

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

const urlJson = 'dados/membros.json';

async function carregarDestaques() {

    const container = document.getElementById('container-destaques');
    if (!container) return;

    try {
        const resposta = await fetch(urlJson);

        const dados = await resposta.json();

        const membros = dados.empresas;

        const membrosFiltrados = membros.filter(membro =>
            membro.nivel_associacao === 'Ouro' || membro.nivel_associacao === 'Prata'

        );

        const membrosEmbaralhados = membrosFiltrados.sort(() => 0.5 - Math.random());

        const membrosSelecionados = membrosEmbaralhados.slice(0, 3);

        exibirDestaques(membrosSelecionados);

    } catch (erro) {
        console.error('Erro ao carregar os dados das empresas:', erro);

    }
}

function exibirDestaques(listaMembros) {
    const container = document.getElementById('container-destaques');
    container.innerHTML = '';

    listaMembros.forEach(membro => {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-empresa', `nivel-${membro.nivel_associacao.toLowerCase()}`);

        cartao.innerHTML = `
            <img src="${membro.logotipo}" alt="Logo de ${membro.nome}" class="logo-empresa">
            <h3>${membro.nome}</h3>
            <p class="categoria"><strong>Categoria:</strong> ${membro.categoria}</p>
            <p class="nivel">Nível: ${membro.nivel_associacao}</p>
            <hr>
            <p>📞 ${membro.telefone}</p>
            <p>📍 ${membro.distrital} - ${membro.cidade}</p>
            
        `;
        container.appendChild(cartao);
    });
}

carregarDestaques();

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