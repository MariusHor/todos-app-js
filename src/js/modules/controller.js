export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.inputView = this.views.inputView;
    this.modalView = this.views.modalView;
  }

  controlAddTodo = () => {
    try {
      // 1. Getting the new todo from the user input
      const todo = this.inputView.getNewTodo();

      if (todo.title === '') {
        throw new Error('Todo cannot be empty!');
      } else {
        // 2. If no error, we send the new todo to the model, to store it
        this.model.addTodo(todo);
      }
    } catch (error) {
      this.inputView.renderInputError(error);
    }
  };

  controlInputFocus = () => {
    this.inputView.focusInput();
  };

  init() {
    this.inputView.bindAddTodo(this.controlAddTodo);
    this.modalView.bindCloseModal(this.controlInputFocus);
  }
}
