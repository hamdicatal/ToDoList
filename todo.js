// get all elements(inputs etc.) in our page
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const leftCardBody = document.querySelectorAll(".card-body")[0];
const rightCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-all");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo); // for adding new todo
    document.addEventListener("DOMContentLoaded", loadAllTodosFromStorage); // load all todos to UI
    rightCardBody.addEventListener("click", deleteTodo); // for deleting todo item
}

// delete todo from list (and of course from storage)
function deleteTodo(e){
    if(e.target.className == "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Task successfully removed!");
    }
}

function deleteTodoFromStorage(todo){
    let todos = getTodosFromStorage();
    todos.forEach(function(t, index){
        if(t === todo){
            // delete one object from index
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// list all todos when document loaded
function loadAllTodosFromStorage(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToList(todo);
    });
}

function addTodo(e){
    // use trim for removing whitespaces
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("warning", "Please enter task detail...");
    }
    else{
        addTodoToList(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Task added successfully!")
    }

    // for not submit to other page
    e.preventDefault();
}

// get todos from local storage
function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

// set todos to local storage
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// for create warnings dynamically
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    leftCardBody.appendChild(alert);

    // for warning timeout(remove after 2 seconds)
    setTimeout(function(){
        alert.remove();
    }, 2000);
}

// for adding new task to list
function addTodoToList(newTodo){
    // create delete link in list item
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // create list item and add children
    const listItem = document.createElement("li");
    listItem.className ="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // add list item to list
    todoList.appendChild(listItem);
    todoInput.value = "";
}