import api from "../../../utils/api";
import { convertObjectToFormData } from "../../../utils/helpers";

export const getMovieData = (data) => {
  const { limit, page, search } = data;
  const apiSearch = search ? `&search=${search}` : "";
  return api.get(`movies/?limit=${limit}&page=${page}${apiSearch}`);
};

export const getMovieDetailsByID = (body) => api.get(`/movies/?_id=${body.id}`);

export const updateMovieDetailsByID = (body) => {
  const { _id, ...rest } = body;
  return api.put(`/movies/update?_id=${_id}`, convertObjectToFormData(rest));
};

export const getSimilarMovieByID = (body) =>
  api.get(`movie/${body?.id}/similar`);

export const login = (body) => api.post("user/signIn", body);
export const signup = (body) => api.post("user/signup", body);

export const addMovie = (body) =>
  api.post("movies/add", convertObjectToFormData(body));
