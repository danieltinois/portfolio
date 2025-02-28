import { Linkedin } from "lucide-react";
import React from "react";
import FramerWrapper from "./animation/FramerWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const SocialLinks = () => {
  const links = [
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/danieltinois/",
      icon: <Linkedin />,
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
