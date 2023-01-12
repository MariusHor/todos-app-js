import { $el, $$el } from '../utils/helpers';
import View from './View';

class BottomView extends View {
  constructor() {
    super();
    this.parentEl = $el('.content__bottom');
    this.filters = $$el('.filter');
  }

  setFilterActive(filter) {
    this.filters.forEach(fl => fl.classList.remove('button--current'));
    $el(`[data-filter="${filter}"]`).classList.add('button--current');
  }

  bindFilters(handler) {
    this.parentEl.addEventListener('click', event => {
      const element = event.target.closest('[data-filter]');
      if (!element) return;
      const { filter } = element.dataset;
      this.setFilterActive(filter, element);
      handler(filter);
    });
  }
}

export default new BottomView();
