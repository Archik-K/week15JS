const input = document.querySelector(".task_input_field"); // получаем элемент
const button = document.querySelector(".button_to_add_a_task"); // получаем кнопку добавления задачи
const taskList = document.querySelector(".list_of_tasks"); // получаем элемент списка задач
const clearButton = document.querySelector(".button_to_clear_the_task_list"); // получаем кнопку очистки списка задач

let tasks = []; // создаем пустой массив для хранения задач

// функция для добавления задачи в список
function addTask() {
	const task = input.value; // получаем значение из input
	tasks.push(task); // добавляем задачу в массив
	input.value = ""; // очищаем input
	updateTaskList(); // обновляем список задач
}

// функция для обновления списка задач
function updateTaskList() {
	taskList.innerHTML = ""; // очищаем список задач
	if (tasks.length === 0) {
		// если задач нет, добавляем сообщение об отсутствии задач и делаем кнопку очистки неактивной
		const noTasks = document.createElement("p");
		noTasks.textContent = "Задачи отсутствуют";
		noTasks.classList.add("no-tasks");
		taskList.appendChild(noTasks);
		clearButton.disabled = true;
	} else {
		// создаем элементы списка для каждой задачи
		for (let i = 0; i < tasks.length; i++) {
			const taskItem = document.createElement("li");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox"; // добавляем тип чекбокса
			// добавляем обработчик события при клике на чекбокс
			checkbox.addEventListener("click", (event) => {
				toggleTask(event.target.parentNode);
			});
			const taskText = document.createElement("span");
			taskText.textContent = tasks[i];
			// добавляем чекбокс и текст задачи в элемент списка
			taskItem.appendChild(checkbox);
			taskItem.appendChild(taskText);
			taskList.appendChild(taskItem);
		} // делаем кнопку очистки активной
		clearButton.disabled = false;
	}
}

// функция для пометки задачи выполненной или не выполненной
function toggleTask(taskItem) {
	if (taskItem.classList.contains("done")) {
		taskItem.classList.remove("done");
	} else {
		taskItem.classList.add("done");
	}
}

// обработчик клика на кнопку добавления задачи
button.addEventListener("click", addTask);

// обработчик клика на кнопку очистки списка задач
clearButton.addEventListener("click", () => {
	tasks = [];
	updateTaskList();
});

// инициализация списка задач при загрузке страницы
updateTaskList();
