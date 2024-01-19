import { useEffect, useState } from "react";
import { getToken } from ".";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoutes = (props) => {
  const history = useHistory();
  const [isUserLoggedIn, setUserLoggedIn] = useState();

  function checkUserLogin() {
    let token = getToken();
    if (token !== undefined) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
      history.push('/login');
    }
  }
  useEffect(() => {
    checkUserLogin();
  }, []);
  return isUserLoggedIn ? props.children : null;
};

export default ProtectedRoutes;