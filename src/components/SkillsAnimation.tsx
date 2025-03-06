'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const SkillsAnimation = () => {
  const matterBoxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 500,
    height: 400,
  });

  useEffect(() => {
    const updateCanvasDimensions = () => {
      const width = window.innerWidth * 0.75;
      const height = window.innerHeight * 0.4;
      setCanvasDimensions({ width, height });
    };

    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
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

    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const matterBox = matterBoxRef.current;
    const width = canvasDimensions.width;
    const height = canvasDimensions.height;

    const render = Render.create({
      element: matterBox,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });
    renderRef.current = render;

    const createBoundaries = () => {
      const thickness = 10;
      const ground = Bodies.rectangle(
        width / 2,
        height + thickness / 2,
        width,
        thickness,
        {
          isStatic: true,
          render: { visible: false },
        },
      );
      const leftWall = Bodies.rectangle(
        -thickness / 2,
        height / 2,
        thickness,
        height,
        {
          isStatic: true,
          render: { visible: false },
        },
      );
      const rightWall = Bodies.rectangle(
        width + thickness / 2,
        height / 2,
        thickness,
        height,
        {
          isStatic: true,
          render: { visible: false },
        },
      );
      const topWall = Bodies.rectangle(
        width / 2,
        -thickness / 2,
        width,
        thickness,
        {
          isStatic: true,
          render: { visible: false },
        },
      );

      Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);
    };

    createBoundaries();

    const skillImages = [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    ];

    const createSkills = () => {
      const skillsBodies = [];

      skillImages.forEach((image, index) => {
        setTimeout(() => {
          const x = Math.random() * (width - 100) + 50;
          const y = Math.random() * (height - 100) + 50;
          const size = 50;

          const body = Bodies.rectangle(x, y, size, size, {
            restitution: 0.5,
            friction: 0,
            frictionAir: 0.02,
            density: 0.002,
            render: {
              sprite: {
                texture: image,
                xScale: 0.5,
                yScale: 0.5,
              },
            },
          });

          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.5) * 1.5,
          });

          Composite.add(engine.world, body);
        }, index * 300);
      });
    };

    createSkills();

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });

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
    <div className="flex justify-center items-center overflow-hidden pt-2">
      <div ref={matterBoxRef} className="relative bg-transparent w-full">
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          style={{ background: 'transparent' }}
        ></canvas>
      </div>
    </div>
  );
};

export default SkillsAnimation;
