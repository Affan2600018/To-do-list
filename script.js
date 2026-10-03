// Name: Muhammad Affan Haider
// Registration Number: 2600018

const form = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const error = document.querySelector("#error");

const total = document.querySelector("#total");
const remaining = document.querySelector("#remaining");

const allButton = document.querySelector("#all");
const activeButton = document.querySelector("#active");
const completedButton = document.querySelector("#completed");
const clearCompleted = document.querySelector("#clearCompleted");

let currentFilter = "all";

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText === "")
    {
        error.textContent = "Task cannot be empty";
        return;
    }

    const tasks = document.querySelectorAll(".taskText");

    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].textContent.toLowerCase() === taskText.toLowerCase())
        {
            error.textContent = "Task already exists";
            return;
        }
    }

    error.textContent = "";

    const li = document.createElement("li");
    li.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.classList.add("taskText");
    span.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounter();
    applyFilter();
});

taskList.addEventListener("click", function(event)
{
    if(event.target.type === "checkbox")
    {
        const span = event.target.parentElement.querySelector(".taskText");

        span.classList.toggle("completed");

        updateCounter();
        applyFilter();
    }

    if(event.target.classList.contains("delete"))
    {
        event.target.parentElement.remove();

        updateCounter();
    }
});

allButton.addEventListener("click", function()
{
    currentFilter = "all";
    applyFilter();
});

activeButton.addEventListener("click", function()
{
    currentFilter = "active";
    applyFilter();
});

completedButton.addEventListener("click", function()
{
    currentFilter = "completed";
    applyFilter();
});

clearCompleted.addEventListener("click", function()
{
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(function(task)
    {
        const checkbox = task.querySelector("input");

        if(checkbox.checked)
        {
            task.remove();
        }
    });

    updateCounter();
});

function updateCounter()
{
    const tasks = document.querySelectorAll(".task");
    const checked = document.querySelectorAll(".task input:checked");

    total.textContent = tasks.length;
    remaining.textContent = tasks.length - checked.length;
}

function applyFilter()
{
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(function(task)
    {
        const checkbox = task.querySelector("input");

        if(currentFilter === "all")
        {
            task.style.display = "flex";
        }

        if(currentFilter === "active")
        {
            if(checkbox.checked)
            {
                task.style.display = "none";
            }
            else
            {
                task.style.display = "flex";
            }
        }

        if(currentFilter === "completed")
        {
            if(checkbox.checked)
            {
                task.style.display = "flex";
            }
            else
            {
                task.style.display = "none";
            }
        }
    });
}

taskList.addEventListener("dblclick", function(event)
{
    if(event.target.classList.contains("taskText"))
    {
        const span = event.target;
        const oldText = span.textContent;

        const input = document.createElement("input");

        input.classList.add("editInput");
        input.value = oldText;

        span.replaceWith(input);

        input.focus();

        input.addEventListener("keydown", function(event)
        {
            if(event.key === "Enter")
            {
                const newText = input.value.trim();

                if(newText !== "")
                {
                    span.textContent = newText;
                }

                input.replaceWith(span);
            }

            if(event.key === "Escape")
            {
                input.replaceWith(span);
            }
        });
    }
});