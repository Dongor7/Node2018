import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, fetchTodos, deleteTodo } from "../actions/todos";
import Todo from "./Todo";
import 'bulma/css/bulma.css';

class Todos extends Component {

    componentDidMount() {
        this.props.fetchTodos();
    }

    render () {

        let { todos, newTodo, isLoading, error } = this.props;

        console.log('newTodo: ', newTodo);

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
                    {todos.map((todo, i) => <Todo key={i} id={todo._id} todo={todo} deleteTodo={() => { this.props.deleteTodo(todo.id) }}/> )}
                    <div className="white">
                        Total: {total} , Complete: {complete} , Incomplete: {incomplete}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {

    console.log('mapStateToProps: ', state);

    return {
        todos: state.todosReducer.todos.items,
        isLoading: state.todosReducer.todos.isLoading,
        error: state.todosReducer.todos.error
    }
};

const mapDispatchToProps = {
    addTodo,
    fetchTodos,
    deleteTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
