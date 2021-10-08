import React, { useEffect } from "react";
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem'
import NewTodoForm from './NewTodoForm'
import { removeTodo, markAsCompleted } from './actions'
import { loadTodos } from './thunks'
import './TodoList.css'
const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadingMessage = <div>Loading Todos...</div>
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo => <TodoListItem key={todo.text} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}

        </div>
    )
    return isLoading ? loadingMessage : content;
}
const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
})
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: text => dispatch(loadTodos(text)),
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markAsCompleted(text)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);