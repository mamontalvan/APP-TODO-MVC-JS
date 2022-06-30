import { Todo } from '../classes';
import { todoList } from '../index';


//Referencias a componentes o elementos del index.html
const ulTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const aEtiqueta = document.querySelectorAll('.filters');

export const crearTodoHtml = (todo) => {

    const htmlTodDo =
        `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                    <div class="view">
                        <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} />
                        <label>${todo.tarea}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template">
            </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodDo;

    ulTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//Eventos
inputNewTodo.addEventListener('keyup', (evento) => {
    //13: Enter
    if (evento.keyCode === 13 && inputNewTodo.value.length > 0) {

        const nuevaTarea = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevaTarea);

        crearTodoHtml(nuevaTarea);
        inputNewTodo.value = '';

    }

});


ulTodoList.addEventListener('click', (evento) => {

    const nombreElelemnto = evento.target.localName; //input, label, button
    const liElemento = evento.target.parentElement.parentElement;
    const idElementoLi = liElemento.getAttribute('data-id');

    if (nombreElelemnto.includes('input')) { //click en el check

        todoList.marcarCompletado(idElementoLi);
        liElemento.classList.toggle('completed');
    } else if (nombreElelemnto.includes('button')) { //click en el button
        todoList.eliminarTodo(idElementoLi);
        ulTodoList.removeChild(liElemento);
    }

});


btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();

    ulTodoList

    for (let i = ulTodoList.children.length - 1; i >= 0; i--) {

        const elemento = ulTodoList.children[i];

        if (elemento.classList.contains('completed')) {

            ulTodoList.removeChild(elemento);

        }
    }

});


ulFiltros.addEventListener('click', ((evento) => {

    // console.log(evento.target.text);
    const filtro = evento.target.text;

    if (!filtro) return;

    aEtiqueta.forEach(elemento => {
        elemento.classList.remove('selected');
    });
    evento.target.classList.add('selected');

    for (const elemento of ulTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;


        }

    }

}));