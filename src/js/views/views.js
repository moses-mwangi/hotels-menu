// import { construct } from "core-js/fn/reflect";
import icons from "url:../../img/icons.svg";

export default class view {
  _data;
  render(data) {
    this._data = data;
    // if (!data || (Array.isArray(data) && data.length === 0))
    if (data.length === 0) return this.renderError();

    const markUp = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
  _clear() {
    this._parentEl.innerHTML = "";
  }

  update(data) {
    this._data = data;

    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpiner() {
    const markUp = `
     <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
  renderError(message = this._errorMessage) {
    const markUp = `
     <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
  renderMessage(message = this._message) {
    const markUp = `
     <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
}
