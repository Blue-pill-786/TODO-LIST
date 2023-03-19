var ToDoListApp =(function(){
    let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


// async function fetchTodos(){
//     // //get request
//     // fetch('https://jsonplaceholder.typicode.com/todos')
//     // .then(function(response){
//     //     return response.json();
//     // }).then(function(data){
//     //     tasks =data.slice(0,10);
//     //     renderList();
//     // })
//     // .catch(function(error){
//     //     console.log('error', error);
//     // })

//     try{
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         const data = await response.json();
//         tasks = data.slice(0,10);
//         renderList();

//     }catch(error){
    //         console.log('error', error);
    //     }
    
    // }
function TotalTask(tasks){
    

}


function addTaskToDom (task) {
    const li = document.createElement('li');

    li.innerHTML = `
        
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}" > ${task.text} </label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />

    `;
    taskList.append(li);
    tasksCounter.innerHTML = `${tasks.length}`
}

function renderList () {
    taskList.innerHTML = '';
    for(let i=0;i<tasks.length; i++){
        addTaskToDom(tasks[i]);
    }
    
}

function toggleTask (taskId) {
    const task = tasks.filter(function(task){
        return task.id=== Number(taskId)
    });
    if(task.length>0){
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task toggled Successfully');
        return;
    }
    showNotification('Could not toggle the Task');

}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id!==Number(taskId)
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
   

}
    

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text);
}


function handleInputKeypress(e) {
    if(e.key ==='Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }
        const task ={
            text,
            id:Date.now(),
            done: false
        }
        e.target.value ='';
        addTask(task);
    }
}

function handleClickListner(e){
    const target = e.target;
    

    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.classname === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


function initializeApp(){
    // fetchTodos();
    document.addEventListener('click', handleClickListner);
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    
}
    return{
        initialize: initializeApp
    }
})();