import "whatwg-fetch";
import config from "../../config/config";

export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

// eslint-disable-next-line consistent-return
export const fetchCategories = (params = {}) => async (dispatch) => {
  dispatch(requestCategories());

  let url;
  if (params && params.id) {
    url = config.API_CATEGORIES_URL + String(params.id);
  } else {
    url =
      config.API_CATEGORIES_URL +
      "?" +
      Object.keys(params)
        .map((k) => k + "=" + encodeURIComponent(params[k]))
        .join("&");
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    return dispatch(receiveCategories(json));
  } catch (e) {
    dispatch(receiveCategories([]));
  }
};
