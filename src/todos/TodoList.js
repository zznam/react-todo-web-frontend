import React, { useEffect } from "react";
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem'
import NewTodoForm from './NewTodoForm'
import { loadTodos, deleteTodoRequest, markTodoAsCompleted } from './thunks'
import {
    getTodosLoading,
    getIncompleteTodos,
    getCompletedTodos,
} from "./selectors";
import styled from 'styled-components'

const ListWrapper = styled.div`
    max-width: 700px;
    margin:auto;
`;


const TodoList = ({ incompleteTodos = [], completedTodos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadingMessage = <div>Loading Todos...</div>
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete Todos:</h3>
            {incompleteTodos.map(todo => <TodoListItem key={todo.text} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
            <h3>Completed Todos:</h3>
            {completedTodos.map(todo => <TodoListItem key={todo.text} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
        </ListWrapper>
    )
    return isLoading ? loadingMessage : content;
}
const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    incompleteTodos: getIncompleteTodos(state),
    completedTodos: getCompletedTodos(state),
})
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: text => dispatch(loadTodos(text)),
    onRemovePressed: id => dispatch(deleteTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompleted(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
