import React from "react";
import "./CreateNewMovie.scss";
import { useState } from "react";
import { bindNumberInput } from "../../../../utils/helpers";
import { useDispatch } from "react-redux";
import {
  addMovies,
  getMovieDetails,
  updateMovieDetails,
} from "../../redux/reducer";
import toast from "react-hot-toast";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

export default function CreateNewMovie() {
  const location = useLocation();
  const pathname = location.pathname;
  const isEditActive = pathname?.startsWith("/edit") ? true : false;
  const { id } = useParams();
  const [selectedImagePreview, setSelectedImagePreview] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [movieData, setMovieData] = useState({});
  const Genres = [
    "Action",
    "Adventure",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Horror",
    "Drama",
    "History",
    "Animation",
    "Science",
    "Fiction",
  ];
  const handleChange = (e) => {
    const { id, value } = e.target;
    setMovieData((s) => ({ ...s, [id]: value }));
  };

  const handleImageChange = (e) => {
    if (!e.target.files[0]) return;
    selectedImagePreview?.forEach(URL.revokeObjectURL);
    const files = Array.from(e.target.files);
    setImage(e.target.files[0]);
    const newObjectURLs = files.map((file) => URL.createObjectURL(file));
    setSelectedImagePreview([newObjectURLs]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !movieData.name ||
      !movieData.description ||
      !movieData.releaseYear ||
      !movieData.imDbRating ||
      !image
    ) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }
    try {
      let payload = {
        ...movieData,
        image:isEditActive?image[0]: image,
        ...(isEditActive && { _id: id }),
      };
      if (isEditActive) {
        dispatch(updateMovieDetails(payload))
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success("Movie updated successfully");
              getMovieData();
              setTimeout(() => {
                history.push("/");
              }, 2000);
            } else {
              toast.error(res?.message);
            }
          });
      } else {
        dispatch(addMovies(payload))
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success("Movie added successfully");
              setTimeout(() => {
                history.push("/");
              }, 2000);
            } else {
              toast.error(res?.message);
            }
          });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleGenre = (type) => {
    if (movieData.genre && movieData.genre.includes(type)) {
      const updatedGenres = movieData.genre.filter((genre) => genre !== type);
      setMovieData({ ...movieData, genre: updatedGenres });
    } else {
      setMovieData({ ...movieData, genre: [...(movieData.genre || []), type] });
    }
  };
  function getMovieData() {
    let payload = {
      id: id,
    };
    dispatch(getMovieDetails(payload))
      .unwrap()
      .then((res) => {
        const editData = res?.payload?.data?.[0];
        setMovieData(editData);
        setImage([editData?.image]);
        setSelectedImagePreview(editData?.image);
      });
  }
  useEffect(() => {
    if (id) {
      getMovieData();
    }
  }, [id]);

  return (
    <div className="create-new-movie-section">
      <div className="container">
        <div className="create-new-movie-alignment">
          <div className="create-new-movie-heading">
            <h4>{isEditActive ? "Edit Movie" : "Create a new movie"}</h4>
          </div>

          <div className="create-new-movie-details">
            <div className="grid">
              <div className="grid-item">
                <div className="upload-box">
                  {image == null ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_3_346)">
                          <path
                            d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3_346">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>Drop an image here</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={selectedImagePreview}
                        alt={selectedImagePreview}
                      ></img>
                    </>
                  )}
                </div>
              </div>
              <div className="grid-item">
                <div className="create-new-movie-form">
                  <div className="form-input">
                    {/* <input type="text" placeholder="Title" /> */}
                    <div class="field">
                      <input
                        type="text"
                        value={movieData?.name}
                        required
                        id="name"
                        onChange={handleChange}
                      />
                      <label
                        for="name"
                        title="Title"
                        data-title="Title"
                      ></label>
                    </div>
                  </div>

                  <div className="form-input">
                    <div class="field">
                      <textarea
                        type="text"
                        value={movieData?.description}
                        required
                        id="description"
                        onChange={handleChange}
                      ></textarea>
                      <label
                        for="description"
                        title="Description"
                        data-title="Description"
                      ></label>
                    </div>
                  </div>

                  <div className="publish-year-input">
                    <div className="form-input">
                      <div class="field">
                        <input
                          type="number"
                          value={movieData?.releaseYear}
                          min="1900"
                          max="2100"
                          step="1"
                          oninput="updateYear()"
                          required
                          id="releaseYear"
                          onChange={handleChange}
                        />
                        <label
                          for="releaseYear"
                          title="Publishing year"
                          data-title="Publishing year"
                        ></label>
                      </div>
                    </div>
                  </div>

                  <div className="form-input">
                    <div class="field">
                      <input
                        type="text"
                        value={movieData?.imDbRating}
                        required
                        id="imDbRating"
                        onKeyPress={bindNumberInput}
                        onChange={handleChange}
                      />
                      <label
                        for="imDbRating"
                        title="IMDB Rating"
                        data-title="IMDB Rating"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="genrel-type-details-alignment">
              <h6>Genre Type :</h6>

              <div className="genrel-type-details-name-alignment">
                {Genres?.map((genre) => {
                  return (
                    <div
                      className={`name-box ${
                        movieData.genre?.length > 0 &&
                        movieData.genre?.includes(genre)
                          ? "selected-genre"
                          : ""
                      }`}
                    >
                      <p id="genre" onClick={() => handleGenre(genre)}>
                        {" "}
                        {genre}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="create-new-movie-bottom-alignment">
              <div className="create-new-movie-button">
                <button onClick={() => history.push("/")}>Cancel</button>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
