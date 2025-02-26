//array para armazenar as tarefas
let tarefas = [];

//referências aos elementos html
const inputTarefa = document.getElementById("novaTarefa");
const botaoAdicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");

//carregar tarefas salvas no localStorage
document.addEventListener("DOMContentLoaded", () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefasSalvas;
    renderizarLista();
});

//Função para adicionar uma tarefa
function adicionarTarefa(){
    const descricao = inputTarefa.value.trim();

    if (descricao === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        descricao: descricao,
    };

    tarefas.push(novaTarefa);
    salvarTarefas();
    renderizarLista();
    inputTarefa.value = ""; //limpando o campo
}

// Função para remover uma tarefa
function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarLista();
}

//atualiza o html da lista de tarefas
function renderizarLista() {
    listaTarefas.innerHTML = ""; //limpa a lista antes de renderizar
    
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.innerHTML = `${tarefa.descricao}
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>`;
        listaTarefas.appendChild(li);
    });
}

// Salvar a lista no LocalStorage
function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

//adicionando evento ao botão
botaoAdicionar.addEventListener("click", adicionarTarefa);