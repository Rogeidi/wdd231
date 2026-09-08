const listaCursos = [
    { nome: "WDD 130", categoria: "wdd" },
    { nome: "WDD 131", categoria: "wdd" },
    { nome: "WDD 231", categoria: "wdd" },
    { nome: "CSE 110", categoria: "cse" },
    { nome: "CSE 210", categoria: "cse" }
];

const container = document.querySelector('.cursos-container');
const botoes = document.querySelectorAll('.btn-filtro');

function renderizarCursos(filtroSelecionado) {
    container.innerHTML = "";

    const cursosFiltrados = listaCursos.filter(curso => {
        return filtroSelecionado === "todos" || curso.categoria === filtroSelecionado;

    });

    cursosFiltrados.forEach(curso => {
        const elementoCurso = document.createElement('div');
        elementoCurso.classList.add('curso-item');
        elementoCurso.textContent = curso.nome;

        container.appendChild(elementoCurso);
    });
}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        document.querySelector('.btn-filtro.active').classList.remove('active');
        botao.classList.add('active');

        const categoria = botao.getAttribute('data-categoria');
        renderizarCursos(categoria);
    });

});

renderizarCursos("todos");