import icons from "url:../../img/icons.svg";
import view from "./views";

class bookMarkView extends view {
  _parentEl = document.querySelector(".bookmarks");
  _errorMessage = "No bookmark yet:find another and bookmark it !";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
    console.log(this._data);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
     
     <a class="preview__link ${
       result.id === id ? "preview__link--active" : ""
     } " href="#${result.id}">
      <figure class="preview__fig">
         <img src="${result.imageUrl}" alt="${result.title}" />
       </figure>
       <div class="preview__data">
         <h4 class="preview__title">${result.title}</h4>
         <p class="preview__publisher">${result.publisher}</p>
        
       </div>
    </a>
  </li>`;
  }
  _overFlow() {
    this._parentEl.style._overFlow = "hidden";
  }
}
export default new bookMarkView();
