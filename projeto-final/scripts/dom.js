export function renderizarLivros(listaLivros) {
    const container = document.getElementById('containerLivros');

    if (!container) return;

    container.innerHTML = '';

    if (listaLivros.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhum livro encontrado no acervo.</p>';
        return;

    }

    listaLivros.forEach(livro => {
        const card = document.createElement('article');
        card.classList.add('livro-card');

        const textoDisponibilidade = livro.disponivel ? 'Disponível' : 'Emprestado';
        const claseDisponibilidade = livro.disponivel ? 'status-disponivel' : 'status-emprestado';

        card.innerHTML = `
        <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}" class="livro-imagem" loading="lazy">
        <div class="livro-info">
            <h4 class="livro-titulo">${livro.titulo}</h4>
            <p class="livro-autor"><strong>Autor:</strong> ${livro.autor}</p>
            <p class="livro-ano"><strong>Ano:</strong> ${livro.ano}</p>
            <span class="livro-status ${claseDisponibilidade}">${textoDisponibilidade}</span>
            <button class="btn-detalhes" data-id="${livro.id}">Ver Mais Detalhes</button>
        </div>
        `;

        container.appendChild(card);

    });

    configurarEventoDosBotoes(listaLivros);


}

function configurarEventoDosBotoes(listaLivros) {
    const botoes = document.querySelectorAll('.btn-detalhes');

    botoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const idLivro = evento.target.getAttribute('data-id');
            const livroselecionado = listaLivros.find(l => l.id == idLivro);

            if (livroselecionado) {
                abrirModal(livroselecionado);
            }
        });
    });
}


export function abrirModal(livro) {
    const modal = document.getElementById('modalLivro');
    const detalhesModal = document.getElementById('detalhesModal');

    if (!modal || !detalhesModal) return;

    const textoDisponibilidade = livro.disponivel ? 'Disponível para Empréstimo' : 'Indisponível no Momento';


    detalhesModal.innerHTML = `
        <div class="modal-content">
            <button id="fecharModal" class="close-btn" aria-label="Fechar detalhes">&times;</button>
            <div class="modal-flex">
                <img src="${livro.imagem}" alt="Capa de ${livro.titulo}" class="modal-imagem">
                <div class="modal-info">
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Ano de Publicação:</strong> ${livro.ano}</p>
                    <p><strong>Status:</strong> ${textoDisponibilidade}</p>
                    <p class="modal-sinopse"><strong>Sinopse/Nota:</strong> Venha até a BiblioTech Alvorada para ler esta obra ou solicite a sua reserva na nossa aba de formulário.</p>
                    ${livro.disponivel ? '<a href="reserva.html" class="btn-reservar-modal">Reservar este Livro</a>' : ''}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    const btnFechar = detalhesModal.querySelector('#fecharModal');
    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

}

export function fecharModal() {
    const modal = document.getElementById('modalLivro');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}