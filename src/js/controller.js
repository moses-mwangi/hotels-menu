import * as models from "./modal.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultViews.js";
import paginationView from "./views/paginationView.js";
import bookMarkViews from "./views/bookMarkViews.js";
import addRecipeView from "./views/addRecipe.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpiner();

    ///update result
    resultView.update(models.getSearchResultPage(3));
    /// update bookMarkViews
    bookMarkViews.update(models.state.bookMarked);
    //  loading recipe
    await models.loadShow(id);
    const { recipe } = models.state;
    //rendering recipe
    recipeView.render(models.state.recipe);

    ///test
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // 1) get serch query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search result
    await models.loadSearchResult(`${query}`);

    // 3) render search result

    resultView.renderSpiner();
    // resultView.render(models.state.search.results);
    resultView.render(models.getSearchResultPage(3));

    //// render paginatin button
    paginationView.render(models.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResult();
const constrolPagination = function (gotoPage) {
  console.log(gotoPage);
  // render result
  resultView.render(models.getSearchResultPage(gotoPage));
  // render paginatin button
  paginationView.render(models.state.search);
};

const controlServing = function (n) {
  //update recipe serving ( state)
  models.updateServing(n);
  // recipeView.render(models.state.recipe);
  recipeView.update(models.state.recipe);
  //update recipe view
};

const controlAddBookMark = function () {
  // 1)add/remove bookmark
  if (!models.state.recipe.bookMarked) models.addBookMark(models.state.recipe);
  else models.deleteBookMark(models.state.recipe.id);

  /// 2) update recipe view
  recipeView.update(models.state.recipe);

  // 3)render bookmark
  bookMarkViews.render(models.state.bookMarked);
  console.log(models.state.bookMarked);
};

const controlBookMark = function () {
  bookMarkViews.render(models.state.bookMarked);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await models.uploadRecipe(newRecipe);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("nnnnnnnnnnnnnnnnner", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookMarkViews.addHandlerRender(controlBookMark);
  recipeView.addHaddlerRender(controlRecipe);
  recipeView.addHaddlerUpdateServing(controlServing);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView._addHandlerClick(constrolPagination);
  recipeView.addHaddlerBookMark(controlAddBookMark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
