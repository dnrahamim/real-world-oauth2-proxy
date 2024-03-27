import { useCallback, useState, useEffect } from "react";
import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import MainComponent from "./MainComponent";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState({});

  const getAndSetUserInfo = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    const axiosResp = await axios.get("/oauth2/userinfo");
    setUserInfo(axiosResp.data);
  }, [])

  useEffect(() => {
    getAndSetUserInfo();
  }, [getAndSetUserInfo]);

  return (
    <Router>
      <Fragment>
        <div>
          <div>Dorian Rahamim can edit this volume on the fly.</div>
          <div>This is a multicontainer application.</div>
        </div>
        <header className="header" style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}>
          <span>
            <Link to="/" className="home">Home</Link>
            <Link to="/otherpage">Other page</Link>
          </span>
          <span>
            <a href="/oauth2/sign_out">Log Out</a>
          </span>
        </header>
        <div>
          <p>User Info:</p>
          <div><pre>{JSON.stringify(userInfo, null, 2) }</pre></div>
        </div>
        <div className="main">
          <Route exact path="/" component={MainComponent} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
