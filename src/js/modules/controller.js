/* eslint-disable consistent-return */
import Sortable from 'sortablejs';

export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.inputView = this.views.inputView;
    this.todosListView = this.views.todosListView;
    this.todoView = this.views.todoView;
    this.filtersView = this.views.filtersView;
    this.appView = this.views.appView;
    this.tooltipView = this.views.tooltipView;
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
    this.model.addTodo(todo);
    this.render(this.filter);
  };

  controlDeleteTodo = id => {
    this.model.deleteTodo(id);
    this.render(this.filter);
  };

  controlToggleTodo = id => {
    this.model.toggleTodo(id);
    this.render(this.filter);
  };

  controlEditTodo = (id, text) => {
    this.model.editTodo(id, text);
    this.render(this.filter);
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

  controlSortable = selector =>
    Sortable.create(selector, {
      group: 'sorted-todos',
      store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get(sortable) {
          const order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set(sortable) {
          const order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        },
      },
      swapThreshold: 1,
      animation: 350,
      delay: 250,
      easing: 'cubic-bezier(0.28, -0.3, 0.22, 1.6)',
      chosenClass: 'list__todo--dragged',
    });

  controlCounter = () => {
    const activeTodos = this.model.getActiveTodos();
    this.appView.renderCounter(activeTodos);
  };

  render(filter) {
    const data = this.controlFilterData(filter);
    this.todosListView.render(data, filter);
    this.controlCounter();
    this.todosListView.bindControlSortable(this.controlSortable);
  }

  init() {
    this.tooltipView.renderTooltips();
    this.appView.switchTheme();
    this.model.getState(this.controlSetState);
    this.inputView.bindAddTodo(this.controlAddTodo);
    this.todoView.bindDeleteTodo(this.controlDeleteTodo);
    this.todoView.bindToggleTodo(this.controlToggleTodo);
    this.todoView.bindEditTodo(this.controlEditTodo);
    this.filtersView.bindFilters(this.controlFilters);
    this.appView.bindClearCompleted(this.controlClearCompleted);
  }
}
