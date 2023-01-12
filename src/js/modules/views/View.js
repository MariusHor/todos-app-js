import iconCross from '../../../assets/icon-cross.svg';

class View {
  constructor() {
    this.data = [];
    this.parentEl = document.querySelector('#app');
  }

  clear() {
    this.parentEl.innerHTML = '';
  }

  renderError(error) {
    const markup = `
      <div class="error">
          <div>
          <svg>
              <use href="${iconCross}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${error.message}</p>
      </div>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
export default View;
