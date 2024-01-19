

export const setToken = (token, key = "access_token",remember=false) =>{
    return remember ? localStorage.setItem(key,token):sessionStorage.setItem(key,token)
}

export const getToken = (key = "access_token") =>
  sessionStorage.getItem(key) ||
  localStorage.getItem(key) ||

  undefined;

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");

};

export const setItemToLocal = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getItemFromLocal = (key) => JSON.parse(localStorage.getItem(key));

export const clearLocal = () => localStorage.clear();

export const urlSearchParams = (name) => {
  const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
  return results && results.length > 0 && decodeURI(results[1]);
};


