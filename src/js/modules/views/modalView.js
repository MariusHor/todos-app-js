import { asyncTimeout, $el } from '../utils/helpers';
import View from './View';

class Modal extends View {
  constructor() {
    super();
    this.parentEl = $el('#app');
  }

  static #generateModalMarkup(message) {
    const markup = `
        <div class="modal">
            <div class="modal__overlay"></div>
            <div class="modal__box">
                <p class="modal__message">${message}</p>
                <button class="modal__close" data-modal="close-modal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    `;
    return markup;
  }

  async showModal(message) {
    const markup = Modal.#generateModalMarkup(message);
    this.parentEl.insertAdjacentHTML('beforeend', markup);

    await asyncTimeout(300);

    $el('.modal__box').classList.add('visible');
    $el('.modal__overlay').classList.add('visible');
  }

  static async #closeModal() {
    $el('.modal__overlay').classList.remove('visible');
    $el('.modal__box').classList.remove('visible');

    await asyncTimeout(1000);

    if ($el('.modal')) $el('.modal').remove();
  }

  bindCloseModal(handler) {
    this.parentEl.addEventListener('click', event => {
      const closeBtn = event.target.closest('[data-modal="close-modal');
      if (closeBtn) {
        Modal.#closeModal();
        handler();
      }
    });
    document.addEventListener('click', event => {
      if (event.target.matches('.modal__overlay')) {
        Modal.#closeModal();
        handler();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        Modal.#closeModal();
        handler();
      }
    });
  }
}

export default new Modal();
