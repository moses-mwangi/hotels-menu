import icons from "url:../../img/icons.svg";
import view from "./views";

class paginationViews extends view {
  _parentEl = document.querySelector(".pagination");

  _addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const gotoPage = Number(btn.dataset.goto);
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // page 1 other page
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }</" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button> `;
    }
    // page 1 no other page
    // last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }"</ class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page${curPage - 1}</span>
      </button>`;
    }

    //other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }"</ class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }"</ class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
    }
  }
}

export default new paginationViews();
