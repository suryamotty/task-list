// define UI variables
const form = document.querySelector('#task-form');//form-id
const taskList = document.querySelector('.collection');//ul-class
const clearBtn = document.querySelector('.clear-tasks');//button class
const filter = document.querySelector('#filter');//field2
const taskInput = document.querySelector('#task');//field1-input field


//load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    
    document.addEventListener('DOMContentLoaded', getTasks);
    
    // Add task event
    form.addEventListener('submit', addTask);

    //remove tasks
    taskList.addEventListener('click', removeTask);

    //clear tasks
    clearBtn.addEventListener('click', clearTasks);//for clearing all tasks from the ul

    //filter tasks
    filter.addEventListener('keyup', filterTasks);

    
  }

  function getTasks(){
    
    let tasks;

    if(localStorage.getItem('tasks') === null){     //if local storage is empty then tasks has nothing
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  //Parse the data with JSON.parse(), and the data becomes a JavaScript object and stored on the variable tasks
    } 
    tasks.forEach(function(task){
         //if the form input field is not empty then add the input to li
    //for that create li element

    const li= document.createElement('li');
    li.className = 'collection-item';//list-className
   
    //create text node and append that to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');
    //add classname to that element
    link.className = 'delete-item secondary-content';//in materialize an element in the right side of the list having the classname secondary-content
     
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);
  
     //append li to ul
     taskList.appendChild(li);
    });
}

  //Add task
function addTask(e){
    if(taskInput.value ===''){
        alert('Add a task');
    }
    //if the form input field is not empty then add the input to li
    //for that create li element

    const li= document.createElement('li');
    li.className = 'collection-item';//list-className
   
    //create text node and append that to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    
    //add classname to that element
    link.className = 'delete-item secondary-content';//in materialize an element in the right side of the list having the classname secondary-content
     
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);
  
     //append li to ul
     taskList.appendChild(li);
     
     //store tasks in local storage
     storeTaskInLocalStorage(taskInput.value);

     //clear input
     taskInput.value = '';

    e.preventDefault();
    
}

function storeTaskInLocalStorage(task){
    
    let tasks;
    
    if(localStorage.getItem('tasks') === null){     //if local storage is empty then tasks has nothing
    
        tasks = [];
    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  // local storage can only store string so parse the data with JSON.parse(), and the data becomes a JavaScript object and stored on the variable tasks
    
    }
    
    tasks.push(task);   //add each task value to tasks
    
    localStorage.setItem('tasks', JSON.stringify(tasks));   //Convert a JavaScript object into a string with JSON.stringify() and store in local storage.
}

// remove element-function
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        
        if(confirm('Are you sure?')){
        
            e.target.parentElement.parentElement.remove();
       
        
        //remove from local storage
        removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){//task node list-taskItem
    
    let tasks;
    if(localStorage.getItem('tasks') === null){     //if local storage is empty then tasks has nothing
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  //Parse the data with JSON.parse(), and the data becomes a JavaScript object and stored on the variable tasks
    }
    tasks.forEach(function(task, index){        //foreach task from local storage
        if(taskItem.textContent === task){      //check the nodelist== the task from LS
            tasks.splice(index,1);      //remove that index item

        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
    });
}
//clear tasks
function clearTasks(){
    //taskList.innerHTML = '';//slow way

    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear tasks from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();   //whatever value is  typing there in the filter field under the heading tasks ie, input field 2
    
    document.querySelectorAll('.collection-item').forEach(function(task){    //will select all elements from lists , for each function is apply for the list.
  //queryselector returns a nodelist , so that we can use the forEach loop. getElementByClass returns which we have to convert to an array inorder to use forEach
  
  
          const item = task.firstChild.textContent;   //ie, collection items first child's text content is assigned to item
          if(item.toLowerCase().indexOf(text) != -1){   //check if the item value in the  list under the addTask button  is equal to the value typing in input field 2, under Tasks, !=-1 means it matches
              task.style.display ='block';    //then display it
              //this will display the matching items for what we are typing in input field2 just like we are searching for something in google , for each keypress the matches shows down. 
          }else
          {
              task.style.display ='none'; //=-1, then not matches and not displayed
      }
    });
  }
  