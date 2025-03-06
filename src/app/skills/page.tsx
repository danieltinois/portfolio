import FramerWrapper from '@/components/animation/FramerWrapper';
import Heading from '@/components/Heading';
import SkillsAnimation from '@/components/SkillsAnimation';
import { Badge } from '@/components/ui/badge';
import { LightbulbIcon } from 'lucide-react';
import React from 'react';

const Skills = () => {
  return (
    <div className="relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1 text-sm sm:text-base">
        <LightbulbIcon className="w-4 h-4" />
        Minhas Skills
      </Badge>

      <div className="flex flex-col gap-3 w-full">
        <Heading>Minha Experiência/Skills Técnicas 🖥️</Heading>

        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-xl sm:text-lg md:text-xl w-full text-primary leading-relaxed">
            Estou no início da minha jornada, mas possuo uma compreensão sólida
            de HTML5, CSS3, JS, TS e React, incluindo princípios de design
            responsivo. Meu foco está na construção de aplicações web e sites
            utilizando JavaScript, TypeScript, React, Nextjs e Node. 🚀
          </p>
        </FramerWrapper>

        <FramerWrapper y={100} delay={0.3} className="block w-full">
          <h1 className="gap-2 text-2xl font-poppins text-primary font-semibold flex text_underline relative max-sm:text-xl mb-4">
            Linguagens de Programação 👨‍💻
          </h1>
          <SkillsAnimation />
        </FramerWrapper>
      </div>
    </div>
  );
};

export default Skills;
