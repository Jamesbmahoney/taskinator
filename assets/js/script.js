var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var taskIDCounter = 0;

var taskFormHandler = function(event) { 
  event.preventDefault(); 

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

var createTaskActions = function(taskID) {
  var actionContainerEL = document.createElement("div");
  actionContainerEL.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskID);

  actionContainerEL.appendChild(editButtonEl);
  
  // create delete button
  var deleteButtonEL = document.createElement("button");
  deleteButtonEL.textContent = "Delete";
  deleteButtonEL.className = "btn delete-btn";
  deleteButtonEL.setAttribute("data-task-id", taskID);

  actionContainerEL.appendChild(deleteButtonEL);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskID);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEL = document.createElement("option");
    statusOptionEL.textContent = statusChoices[i];
    statusOptionEL.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEL);
  }

  actionContainerEL.appendChild(statusSelectEl);

  return actionContainerEL;
};

var createTaskEl = function(taskDataObj){
  // create list item
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIDCounter);
  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  var taskActionsEL = createTaskActions(taskIDCounter);
  listItemEl.appendChild(taskActionsEL);

  // add entire list item to the list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIDCounter++;
};

formEl.addEventListener("submit", taskFormHandler);
