export class Todo {


    static deJson({ id, completado, creado, tarea }) {

        const temTodo = new Todo(tarea);
        temTodo.id = id;
        temTodo.completado = completado;
        temTodo.creado = creado;

        return temTodo;
    }

    constructor(tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date()
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`)
    }
};