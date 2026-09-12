const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    //console.table(dados.profetas);
    exibirProfetas(dados.profetas);

}

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        const cartao = document.createElement('section');
        const nomeCompleto = document.createElement('h2');
        const retrato = document.createElement('img');

        const dataNascimento = document.createElement('p');
        const localNacimento = document.createElement('p');
        const quantidadeFilhos = document.createElement('p');
        const tempoServisio = document.createElement('p');
        const dataFalecimento = document.createElement('p');

        const informacoes = document.createElement('div');
        informacoes.classList.add('informacoes');


        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        dataNascimento.textContent = `Nascimento: ${profeta.nascimento}`;
        localNacimento.textContent = `Lugar: ${profeta.localNascimento}`;
        quantidadeFilhos.textContent = `Crianças: ${profeta.numeroFilhos}`;
        tempoServisio.textContent = `Anos de Serviço: ${profeta.duracao}`;
        dataFalecimento.textContent = `Falecimento: ${profeta.morte}`;

        informacoes.appendChild(dataNascimento);
        informacoes.appendChild(localNacimento);
        informacoes.appendChild(quantidadeFilhos);
        informacoes.appendChild(tempoServisio);
        informacoes.appendChild(dataFalecimento);
        

        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');


        cartao.appendChild(nomeCompleto);
        cartao.appendChild(informacoes);
        cartao.appendChild(retrato);

        cartoes.appendChild(cartao);

    });

}

obterDadosDeProfetas();
