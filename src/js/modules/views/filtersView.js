import { $el, $$el } from '../utils/helpers';
import View from './View';

class FiltersView extends View {
  constructor() {
    super();
    this.parentEl = $el('.filters');
    this.filters = $$el('.button--filter');
  }

  setFilterActive(filter) {
    const activeFilter = $el(`[data-filter="${filter}"]`);
    this.filters.forEach(fl => {
      fl.classList.remove('button--current');
      fl.removeAttribute('aria-label');
    });
    activeFilter.classList.add('button--current');
    activeFilter.setAttribute('aria-label', `current filter: ${filter}`);
  }

  handleFilters(handler) {
    this.parentEl.addEventListener('click', event => {
      const element = event.target.closest('[data-filter]');
      if (!element) return;
      const { filter } = element.dataset;
      this.setFilterActive(filter, element);
      handler(filter);
    });
  }
}

export default new FiltersView();
