"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

const KeyBoard3D = () => {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (canvaRef.current) {
        setSize({
          width: 500,
          height: 400,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (!canvaRef.current || size.width === 0 || size.height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvaRef.current,
      alpha: true,
    });

    renderer.setSize(size.width, size.height);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    let model: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    const loader = new GLTFLoader();
    loader.load(
      "/keyboard.gltf",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Ajusta a posição e escala do modelo
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        // Garante que o modelo esteja de frente
        model.rotation.y = Math.PI; // Rotaciona 180° no eixo Y

        // Configuração do AnimationMixer para rodar as animações do modelo
        mixer = new THREE.AnimationMixer(model);
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]); // Usa a primeira animação
          action.play(); // Inicia a animação
        }
      },
      undefined,
      (err) => {
        console.error("Erro ao carregar", err);
      }
    );

    // Adicionando iluminação à cena
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Posicionando a câmera para uma visão de cima e levemente inclinada
    camera.position.set(2, 5, 3); // (x, y, z) - Mais alto e um pouco inclinado
    camera.lookAt(0, 0, 0); // Faz a câmera olhar para o teclado

    const clock = new THREE.Clock();

    // Animação para girar o modelo lentamente
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (model) {
        model.rotation.y += 0.005; // Rotação lenta no eixo Y
      }
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, [size]);

  return (
    <div className="w-full h-full bg-transparent flex justify-center items-center overflow-hidden">
      <canvas ref={canvaRef} />
    </div>
  );
};

export default KeyBoard3D;
