var descriTarefaElement = document.getElementById("tarefaText");
var nivelPrioElement = document.getElementById("nivelPrioridade");
var prazoElement = document.getElementById("setPrazo");
var statusElement = document.getElementById("newStatus");
var btnAdicionarElement = document.querySelector("button");
var tbodyList = document.getElementById("tbodyList");

// Teste
//AAAAA
var todosList = JSON.parse(localStorage.getItem("listaTarefas")) || [];

renderizarLista();

btnAdicionarElement.onclick = function() {
  if (verificarCampos()) {
    adicionarTarefa();
  } else {
    alert("Preencha todos os campos antes de adicionar uma nova tarefa");
  }
};

function verificarCampos() {
  if (
    descriTarefaElement.value.trim() != "" &&
    nivelPrioElement.value != "" &&
    prazoElement.value != "" &&
    prazoElement.value != "" &&
    statusElement.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function adicionarTarefa() {
  todosList.push({
    prioridade: nivelPrioElement.value,
    prazo: prazoElement.value,
    tarefa: descriTarefaElement.value.trim(),
    status: statusElement.value
  });
  setarCampos();
  renderizarLista();
  saveToStorage();
}

function renderizarLista() {
  tbodyList.innerHTML = "";

  for (todos of todosList) {
    for (const v of Object.values(todos)) {
      console.log(v);
    }
    var divTarefa = document.createElement("div");
    divTarefa.style.width = "284px";
    divTarefa.style.wordWrap = "break-word";
    divTarefa.style.marginLeft = "2px";
    var btnEx = document.createElement("button");
    btnEx.setAttribute(
      "onclick",
      "deleteTodo(" + todosList.indexOf(todos) + ")"
    );
    var newTr = document.createElement("tr");
    var newTdExcluir = document.createElement("td");
    newTdExcluir.setAttribute("class", "conteudo");
    var newTdPrioridade = document.createElement("td");
    newTdPrioridade.setAttribute("class", "conteudo");
    var newTdPrazo = document.createElement("td");
    var divPrazo = document.createElement("div");
    divPrazo.style.width = "60px";
    divPrazo.style.wordWrap = "break-word";
    divPrazo.style.marginLeft = "9.2px";
    newTdPrazo.setAttribute("class", "conteudo");
    var newTdTarefa = document.createElement("td");
    var newTdStatus = document.createElement("td");
    newTdStatus.setAttribute("class", "conteudo");

    var textBtn = document.createTextNode("X");
    btnEx.appendChild(textBtn);
    newTdExcluir.appendChild(btnEx);
    newTr.appendChild(newTdExcluir);

    var tdPrioridadeText = document.createTextNode(todos.prioridade);
    newTdPrioridade.appendChild(tdPrioridadeText);
    newTr.appendChild(newTdPrioridade);

    var tdPrazoText = document.createTextNode(todos.prazo);
    divPrazo.appendChild(tdPrazoText);
    newTdPrazo.appendChild(divPrazo);
    newTr.appendChild(newTdPrazo);

    var tdTarefaText = document.createTextNode(todos.tarefa);
    divTarefa.appendChild(tdTarefaText);
    newTdTarefa.appendChild(divTarefa);
    newTr.appendChild(newTdTarefa);

    var tdStatusText = document.createTextNode(todos.status);
    newTdStatus.appendChild(tdStatusText);
    newTr.appendChild(newTdStatus);

    tbodyList.appendChild(newTr);
  }
}

function setarCampos() {
  descriTarefaElement.value = "";
  nivelPrioElement.value = "";
  prazoElement.value = "";
  statusElement.value = "";
}

function deleteTodo(i) {
  todosList.splice(i, 1);
  renderizarLista();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("listaTarefas", JSON.stringify(todosList));
}
