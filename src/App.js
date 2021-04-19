import logo from './logo.svg';
import './resources/css/App.css';
import MyEditor from "./components/editor/MyEditor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <img src={logo} className="App-logo" alt="logo" />
          Edit below and download PDF.
        </p>
      </header>
      <div className='body'>
        <MyEditor/>
      </div>
    </div>
  );
}

export default App;
