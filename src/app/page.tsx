import FramerWrapper from "@/components/animation/FramerWrapper";
import DownloadResumeBtn from "@/components/DownloadResumeBtn";
import HeroText from "@/components/HeroText";
import KeyBoard3D from "@/components/Keyboard3D";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <FramerWrapper
        className="flex flex-col justify-start gap-4"
        y={0}
        x={-100}
      >
        <HeroText />
        <div className="h-fit w-full p-4 flex gap-4">
          <SocialLinks />
        </div>
        <DownloadResumeBtn />
      </FramerWrapper>

      <FramerWrapper
        className="h-full w-[47%] relative block max-lg:hidden"
        y={0}
        x={100}
      >
        <KeyBoard3D />
      </FramerWrapper>
    </>
  );
}
