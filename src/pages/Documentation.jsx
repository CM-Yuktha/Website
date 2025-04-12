// Documentation.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "../App.css"; // Assuming this has your styles
import { Link } from "react-router-dom";

const Documentation = () => {
  const mountRef = useRef(null);

  const navItems = [
    { name: "Bio Plastic", path: "/documentation/bioplastic" },
    { name: "Sodium Alginate", path: "/documentation/sodiumalginate" },
    { name: "Calcium Chloride", path: "/documentation/calciumchloride" },
    { name: "Glycerine", path: "/documentation/glycerine" },
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

  return (
    <>
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
      <div
        style={{
          position: "relative",
          zIndex: 10,
          color: "white",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>Documentation</h1>

        <div className="glow-menu">
          {navItems.map((item, index) => (
            <div key={index} className="glow-menu-item" style={{ margin: "10px"}}>
              <div className="glow-border">
                <Link to={item.path}>
                  <span className="glow-content">{item.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Documentation;
