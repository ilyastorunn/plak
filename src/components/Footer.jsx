import ButtonWithStyles from "./Button";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="bg-customWhite flex justify-between items-center px-8 py-2 fixed bottom-0 left-0 w-full z-50 shadow-md">
        <div className="flex flex-col items-start">
          <span className="text-[0.75rem] text-customgray font-Inter">
            Created by{" "}
          </span>
          <a
            href="https://ilyas-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-customgray hover:text-customorange transition-colors duration-300 font-Magtis text-[1rem] mt-1"
          >
              ilyas torun
            {/* <ButtonWithStyles text={"Ilyas Torun"} /> */}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/ilyastorunn" target="_blank">
            <FaGithub className="w-6 h-6 text-customgray hover:text-customorange transition-colors duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/ilyastorunn/" target="_blank">
            <FaLinkedin className="w-6 h-6 text-customgray hover:text-customorange transition-colors duration-300" />
          </a>
          <a href="">
            <FaInstagram className="w-6 h-6 text-customgray hover:text-customorange transition-colors duration-300" />
          </a>
        </div>
      </div>
    </>
  );
}
