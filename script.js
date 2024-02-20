// JavaScript functions for adding, deleting, checking todos, and filtering
let todos = [];

function addTodo() {
    const newTodoInput = document.getElementById('newTodo');
    const todoText = newTodoInput.value.trim();

    if (todoText !== '') {
        const todo = {
            text: todoText,
            completed: false
        };

        todos.push(todo);
        newTodoInput.value = '';
        displayTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}

function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    displayTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    displayTodos();
}

function filterTodos(filterType) {
    let filteredTodos = [];

    if (filterType === 'all') {
        filteredTodos = todos;
    } else if (filterType === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    displayTodos(filteredTodos);
}

function displayTodos(todosToDisplay = todos) {
    const todoList = document.getElementById('todo-list');
    const uncompletedCount = document.getElementById('uncompleted-count');

    todoList.innerHTML = '';
    uncompletedCount.innerText = todosToDisplay.filter(todo => !todo.completed).length;

    todosToDisplay.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';

        const checkButton = document.createElement('button');
        checkButton.innerHTML = todo.completed ? '&#10003;' : '&#8211;';
        checkButton.addEventListener('click', () => toggleCompleted(index));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10007;';
        deleteButton.addEventListener('click', () => deleteTodo(index));

        const todoText = document.createElement('div');
        todoText.innerText = todo.text;

        listItem.appendChild(checkButton);
        listItem.appendChild(todoText);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
    });
}

displayTodos();
