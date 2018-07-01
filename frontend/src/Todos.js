import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';

const Todo = ({ todo, id, deleteTodo }) => (
<div className="box todo-item level is-mobile">
    <div className="level-left">
        <label className={`level-item todo-description ${todo.done && 'completed'}`}>
            <input className="checkbox" type="checkbox"/>
            <span>{todo.description}</span>
        </label>
    </div>
    <div className="level-right">
        <a className="delete level-item" onClick={() => deleteTodo(id)}>Delete</a>
    </div>
</div>
);

export default class Todos extends Component {
    state = {
        newTodo: '',
        todos: [],
        error: '',
        isLoading: false
    };

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos() {
        this.setState({ isLoading: true });

        axios.get('http://localhost:4000/v1/todos/')
            .then(res => {
                this.setState({
                    isLoading: false,
                    todos: res.data
                })
            })
            .catch(error => this.setState({ error: error.message }));
    }

    addTodo = (event) => {
        event.preventDefault();
        const { newTodo, todos } = this.state;

        if(newTodo) {

            axios.post('http://localhost:4000/v1/todos/', {
                    todo: {
                        description: newTodo,
                        done: false
                    }
                })
                .then(res => {})
                .catch(error => this.setState({ error: error.message }));

            this.setState({
                newTodo: '',
                todos: todos.concat({ description: newTodo, done: false })
            })
        }
    };

    deleteTodo = (id) => {

        const { todos } = this.state;

        axios.delete(`http://localhost:4000/v1/todos/${id}`)
            .then(res => {})
            .catch(error => this.setState({ error: error.message }));

        this.setState({
            todos: todos.filter((todo) => todo._id !== id)
        })
    };

    render () {

        let { todos, newTodo, isLoading, error } = this.state;

        const total = todos.length;
        const complete = todos.filter(todo => todo.done).length;
        const incomplete = total - complete;

        return (
            <section className="section full-column">
                <h1 className="title white">Todos</h1>
                <div className="error">{error}</div>

                <form className="form" onSubmit={this.addTodo}>
                    <div className="field has-addons" style={{ justifyContent: 'center' }}>
                        <div className="control">
                            <input className="input"
                                value={newTodo}
                                placeholder="New todo"
                                onChange={(e) => this.setState({ newTodo: e.target.value })}/>
                        </div>

                        <div className="control">
                            <button
                                className={`button is-success ${isLoading && "is-loading"}`}
                                disabled={isLoading}>Add</button>
                        </div>
                    </div>
                </form>

                <div className="container todo-list">
                    {todos.map((todo, i) => <Todo key={i} id={todo._id} todo={todo} deleteTodo={this.deleteTodo}/> )}
                    <div className="white">
                        Total: {total} , Complete: {complete} , Incomplete: {incomplete}
                    </div>
                </div>
            </section>
        )
    }
}
