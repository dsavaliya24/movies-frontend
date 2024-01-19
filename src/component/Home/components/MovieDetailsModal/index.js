import React, { useEffect } from "react";
import "./MovieDetailsModal.scss";
import CloseIcon from "../../../../assets/icons/close-circle.svg";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, getSimilarMovie, setMovieList } from "../../../Home/redux/reducer";
import { IMAGE_URL } from "../../../../config";
import moment from "moment";
import SimilarMovie from "../SimilarMovies";
import editIcon from '../../../../assets/icons/edit-icon.svg'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function MovieDetailsModal() {
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.movies.movieId);
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const similarMovie = useSelector((state) => state.movies.similarMovie);
  const history = useHistory()
  const handleEdit = ()=>{
    dispatch(setMovieList({ movieId: "", openMovieDetail: false, movieDetails: {} }))
              history.push(`/edit-movie/${movieId?._id}`) 
  }
  return (
    <div className="movie-details-modal-alignment">
      <div className="movie-details-modal-wrapper">
        <div className="movie-details-modal-box-alignment">
          <div className="movie-details-heading-alignment">
            <h4>{movieId?.name}</h4>
            <div style={{
            display:'flex',
            justifyContent:"start",
            alignItems:"center",
            gap:"20px"
          }}>
            <div className="edit-img"><img src={editIcon} alt={'edit'} onClick={()=>handleEdit()}
              /></div>
            <div
              className="movie-details-close-icon"
              onClick={() => dispatch(setMovieList({ movieId: "", openMovieDetail: false, movieDetails: {} }))}
            >
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
            </div>
          </div>
          <div className="movie-details-modal-body-alignment">
            <div className="search-details-movie-details-img-alignment">
              <img src={movieId?.image ?movieId?.image  : MovieBanner} alt="MovieBanner" />
            </div>

            <div className="search-movie-description-details-alignment">
              <h6>{movieId?.name}</h6>
              <p>{movieId?.description}</p>

              <div className="search-movie-sub-details-alignment">
                <div className="sub-details-all-details-alignment">
                  <p>Genre</p>
                  <p>
                    {movieId?.genre?.map((attri, index) => {
                      return `${attri}${index === movieId?.genres?.length - 1 ? "" : ","} `;
                    })}
                  </p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>IMDB Rating</p>
                  <p>{movieId?.imDbRating}</p>
                </div>
                <div className="sub-details-all-details-alignment">
                  <p>IMDB Rating Votes</p>
                  <p>{movieId?.vote_count??'-'}</p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>Release Year</p>
                  <p>{movieId?.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
          {similarMovie?.length > 0 && <SimilarMovie similarMovie={similarMovie} />}
        </div>
      </div>
    </div>
  );
}
