import { Todo } from './todo.class';

export class TodoList {


    constructor() {

        this.cargarDelLocalStorage();
    }


    nuevoTodo(tarea) {

        this.todos.push(tarea);
        this.guardarLocalStorage();

    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {

        for (const todo of this.todos) {
            // console.log(todo.id, id);
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {

        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos)); //Convertir JSON to string
    }


    cargarDelLocalStorage() {

        //convertir String to JSON
        this.todos = (localStorage.getItem('todo')) ?
            JSON.parse(localStorage.getItem('todo')) : this.todos = [];

        this.todos = this.todos.map(Todo.deJson);
    }

}