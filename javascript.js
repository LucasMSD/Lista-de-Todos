var descricaoInputElement = document.querySelector("#descricaoInput");
var nivelPrioridadeInputElement = document.querySelector("#nivelPrioridade");
var dataLimiteInputElement = document.querySelector("#DataLimiteInput");
var statusInputElement = document.querySelector("#statusInput");
var tbodyList = document.querySelector("#tbodyList");
var botaoAdicionar = document.querySelector("#botaoAdicionar");


var listaTarefas = JSON.parse(localStorage.getItem("ListaTarefas")) || [];

renderLista();

dataLimiteInputElement.setAttribute("onkeypress", "return validate(event)");

botaoAdicionar.onclick = function() {
  if (isFieldsFilled()) {
    adicionarTarefa();
  } 
}

function adicionarTarefa() {
  listaTarefas.push({
    prioridade: nivelPrioridadeInputElement.value,
    dataLimite: dataLimiteInputElement.value,
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
      var newDivElement = setElement("div", undefined, value, "div" + key + "Value");
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

  if (dataLimiteInputElement.value === "") {
    dataLimiteInputElement.style.borderColor = "red";
    isFieldsFilled = false;
  } else {
    dataLimiteInputElement.style.borderColor = "initial"; 
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
  dataLimiteInputElement.value = "";
  statusInputElement.value = "";
}

function validate(event) {
  var keyCode = event.keyCode;
  if (keyCode >= 48 && keyCode <= 57) {
    if (dataLimiteInputElement.value.length === 2 || dataLimiteInputElement.value.length === 5) {
      dataLimiteInputElement.value += "/";
    }
    return true;
  } else {
    return false;
  }
}