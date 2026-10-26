// Just testing things here
const body_element = document.querySelector("body") as HTMLBodyElement;
// const new_list = document.createElement("ul") as HTMLUListElement;
// new_list.textContent = "new_list";
// body_element.appendChild(new_list);


class TodoItem {
    title: string;
    title_element: HTMLSpanElement;
    description: string;
    description_element: HTMLParagraphElement;
    due_date: Date;
    priority: Number;
    list_item_element: HTMLLIElement;
    edit_button_element: HTMLButtonElement;

    description_edit_element: HTMLInputElement;
    update_button_element: HTMLButtonElement

    constructor(title:string, description:string='', due_date:Date, priority:Number=5) {
        this.title = title;
        this.list_item_element = document.createElement("li");
        this.title_element = document.createElement("span");
        this.list_item_element.appendChild(this.title_element);
        this.description=description;
        this.description_element = document.createElement("p");
        this.list_item_element.appendChild(this.description_element);
        this.due_date=due_date;
        this.priority=priority;

        this.edit_button_element = document.createElement("button");
        this.edit_button_element.textContent = "Edit";
        this.list_item_element.appendChild(this.edit_button_element);
        this.edit_button_element.addEventListener("click", (event) => this.start_edit());

        this.description_edit_element = document.createElement("input");
        this.description_edit_element.type = "text";
        
        this.update_button_element = document.createElement("button");
        this.update_button_element.textContent = "Update";
        this.update_button_element.addEventListener("click", (event) => this.update_edit());
    }

    render_item() {
        const date_string = this.due_date.toLocaleDateString('zh-CN', { day: 'numeric', month: 'numeric', year: 'numeric' })
        
        let item_string = this.title + " | " + date_string + " | " + this.priority;
        
        this.title_element.innerText = item_string;

        if(this.description) {
            this.description_element.innerText = this.description;
        }

        return this.list_item_element;
    }

    set_priority(new_priority: Number) {
        if (Number.isInteger(new_priority)) {
            this.priority = new_priority;
        }
    }

    set_due_date(new_date: string) {
        const date_parts = new_date.split("/");

        this.due_date.setFullYear(Number(date_parts[0]));
        this.due_date.setMonth( Number(date_parts[1]) - 1 );
        this.due_date.setDate(Number(date_parts[2]));
    }

    remove_item() {
        this.title_element.remove();
        this.description_element.remove();
        this.list_item_element.remove();
    }

    start_edit() {
        this.description_element.textContent = '';
        this.edit_button_element.remove();
        
        this.list_item_element.appendChild(this.description_edit_element);
        this.description_edit_element.value = this.description;
        this.list_item_element.appendChild(this.update_button_element);
    }

    update_edit() {
        this.description_element.textContent = this.description_edit_element.value;
        this.description = this.description_edit_element.value;
        this.description_edit_element.remove();

        this.update_button_element.remove();
        this.list_item_element.appendChild(this.edit_button_element);
    }
}


class TodoList {
    title: string;
    title_object: HTMLHeadElement;
    todo_list: Array<TodoItem>;
    list_element: HTMLUListElement;

    constructor(title: string) {
        this.title = title;
        this.todo_list = []
        this.list_element = document.createElement("ul");
        this.title_object = document.createElement("h3");
        this.list_element.appendChild(this.title_object);
    }

    render() {
        this.title_object.innerText = this.title;

        for (const todo_item of this.todo_list) {
            todo_item.render_item();
        }
    }

    add_list_item(title:string='', description: string='', due_date: Date=new Date(), priority: Number=5) {
        const new_todo_item = new TodoItem(title, description, due_date, priority);
        
        this.add_list_object(new_todo_item);
    }

    add_list_object(todo_item: TodoItem) {
        this.todo_list.push(todo_item);
        todo_item.render_item();
        this.list_element.appendChild(todo_item.list_item_element);
    }

    remove_item(todo_item: TodoItem) {
        const todo_item_index = this.todo_list.indexOf(todo_item);
        this.todo_list.splice(todo_item_index, 1);
        todo_item.remove_item();
    }

    get_list_object() {
        return this.list_element;
    }
}


class TodoProject {
    title: string;
    title_element: HTMLHeadElement;
    todo_lists: Array<TodoList>;
    div_object: HTMLDivElement;

    constructor(title:string) {
        this.title = title;
        
        this.todo_lists = []
        this.div_object = document.createElement("div");
        
        this.title_element = document.createElement("h2");
        this.div_object.appendChild(this.title_element);
    }

    add_list(list_title: string) {
        const new_todo_list = new TodoList(list_title);

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

    render() {
        this.title_element.innerText = this.title;

        for (const todo_list of this.todo_lists) {
            todo_list.render()
        }
    }
}


class ProjectSets {
    projects_list: Array<TodoProject>;
    div_object: HTMLDivElement;

    constructor() {
        this.projects_list = [];
        this.div_object = document.createElement("div");
    }

    add_project(todo_project: TodoProject) {
        this.projects_list.push(todo_project);
        this.div_object.appendChild(todo_project.div_object)
    }

    render() {
        for (const todo_project of this.projects_list) {
            todo_project.render();
        }
    }
}


const todo_list = new TodoList("First todo list");
todo_list.add_list_item("test_item", "Item description", new Date(), 5);

const list_item = new TodoItem("test_item 2", "new description", new Date(), 6);
list_item.set_due_date("2027/12/08");
todo_list.add_list_object(list_item);
list_item.set_priority(10);

todo_list.remove_item(list_item);

const todo_project = new TodoProject("Default Project");
todo_project.add_todo_list(todo_list);

console.log(todo_project);

const todo_project_2 = new TodoProject("New Project");
const todo_list_2 = new TodoList("Second todo list");

todo_list_2.add_list_item("test_item_2", "Another description", new Date(), 7);
todo_project_2.add_todo_list(todo_list_2);

const project_sets = new ProjectSets()

project_sets.add_project(todo_project);
project_sets.add_project(todo_project_2);

body_element.appendChild(project_sets.div_object);
project_sets.render();

