import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { BsMusicPlayerFill } from "react-icons/bs";
import Lyrics from "./Lyrics";
import Peach from "../assets/emojis/peach.png";
import Money from "../assets/emojis/money.png";
import Music from "../assets/emojis/music.png";
import SoundReactor from "../classes/SoundReactor";
import { addEffect } from "@react-three/fiber";
import * as THREE from "three";

const Song = () => {
  const [isLyricsActive, setLyricsActive] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const [dataTime] = useState({ time: 0 });
  const lyricsRef = useRef(null);
  const barRef1 = useRef(null);
  const barRef2 = useRef(null);
  const barRef3 = useRef(null);
  const barRef4 = useRef(null);
  const barRef5 = useRef(null);
  const barRef6 = useRef(null);
  const barRef7 = useRef(null);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      if (SoundReactor.isInitialized) {
        barRef1.current.style.transform = `scaleY(${
          SoundReactor.fdata[10] / 255 + 0.1
        })`;
        barRef2.current.style.transform = `scaleY(${
          SoundReactor.fdata[20] / 255 + 0.1
        })`;
        barRef3.current.style.transform = `scaleY(${
          SoundReactor.fdata[30] / 255 + 0.1
        })`;
        barRef4.current.style.transform = `scaleY(${
          SoundReactor.fdata[40] / 255 + 0.1
        })`;
        barRef5.current.style.transform = `scaleY(${
          SoundReactor.fdata[50] / 255 + 0.1
        })`;
        barRef6.current.style.transform = `scaleY(${
          SoundReactor.fdata[60] / 255 + 0.1
        })`;
        barRef7.current.style.transform = `scaleY(${
          SoundReactor.fdata[70] / 255 + 0.1
        })`;

        const refHeight = lyricsRef.current.scrollHeight;
        const songDuration = SoundReactor.audio.duration;
        const songTranscurred = SoundReactor.audio.currentTime;
        const percentSongPlayed = songTranscurred / songDuration;
        const animateTo = Math.floor(percentSongPlayed * refHeight);
        const smothedValue = THREE.MathUtils.lerp(
          dataTime.time,
          animateTo,
          0.25
        );
        dataTime.time = animateTo;
        if (!isNaN(songDuration)) {
          lyricsRef.current.scroll(0, smothedValue);
        }
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  const playSongHandler = () => {
    console.log("Play sound clicked");
    if (!SoundReactor.isInitialized) {
      SoundReactor.init();
      SoundReactor.play();
      setInitialized(true);
    } else {
      if (SoundReactor.playFlag) {
        SoundReactor.pause();
      } else {
        SoundReactor.play();
      }
    }
  };

  return (
    <div className="song-container">
      <div className="lyrics-info-container">
        <div className="top-container">
          <div className="title-container">
            <h2>Eladio Carrión Ft. Jon Z, Noriel</h2>
            <h3>Cheque | Sauce Boyz 2</h3>
          </div>
          <div className="sound-bars-container" onClick={playSongHandler}>
            <span ref={barRef1} style={{ transform: "scaleY(0.5)" }}></span>
            <span ref={barRef2} style={{ transform: "scaleY(0.3)" }}></span>
            <span ref={barRef3} style={{ transform: "scaleY(0.7)" }}></span>
            <span ref={barRef4} style={{ transform: "scaleY(0.9)" }}></span>
            <span ref={barRef5} style={{ transform: "scaleY(0.7)" }}></span>
            <span ref={barRef6} style={{ transform: "scaleY(0.3)" }}></span>
            <span ref={barRef7} style={{ transform: "scaleY(0.5)" }}></span>
          </div>
        </div>
      </div>
      <div
        ref={lyricsRef}
        className={`lyrics-container ${isLyricsActive ? "active" : ""}`}
      >
        <div className="content">
          <Lyrics />
        </div>
      </div>
      <div className={`modal-container ${isModalActive ? "active" : ""}`}>
        <div className="link-container">
          <img src={Peach} alt="peach"></img>
          <h4>
            Download Peach Model{" "}
            <a
              href="https://sketchfab.com/3d-models/just-peachy-5c8cd9f1fdb7476d9528bdbc0e7a318c"
              target="_blank"
            >
              Here
            </a>{" "}
          </h4>
        </div>
        <div className="link-container">
          <img src={Money} alt="peach"></img>
          <h4>
            Download Billets Model{" "}
            <a
              href="https://sketchfab.com/3d-models/money-and-money-gun-dc0c21537bb0495f80bb2649c28fc3f6"
              target="_blank"
            >
              Here
            </a>{" "}
          </h4>
        </div>
        <div className="link-container">
          <img src={Music} alt="peach"></img>
          <h4>
            Listen Song{" "}
            <a
              href="https://www.youtube.com/watch?v=pwA9SlxYN4A"
              target="_blank"
            >
              Here
            </a>{" "}
          </h4>
        </div>
      </div>
      <div className="bottom-container">
        <BsMusicPlayerFill
          className={`bottom-icon ${isLyricsActive ? "active" : ""}`}
          size="2.5rem"
          onClick={() => {
            setLyricsActive(!isLyricsActive);
          }}
        />
        <FaInfoCircle
          className="bottom-icon"
          size="2.5rem"
          onClick={() => {
            setModalActive(!isModalActive);
          }}
        />
      </div>
    </div>
  );
};

export default Song;
