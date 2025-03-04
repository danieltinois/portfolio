import Aboutfooter from "@/components/Aboutfooter";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Circle, Heart, User2 } from "lucide-react";

const About = () => {
  const items = [
    { hobby: "💻 Programar" },
    { hobby: "🎮 Jogar Video Game" },
    { hobby: "📺 Assistir Animes" },
    { hobby: "🏋️ Academia" },
    { hobby: "⚽ Futebol" },
  ];

  return (
    <div className="relative flex flex-col items-start gap-5 overflow-hidden w-full px-6 sm:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1 text-sm sm:text-base">
        <User2 className="h-4 w-4" />
        Sobre Mim
      </Badge>

      <div className="flex flex-col gap-5 w-full">
        <Heading>
          Engenheiro de Software e Web <br className="hidden sm:block" />
          Developer, Morando no Brasil.
        </Heading>

        <FramerWrapper y={0} x={100}>
          <p className="font-poppins text-lg sm:text-xl w-full text-primary leading-relaxed">
            💻{" "}
            <strong>Desenvolvedor Full Stack | Engenheiro de Software</strong>
            🇧🇷 Sou um desenvolvedor apaixonado por tecnologia, sempre buscando
            aprimorar minhas habilidades. 🚀 Especializado em{" "}
            <strong>
              JavaScript, TypeScript, React, Next.js, Node.js, C# e .NET
            </strong>
            , criando aplicações{" "}
            <strong>modernas, responsivas e eficientes</strong>. 🎨 Foco em{" "}
            <strong>interfaces pixel-perfect</strong> e experiências{" "}
            <strong>intuitivas</strong>, unindo <strong>design elegante</strong>{" "}
            e <strong>funcionalidade robusta</strong>. 🔥 Sempre em busca de
            novos desafios e oportunidades para evoluir!
          </p>
        </FramerWrapper>
      </div>

      <FramerWrapper
        className="w-full flex flex-col lg:flex-row justify-between gap-5"
        y={100}
        delay={0.3}
      >
        <Aboutfooter />
      </FramerWrapper>

      <FramerWrapper className="w-full" y={100} delay={0.31}>
        <h1 className="text-2xl sm:text-3xl font-poppins text-primary font-semibold flex items-center gap-2 relative">
          <Heart className="h-7 w-7 sm:h-8 sm:w-8" /> Hobbies
        </h1>

        <div className="w-full flex flex-wrap justify-start gap-4 sm:gap-7 pt-3">
          {items.map((val, indx) => (
            <div
              key={indx}
              className="flex items-center gap-2 text-lg sm:text-xl text-primary"
            >
              <Circle className="h-3 w-3" /> {val.hobby}
            </div>
          ))}
        </div>
      </FramerWrapper>
    </div>
  );
};

export default About;
