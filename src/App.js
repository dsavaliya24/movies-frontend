import "./App.css";
import Routes from "./routes";
import "./styles/mixins/global.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const openMovieDetail = useSelector((state) => state.movies.openMovieDetail);
  useEffect(() => {
    if (openMovieDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMovieDetail]);
  return (
    <>
    <Toaster containerStyle={{
            zIndex: "99999999999999"
          }} position="top-center" reverseOrder={false} />
      <Routes />
    </>
  );
}

export default App;
