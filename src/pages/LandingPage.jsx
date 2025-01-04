import ButtonWithStyles from "../components/Button";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-customWhite">
      <div className="flex items-center justify-center flex-col gap-[40px] shrink-0">
        <span className="font-Magtis text-center text-7xl font-extrabold text-customgray">
          "plak"
        </span>
        <span className="text-center text-lg tracking-[.063] font-Inter text-customgray">
          A place to rediscover rare, forgotten and timeless <br />
          songs. Nostalgic vibes - lose yourself to music.
        </span>
        <Link to="/albums">
          <ButtonWithStyles />
        </Link>
      </div>
    </div>
  );
}
