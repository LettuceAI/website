import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function TTSDoc() {
  return (
    <>
    <SEO
      title="Text-to-Speech"
      description="Make characters speak aloud with ElevenLabs, Google Gemini TTS, OpenAI-compatible TTS, Fish, or local Kokoro voices in LettuceAI."
      path="/docs/tts"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Text-to-Speech", path: "/docs/tts" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Text-to-Speech (TTS)</DocHeading>

      <p>
        Text-to-Speech lets the assistant read messages out loud using
        natural-sounding voices. You can choose from multiple providers, create
        custom voices, and assign them to your characters so their replies can
        be spoken automatically or on demand.
      </p>

      <Callout>
        TTS is completely optional. If you don’t enable it, chats remain
        text-only.
      </Callout>

      <DocHeading level={2}>Audio Providers</DocHeading>

      <p>
        Audio providers are services that generate speech audio. You can add and
        manage providers from the TTS settings screen:
      </p>

      <DocImage
        src={images.tts.providers}
        containerClassName="max-w-4xl mx-auto"
        alt="Audio providers UI"
      />

      <p>
        LettuceAI currently supports:
      </p>

      <ul>
        <li>
          <strong>ElevenLabs:</strong> premium neural speech synthesis with
          voice cloning and voice design.
        </li>
        <li>
          <strong>Google Gemini TTS:</strong> neural voice generation with
          natural-sounding personas.
        </li>
        <li>
          <strong>OpenAI-compatible TTS:</strong> works with OpenAI's audio
          endpoint and any compatible third-party server. You supply the model
          ID, base URL, and voice ID.
        </li>
        <li>
          <strong>Fish (cloud):</strong> Fish Audio's hosted voice synthesis.
          It uses an API key and lets you pick from the voice models in your
          Fish account.
        </li>
        <li>
          <strong>Fish (local):</strong> connects to a Fish Speech server you
          run yourself. You point LettuceAI at the server address, and an API
          key is optional depending on how the server is configured.
        </li>
        <li>
          <strong>Kokoro (local):</strong> fully offline TTS that runs on your
          device. Voices, model weights, and the eSpeak NG phonemizer are
          downloaded once and then used without network access.
        </li>
      </ul>

      <p>
        Cloud providers (ElevenLabs, Gemini TTS, OpenAI-compatible, Fish cloud)
        need an API key. Kokoro is local and does not need a key, but it does
        need its assets installed and (on desktop) eSpeak NG available on your
        system. The local Fish option talks to a server you host, so it does not
        send audio to a third party.
      </p>

      <DocHeading level={2}>My Voices</DocHeading>

      <p>
        Voices are reusable presets you create for reading messages aloud. Once
        a provider is added, you can create and manage your voices:
      </p>

      <DocImage
        src={images.tts.myVoices}
        containerClassName="max-w-4xl mx-auto"
        alt="My Voices UI"
      />

      <p>
        A voice includes:
      </p>

      <ul>
        <li>provider + model</li>
        <li>display name</li>
        <li>a description of how the voice should sound</li>
        <li>test text you can preview</li>
      </ul>

      <Callout>
        Custom voices work with ElevenLabs, Gemini TTS, OpenAI-compatible TTS,
        and Kokoro. Each provider exposes the controls that make sense for it.
      </Callout>

      <DocHeading level={2}>Creating a Voice</DocHeading>

      <p>
        Tap <strong>Create Voice</strong> to design your own TTS voice. You can
        describe tone, style, and personality, and preview how it sounds.
      </p>

      <DocImage
        src={images.tts.createVoice}
        containerClassName="max-w-3xl mx-auto"
        alt="Create Voice UI"
      />

      <p>
        Depending on the provider, you can:
      </p>

      <ul>
        <li>clone or style voices (ElevenLabs)</li>
        <li>describe vocal personality (Gemini TTS)</li>
        <li>enter a model ID and voice ID for OpenAI-compatible endpoints</li>
        <li>
          pick or blend installed Kokoro voices in a dedicated editor (Kokoro)
        </li>
      </ul>
      
      <Callout>LettuceAI recognizes and allows the use of Elevenlabs voices created through the Elevenlabs dashboard.</Callout>

      <DocHeading level={2}>Provider Voices</DocHeading>

      <p>
        Some providers also include pre-made voices you can preview and use:
      </p>

      <DocImage
        src={images.tts.providerVoices}
        containerClassName="max-w-4xl mx-auto"
        alt="Provider voices UI"
      />

      <p>
        These are great if you want to get started quickly.
      </p>

      <DocHeading level={2}>Assigning a Voice to a Character</DocHeading>

      <p>
        You can assign a voice to a character so their replies are spoken aloud.
        This can be done:
      </p>

      <ul>
        <li>while creating the character</li>
        <li>later in <strong>Edit Character → Voice</strong></li>
      </ul>

      <DocImage
        src={images.tts.selectVoice}
        containerClassName="max-w-3xl mx-auto"
        alt="Character voice selection UI"
      />

      <p>
        If no voice is assigned, the character remains text-only.
      </p>

      <Callout>
        Voice assignment is optional and per-character. You can mix silent and
        voiced characters in the same chat.
      </Callout>

      <DocHeading level={2}>Playing Voice Audio</DocHeading>

      <p>
        When a character has a voice, you can either play messages manually or
        enable automatic playback.
      </p>

      <DocHeading level={3}>Per-Message Playback</DocHeading>

      <p>
        Each message with TTS support shows a speaker icon. Tap it to play the
        message whenever you like.
      </p>

      <DocImage
        src={images.tts.messagePlayback}
        containerClassName="max-w-md mx-auto"
        alt="Per-message playback button UI"
      />

      <ul>
        <li>replay messages</li>
        <li>listen selectively</li>
      </ul>

      <Callout>
        Manual playback works even when Autoplay is disabled.
      </Callout>

      <DocHeading level={3}>Autoplay Voice</DocHeading>

      <p>
        If you want replies to be spoken automatically, enable{" "}
        <strong>Autoplay voice</strong> in the character settings.
      </p>

      <DocImage
        src={images.tts.autoplayToggle}
        containerClassName="max-w-3xl mx-auto"
        alt="Autoplay toggle UI"
      />

      <ul>
        <li>new replies play automatically</li>
        <li>you can still replay messages anytime</li>
        <li>autoplay is per-character</li>
      </ul>

      <Callout>
        If no voice is assigned, Autoplay has no effect.
      </Callout>

      <DocHeading level={2}>Setting up Kokoro (local voices)</DocHeading>

      <p>
        Kokoro runs entirely on your device, so before you can use it you need
        to download its model once. Setup now happens with a guided menu right
        where you add the provider, so you do not need to hunt for files
        manually.
      </p>

      <ul>
        <li>
          Open <strong>Settings → Providers</strong> and switch to the{" "}
          <strong>Audio</strong> tab, then add or open the{" "}
          <strong>Kokoro (Local)</strong> provider.
        </li>
        <li>
          A setup menu appears where you pick a <strong>model variant</strong>.
          The options trade size for quality: a smaller compressed build, a
          balanced build (recommended for most devices), and a full-size build.
        </li>
        <li>
          You can also tick a <strong>starter pack</strong> to install a small
          set of ready-to-use voices alongside the model, so you have something
          to speak with immediately.
        </li>
        <li>
          Tap download and let the model and any selected voices install. Once
          finished, Kokoro is ready to use offline.
        </li>
      </ul>

      <Callout>
        On desktop, Kokoro also needs the eSpeak NG phonemizer installed on your
        system. On mobile this is bundled for you.
      </Callout>

      <DocHeading level={2}>Kokoro Studio</DocHeading>

      <p>
        Once the model is installed, Kokoro Studio is the management hub for your
        local voices. You reach it from the <strong>Voices</strong> screen by
        opening your Kokoro provider. It handles everything Kokoro needs to run
        offline:
      </p>

      <ul>
        <li>
          <strong>Model variant</strong>: pick the Kokoro model variant you want
          to install. Switching variants triggers a new install for the chosen
          variant and reuses the existing voice library.
        </li>
        <li>
          <strong>Voice catalog</strong>: browse the available voice list,
          filter by all or installed, search by name, and install or uninstall
          voices one at a time or in bulk.
        </li>
        <li>
          <strong>Install queue</strong>: model and voice downloads run through
          a queue. Active and failed downloads show inline so you can retry or
          cancel.
        </li>
        <li>
          <strong>Storage stats</strong>: see how much disk Kokoro assets are
          using and uninstall the model entirely if you want to reclaim space.
        </li>
        <li>
          <strong>Try it</strong>: a built-in preview field lets you type a
          phrase and hear any installed voice with the current model variant
          before you assign it.
        </li>
        <li>
          <strong>Saved blends</strong>: blends you create appear alongside
          installed voices so you can preview, edit, or delete them in one
          place.
        </li>
      </ul>

      <Callout>
        Kokoro assets are downloaded once and stored locally. On desktop, you
        also need eSpeak NG installed on your system for phonemization.
      </Callout>

      <DocHeading level={2}>Voice Blending</DocHeading>

      <p>
        A Kokoro blend is a custom voice built by mixing two or more installed
        Kokoro voices with weights. Blends are saved as regular user voices and
        can be assigned to characters like any other voice.
      </p>

      <p>You configure a blend in the Kokoro blend editor:</p>

      <ul>
        <li>
          <strong>Add voices</strong>: pick from the installed voice list. Each
          voice you add starts with a weight of 50.
        </li>
        <li>
          <strong>Weights</strong>: each voice has a 0 to 100 slider. Higher
          weights pull the blend toward that voice. Voices with weight 0 are
          skipped on save.
        </li>
        <li>
          <strong>Speed</strong>: adjust playback speed between 0.5x and 2.0x.
        </li>
        <li>
          <strong>Test bench</strong>: enter preview text and play the current
          blend before saving. You can stop and replay as you tweak weights.
        </li>
        <li>
          <strong>Name</strong>: each blend has a display name. It is stored
          and listed next to your other voices.
        </li>
      </ul>

      <Callout>
        Blends need at least one installed voice with a non-zero weight. If
        nothing is installed yet, open Kokoro Studio first and install a voice.
      </Callout>

      <DocHeading level={2}>Audio Cache</DocHeading>

      <p>
        Generated speech is cached locally so repeated lines don’t need to be
        regenerated. This improves performance and reduces cost when using paid
        providers.
      </p>

      <DocImage
        src={images.tts.cache}
        containerClassName="max-w-4xl mx-auto"
        alt="Audio cache UI"
      />

      <p>
        You can clear cached audio anytime.
      </p>

      <DocHeading level={2}>Audio Library</DocHeading>

      <p>
        The Audio Library is one place to find every audio clip in the app. Open
        it from <strong>Settings → Library</strong> and switch to the{" "}
        <strong>Audio</strong> tab. It gathers two kinds of audio:
      </p>

      <ul>
        <li>
          <strong>Generated</strong>: speech created by your TTS voices.
        </li>
        <li>
          <strong>Uploaded</strong>: audio files you attached to a chat.
        </li>
      </ul>

      <p>
        You can filter between all audio, generated only, or uploaded only. Each
        clip shows as a player card with a play button, a progress bar you can
        scrub, and the file name, size, and date. From a card you can:
      </p>

      <ul>
        <li>
          <strong>Open in chat</strong>: jump back to the message the clip came
          from (available for clips tied to a conversation).
        </li>
        <li>
          <strong>Download</strong>: save the audio file to your device.
        </li>
        <li>
          <strong>Delete</strong>: remove the clip after a confirmation.
        </li>
      </ul>

      <Callout type="warning" title="Reset removes downloaded models">
        Resetting the app's data clears downloaded voice and speech models,
        including Kokoro and Whisper, along with cached and library audio. You
        can re-download anything you need afterward.
      </Callout>
    </motion.article>
    </>
  );
}
