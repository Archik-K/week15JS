const input = document.querySelector(".task_input_field");
const addBtn = document.querySelector(".button_to_add_a_task");
const tasksList = document.querySelector(".list_of_tasks");
const emptyMessage = document.querySelector(".no-tasks");
const clearBtn = document.querySelector(".button_to_clear_the_task_list");

let tasks = [];

function renderTasks() {
	// Если задач нет, скрываем список и отображаем сообщение об
	// отсутствии задач, а кнопка очистки списка должна быть неактивной.
	if (tasks.length === 0) {
		emptyMessage.style.display = "block";
		tasksList.innerHTML = "";
		clearBtn.disabled = true;
		return;
	}

	// Иначе отображаем список задач, очищаем его и заполняем заново.
	emptyMessage.style.display = "none";
	tasksList.innerHTML = "";

	tasks.forEach((task, index) => {
		const taskElem = document.createElement("li");
		const taskCheck = document.createElement("input");
		const taskLabel = document.createElement("label");

		taskCheck.type = "checkbox";
		taskCheck.checked = task.done;
		taskLabel.innerText = task.text;

		taskCheck.addEventListener("click", () => {
			// Помечаем задачу выполненной, сохраняем состояние в массиве
			// задач и обновляем список.
			tasks[index].done = taskCheck.checked;
			renderTasks();
		});

		taskElem.append(taskLabel, taskCheck);
		tasksList.append(taskElem);
	});

	// Кнопка очистки списка должна быть активной.
	clearBtn.disabled = false;
}

function addTask() {
	const taskText = input.value.trim();

	// Не добавляем пустые задачи.
	if (taskText === "") {
		return;
	}

	tasks.push({ text: taskText, done: false });
	input.value = "";
	renderTasks();
}

// Обработчик клика на кнопке добавления задачи.
addBtn.addEventListener("click", addTask);

// Обработчик нажатия Enter в поле ввода задачи.
input.addEventListener("keydown", (event) => {
	if (event.code === "Enter") {
		addTask();
	}
});

// Обработчик клика на кнопке очистки списка задач.
clearBtn.addEventListener("click", () => {
	tasks = [];
	renderTasks();
});

// Рендерим задачи первый раз.
renderTasks();
