import Button from "../components/Button"

export default function LandingPage() {
    return (
        <div className="flex items-center justify-center flex-col gap-[40px]">
            <span className="font-Magtis text-center text-7xl text-gray">"plak"</span>
            <span className="text-center text-lg tracking-[.063] font-Inter">
                A place to rediscover rare, forgotten and timeless <br/>
                songs. Nostalgic vibes - lose yourself to music.
            </span>
            <Button />
        </div>
    )
}