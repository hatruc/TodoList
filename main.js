// Ham chuyen doi string -> html
function html([first, ...strings], ...values) {

    return values.reduce(

        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0).join('')

}

// mang chua du lieu 
var todolist = [
    {
        content: 'html css',
        check: true
    },
    {
        content: 'javascript',
        check: false
    },
    {
        content: 'c++',
        check: false
    }
]

// ham render
function render(todos) {
    var ulMain = document.querySelector('.todo-list')
    
    var ulHtml = todos.map((curV, curI, orgArr) => {
        return         html`<li>
                                <div class="view">
                                    <input class="toggle" type="checkbox" ${curV.check && 'checked'} onclick="handleToggle('${curV.content}')" >
                                    <label contentEditable onclick="handleLabelClick(event)" onkeydown="handleLabelChange(event)">${curV.content}</label>
                                    <button class="destroy" onclick="handleRemove(event)" ></button>
                                </div>
                                <input class="edit" value="Create a TodoMVC template">
                            </li>`
    } )

    ulMain.innerHTML = ulHtml

    var todoCount = document.querySelector('.todo-count')

    todoCount.innerHTML = html`<strong>${todolist.filter(todo => todo.check === false).length}</strong> item left`

}

// mac dinh se render ra du lieu tu mang ban dau
render(todolist)

// xu ly them cong viec
function handleAddtodo(e) {
    if(e.target.value !== '' && e.keyCode === 13) {
        todolist.push({
            content: e.target.value,
            check: false
        })
        render(todolist)
        e.target.value = '';
        console.log(todolist);
    }
}

// xu ly xoa cong viec
function handleRemove(e) {
    todolist = todolist.filter(todo => todo.content !== e.target.parentElement.innerText)
    console.log(todolist);
    render(todolist)
}

// xu ly loc o button all
function handleAll(e) {
    document.querySelector('.AllBtn').classList.add('selected')
    document.querySelector('.activeBtn').classList.remove('selected')
    document.querySelector('.completedBtn').classList.remove('selected')

    render(todolist)
}

// xu ly loc o button active
function handleActive(e) {
    document.querySelector('.activeBtn').classList.add('selected')
    document.querySelector('.AllBtn').classList.remove('selected')
    document.querySelector('.completedBtn').classList.remove('selected')

    activeList = todolist.filter(todo => todo.check === false)
    render(activeList)
}

// xu ly loc o button complete
function handleComplete(e) {

    document.querySelector('.completedBtn').classList.add('selected')
    document.querySelector('.AllBtn').classList.remove('selected')
    document.querySelector('.activeBtn').classList.remove('selected')

    completeList = todolist.filter(todo => todo.check === true)
    render(completeList)
}

// xu ly xoa toan bo cong viec da hoan thanh
function handleClearCompleted(e) {
    todolist = todolist.filter(todo => todo.check === false)
    render(todolist)
}

// xu ly checked cong viec
function handleToggle(todoContent) {
    todolist = todolist.map(todo => ({
        content: todo.content,
        check: todoContent === todo.content ? !todo.check : todo.check
    }))
    render(todolist)
    console.log(todoContent);
    console.log(todolist);
}


// xu ly chinh sua cong viec
var labelText

function handleLabelClick(e) {
    labelText = e.target.innerText
}

function handleLabelChange(e) {
    if(e.keyCode === 13) {
        todolist = todolist.map(todo => ({
            content: todo.content === labelText ? e.target.textContent : todo.content,
            check: todo.check
        }))
        var newInputElement = document.querySelector('.new-todo')
        newInputElement.focus()
        render(todolist)
    }
}







