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
  if ( descriTarefaElement.value.trim() != "" && nivelPrioElement.value != "" && prazoElement.value.trim() != "" && prazoElement.value != "" && statusElement.value != "") {
    return true;
  } else {
    return false;
  }
}

function adicionarTarefa() {
  todosList.push({
    prioridade: nivelPrioElement.value,
    prazo: prazoElement.value.trim(),
    descricao: descriTarefaElement.value.trim(),
    status: statusElement.value
  });
  setarCampos();
  renderizarLista();
  saveToStorage();
}

function renderizarLista() {
  tbodyList.innerHTML = "";

  for (attributesTodo of todosList) {
    var newTrElement = document.createElement("tr");

    var tdElements = createTdElements(attributesTodo);

    tdElements.forEach(function(element, index, array) {
      newTrElement.appendChild(element);
    });

    tbodyList.appendChild(newTrElement);
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

function createTdElements(todo) {
  var tdElements = [createBtnExcluirElement(todo, "X")];
  for (const [attribute, value] of Object.entries(todo)) {
    var newTdElement = document.createElement("td");
    newTdElement.appendChild(createDivElement(attribute, value));
    tdElements.push(newTdElement);
  }

  return tdElements;
}

function createBtnExcluirElement(todo, text) {
  var td = document.createElement("td");
  var btn = document.createElement("button");
  var btnText = document.createTextNode(text);
  btn.setAttribute("onclick", "deleteTodo(" + todosList.indexOf(todo) + ")")
  btn.appendChild(btnText);
  td.appendChild(createDivElement("botaoExcluir", btn));
  
  return td;
}

function createDivElement(att, value) {
  var div = document.createElement("div");
  var divValue = typeof(value) === "object" ? value : document.createTextNode(value);
  div.setAttribute("class", att);
  div.appendChild(divValue);

  return div
}
