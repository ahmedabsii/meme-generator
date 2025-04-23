import { useState, useEffect } from "react";

const Main = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  function handleText(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
  function changeMemeImg() {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const newImg = allMemes[randomNum].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: newImg,
    }));
  }

  return (
    <main className="main">
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="Top text"
            name="topText"
            onChange={handleText}
            value={meme.topText}
          />
        </label>
        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            onChange={handleText}
            value={meme.bottomText}
          />
        </label>
        <button onClick={changeMemeImg}>Get a new meme image🖼️</button>
      </div>

      <div className="meme">
        <img src={meme.imageUrl} alt="Meme" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
};

export default Main;
