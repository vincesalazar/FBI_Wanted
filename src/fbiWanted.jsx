import { useEffect, useState } from "react";

import "./styles.scss";

import MapWanted from "./components/mapWanted";

import axios from "axios";
import { Logger } from "sass";

export default function FbiWanted() {
  const [wantedData, setWantedData] = useState(null);
  const [wantedPage, setWantedPage] = useState(1);
  useEffect(() => {
    axios
      .get(`https://api.fbi.gov/wanted/v1/list?page=${wantedPage}`)
      .then((r) => {
        console.log(r);
        setWantedData(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (wantedData == null) {
    return <h1 style={{ textAlign: "center" }}>LOADING</h1>;
  }
  if (wantedData.data.items.length < 1) {
    return (
      <div className="App">
        <h1>
          You've crossed the line this time... seriously, cause there are no
          more bad dudes to show.
        </h1>
        <h5>Page {wantedPage}</h5>
        <InputPage />
        <h1></h1>
        <RandomButton />
        <PageButtons />
      </div>
    );
  }
  return (
    <div className="App">
      <h1>FBI Most Wanted</h1>
      <h5>Page {wantedPage}</h5>
      <InputPage />
      <h1></h1>
      <RandomButton />
      <PageButtons />
      <MapWanted items={wantedData.data.items} />
      <h5>Page {wantedPage}</h5>
      <PageButtons />
      <InputPage />
      <h1></h1>
      <RandomButton />
    </div>
  );
  function PageButtons() {
    if (wantedPage === 1) {
      return (
        <div>
          <button onClick={nextPage}>Next Page</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={prevPage}>Previous Page</button>
          <button onClick={nextPage}>Next Page</button>
        </div>
      );
    }
  }
  function RandomButton() {
    return (
      <>
        <button onClick={randomPage}>Random Page</button>
      </>
    );
  }
  function InputPage() {
    function onKey(e) {
      let v = e.target.value;
      if (e.key == "Enter") {
        setWantedData(null);
        axios
          .get(`https://api.fbi.gov/wanted/v1/list?page=${v}`)
          .then((r) => {
            console.log(r);
            setWantedData(r);
          })
          .catch((error) => {
            console.log(error);
          });
        setWantedPage(v);
      }
    }
    return (
      <>
        <input type="number" onKeyDown={onKey} />
      </>
    );
  }

  function nextPage() {
    setWantedData(null);
    axios
      .get(`https://api.fbi.gov/wanted/v1/list?page=${wantedPage} + 1}`)
      .then((r) => {
        console.log(r);
        setWantedData(r);
      })
      .catch((error) => {
        console.log(error);
      });
    setWantedPage(wantedPage + 1);
    console.log(wantedPage);
  }
  function prevPage() {
    setWantedData(null);
    axios
      .get(`https://api.fbi.gov/wanted/v1/list?page=${wantedPage} - 1}`)
      .then((r) => {
        console.log(r);
        setWantedData(r);
      })
      .catch((error) => {
        console.log(error);
      });
    setWantedPage(wantedPage - 1);
    console.log(wantedPage);
  }
  function randomPage() {
    let wp = Math.ceil(Math.random() * Number(wantedData.data.total / 19));
    console.log(Math.ceil(Number(wantedData.data.total / 19)));
    setWantedData(null);
    axios
      .get(`https://api.fbi.gov/wanted/v1/list?page=${wp}`)
      .then((r) => {
        console.log(r);
        setWantedData(r);
      })
      .catch((error) => {
        console.log(error);
      });
    setWantedPage(wp);
  }
}
