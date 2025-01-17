import ButtonWithStyles from "./Button";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="bg-customWhite flex justify-between items-center pb-2 px-8">
        <div className="flex items-center">
          <span className="text-[12px] text-customgray font-Inter">
            Created by
            <a
              href="https://ilyas-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonWithStyles text={"Ilyas Torun"} className="" />
            </a>
          </span>
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
