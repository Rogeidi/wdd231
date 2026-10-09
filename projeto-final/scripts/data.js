export async function buscarLivrosLocais() {
    try {
        const resposta = await fetch('dados/livros.json');

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar o acervo local.')
        }

        const livros = await resposta.json();
        return livros;
    } catch (erro) {
        console.error("Erro ao buscar livros locais:", erro);
        return [];
    }
}

export async function buscarLivrosGlobais(termo) {
    if (!termo) return [];

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termo)}&maxResults=15`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error('Erro na consulta à biblioteca global.');
        }

        const dados = await resposta.json();

        if (!dados.items) return [];

        return dados.items.map(item => ({
            id: item.id,
            titulo: item.volumeInfo.title || 'Título Indisponível',
            autor: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor Desconhecido',
            ano: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : 'N/A',
            disponivel: true,
            imagem: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://unsplash.com/es/fotos/alguien-sostiene-un-libro-abierto-cerca-de-una-estanteria-yRoYZUzSk4o'
        }));
    } catch (erro) {
        console.error("Erro ao buscar na API global:", erro);
        return [];
    }
}