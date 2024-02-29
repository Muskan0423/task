import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [toLanguage, setToLanguage] = useState('');
  const [fromLanguage, setFromLanguage] = useState('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios.get('https://libretranslate.de/languages')
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="fromLanguage">From</label>
          <select
            id="fromLanguage"
            className="form-select mb-3"
            value={fromLanguage}
            onChange={e => setFromLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <label htmlFor="toLanguage">To</label>
          <select
            id="toLanguage"
            className="form-select mb-3"
            value={toLanguage}
            onChange={e => setToLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <button className="btn btn-primary">Translate</button>
        </div>
        <div className="col-md-6">
          <h4>Enter text in English</h4>
          <textarea
            className="form-control"
            rows="10"
            cols="20"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          ></textarea>
          <h4>Enter text in {toLanguage}</h4>
          <textarea
            className="form-control"
            rows="10"
            cols="20"
            value={outputText}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
