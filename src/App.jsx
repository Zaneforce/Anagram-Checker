import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const countChars = (str) => {
    let count = 0;
    for(let i = 0; i < str.length; i++){
      if(str[i] !== " "){
        count++;
      }
    }
    return count;
  }

  const charCount1 = countChars(word1);
  const charCount2 = countChars(word2);

  const removeSpace = (str) => {
    let result = "";
    for(let i = 0; i < str.length; i++){
      if(str[i] !== " "){
        result += str[i].toLowerCase();
      }
    }
    return result;
  }

  const bubbleSort = (str) => {
    let chars = [];
    for(let i = 0; i < str.length; i++){
      chars[i] = str[i];
    }

    for(let i = 0; i < chars.length - 1; i++){
      for(let j = 0; j < chars.length - i - 1; j++){
        if(chars[j] > chars[j + 1]){
          let temp = chars[j];
          chars[j] = chars[j + 1];
          chars[j + 1] = temp;
        }
      }
    }

    let result = "";
    for(let i = 0; i < chars.length; i++){
      result += chars[i];
    }
    return result;
  }

  const anagram = (a, b) => {
    const str1 = removeSpace(a);
    const str2 = removeSpace(b);

    if(str1.length !== str2.length){
      return false;
    }
    const sortStr1 = bubbleSort(str1);
    const sortStr2 = bubbleSort(str2);

    return sortStr1 === sortStr2;
  }

  const checkSymbol = (str) => {
    for(let i = 0; i < str.length; i++){
      const char  = str[i];
      const code = char.charCodeAt(0);

      const isUppercase = code >= 65 && code <= 90;
      const isLowercase = code >= 97 && code <= 122;
      const isSpace = char === " ";

      if(!isUppercase && !isLowercase && !isSpace){
        return false;
      }
    }
    return true;
  }

  const validate = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setCheck(true);

    if(!word1.trim() || !word2.trim()){
      setError("Masukkan Kedua Kata!");
      setCheck(false);
      return;
    }

    if(!checkSymbol(word1) || !checkSymbol(word2)){
      setError("Hanya boleh Huruf dan Spasi!");
      setCheck(false);
      return;
    }

    setTimeout(() => {
      const resultAnagram = anagram(word1, word2);
      setResult(resultAnagram);
      setCheck(false);
    }, 500);
  }

  const inputChange = (setter) => (e) => {
    setter(e.target.value);

    if(result !== null){
      setResult(null);
    }
    setError("");
  }

  const reset = () => {
    setWord1("");
    setWord2("");
    setResult(null);
    setError("");
    setCheck(false);
  }

  return(
    <div className="container">
      <div className="card">
        <h1>Anagram Checker</h1>
        <p className='desc'>Cek apakah kedua kata adalah Anagram</p>

        <form onSubmit={validate}>
          <div className="input-group">
            <label>
              Kata 1 {word1 && <span className='char-count'>{charCount1} Huruf</span>}
            </label>
            <input type='text' id='word1' value={word1} onChange={inputChange(setWord1)} placeholder='Contoh : muka' className={word1 ? 'has-value' : ''} />
          </div>

          <div className="input-group">
            <label>
              Kata 2 {word2 && <span className='char-count'>{charCount2} Huruf</span>}
            </label>
            <input type='text' id='word2' value={word2} onChange={inputChange(setWord2)} placeholder='Contoh : kamu' className={word2 ? 'has-value' : ''} />
          </div>

          {word1 && word2 && !result && !error && !check && (
            <div className="comparison-hint">
              <div className="hint-content">
                {charCount1 === charCount2 ? (
                  <span>Panjang Kata sama! Klik "Check" untuk melanjutkan</span>
                ) : (
                  <span>Panjang Kata berbeda! Pastikan kedua kata memiliki jumlah huruf yang sama.</span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="error-message animation-in">{error}</div>
          )}

          {check && (
            <div className="checking-message">
              <span>Memeriksa...</span>
            </div>
          )}

          {result !== null && !check && (
            <div className={`result-message animation-in ${result ? 'anagram' : 'not-anagram'}`}>
              <div className="result-content">
                {result ? (
                  <>
                    <strong>Anagram!</strong>
                    <p>"{word1}" dan "{word2}" adalah anagram.</p>
                    <div className="letter-breakdown">
                      {word1.toLowerCase().split("").sort().join(" ")} = {word2.toLowerCase().split("").sort().join(" ")}
                    </div>
                  </>
                ) : (
                  <>
                    <strong>Bukan Anagram!</strong>
                    <p>"{word1}" dan "{word2}" bukan anagram.</p>
                    <div className="letter-breakdown">
                      {word1.toLowerCase().split("").sort().join(" ")} ≠ {word2.toLowerCase().split("").sort().join(" ")}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="button-group">
            <button type='submit' className='btn btn-primary' disabled={check || !word1 || !word2}>{check ? 'Memeriksa...' : 'Check'}</button>
            <button type='button' onClick={reset} className='btn btn-secondary' disabled={check}>Reset</button>
          </div>

        </form>

        <div className="info-box">
          <h3>Apa itu Anagram?</h3>
          <p>
            Anagram adalah sebuah kata atau frasa yang dibentuk dengan mengubah urutan huruf-huruf dari kata atau frasa lain, 
            sehingga menghasilkan kata atau frasa baru yang memiliki arti yang berbeda.
          </p>

          <div className="examples">
            <strong>Contoh Anagram:</strong>
            <ul>
              <li>"muka" dan "kamu"</li>
              <li>"ibu" dan "ubi"</li>
              <li>"kasur" dan "rusak"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
