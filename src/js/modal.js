import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config";
import { getJSON, sendJSON } from "./helper.js";
import icons from "url:../img/icons.svg";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookMarked: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    serving: recipe.servings,
    publisher: recipe.publisher,
    title: recipe.title,
    ingredients: recipe.ingredients,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadShow = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = createRecipeObject(data);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      serving: recipe.servings,
      publisher: recipe.publisher,
      title: recipe.title,
      ingredients: recipe.ingredients,
      imageUrl: recipe.image_url,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
    };
    console.log(state.recipe);
    if (state.bookMarked.some((bookmark) => bookmark.id === id))
      // console.log(bookMarked.id);
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        imageUrl: rec.image_url,
      };
      state.search.page = 1;
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
  });

  state.recipe.serving = newServing;
};

const persistBookMark = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookMarked));
};

export const addBookMark = function (recipe) {
  state.bookMarked.push(recipe);
  console.log(state.bookMarked);
  console.log(state.bookMarked);
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  persistBookMark();
};

export const deleteBookMark = function (id) {
  const index = state.bookMarked.findIndex((el) => el.id == id);
  state.bookMarked.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookMarked = false;
};

const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (Storage) state.bookMarked = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
  console.log(newRecipe);
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient fromat! Please use the correct format :"
          );

        const [quantity, unit, description] = ingArr;
        console.log(quantity, unit, description);

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(ingredients);
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
