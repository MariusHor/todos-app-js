import tippy from 'tippy.js';
import View from './View';

class TooltipView extends View {
  #tooltips = [
    {
      selector: '[data-theme="switch"]',
      content: 'Switch theme',
      placement: 'right-end',
      theme: 'violet',
    },
    {
      selector: '[data-form="submit"]',
      content: 'Add todo',
      placement: 'right-end',
      theme: 'violet',
    },
    {
      selector: '[data-form="checkbox-label"]',
      content: 'Toggle todo',
      placement: 'left-end',
      theme: 'violet',
    },
    {
      selector: '.list__todo--active',
      content: 'Double-click to edit',
      placement: 'right-end',
      theme: 'violet',
    },
    {
      selector: '[data-remove="todo"]',
      content: 'Remove todo',
      placement: 'right-end',
      theme: 'violet',
    },
    {
      selector: '[data-todo="checkbox"]',
      content: 'Toggle todo',
      placement: 'left-end',
      theme: 'violet',
    },
  ];

  renderTooltips() {
    const mediaQuery = window.matchMedia('(min-width: 62em)');
    if (mediaQuery.matches) {
      this.#tooltips.forEach(tooltip => {
        tippy(tooltip.selector, {
          content: tooltip.content,
          placement: tooltip.placement,
          theme: tooltip.theme,
        });
      });
    }
  }
}

export default new TooltipView();
