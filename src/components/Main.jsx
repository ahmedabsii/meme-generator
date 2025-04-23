import { useState, useEffect, useRef } from "react";
import html2cavas from "html2canvas";
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

  const memeRef = useRef();
  async function saveMeme() {
    const canvas = await html2cavas(memeRef.current, {
      useCORS: true,
      allowTaint: true,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "meme.png"
    link.click();
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
        <button onClick={saveMeme}>Save Meme 💾</button>
      </div>

      <div className="meme" ref={memeRef}>
        <img src={meme.imageUrl} alt="Meme" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
};

export default Main;
