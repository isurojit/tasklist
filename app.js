//Define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listners
loadEventListners();

//Load all event listners
function loadEventListners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter task event
    filter.addEventListener('keyup', filtertasks)
}

//Get Task from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //creat text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}


//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //creat text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
    
    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
 
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {

        if(confirm('Are You Sure?')){
         e.target.parentElement.parentElement.remove();

         //Remove from Local Storage
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
     }
}

//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear task
function clearTasks(e){
//taskList.innerHtml ="";

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from Local Storage
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//filter task
function filtertasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}
