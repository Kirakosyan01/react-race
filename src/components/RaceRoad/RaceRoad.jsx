import React, { useRef, useState } from "react";
import "./RaceRoad.css";
import RedCar from "../../animations/RetroCarRed .json";
import BlueCar from "../../animations/RetroCarBlue.json";
import Lottie from "lottie-react";

export default function RaceRoad() {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const blueCarRef = useRef(null);
  const redCarRef = useRef(null);

  const handleAnimationSubmit = (e) => {
    e.preventDefault();
    const [redCarSpeed, blueCarSpeed] = e.target;
    let redCarTime = (1500 / redCarSpeed.value) * 1000;
    let blueCarTime = (1500 / blueCarSpeed.value) * 1000;

    redCarRef.current.style.animationDuration = `${redCarTime / 1000}s`;
    blueCarRef.current.style.animationDuration =  `${blueCarTime / 1000}s`;
    const slowestCarTime = Math.max(redCarTime, blueCarTime);
    
    setIsAnimationActive(true);
    setTimeout(() => {
      setIsAnimationActive(false);
    }, slowestCarTime)
    e.target.reset();
  }
  
  const handleRandomStart = () => {
    const redCarSpeed = Math.floor(Math.random() * 200 + 80);
    const blueCarSpeed = Math.floor(Math.random() * 200 + 80);
    console.log(redCarSpeed);
    

    let redCarTime = (1500 / redCarSpeed) * 1000;
    let blueCarTime = (1500 / blueCarSpeed) * 1000;

    redCarRef.current.style.animationDuration = `${redCarTime / 1000}s`;
    blueCarRef.current.style.animationDuration = `${blueCarTime / 1000}s`;

    const slowestCarTime = Math.floor(Math.max(redCarTime, blueCarTime));
    console.log(slowestCarTime);
    

    setIsAnimationActive(true);
    setTimeout(() => {
      setIsAnimationActive(false);
    }, slowestCarTime);
  };

  const handleAnimationStop = () => {
    setIsAnimationActive(false);
  }

  return (
    <div className="RaceRoad">
      <div
       className={`RedRaceCar ${isAnimationActive ? "animate-blue" : ""}`}
       ref={redCarRef}
      >
        <Lottie animationData={RedCar}/>
      </div>
      <div
         className={`BlueRaceCar ${isAnimationActive ? "animate-red" : ""}`}
         ref={blueCarRef}
      >
        <Lottie animationData={BlueCar}/>
      </div>
      <div>
      <button className="StopRace" onClick={handleAnimationStop}>Stop race</button>
      </div>
      <div>
        <form onSubmit={handleAnimationSubmit}>
        <input className="RaceInput" type="number" placeholder="Red car speed" required/>
        <input className="RaceInput" type="number" placeholder="Blue car speed" required/>
        <button type="submit" className="RaceStart">Start</button>
        <button type="button" className="RandomStart" onClick={handleRandomStart}>Random</button>
        </form>
      </div>
    </div>
  );
}

