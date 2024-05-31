document.getElementById('todayBtn').addEventListener('click', function() {
    toggleContainer('todayContainer');
  });
  
  document.getElementById('pendingBtn').addEventListener('click', function() {
    toggleContainer('pendingContainer');
  });
  
  document.getElementById('completedBtn').addEventListener('click', function() {
    toggleContainer('completedContainer');
  });
  
  function toggleContainer(containerId) {
    // Get the content div and all containers
    const contentDiv = document.querySelector('.content');
    const containers = ['todayContainer', 'pendingContainer', 'completedContainer'];
  
    // If the selected container is already displayed, hide it and show the content
    if (document.getElementById(containerId).style.display === 'block') {
        document.getElementById(containerId).style.display = 'none';
        contentDiv.style.display = 'block';
    } else {
        // Hide the content div
        contentDiv.style.display = 'none';
  
        // Hide all containers
        containers.forEach(function(id) {
            document.getElementById(id).style.display = 'none';
        });
  
        // Show the selected container
        document.getElementById(containerId).style.display = 'block';
    }
  }
  
  document.getElementById('showFormButton').addEventListener('click', function() {
     const taskForm = document.getElementById('taskForm');
     if(taskForm.style.display==='none'){
      taskForm.style.display='block';
     }
     else{
      taskForm.style.display ='none'
     }
  });
  
  
  document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get values from the input fields
    const taskInput = document.getElementById('taskInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
  
    // Create a task object with the input values
    const task = {
        task: taskInput,
        date: dateInput,
        time: timeInput,
        status: 'New'
    };
  
    // Retrieve tasks from localStorage, or initialize as an empty array if not present
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }
  
    // Add the new task to the tasks array
    tasks.push(task);
  
    // Save the updated tasks array back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Refresh the displayed tasks
    displayTasks();
  
    // Reset the form fields
    document.getElementById('taskForm').reset();
  });
  
  // Function to display tasks in their respective tables
  function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from localStorage or initialize as an empty array if not present
  
    // Get references to the tbody elements of the task tables
    const todayTbody = document.getElementById('todayTaskTable').getElementsByTagName('tbody')[0];
    const pendingTbody = document.getElementById('pendingTaskTable').getElementsByTagName('tbody')[0];
    const completedTbody = document.getElementById('completedTaskTable').getElementsByTagName('tbody')[0];
  
    // Clear the current content of the tbody elements
    todayTbody.innerHTML = '';
    pendingTbody.innerHTML = '';
    completedTbody.innerHTML = '';
  
    // Iterate over each task and create a table row for it
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td>
                <select class="statusSelect" data-index="${index}">
                    <option value="New" ${task.status === 'New' ? 'selected' : ''}>New</option>
                    <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
        `;
  
        // Append the row to the appropriate table based on the task's status
        if (task.status === 'New') {
            todayTbody.appendChild(row);
        } else if (task.status === 'Pending') {
            pendingTbody.appendChild(row);
        } else if (task.status === 'Completed') {
            completedTbody.appendChild(row);
        }
    });
  
    // Add event listeners to the status dropdowns for updating task statuses
    document.querySelectorAll('.statusSelect').forEach(select => {
        select.addEventListener('change', function() {
            const index = this.getAttribute('data-index'); // Get the task index from the data-index attribute
            tasks[index].status = this.value; // Update the task status in the tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks array back to localStorage
            displayTasks(); // Refresh the displayed tasks
        });
    });
  }
  
  // Display tasks on page load
  window.onload = displayTasks;
  




