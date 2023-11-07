const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTask(task));
});

taskForm.addEventListener('submit', (event) => {
    // Prevent the form from being submitted normally
    event.preventDefault();

    const task = taskInput.value.trim();
    if (task !== '') {
        createTask(task);

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
    }
});

function createTask(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'justify-between', 'px-4', 'py-2', 'border', 'rounded-lg', 'bg-white', 'shadow', 'border-l-4','border-l-green-600');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('form-checkbox', 'h-5', 'w-5', 'text-green-500');

    const span = document.createElement('span');
    span.classList.add('ml-2');
    span.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash" ></i>';
    deleteBtn.classList.add('delete-btn', 'p-1');

    checkBox.addEventListener('change', () => {
        span.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
        checkBox.checked ? listItem.classList.replace('border-l-green-600', 'border-l-red-600') : listItem.classList.replace('border-l-red-600', 'border-l-green-600')
    });

    deleteBtn.addEventListener('click', () => {
        listItem.remove();
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(task);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    listItem.append(checkBox, span, deleteBtn);
    taskList.appendChild(listItem);
}
