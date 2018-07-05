import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, fetchTodos } from "./actions/todos";
import { FETCH_TODOS } from "./actions/todos";
//import axios from 'axios';
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

class Todos extends Component {
    state = {
        newTodo: ''
    };

    /*componentDidMount() {
        this.fetchTodos();
    }*/

    /*fetchTodos() {
        this.setState({ isLoading: true });

        axios.get('http://localhost:4000/v1/todos/')
            .then(res => {
                this.setState({
                    isLoading: false,
                    todos: res.data
                })
            })
            .catch(error => this.setState({ error: error.message }));
    }*/

    /*addTodo = (event) => {
        event.preventDefault();
        const { newTodo } = this.state;

        if(newTodo) {

            const todo = {
                description: newTodo,
                done: false
            };

            axios.post('http://localhost:4000/v1/todos/', { todo })
                .then(res => {})
                .catch(error => this.setState({ error: error.message }));

            this.props.addTodo(todo)

            this.setState({
                newTodo: ''
            });
        }
    }; */

    /*deleteTodo = (id) => {

        const { todos } = this.state;

        axios.delete(`http://localhost:4000/v1/todos/${id}`)
            .then(res => {})
            .catch(error => this.setState({ error: error.message }));

        this.setState({
            todos: todos.filter((todo) => todo._id !== id)
        })
    };*/

    componentDidMount() {
        this.props.dispatch(FETCH_TODOS);
    }

    render () {

        let { todos, newTodo, isLoading, error } = this.props;

        const total = todos.length;
        const complete = todos.filter(todo => todo.done).length;
        const incomplete = total - complete;

        return (
            <section className="section full-column">
                <h1 className="title white">Todos</h1>
                <div className="error">{error}</div>

                <form className="form" onSubmit={(event) => { event.preventDefault(); this.props.addTodo(this.state.newTodo)}}>
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

const mapStateToProps = (state) => {

    return {
        todos: state.todosReducer.todos.items,
        isLoading: state.todosReducer.todos.isLoading,
        error: state.todosReducer.todos.isLoading
    }
};

const mapDispatchToProps = {
    addTodo,
    fetchTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);