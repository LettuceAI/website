import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function SpeechRecognitionDoc() {
  return (
    <>
      <SEO
        title="Speech Recognition"
        description="On-device voice input for LettuceAI using Whisper. Fully local transcription with custom vocabulary and correction rules."
        path="/docs/speech-recognition"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Speech Recognition", path: "/docs/speech-recognition" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Speech Recognition</DocHeading>
        <p>
          LettuceAI includes on-device speech recognition powered by{" "}
          <strong>Whisper</strong>, the open-source automatic speech
          recognition model from OpenAI, running through the{" "}
          <code>whisper.cpp</code> runtime. You record from your microphone,
          the app transcribes the audio locally, and the resulting text is
          inserted into the chat input.
        </p>
        <Callout title="Fully local">
          Audio never leaves your device. The Whisper model runs entirely on
          the device. Your recordings are not uploaded to LettuceAI or to any
          third party.
        </Callout>

        <DocHeading level={2}>Whisper models</DocHeading>
        <p>
          Whisper comes in several sizes. Smaller models are fast and use
          little memory; larger models are slower but more accurate. You pick
          the model that fits your hardware and download it once. Quantized
          variants (for example, <code>q5_0</code>, <code>q5_1</code>) are
          smaller and faster with only a small accuracy cost.
        </p>
        <p>
          Open{" "}
          <strong>Settings → Voices → Speech Recognition</strong>,
          browse the model catalogue, and tap a model to download it. Common
          starting points the app marks as recommended:
        </p>
        <ul>
          <li>
            <strong>Mobile:</strong> <code>tiny</code>, <code>base</code>, or{" "}
            <code>base-q5_1</code> / <code>small-q5_1</code> for a balance of
            speed and quality.
          </li>
          <li>
            <strong>Desktop:</strong> <code>small</code>,{" "}
            <code>medium-q5_0</code>, <code>medium</code>, or{" "}
            <code>large-v3-turbo-q5_0</code> when you have the resources for
            higher accuracy.
          </li>
          <li>
            <strong>English-only</strong> variants (marked <code>.en</code>)
            are smaller and more accurate on English than the multilingual
            variant of the same size.
          </li>
        </ul>
        <p>
          Installed models are listed separately and can be removed at any
          time to reclaim disk space. Model files are stored under the app's
          own data directory, in a <code>models/whisper</code> folder.
        </p>

        <DocHeading level={2}>Using voice input in chat</DocHeading>
        <p>
          With a model installed, the chat input shows a microphone control.
          Tap it to start recording, speak your message, and stop the
          recording. The app captures audio from your microphone, sends the
          PCM samples to the local Whisper runtime, and inserts the
          transcribed text into the message box. You can edit the result
          before sending, just like normal typing.
        </p>
        <p>
          If multiple microphones are available, you can pick which one to
          use; the choice is remembered between sessions.
        </p>

        <DocHeading level={2}>Uploading audio into a chat</DocHeading>
        <p>
          Separately from dictation, you can attach an existing audio file to a
          message and send it to the AI. Use the attachment control in the chat
          input to pick an audio file (common formats like MP3, WAV, OGG, FLAC,
          AAC, M4A, and others are supported). The clip is added to your message
          as an attachment, and a small player lets you listen to it right in
          the conversation.
        </p>
        <p>
          This is different from microphone dictation. Dictation is transcribed
          locally and turned into text. An uploaded clip is sent to the model as
          audio, so the AI can actually listen to it. For this to work you need
          a model that understands audio input (for example, audio-capable
          Gemini models). With models that do not support audio, the clip is
          simply left out of the request.
        </p>
        <Callout title="Audio uses tokens">
          When you send audio to a model, it counts toward your usage just like
          text does. The app tracks audio tokens separately so you can see how
          much audio is contributing to a request.
        </Callout>
        <p>
          Every clip you upload, plus any speech your characters generate, is
          collected in the <strong>Audio Library</strong> under{" "}
          <strong>Settings → Library</strong>, where you can replay,
          download, or delete it. See the Text-to-Speech page for details.
        </p>
        <Callout type="warning" title="Uploaded audio leaves your device">
          Unlike microphone dictation, which is processed locally, an audio clip
          you upload and send is delivered to your chosen model's provider so it
          can be heard. Only send audio to providers you trust.
        </Callout>

        <DocHeading level={2}>Vocabulary</DocHeading>
        <p>
          Vocabulary lets you teach Whisper words it is likely to mishear,
          such as character names, project codenames, or domain jargon. Terms
          you add are biased into Whisper's initial prompt so the model is
          more likely to spell them correctly the first time.
        </p>
        <ul>
          <li>Add terms under the <strong>Vocabulary</strong> tab in Speech Recognition settings.</li>
          <li>Each term can be tagged with a language and a category.</li>
          <li>
            Terms have a <strong>scope</strong>:{" "}
            <code>conversation</code>, <code>character</code>,{" "}
            <code>project</code>, or <code>global</code>. Narrower scopes
            apply only where they are relevant; <code>global</code> applies
            everywhere.
          </li>
        </ul>
        <Callout>
          The prompt that biases Whisper is limited in length, so very large
          vocabulary lists are truncated. Higher-priority and more frequently
          used terms are included first.
        </Callout>

        <DocHeading level={2}>Corrections: wrong → correct rewrites</DocHeading>
        <p>
          Corrections are simple find-and-replace rules applied to Whisper's
          output after transcription. Use them when a specific phrase is
          consistently mistranscribed and vocabulary alone is not enough. Each
          rule pairs a <strong>wrong</strong> phrase with the{" "}
          <strong>correct</strong> phrase. Matching is whole-word and case
          insensitive.
        </p>
        <p>
          Like vocabulary, corrections carry a scope and an optional language.
          Rules you mark as user-approved are preferred. The app also tracks
          how often each rule is accepted or rejected; rules that prove useful
          can be promoted to a broader scope automatically.
        </p>

        <DocHeading level={3}>Learning from your edits</DocHeading>
        <p>
          When you edit a transcribed message before sending, the app can
          compare your edit to Whisper's original output and suggest new
          correction rules. Suggestions you accept become rules; suggestions
          you ignore are remembered so they will not be shown again.
        </p>

        <DocHeading level={2}>Voice examples</DocHeading>
        <p>
          A voice example pairs a short recording with the text it{" "}
          <em>should</em> produce. You can use voice examples to:
        </p>
        <ul>
          <li>Verify that a vocabulary term is being recognized correctly.</li>
          <li>Generate a correction suggestion by comparing Whisper's actual output to the expected text.</li>
          <li>Keep regression-style samples for tricky phrases.</li>
        </ul>

        <DocHeading level={2}>Importing and exporting your library</DocHeading>
        <p>
          Vocabulary, corrections, voice examples, and ignored suggestions can
          be exported as a single bundle and imported into another install.
          This is useful for sharing a tuned setup between devices or backing
          up your speech configuration outside of a full app backup.
        </p>

        <DocHeading level={2}>Privacy summary</DocHeading>
        <ul>
          <li>The Whisper model runs locally; no audio is sent to a server.</li>
          <li>Model files are downloaded once from Hugging Face and stored on your device.</li>
          <li>Vocabulary, corrections, and voice examples live in your local database.</li>
          <li>Nothing about your voice input is shared with LettuceAI.</li>
        </ul>
      </motion.article>
    </>
  );
}
