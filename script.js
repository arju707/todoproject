let currentTask = null; // Variable to keep track of the current task being edited

document.querySelector('#push').onclick = function () {
    const inputField = document.querySelector('#newtask input');
    const taskName = inputField.value;

    if (taskName.length == 0) {
        alert("Please enter a task");
    } else {
        if (currentTask) {
            // If we are editing an existing task
            currentTask.querySelector('#taskname').textContent = taskName; // Update the task name
            currentTask = null; // Reset the current task
            document.querySelector('#push').textContent = 'Add'; // Reset button text
        } else {
            // Create a new task element
            document.querySelector('#tasks').innerHTML += `
                <div class="task">
                    <span id="taskname">${taskName}</span>
                    <button class="delete">❌</button>
                    <span>
                        <button class="edit">✏️</button>
                    </span>
                </div>
            `;

            // Add delete functionality
            const currentTasks = document.querySelectorAll(".delete");
            for (let i = 0; i < currentTasks.length; i++) {
                currentTasks[i].onclick = function () {
                    this.parentNode.parentNode.remove();
                }
            }

            // Add complete functionality
            const tasks = document.querySelectorAll(".task");
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].onclick = function () {
                    this.classList.toggle('completed');
                }
            }

            // Add edit functionality
            const editButtons = document.querySelectorAll(".edit");
            for (let i = 0; i < editButtons.length; i++) {
                editButtons[i].onclick = function () {
                    currentTask = this.parentNode.parentNode; // Set the current task to be edited
                    inputField.value = currentTask.querySelector('#taskname').textContent; // Set input field to task name
                    document.querySelector('#push').textContent = 'Submit'; // Change button text to 'Submit'
                }
            }
        }

        // Clear input field after adding or editing the task
        inputField.value = "";
    }
}