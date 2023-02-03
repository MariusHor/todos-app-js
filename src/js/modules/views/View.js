class View {
  focusInput() {
    this.input.focus();
  }

  clear() {
    while (this.parentEl.lastChild) {
      this.parentEl.removeChild(this.parentEl.lastChild);
    }
  }
}
export default View;
