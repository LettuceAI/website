import { Player } from "@remotion/player";
import { ChatDemoComposition } from "./ChatDemoComposition";

/**
 * Embedded Remotion Player showing a live animated chat demo
 * using the actual app's UI components.
 */
export function ProductDemo() {
    return (
        <div className="rounded-xl border border-white/[0.07] bg-[#050505] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <Player
                component={ChatDemoComposition}
                compositionWidth={730}
                compositionHeight={610}
                durationInFrames={450}
                fps={30}
                loop
                autoPlay
                style={{
                    width: "100%",
                    aspectRatio: "760 / 640",
                    borderRadius: "inherit",
                }}
                controls={false}
                clickToPlay={false}
            />
        </div>
    );
}
