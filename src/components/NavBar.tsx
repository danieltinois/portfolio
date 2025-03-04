"use client";
import { cn } from "@/lib/utils";

import {
  FolderGit2,
  GraduationCap,
  HomeIcon,
  LightbulbIcon,
  Mail,
  User,
} from "lucide-react";

import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/animation/DockAnimation";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const data = [
    {
      title: "Pagina Inicial",
      icon: <HomeIcon className="h-full w-full " />,
      href: "/",
    },
    {
      title: "Sobre Mim",
      icon: <User className="h-full w-full " />,
      href: "/about",
    },
    {
      title: "Skills",
      icon: <LightbulbIcon className="h-full w-full " />,
      href: "/skills",
    },
    {
      title: "Educação",
      icon: <GraduationCap className="h-full w-full " />,
      href: "/education",
    },
    {
      title: "Projetos",
      icon: <FolderGit2 className="h-full w-full " />,
      href: "/projects",
    },

    {
      title: "Contate-me",
      icon: <Mail className="h-full w-full " />,
      href: "/contact",
    },
  ];

  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-5 right-0 left-0 px-0 sm:px-5 m-auto w-full sm:w-fit bg-transparent z-[+9999999] ${
        scrolling ? "hidden" : "block"
      }`}
    >
      <Dock className="items-end pb-3 rounded-full">
        {data.map((item, idx) => (
          <Link href={item.href} key={idx}>
            <DockItem
              className={cn(
                "aspect-square rounded-full bg-gray-200",
                pathname === item.href &&
                  "bg-gray-100 !border !border-primary-sky", // Quando o item estiver ativo, aplica a borda azul
                pathname === item.href ? "border-2 border-blue-500" : "" // Borda azul ativa
              )}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon
                className={cn(pathname === item.href && "text-[#2f7df4]")}
              >
                {item.icon}
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
};

export default Navbar;
