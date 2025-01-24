import "./Main.css";
import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [memeArray, setMemeArray] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeArray(data.data.memes));
  }, []);

  function getRandomImage() {
    const randomMemeNumberFromZeroToNinetyNine = Math.floor(Math.random() * (memeArray.length));
    const randomImageUrl = memeArray[randomMemeNumberFromZeroToNinetyNine].url;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        imageUrl: randomImageUrl,
      };
    });
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder={meme.topText}
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder={meme.bottomText}
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getRandomImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
