export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.inputView = this.views.inputView;
    this.modalView = this.views.modalView;
    this.todosListView = this.views.todosListView;
    this.todoView = this.views.todoView;
  }

  controlGetTodos = data => {
    this.todosListView.render(data, 'completed');
  };

  controlAddTodo = todo => {
    try {
      if (todo.title === '') {
        throw new Error('Todo cannot be empty!');
      } else {
        this.model.addTodo(todo);
        this.todosListView.render(this.model.state.todos, 'active');
      }
    } catch (error) {
      this.controlModal(error.message);
    }
  };

  controlModal = data => {
    this.modalView.showModal(data);
    this.modalView.handleEvents();
  };

  controlDeleteTodo = id => {
    this.model.deleteTodo(id);
    this.todosListView.render(this.model.state.todos, 'active');
  };

  init() {
    this.model.getTodos(this.controlGetTodos);
    this.inputView.bindAddTodo(this.controlAddTodo);
    this.todoView.bindDeleteTodo(this.controlDeleteTodo);
  }
}
