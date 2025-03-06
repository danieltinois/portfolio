import FramerWrapper from '@/components/animation/FramerWrapper';
import Heading from '@/components/Heading';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

const Education = () => {
  return (
    <div className="relative flex flex-col items-start gap-5 overflow-hidden">
      {/* Seção de Educação */}
      <FramerWrapper y={15} duration={0.4} delay={0.25}>
        <div className="flex flex-col gap-3">
          <Badge
            variant="secondary"
            className="gap-1.5 py-1 text-sm sm:text-base"
          >
            <Briefcase className="h-4 w-4" />
            Educação
          </Badge>
          <Heading>📚 Minha Educação</Heading>
        </div>
      </FramerWrapper>

      <div className="w-full h-fit flex flex-col">
        <div className="w-full h-fit flex">
          {/* Data da Educação */}
          <FramerWrapper
            y={0}
            x={-100}
            delay={0.35}
            duration={0.6}
            className="w-1/4 font-rubik flex items-center justify-evenly text-lg max-sm:text-base"
          >
            🗓️ Janeiro 2024 - 2027
          </FramerWrapper>

          {/* Detalhes do Curso */}
          <FramerWrapper
            y={0}
            x={100}
            delay={0.35}
            duration={0.6}
            className="relative w-3/4 border-l-4 border-l-[#3c3c3c] p-4 gap-3 education_point"
          >
            <div className="text-2xl font-rubik max-sm:text-xl">
              🏫 Bacharelado em Engenharia de Software, <br /> FIAP - São Paulo
            </div>
            <p className="font-poppins text-base w-full text-primary max-sm:text-xs">
              Atualmente estou cursando o Bacharelado em Engenharia de Software
              na FIAP, uma das instituições mais renomadas do Brasil na área de
              tecnologia. 💻🚀 O curso proporciona uma base sólida tanto em
              fundamentos teóricos quanto em aplicações práticas do
              desenvolvimento de software, preparando-me para atuar no mercado
              de tecnologia com excelência. 🔥
            </p>
          </FramerWrapper>
        </div>
      </div>

      {/* Seção de Cursos */}
      <FramerWrapper y={15} duration={0.4} delay={0.4}>
        <div className="flex flex-col gap-3 mt-10">
          <Heading>📜 Cursos & Especializações</Heading>
        </div>
      </FramerWrapper>

      <div className="w-full h-fit flex flex-col">
        {/* Rocketseat */}
        <div className="w-full h-fit flex">
          <FramerWrapper
            y={0}
            x={-100}
            delay={0.45}
            duration={0.6}
            className="w-1/4 font-rubik flex items-center justify-evenly text-lg max-sm:text-base"
          >
            🗓️ Junho 2023 - Fevereiro 2024
          </FramerWrapper>

          <FramerWrapper
            y={0}
            x={100}
            delay={0.45}
            duration={0.6}
            className="relative w-3/4 border-l-4 border-l-[#3c3c3c] p-4 gap-3 education_point"
          >
            <div className="text-2xl font-rubik max-sm:text-xl">
              🚀 Trilha Explorer, <br /> Rocketseat
            </div>
            <p className="font-poppins text-base w-full text-primary max-sm:text-xs">
              Participei da Trilha Explorer da Rocketseat, um programa completo
              que aborda desde os fundamentos da programação até conceitos
              avançados do desenvolvimento web. A metodologia imersiva e baseada
              em projetos proporcionou uma excelente experiência prática. 💡🔥
            </p>
          </FramerWrapper>
        </div>

        {/* Cod3r */}
        <div className="w-full h-fit flex mt-6">
          <FramerWrapper
            y={0}
            x={-100}
            delay={0.55}
            duration={0.6}
            className="w-1/4 font-rubik flex items-center justify-evenly text-lg max-sm:text-base"
          >
            🗓️ Julho 2022 - Outubro 2022
          </FramerWrapper>

          <FramerWrapper
            y={0}
            x={100}
            delay={0.55}
            duration={0.6}
            className="relative w-3/4 border-l-4 border-l-[#3c3c3c] p-4 gap-3 education_point"
          >
            <div className="text-2xl font-rubik max-sm:text-xl">
              📌 Desenvolvimento Web Completo, <br /> Cod3r
            </div>
            <p className="font-poppins text-base w-full text-primary max-sm:text-xs">
              Realizei um curso completo de desenvolvimento web na Cod3r,
              cobrindo tecnologias como JavaScript, TypeScript, React, Next.js,
              Vue, Angular, Node.js, MySQL, entre outras. O aprendizado incluiu
              tanto teoria quanto a criação de projetos práticos, reforçando
              minha experiência no desenvolvimento de aplicações modernas. 💻🔧
            </p>
          </FramerWrapper>
        </div>
      </div>
    </div>
  );
};

export default Education;
