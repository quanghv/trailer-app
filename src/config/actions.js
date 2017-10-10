const apiUrl = "http://192.168.100.43:613/api/";

export const actionTypes = {
  LOGIN: "login",
  USER_INFO: "userInfo"
};

export const getUrlFromType = actionType => {
  switch (actionType) {
    case actionTypes.LOGIN:
      return `${apiUrl}account/login`;
    case actionTypes.USER_INFO:
      return `${apiUrl}account/info`;
    default:
      return null;
  }
};

export default {
  urlSearch: `${apiUrl}story/search`,
  urlSuggestion: `${apiUrl}story/suggest`,
  urlMovieList: `${apiUrl}movies/list`,
  urlChapterDetail: `${apiUrl}chapter/detail`
};
