// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskTemplate = document.getElementById('taskTemplate');

// Task array to store all tasks
let tasks = [];

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
});

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus();
}

// Render all tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Create a task element from template
function createTaskElement(task) {
    const taskClone = document.importNode(taskTemplate.content, true);
    const taskItem = taskClone.querySelector('.task-item');
    const taskText = taskClone.querySelector('.task-text');
    const taskCheckbox = taskClone.querySelector('.task-checkbox');
    const editBtn = taskClone.querySelector('.edit-btn');
    const deleteBtn = taskClone.querySelector('.delete-btn');
    
    // Set task data
    taskItem.dataset.id = task.id;
    taskText.textContent = task.text;
    taskCheckbox.checked = task.completed;
    
    if (task.completed) {
        taskItem.classList.add('task-completed');
    }
    
    // Event listeners
    taskCheckbox.addEventListener('change', () => {
        toggleTaskCompletion(task.id);
    });
    
    editBtn.addEventListener('click', () => {
        editTask(taskItem, task.id);
    });
    
    deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
    });
    
    return taskItem;
}

// Toggle task completion status
function toggleTaskCompletion(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
}

// Edit task
function editTask(taskElement, taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) return;
    
    const taskContent = taskElement.querySelector('.task-content');
    const taskText = taskElement.querySelector('.task-text');
    const currentText = tasks[taskIndex].text;
    
    // Create edit input if not in edit mode
    if (!taskElement.classList.contains('edit-mode')) {
        taskElement.classList.add('edit-mode');
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'task-edit-input';
        editInput.value = currentText;
        
        taskContent.insertBefore(editInput, taskText);
        editInput.focus();
        
        // Save on enter key
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit(taskId, editInput.value.trim());
            }
        });
        
        // Save on blur
        editInput.addEventListener('blur', () => {
            saveEdit(taskId, editInput.value.trim());
        });
    }
}

// Save edited task
function saveEdit(taskId, newText) {
    if (newText === '') return;
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    
    if (storedTasks) {
        try {
            tasks = JSON.parse(storedTasks);
        } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
            tasks = [];
        }
    }
}