import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo} from './actions'

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
        const body = JSON.stringify({text});
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
export const displayAlert = text => () => {
    alert(`Load Todos Error: ${text}`);
}