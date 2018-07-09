import React from 'react';

const Todo = ({ todo, deleteTodo }) => (
    <div className="box todo-item level is-mobile">
        <div className="level-left">
            <label className={`level-item todo-description ${todo.done && 'completed'}`}>
                <input className="checkbox" type="checkbox"/>
                <span>{todo.description}</span>
            </label>
        </div>
        <div className="level-right">
            <a className="delete level-item" onClick={() => deleteTodo(todo._id)}>Delete</a>
        </div>
    </div>
);

export default Todo;
