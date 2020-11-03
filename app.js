const tasks = [
    {
      _id: '5d2ca9e2e03d40b326596aa7',
      completed: false,
      body:
        'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
      title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
      _id: '5d2ca9e29c8a94095c1288e0',
      completed: false,
      body:
        'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
      title:
        'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
      _id: '5d2ca9e2e03d40b3232496aa7',
      completed: true,
      body:
        'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
      title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
      _id: '5d2ca9e29c8a94095564788e0',
      completed: false,
      body:
        'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
      title:
        'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function(arrOfTasks) {
  let listContainer = document.querySelector('.tasks-list-section .list-group');

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
 
   
  const objOfTask = arrOfTasks.reduce((acc,item)=>{
    acc[item._id]=item;
    return acc;
  },{});
  // element
  addEmpty();
  const form = document.forms['addTask'],
        inputTitle = form.elements['title'],
        inputBody = form.elements['body'],
        themeSelect = document.getElementById('themeSelect');

  renderAllTask(objOfTask);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onCompliteHandler);
  let btnFull = createButton('показать все задачи');
  let btnCompl = createButton('показать незавершенные задачи');
  btnFull.addEventListener('click', showAllTask);
  btnCompl.addEventListener('click', showNotCompleteTask);
  themeSelect.addEventListener('change', onThemeSelectHandler);
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
  setTheme(lastSelectedTheme);
  themeSelect.value = lastSelectedTheme;

  function renderAllTask(obj){
    if(!obj){
      console.error('Передайте список задач!');
      return;
    }
    let fragment = document.createDocumentFragment();
    Object.values(obj).forEach((item)=>{
      const li = listItemTemplate(item);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id,body,title }){
    const li = document.createElement('li'),
          span = document.createElement('span'),
          button = document.createElement('button'),
          completeBtn = document.createElement('button'),
          p = document.createElement('p');
    li.classList.add('list-group-item','d-flex','align-items-center','flex-wrap','mt-2');
    li.setAttribute('data-task-id',_id);

    span.textContent = title;
    span.style.fontWeight = 'bold';
    span.style.width = '60%';

    button.classList.add('btn', 'btn-danger','ml-auto','delete-btn');
    button.textContent = 'Delete';

    completeBtn.classList.add('btn', 'btn-success','ml-auto');
    completeBtn.textContent = 'Complite';

    p.classList.add('mt-2','w-100');
    p.textContent = body;

    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(completeBtn);
    li.appendChild(p);
    return li;
  }
  function onFormSubmitHandler(e){
    e.preventDefault();
    const valueTitle = inputTitle.value,
          valueBody = inputBody.value;

    if(!valueTitle && !valueBody){
      console.error('Введите загаловок и тело');
      return;
    }

    const task = createNewTask(valueBody,valueTitle);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin',listItem);
    form.reset();
    if(Object.keys(objOfTask).length === 1){
      document.querySelector('.ddd').remove();

    }
  }

  function createNewTask(body,title){
    let newTask={
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };
    
    objOfTask[newTask._id] = newTask;

    return { ...newTask };
  }
  function onDeleteHandler(e){
    if(e.target.classList.contains('delete-btn')){
      const parent = e.target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = taskDelete(id);
      deleteTaskFromHtml(confirmed, parent);
      addEmpty();
    }
  }
  function taskDelete(id){
    let {title} = objOfTask[id];
    const isConfirm = confirm(`Желаете удалить ${title}`);
    if (!isConfirm) {return isConfirm;}
    delete objOfTask[id];
    return isConfirm;
  }
  function deleteTaskFromHtml(confirmed, parent){
    if (!confirmed) {return;}
    parent.remove();
  }
  function addEmpty(){
    if(Object.keys(objOfTask).length === 0){
      const el = createEmpty();
      const parent = listContainer.closest('.container');
      parent.appendChild(el);
    }
    return;
  }
  
  function createEmpty(){
      const div = document.createElement('div');
      div.classList.add('ddd');
      div.textContent = 'the list is empty';
      return div;
  }

  function onCompliteHandler(e){
    if(e.target.classList.contains('btn-success')){
      const parent = e.target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      if(objOfTask[id].completed == true){
        objOfTask[id].completed = false;
        parent.classList.remove('border-success');
      }else{
        objOfTask[id].completed = true;
        parent.classList.add('border-success');
      }
    }
  }
  function createButton(text){
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.classList.add('btn','btn-primary');
    btn.style.width = '545px';
    btn.style.margin = '5px';
    const parent = listContainer.closest('.container');
    parent.insertAdjacentElement('afterbegin',btn);
    return btn;
  }
  function showAllTask(e){
    const li = document.querySelectorAll('.list-group li');
    li.forEach(item =>{
      item.remove();
    });
    let fragment = document.createDocumentFragment();
    Object.values(objOfTask).forEach((item)=>{
      const li = listItemTemplate(item);
      fragment.appendChild(li);
      if(item.completed == true){
        li.classList.add('border-success');
      }
    });
    listContainer.appendChild(fragment);
  }
  function showNotCompleteTask(e){
    const li = document.querySelectorAll('.list-group li');
    li.forEach(item =>{
      item.remove();
    });
    let fragment = document.createDocumentFragment();
    Object.values(objOfTask).forEach((item)=>{
      if(item.completed == false){
        const li = listItemTemplate(item);
        fragment.appendChild(li);
      }
    });
    listContainer.appendChild(fragment);
  }
  function onThemeSelectHandler(e){
    const selectedTheme = themeSelect.value;
    const isConfirm = confirm(`Вы дейстительно хотите изменить тему на ${selectedTheme}?`);
    if(!isConfirm) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }
  function setTheme(name){
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key,value);
    });
  } 
})(tasks);
