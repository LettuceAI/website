import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function OllamaDoc() {
  return (
    <>
      <SEO
        title="Ollama Integration"
        description="Connect LettuceAI to your Ollama server for local AI model inference with full configuration options."
        path="/docs/ollama"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Ollama Integration", path: "/docs/ollama" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Ollama Integration</DocHeading>

        <p>
          If you already have <strong>Ollama</strong> running on your computer or
          local network, LettuceAI can connect to it as a provider. This is
          useful if you prefer Ollama's model management or want to share one
          Ollama server across multiple apps.
        </p>

        <Callout title="Ollama vs built-in llama.cpp" type="info">
          LettuceAI also has a built-in llama.cpp engine that runs models
          directly inside the app with no external software. See the{" "}
          <a href="/docs/model-browser">Model Browser & Local Inference</a> page
          for that approach.
        </Callout>

        {/* ── Setup ── */}
        <DocHeading level={2}>Connecting to Ollama</DocHeading>

        <ol>
          <li>
            Make sure Ollama is running (default port is <code>11434</code>)
          </li>
          <li>
            In LettuceAI, go to{" "}
            <strong>Settings &rarr; Providers &rarr; Ollama</strong>
          </li>
          <li>
            Enter your Ollama base URL (e.g.{" "}
            <code>http://localhost:11434</code>)
          </li>
          <li>
            The app will fetch your installed models from Ollama's{" "}
            <code>/api/tags</code> endpoint
          </li>
        </ol>

        <Callout>
          You do not need to download models through LettuceAI when using
          Ollama. Ollama manages its own model storage. Just pull models through
          Ollama's CLI and they will appear in LettuceAI.
        </Callout>

        <DocHeading level={3}>Remote access</DocHeading>

        <p>
          Ollama does not have to run on the same device. If you have it running
          on another machine on your local network, use that machine's IP
          address as the base URL (e.g.{" "}
          <code>http://192.168.1.100:11434</code>).
        </p>

        <p>
          Make sure Ollama is configured to accept connections from other
          devices. By default it only listens on localhost.
        </p>

        {/* ── Model Management ── */}
        <DocHeading level={2}>Model management</DocHeading>

        <p>
          Once connected, LettuceAI automatically discovers all models installed
          in Ollama. Each model appears with its display name and parameter size
          extracted from Ollama's metadata.
        </p>

        <p>
          To add new models, use the Ollama CLI on the machine running Ollama:
        </p>

        <pre>
          <code>ollama pull llama3.1{"\n"}ollama pull mistral{"\n"}ollama pull gemma2</code>
        </pre>

        <p>
          After pulling, refresh the model list in LettuceAI and the new models
          will appear.
        </p>

        {/* ── How it works ── */}
        <DocHeading level={2}>How it works</DocHeading>

        <p>
          LettuceAI communicates with Ollama using its native{" "}
          <code>/api/chat</code> endpoint. Conversations are streamed in
          real-time, and tool/function calling is supported for models that
          support it.
        </p>

        <p>
          The app automatically handles URL normalization, so it does not matter
          if you include or omit a trailing <code>/v1</code> in the base URL.
        </p>

        {/* ── Settings ── */}
        <DocHeading level={2}>Configuration</DocHeading>

        <p>
          Ollama exposes a rich set of parameters that you can configure
          per-model in LettuceAI's advanced model settings.
        </p>

        <DocHeading level={3}>Context and generation</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Setting</th>
              <th className="text-left py-2 px-4">Range</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Context Window</td>
              <td className="py-2 px-4">0 &ndash; 262,144</td>
              <td className="py-2 px-4">
                How many tokens of conversation history the model can see.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Max Predict</td>
              <td className="py-2 px-4">0 &ndash; 131,072</td>
              <td className="py-2 px-4">
                Maximum tokens to generate per response.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Keep Tokens</td>
              <td className="py-2 px-4">0 &ndash; 32,768</td>
              <td className="py-2 px-4">
                Number of tokens to keep from the beginning of the prompt.
                Useful for preserving system instructions.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Hardware</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Setting</th>
              <th className="text-left py-2 px-4">Range</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">GPU Layers</td>
              <td className="py-2 px-4">0 &ndash; 512</td>
              <td className="py-2 px-4">
                Layers to offload to GPU. More = faster, but uses more VRAM.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Threads</td>
              <td className="py-2 px-4">1 &ndash; 256</td>
              <td className="py-2 px-4">CPU thread count for generation.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Batch Size</td>
              <td className="py-2 px-4">1 &ndash; 16,384</td>
              <td className="py-2 px-4">
                Tokens processed at once during prompt evaluation.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Sampling</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Setting</th>
              <th className="text-left py-2 px-4">Range</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Seed</td>
              <td className="py-2 px-4">0 &ndash; 2,147,483,647</td>
              <td className="py-2 px-4">
                Fixed seed for reproducible output. 0 = random.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Repeat Penalty</td>
              <td className="py-2 px-4">0 &ndash; 2</td>
              <td className="py-2 px-4">
                Penalizes repeated tokens. Higher values reduce repetition.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Min-P</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Minimum probability threshold for token selection.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Typical-P</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Typical sampling. Keeps tokens whose surprise is close to the
                average.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">TFS-Z</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Tail free sampling threshold. 1 = disabled.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Mirostat</DocHeading>

        <p>
          Mirostat is an adaptive sampling algorithm that tries to keep the
          output at a consistent level of surprise. It can produce more natural
          and coherent text than fixed sampling parameters.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Setting</th>
              <th className="text-left py-2 px-4">Range</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Mirostat</td>
              <td className="py-2 px-4">0 &ndash; 2</td>
              <td className="py-2 px-4">
                Algorithm version. 0 = disabled, 1 = Mirostat v1, 2 = Mirostat
                v2.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Mirostat Tau</td>
              <td className="py-2 px-4">0 &ndash; 10</td>
              <td className="py-2 px-4">
                Target entropy. Lower values produce more focused, predictable
                output. Higher values allow more variety.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Mirostat Eta</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Learning rate. Controls how quickly the algorithm adapts.
              </td>
            </tr>
          </tbody>
        </table>

        <Callout>
          When Mirostat is enabled (1 or 2), temperature and top-p sampling are
          bypassed. Mirostat controls the randomness on its own.
        </Callout>

        <DocHeading level={3}>Stop sequences</DocHeading>

        <p>
          You can define a list of strings that cause the model to stop
          generating when encountered. This is useful for preventing the model
          from running past a natural stopping point.
        </p>

        {/* ── Comparison ── */}
        <DocHeading level={2}>Ollama vs built-in llama.cpp</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4"></th>
              <th className="text-left py-2 px-4">Ollama</th>
              <th className="text-left py-2 px-4">llama.cpp (built-in)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Setup</td>
              <td className="py-2 px-4">
                Requires Ollama installed and running
              </td>
              <td className="py-2 px-4">
                Nothing extra, runs inside the app
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Model source</td>
              <td className="py-2 px-4">
                Pull models through Ollama CLI
              </td>
              <td className="py-2 px-4">
                Download GGUF files from HuggingFace browser
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Configuration</td>
              <td className="py-2 px-4">
                Simpler, Ollama handles most engine details
              </td>
              <td className="py-2 px-4">
                Full control over GPU layers, threads, KV cache, etc.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Network</td>
              <td className="py-2 px-4">
                Connects over HTTP (localhost or LAN)
              </td>
              <td className="py-2 px-4">
                Fully offline, no network needed
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Best for</td>
              <td className="py-2 px-4">
                Sharing one server across apps, easier model management
              </td>
              <td className="py-2 px-4">
                Maximum control and fully offline use
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Tips ── */}
        <DocHeading level={2}>Tips</DocHeading>

        <ul>
          <li>
            If models are not appearing, make sure Ollama is running and the base
            URL is correct.
          </li>
          <li>
            For remote Ollama servers, check that the firewall allows connections
            on port 11434.
          </li>
          <li>
            Ollama's context window defaults can be small. Set a higher context
            window in LettuceAI's advanced settings if your conversations are
            getting truncated.
          </li>
          <li>
            Try Mirostat v2 with tau around 5 for a good balance of coherence
            and creativity in roleplay.
          </li>
          <li>
            If you want the same model accessible from multiple apps on your
            machine, Ollama is the better choice since it runs as a shared
            service.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
