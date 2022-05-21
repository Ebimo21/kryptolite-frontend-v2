import React from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import Section from "../Layouts/Section";
import highlighText from "../Tools/highlightText";

export default function ReachUsSection() {
  return (
    <Section className="text-center" padding={true}>
      <h2 className="md:text-center">{highlighText("Reach us")} from here</h2>
      <p>
        If you have any question, feel free to drop us a message, we will get
        back to you as soon as we can
      </p>
      <div
        className="flex flex-col md:flex-row justify-center items-stretch max-w-xs md:max-w-2xl mx-auto
        gap-5 my-10 flex-wrap"
      >
        <div
          className="bg-white border-2 border-transparent hover:border-primary-500 p-10
        flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
        hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
        >
          <RiMailSendLine className="h-10 w-10" />
          <p>admin@kryptolite.rocks</p>
        </div>
        <div
          className="bg-white border-2 border-transparent hover:border-primary-500 p-10
        flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
        hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
        >
          <BsQuestionSquare className="h-10 w-10" />
          <p>info@kryptolite.rocks</p>
        </div>
        <div
          className="bg-white border-2 border-transparent hover:border-primary-500 p-10
        flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
        hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
        >
          <SiGmail className="h-10 w-10" />
          <p>kryptoliteswap@gmail.com</p>
        </div>
      </div>
    </Section>
  );
}
