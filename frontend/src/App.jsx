// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/blog/text")
      .then((response) => response.json())
      .then((result) => {
        // alert(`Hello ${result.hello}!`)
        alert(result);
      });
  }, []);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       alert(`Hello ${result.hello}!`);
  //       // alert(result);
  //     });
  // }, []);

  return (
    <>
      <div>
        <h1>Bärnstensdokumentär</h1>
      </div>
    </>
  );
}

export default App;
