import React, { useEffect, useRef, useState } from "react";
import "./landing.css";
import Slideshow from "../../components/slideshow";
import Announcement from "./announcement";
import Biography from "./biography";
import Passions from "./passion";
import FamilyTree from "./familytree";

export default function Landing() {
  const [profileWidth, setProfileWidth] = useState(90);
  const [circleDecorWidth, setCircleDecorWidth] = useState(60);
  const [phase, setPhase] = useState("visible");
  const [vW, setVW] = useState(window.innerWidth);
  const [progress, setProgress] = useState(0);
  const [isWhite, setIsWhite] = useState(false);
  const firstRun = useRef(true);

  const isMin =
    vW <= 1200
      ? profileWidth <= 20.1        // percent mode
      : profileWidth <= 288 + 2;    // 20% of 1200

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // Start transition whenever isMin changes
    setPhase("fadingOut");

    const t1 = setTimeout(() => {
      // after fade out → change side
      setPhase("moved");

      const t2 = setTimeout(() => {
        // fade back in
        setPhase("fadingIn");

        const t3 = setTimeout(() => {
          setPhase("visible");
        }, 300);

        return () => clearTimeout(t3);
      }, 50); // tiny delay after position jump

      return () => clearTimeout(t2);
    }, 300);

    return () => clearTimeout(t1);

  }, [isMin]);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight / 2;
      const vw = window.innerWidth;
      const scrollY = window.scrollY;

      setVW(vw);

      const p = Math.min(Math.max((scrollY / vh), 0), 1);

      setProgress(p);
      if (vw <= 1200) {
        setProfileWidth(90 - p * 70);
      } else {
        const dxOfShrink = (0.7 * vw); //one unit of shrink width
        const dydxOfShrink = (vw - dxOfShrink * p);
        const accWidthProfile = ((90 - p * 70) / 100) * dydxOfShrink; // actual width of profile
        // const percentOfShrink = 100 - (dydxOfShrink * 100 / vw);
        // const startVal = ((90 - 90 * p) / (1 - p));
        // const endVal = (startVal - p * (startVal - 20));
        setProfileWidth(1200 - p * 912 * (Math.min(1200 / accWidthProfile), 1)); // 20% is 288 and 1200 - 288 = 912
        // console.log('dydxofshn:' + dydxOfShrink + ' vw:' + vw
        //   + ' accProfileWidth:' + accWidthProfile
        //   + ' percentOfShrink ' + percentOfShrink
        //   + ' p:' + p
        //   + ' startVal:' + startVal);
      }
      setCircleDecorWidth(60 - p * 46);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll(); // 👈 initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHeader = () => {
      const ids = ["announcement", "biography", "passions", "family-tree"];
      const headerHeight = 60;

      const sections = ids
        .map(id => document.getElementById(id))
        .filter(Boolean); // removes nulls safely

      const isAnyWhite = sections.some(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= headerHeight && rect.bottom > headerHeight;
      });

      setIsWhite(isAnyWhite);
    };


    handleHeader();

    window.addEventListener('scroll', handleHeader);

    return () => window.removeEventListener('scroll', handleHeader);
  }, []);

  return (
    <div className="landing-page pre-container" id="landing-page">
      <div className="profile" id="profile"
      // style={{position: `${ isMin ? "fixed" : "relative" }`}}
      >
        <div
          className={`shrink-for-profile ${isMin ? "to-left" : "to-center"}`}
          style={{
            width: `${(100 - progress * 70)}vw`,
            height: `${(100 - progress * 70)}vh`,
            pointerEvents: isMin ? "none" : "auto" // allow touches to pass through this wrapper when isMin is true
          }}
        >
          {/* Logo and Profile Circle */}
          <div
            className={`profile-circle
          ${phase === "fadingOut" ? "fade-out" : ""}
          ${phase === "fadingIn" ? "fade-in" : ""}`}
            id="profile-circle"
            style={
              vW <= 1200
                ? { width: `${profileWidth}%`, pointerEvents: "auto" } // re-enable for interactive children
                : { width: `${profileWidth}px`, pointerEvents: "auto" }
            }
          >
            <div className="circle-container" id="circle-container">
              <img
                src="/res/circle.png"
                alt="circle-decor"
                className="circle-decor"
                id="circle-decor"
                style={{ width: `${circleDecorWidth}%` }}
              />
            </div>
            <div className="profile-image" id="profile-image"></div>
          </div>
        </div>
        <div
          className={`hero-text ${isMin ? "to-header" : ""}`}
          id="profile-text"
          style={{ pointerEvents: "auto" }}
        >
          <h1> Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
        </div>
        {/* NEW HEADER VERSION */}
        <div className={`header-title ${isMin && !isWhite ? "visible" : ""}`}>
          <p> Lorem Ipsum </p>
        </div>
        <div className={`header-title white ${isMin && isWhite ? "visible" : ""}`}>
          <p className="white" > Lorem Ipsum </p>
        </div>
        {progress < 0.1 && (
          <div className="scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
          </div>
        )}
      </div>
      <div className="landing-page-slideshow">
        {/* Photo Slideshow Section */}
        <Slideshow />
      </div>
      {/* ========================================== ANNOUNCEMENT SECTION - Portrait & Name ========================================== */}
      <Announcement />

      {/* ========================================== BIOGRAPHY SECTION - Life Story ========================================== */}
      <Biography />

      {/* ========================================== PASSIONS SECTION - Life Story ========================================== */}
      <Passions />

      {/* ========================================== Family Tree ========================================== */}
      <FamilyTree />

    </div>
  );
}