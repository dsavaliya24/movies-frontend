import React, { useEffect, useState } from "react";
import "./Home.scss";
import MovieDetailsModal from "./components/MovieDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularMovieData,
  getSerchedMovieData,
  getTopMovieData,
} from "./redux/reducer";
import { useHistory } from "react-router-dom";
import { getToken, urlSearchParams } from "../../utils";
import { toast } from "react-hot-toast";
import { genreNames } from "../../config";
import MovieList from "./components/MovieList";
import EmptyModal from "./components/emptymodal";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = urlSearchParams("search");
  const openMovieDetail = useSelector((state) => state.movies.openMovieDetail);
  const [searchMovies, setSearchMovies] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [serchedMovies, setSerchedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [showEmptyModal, setShowEmptyModal] = useState(false)
  const limit = 8;

  useEffect(() => {
    if (searchMovies) {
      getTrandingMovie(limit, currentPages, searchMovies);
    } else {
      setSearchMovies("");
      getTrandingMovie(limit, currentPages);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [searchMovies, currentPages]);

 

  const getTrandingMovie = async (limit, page, search = null) => {
    try {
      setLoading(true);
      dispatch(
        getPopularMovieData({ limit: limit, page: page, search: search })
      )
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload?.payload?.data;
            setLatestMovies(movies);
            if (search?.length > 0) {
              setTotalPages(
                Math.floor(response?.payload?.payload?.count / limit)
              );
            } else {
              setTotalPages(
                Math.floor(response?.payload?.payload?.totalCount / limit)
              );
              if (movies?.length === 0) {
                setShowEmptyModal(true)
              }
            }
            setTotalResults(Math.floor(response?.payload?.payload?.count));
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    } 
    
  };

  const HandleMovieSearch = () => {
    setCurrentPages(1);
    if (searchMovies) {
      history.push(`/?search=${searchMovies}`);
    } else {
      history.push(`/`);
    }
  };

  const handleOnKeyPressSubmit = (e) => {
    if (e.key === "Enter" && searchMovies) {
      history.push(`/?search=${searchMovies}`);
      setCurrentPages(1);
    }
  };

  const handleSerchData = (e) => {
    setCurrentPages(1);
    setSearchMovies(e.target.value);
  };
  return (
    <>
      <div className="home-section">
        <div className="home-alignment">
          <div className="search-sticky-alignment">
            <div className="new-search-alignment">
              <input
                type="text"
                value={searchMovies}
                onKeyPress={(e) => handleOnKeyPressSubmit(e)}
                onChange={(e) => {
                  handleSerchData(e);
                }}
                placeholder="Search movie by name..."
              />
              <div className="new-search-icon-alignment">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    fill="#fff"
                  />
                </svg>
              </div>
              {searchMovies && (
                <a onClick={() => HandleMovieSearch()}>Search</a>
              )}
            </div>
          </div>
          <MovieList
            latestMovies={latestMovies}
            searchMovies={searchMovies}
            totalPages={totalPages}
            currentPages={currentPages}
            setCurrentPages={setCurrentPages}
            totalResults={totalResults}
            loading={loading}
          />
        </div>
      </div>
      {openMovieDetail && <MovieDetailsModal />}
      {showEmptyModal && <EmptyModal/>}
    </>
  );
}
