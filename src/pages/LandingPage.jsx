import ButtonWithStyles from "../components/Button";
import { Link } from "react-router";
import { MdArrowRightAlt } from "react-icons/md";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-customWhite px-4">
      <div className="flex items-center justify-center flex-col gap-8 md:gap-10">
        <span className="font-Magtis text-center font-extrabold text-customgray text-4xl md:text-7xl leading-tight">
          "plak"
        </span>
        <span className="text-center text-sm md:text-base tracking-wide font-Inter text-customgray leading-relaxed">
          A place to rediscover rare, forgotten and timeless <br className="hidden md:block" />
          songs. Nostalgic vibes - lose yourself to music.
        </span>
        <Link to="/albums" className="flex items-center gap-2">
          <ButtonWithStyles text="EXPLORE NOW!" Icon={MdArrowRightAlt} />
        </Link>
      </div>
    </div>
  );
}