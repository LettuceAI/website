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
      description="Make characters speak aloud with ElevenLabs, Google Gemini TTS, or device-native voices in LettuceAI."
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
          <strong>Device TTS:</strong> uses your operating system’s built-in
          voices
        </li>
        <li>
          <strong>ElevenLabs:</strong> premium neural speech synthesis
        </li>
        <li>
          <strong>Google Gemini TTS:</strong> neural voice generation
        </li>
      </ul>

      <p>
        Some providers may require an API key before use.
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
        Custom voices work with both ElevenLabs and Gemini TTS.
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
    </motion.article>
    </>
  );
}
