import React from "react";
import "./similarMovies.scss";
import { IMAGE_URL } from "../../../../config";
import MovieBanner2 from "../../../../assets/img/no-image.png";
import RightArrow from "../../../../assets/icons/arrow-right.svg";
import LeftArrow from "../../../../assets/icons/arrow-left.svg";
import Slider from "react-slick";
import { setMovieList } from "../../redux/reducer";
import { useDispatch } from "react-redux";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="slider-next-arrow" onClick={onClick}>
      <img src={RightArrow} alt="RightArrow" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="slider-prev-arrow" onClick={onClick}>
      <img src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}

export default function SimilarMovie(props) {
  const { similarMovie } = props;
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleOpenDetail = (id) => {
    dispatch(setMovieList({ movieId: id, openMovieDetail: true }));
  };
  return (
    <>
      <div className="similar-movie-details-all-alignment">
        <h4>Similar Movies</h4>
        <div className="similar-movie-details-alignment">
          <Slider {...settings}>
            {similarMovie?.map((movie) => {
              return (
                <div className="similar-movie-details-slider" onClick={() => handleOpenDetail(movie?.id)}>
                  <div className="similar-slider-movie-details">
                    <div className="similar-movie-img-alignment">
                      <img src={movie?.poster_path ? `${IMAGE_URL}${movie?.poster_path}` : MovieBanner2} alt="MovieBanner2" />
                    </div>
                    <h6>{movie?.title}</h6>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
