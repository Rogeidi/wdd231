import { buscarLivrosLocais, buscarLivrosGlobais } from './data.js';
import { renderizarLivros, fecharModal } from './dom.js';

let acervoAtual = [];

document.addEventListener('DOMContentLoaded', async () => {
    inicializarMenu();
    inicializarModal();
    inicializarBusca();
    inicializarFormulario();

    acervoAtual = await buscarLivrosLocais();
    renderizarLivros(acervoAtual);
});


function inicializarMenu() {
    const menuHamburger = document.getElementById('menuHamburger');
    const navMenu = document.getElementById('navMenu');

    if (menuHamburger && navMenu) {
        menuHamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            menuHamburger.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        });
    }
}

function inicializarModal() {
    const btnFechar = document.getElementById('fecharModal');
    const modal = document.getElementById('modalLivro');

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

    if (modal) {
        modal.addEventListener('click', (evento) => {
            if (evento.target === modal) {
                fecharModal();
            }
        });
    }
}

function inicializarBusca() {
    const inputBusca = document.getElementById('buscaLivro');
    const btnLocal = document.getElementById('btnBuscarLocal');
    const btnAPI = document.getElementById('btnBuscarAPI');

    const ultimaPesquisa = localStorage.getItem('ultimaPesquisa');
    if (ultimaPesquisa && inputBusca) {
        inputBusca.value = ultimaPesquisa;
    }

    if (btnLocal && inputBusca) {
        btnLocal.addEventListener('click', () => {
            const termo = inputBusca.value.toLowerCase().trim();

            localStorage.setItem('ultimaPesquisa', inputBusca.value);

            const livrosFiltrados = acervoAtual.filter(livro =>
                livro.titulo.toLowerCase().includes(termo) ||
                livro.autor.toLowerCase().includes(termo)
            );

            renderizarLivros(livrosFiltrados);
        });
    }

    if (btnAPI && inputBusca) {
        btnAPI.addEventListener('click', async () => {
            const termo = inputBusca.value.trim();

            if (!termo) {
                alert('Por favor, digite um título ou autor para buscar na biblioteca global.');
                return;
            }

            localStorage.setItem('ultimaPesquisa', termo);

            const containerLivros = document.getElementById('containerLivros');
            if (containerLivros) {
                containerLivros.innerHTML = '<p class="carregando">Consultando a Biblioteca Global do Google...</p>';
            }

            const resultadosGlobais = await buscarLivrosGlobais(termo);
            renderizarLivros(resultadosGlobais);
        });
    }
}

function inicializarFormulario() {
    const formulario = document.getElementById('formReserva');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

           
            const nome = document.getElementById('nomeCompleto').value;
            const vinculo = document.getElementById('tipoUsuario').value;
            const servico = document.getElementById('tipoServiço').value;
            const detalhes = document.getElementById('detalhesPedido').value;

            
            const dadosReserva = { nome, vinculo, servico, detalhes };
            localStorage.setItem('ultimaReserva', JSON.stringify(dadosReserva));

            
            window.location.href = `sucesso.html?usuario=${encodeURIComponent(nome)}&vinculo=${encodeURIComponent(vinculo)}&servico=${encodeURIComponent(servico)}&detalhes=${encodeURIComponent(detalhes)}`;
        });
    }
}