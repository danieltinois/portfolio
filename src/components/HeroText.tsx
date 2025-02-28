import React from "react";
import TextRotator from "./TextRotator";

const HeroText = () => {
  return (
    <>
      <h3 className="font-poppins text-2xl max-sm:text-1xl">Meu Nome é</h3>
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl">
        Daniel <br /> Tinois .
      </h1>
      <TextRotator />
    </>
  );
};

export default HeroText;
