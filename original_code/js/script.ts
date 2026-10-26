// Just testing things here
const body_element = document.querySelector("body") as HTMLBodyElement;
// const new_list = document.createElement("ul") as HTMLUListElement;
// new_list.textContent = "new_list";
// body_element.appendChild(new_list);


class TodoItem {
    title: string;
    description: string;
    due_date: Date;
    priority: Number;
    list_item_object: HTMLLIElement;

    constructor(title:string, description:string='', due_date:Date, priority:Number=5) {
        this.title = title;
        this.list_item_object = document.createElement("li");
        this.description=description;
        this.due_date=due_date;
        this.priority=priority;
    }

    get_item_object() {
        const date_string = this.due_date.toLocaleDateString('zh-CN', { day: 'numeric', month: 'numeric', year: 'numeric' })

        
        let item_string = this.title + " | " + date_string + " | " + this.priority;
        
        this.list_item_object.innerText = item_string;

        if(this.description) {
            const description_paragraph = document.createElement("p");
            description_paragraph.innerText = this.description;
            this.list_item_object.appendChild(description_paragraph);
        }

        return this.list_item_object;
    }
}


class TodoList {
    todo_list: Array<TodoItem>;
    list_object: HTMLUListElement;

    constructor() {
        this.todo_list = []
        this.list_object = document.createElement("ul");
    }

    add_list_item(title:string='', description: string='', due_date: Date=new Date(), priority: Number=5) {
        const new_todo_item = new TodoItem(title, description, due_date, priority);
        
        this.add_list_object(new_todo_item);
    }

    add_list_object(todo_item: TodoItem) {
        this.todo_list.push(todo_item);
        this.list_object.appendChild(todo_item.get_item_object());
    }

    get_list_object() {
        return this.list_object;
    }
}


class TodoProject {
    title: string;
    todo_lists: Array<TodoList>;
    div_object: HTMLDivElement;

    constructor(title:string) {
        this.title = title;
        
        this.todo_lists = []
        this.div_object = document.createElement("div");
    }

    add_list() {
        const new_todo_list = new TodoList();

        this.add_todo_list(new_todo_list)
    }

    add_todo_list(todo_list:TodoList) {
        this.todo_lists.push(todo_list);
        this.div_object.appendChild(todo_list.get_list_object());
    }

    get_div_object() {
        this.div_object.textContent = this.title;
        return this.div_object;
    }
}


const todo_list = new TodoList();
todo_list.add_list_item("test_item", "Item description", new Date(), 5);

const list_item = new TodoItem("test_item 2", "new description", new Date(), 6);
todo_list.add_list_object(list_item);

const todo_project = new TodoProject("new project");
todo_project.add_todo_list(todo_list);

console.log(todo_project);

body_element.appendChild(todo_project.div_object);
