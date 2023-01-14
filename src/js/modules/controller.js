/* eslint-disable consistent-return */
import { InputError } from './utils/customErrors';

export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.inputView = this.views.inputView;
    this.modalView = this.views.modalView;
    this.todosListView = this.views.todosListView;
    this.todoView = this.views.todoView;
    this.filtersView = this.views.filtersView;
    this.appView = this.views.appView;
    this.filter = '';
  }

  controlSetState = state => {
    if (!state.filter) {
      this.filter = 'all';
    } else {
      const { filter } = state;
      this.filter = filter;
    }
    this.filtersView.setFilterActive(this.filter);
    this.render(this.filter);
  };

  controlAddTodo = todo => {
    try {
      if (!todo.title.length) throw new InputError('Todo cannot be empty!');
      this.model.addTodo(todo);
      this.render(this.filter);
    } catch (error) {
      if (error instanceof InputError) {
        this.controlModal(error.message);
      } else throw error;
    }
  };

  controlDeleteTodo = id => {
    this.model.deleteTodo(id);
    this.render(this.filter);
  };

  controlCheckTodo = id => {
    this.model.toggleTodo(id);
    this.render(this.filter);
  };

  controlEditTodo = (id, text) => {
    this.model.editTodo(id, text);
    this.render(this.filter);
  };

  controlModal = message => {
    this.modalView.showModal(message);
    this.modalView.handleEvents();
  };

  controlFilters = filter => {
    this.filter = filter;
    this.model.setFilter(this.filter);
    this.render(this.filter);
  };

  controlFilterData(filter) {
    switch (filter) {
      case 'active':
        return this.model.getActiveTodos();
      case 'completed':
        return this.model.getCompletedTodos();
      default:
        return this.model.state.todos;
    }
  }

  controlClearCompleted = () => {
    this.model.removeCompleted();
    this.render(this.filter);
  };

  handleCounter = () => {
    const activeTodos = this.model.getActiveTodos();
    this.appView.renderCounter(activeTodos);
  };

  render(filter) {
    const data = this.controlFilterData(filter);
    this.todosListView.render(data, filter);
    this.handleCounter();
  }

  init() {
    this.appView.switchTheme();
    this.model.getState(this.controlSetState);
    this.inputView.bindAddTodo(this.controlAddTodo);
    this.todoView.bindDeleteTodo(this.controlDeleteTodo);
    this.todoView.bindCheckTodo(this.controlCheckTodo);
    this.todoView.bindEditTodo(this.controlEditTodo);
    this.filtersView.bindFilters(this.controlFilters);
    this.appView.bindClearCompleted(this.controlClearCompleted);
  }
}
