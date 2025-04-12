"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ContainerScroll } from "./ui/container-scroll-animation.tsx";
import "../App.css"; // or whatever your filename is
import { Link } from "react-router-dom";

window.THREE = THREE;

const Home = () => {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const navItems = [
    { name: "Documentation", path: "/documentation" },
    { name: "Procedure", path: "/procedure" },
    { name: "About Us", path: "/about" },
    { name: "Teams", path: "/teams" },
  ];

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const imagePaths = Array.from({ length: 20 }, (_, i) => `/${i + 1}.png`);
    const spriteTextures = imagePaths.map((path) => textureLoader.load(path));

    const count = 30;
    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);
    spriteGroup.position.set(0, 2, 0);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteTextures[i % spriteTextures.length],
        transparent: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x * 5, y * 5, z * 6);
      sprite.scale.set(0.8, 0.8, 0.8);
      spriteGroup.add(sprite);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spriteGroup.children);

      spriteGroup.children.forEach((sprite) => {
        gsap.to(sprite.scale, {
          x: 0.6,
          y: 0.6,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        gsap.to(hovered.scale, {
          x: 0.9,
          y: 0.9,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      spriteGroup.rotation.y += 0.002;
      spriteGroup.rotation.x += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };
  return (
    <>
      {/* Global scroll setup */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: auto;
          height: 100%;
          scroll-behavior: smooth;
          font-family: sans-serif;
        }
      `}</style>

      <div style={{ position: "relative", minHeight: "100vh" }}>
        {/* Fixed 3D Background */}
        <div
          ref={mountRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Scrollable Content */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Nav Bar */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              padding: "1rem 2rem",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              zIndex: 100,
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            🌌 The Peel Revolution
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>

          {/* Menu */}
          {menuOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "white",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.5rem",
                zIndex: 1000,
              }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "2rem",
                  background: "none",
                  border: "none",
                  fontSize: "2rem",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              {navItems.map((item, index) => (
                <div key={index} className="glow-menu-item">
                  <div className="glow-border">
                    <Link to={item.path}>
                      <span className="glow-content">{item.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hero Section */}
          <section
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              padding: "2rem",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              We Don't See Waste — <br /> We See Wonder Waiting to Happen.
            </h1>
            <p
              style={{ fontSize: "1.2rem", color: "rgba(255, 255, 255, 0.8)" }}
            >
              The Future Is Made from the Forgotten. So Don't Bin It — Begin
              Again
              <br />
              Making Earth clean, green, and renewable.
            </p>
          </section>

          {/* Video Section */}
          <section
            id="video-section"
            style={{ height: "100vh", position: "relative" }}
          >
            <ContainerScroll
              titleComponent={
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    By Unleashing the Power of
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        const videoSection =
                          document.getElementById("video-section");
                        if (videoSection) {
                          videoSection.scrollIntoView({ behavior: "smooth" });
                          setTimeout(() => {
                            if (videoRef.current && videoRef.current.paused) {
                              videoRef.current.play();
                              setVideoPlaying(true);
                            }
                          }, 800);
                        }
                      }}
                      className="glow-button"
                      style={{
                        position: "relative",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "999px",
                        backgroundColor: "#111",
                        color: "#fff",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        zIndex: 1,
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        The Peel Revolution
                      </span>
                    </button>
                  </div>

                  <style>
                    {`
    .glow-button::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: conic-gradient(
        from 0deg,
        #fbbf24,
        #f97316,
        #ef4444,
        #fbbf24
      );
      border-radius: 999px;
      z-index: -1;
      animation: rotateGlow 3s linear infinite;
      filter: blur(4px);
    }

    @keyframes rotateGlow {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
                  </style>
                </div>
              }
            >
              <div
                style={{
                  position: "relative",
                  width: "80%",
                  maxWidth: "800px",
                  margin: "0 auto",
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay={false}
                  playsInline
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  onClick={handleVideoClick}
                >
                  <source src="/v1.mp4" type="video/mp4" />
                </video>
                {!videoPlaying && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "3rem",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={handleVideoClick}
                  >
                    ▶️
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <Link
                    to="/procedure"
                    className="glow-button"
                    style={{
                      position: "relative",
                      padding: "1rem 2rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      borderRadius: "999px",
                      backgroundColor: "#111",
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      zIndex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Procedure Here</span>
                  </Link>
                </div>
              </div>
            </ContainerScroll>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
