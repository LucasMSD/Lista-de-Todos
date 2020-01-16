var descriTarefaElement = document.getElementById("tarefaText");
var nivelPrioElement = document.getElementById("nivelPrioridade");
var prazoElement = document.getElementById("setPrazo");
var statusElement = document.getElementById("newStatus");
var btnAdicionarElement = document.querySelector("button");
var tbodyList = document.getElementById("tbodyList");

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
    var newTr = document.createElement('tr');
    var btnExcluir = document.createElement('button');
    btnExcluir.setAttribute('onclick', 'deleteTodo(' + todosList.indexOf(todos) + ')');
    var btnExcluirText = document.createTextNode('X');
    btnExcluir.appendChild(btnExcluirText);
    var td = document.createElement('td');
    td.appendChild(btnExcluir);
    newTr.appendChild(td);
    for (const attributeValue of Object.values(todos)) {
      var newTd = document.createElement('td');
      var newDiv = document.createElement('div');
      newDiv.style.wordWrap = "break-word";
      var newTdText = document.createTextNode(attributeValue);
      newDiv.appendChild(newTdText);
      newTd.appendChild(newDiv);
      newTr.appendChild(newTd);
    }
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

function criarElements() {

}