/* eslint-disable consistent-return */
export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.inputView = this.views.inputView;
    this.modalView = this.views.modalView;
    this.todosListView = this.views.todosListView;
    this.todoView = this.views.todoView;
    this.bottomView = this.views.bottomView;
    this.filter = '';
  }

  controlGetState = state => {
    const { filter } = state;
    this.filter = filter;
    this.render(this.filter);
    this.bottomView.setFilterActive(this.filter);
  };

  controlAddTodo = todo => {
    try {
      if (todo.title === '') {
        throw new Error('Todo cannot be empty!');
      } else {
        this.model.addTodo(todo);
        this.render(this.filter);
      }
    } catch (error) {
      this.controlModal(error.message);
    }
  };

  controlDeleteTodo = id => {
    this.model.deleteTodo(id);
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

  render(filter) {
    const data = this.controlFilterData(filter);
    this.todosListView.render(data, filter);
  }

  init() {
    this.model.getState(this.controlGetState);
    this.inputView.bindAddTodo(this.controlAddTodo);
    this.todoView.bindDeleteTodo(this.controlDeleteTodo);
    this.bottomView.bindFilters(this.controlFilters);
  }
}
