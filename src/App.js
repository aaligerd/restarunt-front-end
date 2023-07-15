
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import AppState from './state/AppState';
import AuthState from './state/AuthState';

function App() {
  const {isLoggedIn}=useContext(AppContext)
  return (
    <div className="App">
     {isLoggedIn?<AppState/>:<AuthState/>}
    </div>
  );
}

export default App;
