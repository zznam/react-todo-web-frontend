import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
    createTodo,
    removeTodo,
    markAsCompleted,
} from './actions'

export const loadTodos = () => async (dispatch, getState) => {
    dispatch(loadTodosInProgress());
    try {
        const response = await fetch('http://localhost:4001/todos');
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure())
        dispatch(displayAlert(e))
    }
}
export const addTodoRequest = text => async (dispatch) => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:4001/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e))
    }
}

export const deleteTodoRequest = id => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:4001/todos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'delete',
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e))
    }
}
export const markTodoAsCompleted = id => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:4001/todos/${id}/completed`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
        });
        const updatedTodo = await response.json();
        dispatch(markAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e))
    }
}

export const displayAlert = text => () => {
    alert(`Load Todos Error: ${text}`);
}