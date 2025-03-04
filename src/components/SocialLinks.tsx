import { Github, Linkedin, RedoDotIcon } from "lucide-react";
import React from "react";
import FramerWrapper from "./animation/FramerWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { PiRedditLogo } from "react-icons/pi";

const SocialLinks = () => {
  const links = [
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/danieltinois/",
      icon: <Linkedin />,
    },
    {
      name: "GitHub",
      link: "https:/github.com/danieltinois/",
      icon: <Github />,
    },
    {
      name: "Reddit",
      link: "https://www.reddit.com/user/Driko0/",
      icon: <PiRedditLogo size={30} />,
    },
  ];
  return (
    <>
      {links.map((item, index) => {
        const timing = 0.55 + index * 0.125;

        return (
          <FramerWrapper key={index} delay={timing} y={50}>
            <Link
              target="blank"
              href={item.link}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" })
              )}
            >
              {item.icon}
            </Link>
          </FramerWrapper>
        );
      })}
    </>
  );
};

export default SocialLinks;
