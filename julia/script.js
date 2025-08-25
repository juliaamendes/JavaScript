let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizar() {
  const lista = document.getElementById('lista');
  lista.innerHTML = "";

  tarefas.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.feito ? "feito" : "";

    const span = document.createElement("span");
    span.textContent = item.item;
    span.onclick = () => toggleFeito(index);
    li.appendChild(span);

    const divBotoes = document.createElement("div");
    divBotoes.className = "botoes";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarTarefa(index);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerTarefa(index);

    divBotoes.appendChild(btnEditar);
    divBotoes.appendChild(btnRemover);
    li.appendChild(divBotoes);

    lista.appendChild(li);
  });

  salvar();
}

function adicionarTarefa() {
  const input = document.getElementById("tarefa");
  const texto = input.value.trim();

  if (texto === "") return alert("Digite uma tarefa.");

  tarefas.push({ item: texto, feito: false });
  input.value = "";
  renderizar();
}

function editarTarefa(index) {
  const novoTexto = prompt("Edite a tarefa", tarefas[index].item);
  if (novoTexto !== null && novoTexto.trim() !== "") {
    tarefas[index].item = novoTexto.trim();
    renderizar();
  }
}

function removerTarefa(index) {
  if (confirm("Tem certeza que deseja remover essa tarefa?")) {
    tarefas.splice(index, 1);
    renderizar();
  }
}

function toggleFeito(index) {
  tarefas[index].feito = !tarefas[index].feito;
  renderizar();
}


function limparTudo() {
  if (confirm("Deseja limpar todas as tarefas?")) {
    tarefas = [];
    renderizar();
  }
}

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Inicializa a lista ao carregar a página
window.onload = renderizar;
