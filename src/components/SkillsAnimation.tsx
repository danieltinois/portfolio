"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const SkillsAnimation = () => {
  const matterBoxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref para o canvas
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 500,
    height: 400,
  });

  useEffect(() => {
    // Atualizando as dimensões do canvas com base no tamanho da janela
    const updateCanvasDimensions = () => {
      const width = window.innerWidth * 0.75; // 90% da largura da tela
      const height = window.innerHeight * 0.4; // 60% da altura da tela
      setCanvasDimensions({ width, height });
    };

    updateCanvasDimensions(); // Inicializar as dimensões ao carregar
    window.addEventListener("resize", updateCanvasDimensions); // Atualizar as dimensões ao redimensionar a tela

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions); // Limpar o listener quando o componente for desmontado
    };
  }, []);

  useEffect(() => {
    if (!matterBoxRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse;

    const engine = Engine.create();
    engineRef.current = engine;

    // Gravidade zero para simular espaço
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const matterBox = matterBoxRef.current;
    const width = canvasDimensions.width;
    const height = canvasDimensions.height;

    const render = Render.create({
      element: matterBox,
      engine: engine,
      canvas: canvasRef.current, // Usando o canvas existente
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Criando paredes invisíveis para manter os objetos na tela
    const createBoundaries = () => {
      const thickness = 10;
      const ground = Bodies.rectangle(
        width / 2,
        height + thickness / 2,
        width,
        thickness,
        { isStatic: true, render: { visible: false } }
      );
      const leftWall = Bodies.rectangle(
        -thickness / 2,
        height / 2,
        thickness,
        height,
        { isStatic: true, render: { visible: false } }
      );
      const rightWall = Bodies.rectangle(
        width + thickness / 2,
        height / 2,
        thickness,
        height,
        { isStatic: true, render: { visible: false } }
      );
      const topWall = Bodies.rectangle(
        width / 2,
        -thickness / 2,
        width,
        thickness,
        { isStatic: true, render: { visible: false } }
      );

      Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);
    };

    createBoundaries();

    // Lista de imagens das skills
    const skillImages = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    ];

    // Criando os blocos das skills com imagens
    const createSkills = () => {
      const skillsBodies = [];

      for (let i = 0; i < skillImages.length; i++) {
        const x = Math.random() * (width - 100) + 50;
        const y = Math.random() * (height - 100) + 50;
        const size = 50;

        const body = Bodies.rectangle(x, y, size, size, {
          restitution: 0.5, // Diminui o efeito de quique para que não batam tão forte
          friction: 0, // Sem atrito
          frictionAir: 0.02, // Pequena resistência ao ar para desacelerar com o tempo
          density: 0.002,
          render: {
            sprite: {
              texture: skillImages[i],
              xScale: 0.5,
              yScale: 0.5,
            },
          },
        });

        // Definir velocidade inicial reduzida
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 1.5, // Movendo mais devagar
          y: (Math.random() - 0.5) * 1.5,
        });

        skillsBodies.push(body);
      }

      Composite.add(engine.world, skillsBodies);
    };

    createSkills();

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Ajustar a câmera para garantir que os objetos apareçam
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });

    // Adicionando Mouse Interativo
    setTimeout(() => {
      if (!render.canvas) return;
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;
    }, 100);

    return () => {
      if (renderRef.current) Render.stop(renderRef.current);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Composite.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [canvasDimensions]);

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div ref={matterBoxRef} className="relative bg-transparent w-full">
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          style={{ background: "transparent" }}
        ></canvas>
      </div>
    </div>
  );
};

export default SkillsAnimation;
