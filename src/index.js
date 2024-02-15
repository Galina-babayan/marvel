import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import MarvelService from './services/MarvelService'
import './style/style.scss';


// const marvelAll = new MarvelService();
// marvelAll.getAllCharacters().then(res => console.log(res));

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );


