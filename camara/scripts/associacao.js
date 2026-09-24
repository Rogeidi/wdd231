document.addEventListener("DOMContentLoaded", () => {
    const campoTimestamp = document.getElementById("timestamp");
    if (campoTimestamp) {

        campoTimestamp.value = new Date().toLocaleString("pt-BR");
    }

    const niveisAssociacao = [
        {
            id: "np",
            titulo: "Associação Sem Fins Lucrativos",
            custo: "Gratuito",
            
            
            beneficios: [
                "Isenção total de taxas de anuidade.",
                "Listagem simples padronizada no diretório oficial.",
                "Envio prioritário de publicações e boletins informativos."
            ]
        },
        {
            id: "bronze",
            titulo: "Associação Bronze",
            custo: "R$50 por ano",
            beneficios: [
                "Inclusão garantida no diretório empresarial digital.",
                "Acesso a treinamentos e capacitações de nível básico.",
                "Participação direta em almoços e eventos convencionais."
            ]
        },
        {
            id: "silver",
            titulo: "Associação Prata",
            custo: "R$80 por ano",
            
            beneficios: [
                "Todos os benefícios oferecidos na categoria Bronze.",
                "Publicações periódicas nas redes sociais da câmara.",
                "Descontos exclusivos em ingressos para conferências anuais.",
                "Oportunidades de patrocínio empresarial de médio porte."
            ]
        },
        {
            id: "gold",
            titulo: "Associação Ouro",
            custo: "R$150 por ano",
            
            beneficios: [
                "Destaque publicitário master na página inicial.",
                "Inclusão integral de todos os benefícios anteriores.",
                "Acesso VIP exclusivo a reuniões com a diretoria.",
                "Direito a Patrocínio Master nos principais eventos.",
                "Treinamento estratégico avançado personalizado para equipes.",
                "Consultoria de marketing institucional inclusa"
            ]
        }
    ];

    const containerPlanos = document.getElementById("container-cartoes-planos");

    if (containerPlanos) {

        let conteudoHTML = `<h2>Planos Disponíveis</h2><div class="grid-cartoes">`;

        niveisAssociacao.forEach(plano => {
            conteudoHTML += `
                <div class="cartao-plano animar-entrada" id="card-${plano.id}">
                    <span class ="nome-plano-label">${plano.titulo}</span>
                    
                    <button type="button" class="btn-abrir-modal" data-modal="modal-${plano.id}">Obter mais informações</button>
                </div>
            `;
        });

        conteudoHTML += `</div>`;

        niveisAssociacao.forEach(plano => {
            let listaBeneficios = "";
            plano.beneficios.forEach(b => {
                listaBeneficios += "<li>" + b + "</li>";
            });

            conteudoHTML += `
                <div id="modal-${plano.id}" class="janela-modal-overlay">
                    <div class="conteudo-modal-janela">
                        <div class="modal-cabecalho">
                            <h3>Benefícios - ${plano.titulo}</h3>
                            <button type="button" class="btn-fechar-modal" data-fechar="modal-${plano.id}">&times;</button>
                        </div>
                        <div class="modal-corpo">
                            <p class="beneficios-titulo">Os beneficios incluem:</p>
                            <ul>
                                ${listaBeneficios}
                            </ul>
                        </div>
                        <div class="modal-custo-box">
                            <strong>CUSTO: ${plano.custo}</strong>
                        </div>    
                    </div>
                </div>
            `;
        });

        containerPlanos.innerHTML = conteudoHTML;
    }

    const meuFormulario = document.getElementById("form-associacao");
    if (meuFormulario) {
        meuFormulario.addEventListener("submit", () => {
            if (campoTimestamp) {
                campoTimestamp.value = new Date().toLocaleString("pt-BR");
            }
        });
    }

    document.body.addEventListener("click", (evento) => {

        if (evento.target.classList.contains("btn-abrir-modal")) {
            const idModal = evento.target.getAttribute("data-modal");
            const modalAlvo = document.getElementById(idModal);
            if (modalAlvo) {
                modalAlvo.style.display = "block";

                const btnFechar = modalAlvo.querySelector(".btn-fechar-modal");
                if (btnFechar) btnFechar.focus();
            }
        }


        if (evento.target.classList.contains("btn-fechar-modal")) {
            const idModal = evento.target.getAttribute("data-fechar");
            const modalAlvo = document.getElementById(idModal);
            if (modalAlvo) {
                modalAlvo.style.display = "none";
            }
        }


        if (evento.target.classList.contains("janela-modal-overlay")) {
            evento.target.style.display = "none";
        }
    });


    window.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            const modaisAtivos = document.querySelectorAll(".janela-modal-overlay");
            modaisAtivos.forEach(modal => {
                if (modal.style.display === "block") {
                    modal.style.display = "none";
                }
            });
        }
    });


});



