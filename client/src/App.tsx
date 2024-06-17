import "./App.css";
import getGoogleOauthUrl from "./utils/getGoogleUrl";

function App() {
  return (
    <>
      <a href={getGoogleOauthUrl()}>Login with google</a>
    </>
  );
}

export default App;
