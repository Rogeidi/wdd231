document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('resultadoReserva');
    
    if (urlParams.has('usuario') && container) {
        const nome = urlParams.get('usuario');
        const vinculo = urlParams.get('vinculo');
        const servico = urlParams.get('servico');
        const detalhes = urlParams.get('detalhes');
        

        container.innerHTML = `
            <div class="cartao-sucesso">
                <p><strong>Nome Completo:</strong> <span>${nome}</span></p>
                <p><strong>Vínculo Escolar:</strong> <span>${vinculo}</span></p>
                <p><strong>Serviço Solicitado:</strong> <span>${servico}</span></p>
                <p><strong>Alvo (Livro ou Evento):</strong> <span>${detalhes}</span></p>
            </div>
        `;
    }
});