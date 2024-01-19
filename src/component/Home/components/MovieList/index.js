import React from "react";
import "./MovieList.scss";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch } from "react-redux";
import { setMovieList } from "../../redux/reducer";
import { IMAGE_URL } from "../../../../config";
import NoSearchData from "../NoSearchData/index";
import { Pagination } from "../../../Common/Pagination";
import Skeleton from "react-loading-skeleton";

export default function MovieList(props) {
  const {
    searchMovies,
    totalResults,
    totalPages,
    currentPages,
    setCurrentPages,
    loading,
    latestMovies,
  } = props;
  const dispatch = useDispatch();
  const handleOpenDetail = (id) => {
    dispatch(setMovieList({ movieId: id, openMovieDetail: true }));
  };
  return (
    <div className="search-page-section">
      <div className="simillar-details-section">
        <div className="container">
          {searchMovies?.length > 0 && (
            <h4>
              Search Results (Showing {latestMovies?.length} out of{" "}
              {totalResults})
            </h4>
          )}

          <div className="simillar-details-alignment">
            {latestMovies?.length > 0 ? (
              loading ? (
                <div className="simillar-details-grid">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map(() => {
                    return <Skeleton duration={1} height={375} width={240} />;
                  })}
                </div>
              ) : (
                <>
                  <div className="simillar-details-grid">
                    {latestMovies?.map((movie, i) => {
                      return (
                        <div
                          className="simillar-details-gridItem"
                          key={i}
                          onClick={() => handleOpenDetail(movie)}
                        >
                          <div className="simillar-movie-details-box-alignment">
                            <img
                              src={movie?.image ? movie?.image : MovieBanner}
                              alt="MovieBanner"
                            />

                            <div className="movie-like-alignment">
                              <p>IMDB Ratings :- {movie?.imDbRating}</p>
                            </div>
                          </div>

                          <div className="movie-name-alignment">
                            <h6>{movie?.name}</h6>
                            <p>
                              {movie?.genre?.map((attri, index) => {
                                return `${attri}${
                                  index === movie?.genre?.length - 1 ? "" : ","
                                } `;
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Pagination
                    pages={totalPages}
                    current={currentPages}
                    onClick={setCurrentPages}
                  />
                </>
              )
            ) : (
              <NoSearchData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
