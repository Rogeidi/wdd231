function carregarEmpresas() {
    const container = document.getElementById("diretorio-empresas");

    if (!container) return;

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

                const nivel = empresa.nivel_associacao ? empresa.nivel_associacao.toLowerCase() : 'bronze';

                cartao.className = `cartao-empresa nivel-${nivel}`;

                const fotoCaminho = empresa.logotipo ? empresa.logotipo : "https://placehold.co";


                cartao.innerHTML = `
                    <img src="${fotoCaminho}" alt="Logo de ${empresa.nome}" class="logo-empresa">
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

carregarEmpresas();