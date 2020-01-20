var descricaoInputElement = document.querySelector("#descricao");
var nivelPrioridadeInputElement = document.querySelector("#nivelPrioridade");
var prazoInputElement = document.querySelector("#prazoInput");
var statusInputElement = document.querySelector("#statusInput");
var tbodyList = document.querySelector("#tbodyList");
var botaoAdicionar = document.querySelector("#botaoAdicionar");

var listaTarefas = JSON.parse(localStorage.getItem("ListaTarefas")) || [];

renderLista();

botaoAdicionar.onclick = function() {
  if (isFieldsFilled()) {
    adicionarTarefa();
  } 
}

function adicionarTarefa() {
  listaTarefas.push({
    prioridade: nivelPrioridadeInputElement.value,
    prazo: prazoInputElement.value,
    descricao: descricaoInputElement.value.trim(),
    status: statusInputElement.value
  });
  cleanFields();
  renderLista();
  saveToLocalStorage();
}

function renderLista() {
  tbodyList.innerHTML = "";

  for (tarefa of listaTarefas) {
    var newTrElement = setElement("tr");
    var btnExcluirElement = setElement("button", undefined, "X", "btnExluir");
    var divBtnElement = setElement("div", undefined, undefined, "divBtnExcluir");
    var tdBtnElement = setElement("td", undefined, undefined, "tdBtnExcluir");
    btnExcluirElement.setAttribute("onclick", "deleteTodo(" + listaTarefas.indexOf(tarefa) + ")");
    tbodyList.appendChild(newTrElement);
    divBtnElement.appendChild(btnExcluirElement);
    tdBtnElement.appendChild(divBtnElement);
    newTrElement.appendChild(tdBtnElement);

    for (const [key,value] of Object.entries(tarefa)) {
      var newDivElement = setElement("div", undefined, value, "div" + key);
      var newTdElement = setElement("td", undefined, undefined, "td" + key);
      newTdElement.appendChild(newDivElement);
      newTrElement.appendChild(newTdElement);
    }
  }
}

function isFieldsFilled() {
  var isFieldsFilled = true;

  if (descricaoInputElement.value.trim() === "") {
    descricaoInputElement.style.borderColor = "red";
    isFieldsFilled = false;
  } else {
    descricaoInputElement.style.borderColor = "rgb(169, 169, 169)";
  }

  if (nivelPrioridadeInputElement.value === "") {
    nivelPrioridadeInputElement.style.borderColor = "red";
    isFieldsFilled = false;
  } else {
    nivelPrioridadeInputElement.style.borderColor = "rgb(169, 169, 169)";
  }

  if (prazoInputElement.value === "") {
    prazoInputElement.style.borderColor = "red";
    isFieldsFilled = false;
  } else {
    prazoInputElement.style.borderColor = "initial"; 
  }

  if (statusInputElement.value === "") {
    statusInputElement.style.borderColor = "red";
    isFieldsFilled = false;
  } else {
    statusInputElement.style.borderColor = "rgb(169, 169, 169)"
  }

  return isFieldsFilled ;
}

function setElement(tagName, idValue, textNode, className) {
  var newElement = document.createElement(tagName);
  if(idValue !== undefined) newElement.setAttribute("id", idValue);
  if(textNode !== undefined) newElement.appendChild(document.createTextNode(textNode));
  if(className !== undefined) newElement.setAttribute("class", className);

  return newElement;
}

function deleteTodo(index) {
  listaTarefas.splice(index, 1);
  renderLista();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("ListaTarefas", JSON.stringify(listaTarefas));
}

function cleanFields() {
  descricaoInputElement.value = "";
  nivelPrioridadeInputElement.value = "";
  prazoInputElement.value = "";
  statusInputElement.value = "";
}