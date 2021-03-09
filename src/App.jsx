import './Style/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "Stores/Authentication/authMiddleware";
import Cookies from "js-cookie";
import Home from "Pages/Home/home.jsx";
import Login from "Pages/Login/login";
import Register from "Pages/Register/register";
import Profile from "Pages/Profile/profile";
import Navbar from "Components/Layout/Navbar/navbar";
import Footer from "Components/Layout/Footer";
import FlashMessage from "Components/Layout/FlashMessage";
import PrivateRoute from "Components/PrivateRoute";
import PublicRoute from "Components/PublicRoute";
import Course from './Pages/Course/course';

const App = () => {
  const [loadReady, setLoadReady] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const displayFlash = useSelector((state) => state.flash.display);
  const dispatch = useDispatch();

  const autoLogin = async () => {
    const token = Cookies.get("token");
    if (!currentUser && token) {
      dispatch(fetchCurrentUser(token));
    }
    setLoadReady(true);
  };

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <section className="App">
      <Router>
        <Navbar />
        {displayFlash && <FlashMessage />}
        {loadReady && (
          <Switch>
            <PublicRoute
              restricted={false}
              currentUser={currentUser}
              component={Home}
              path="/"
              exact
            />
            <PublicRoute
              restricted={true}
              currentUser={currentUser}
              component={Login}
              path="/login"
              exact
            />
            <PublicRoute
              restricted={true}
              currentUser={currentUser}
              component={Register}
              path="/register"
              exact
            />
            <PrivateRoute
              currentUser={currentUser}
              component={Profile}
              path="/profile"
              exact
            />
            <PrivateRoute
              currentUser={currentUser}
              component={Course}
              path="/courses/:id"
              exact
            />
          </Switch>
        )}
        <Footer />
      </Router>
    </section>
  );
};

export default App;
