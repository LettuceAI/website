import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ModelBrowserDoc() {
  return (
    <>
      <SEO
        title="Model Browser & Local Inference"
        description="Browse, download, and run GGUF models locally with the built-in HuggingFace model browser and llama.cpp engine in LettuceAI."
        path="/docs/model-browser"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          {
            name: "Model Browser & Local Inference",
            path: "/docs/model-browser",
          },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Model Browser & Local Inference</DocHeading>

        <p>
          LettuceAI can run AI models directly on your device using the built-in{" "}
          <strong>llama.cpp</strong> engine. Browse and download GGUF models from
          HuggingFace, load them locally, and chat completely offline. No cloud
          API key required.
        </p>

        <Callout title="What you need" type="info">
          Local inference requires a device with enough RAM to load the model.
          Smaller quantized models (Q4, Q5) can run on most modern devices.
          Larger models or higher quantizations need more memory.
        </Callout>

        {/* ── Model Browser ── */}
        <DocHeading level={2}>Model Browser</DocHeading>

        <p>
          The built-in model browser lets you search and download GGUF models
          directly from HuggingFace without leaving the app.
        </p>

        <DocHeading level={3}>Finding models</DocHeading>

        <p>
          Open the model browser from{" "}
          <strong>Settings &rarr; Models &rarr; HuggingFace Browser</strong>.
          You can search by name and sort results by:
        </p>

        <ul>
          <li>
            <strong>Trending</strong> &mdash; popular right now
          </li>
          <li>
            <strong>Downloads</strong> &mdash; most downloaded overall
          </li>
          <li>
            <strong>Likes</strong> &mdash; community favorites
          </li>
          <li>
            <strong>Last modified</strong> &mdash; recently updated
          </li>
        </ul>

        <p>
          Each result shows the author, download and like counts, tags, context
          length, and parameter count so you can pick the right model at a
          glance.
        </p>

        <DocHeading level={3}>Choosing a file</DocHeading>

        <p>
          Most HuggingFace model repos contain multiple GGUF files at different
          quantization levels. The browser automatically detects every GGUF file
          in the repo and parses its quantization format from the filename.
        </p>

        <p>Common quantizations you will see, from smallest to largest:</p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Quantization</th>
              <th className="text-left py-2 px-4">Quality</th>
              <th className="text-left py-2 px-4">Size</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Q4_0 / Q4_K</td>
              <td className="py-2 px-4">Good for most use cases</td>
              <td className="py-2 px-4">Smallest</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Q5_0 / Q5_K</td>
              <td className="py-2 px-4">Better quality, slightly larger</td>
              <td className="py-2 px-4">Medium</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Q8_0</td>
              <td className="py-2 px-4">Near-original quality</td>
              <td className="py-2 px-4">Large</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">F16</td>
              <td className="py-2 px-4">Full precision</td>
              <td className="py-2 px-4">Largest</td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Smart recommendations</DocHeading>

        <p>
          The browser includes a recommendation engine that scores each file
          based on your device's available RAM and VRAM. It considers the model
          size, KV cache requirements, and overhead to tell you which file will
          run best on your hardware.
        </p>

        <p>Each file gets a fitness label:</p>

        <ul>
          <li>
            <strong>Excellent</strong> &mdash; runs comfortably with room to
            spare
          </li>
          <li>
            <strong>Good</strong> &mdash; fits well within your resources
          </li>
          <li>
            <strong>Marginal</strong> &mdash; may work but could be slow
          </li>
          <li>
            <strong>Poor</strong> &mdash; likely too large
          </li>
          <li>
            <strong>Unrunnable</strong> &mdash; will not fit in memory
          </li>
        </ul>

        <p>
          The scoring weighs memory fitness (25%), GPU acceleration potential
          (35%), KV cache headroom (15%), and quantization quality (25%).
        </p>

        <DocHeading level={3}>Downloading</DocHeading>

        <p>
          Tap a file to start the download. The download queue supports multiple
          concurrent downloads and shows real-time progress with speed tracking.
        </p>

        <p>Downloads go through these states:</p>

        <ul>
          <li>
            <strong>Queued</strong> &mdash; waiting to start
          </li>
          <li>
            <strong>Downloading</strong> &mdash; in progress with speed and
            percentage
          </li>
          <li>
            <strong>Complete</strong> &mdash; ready to use
          </li>
          <li>
            <strong>Error / Cancelled</strong> &mdash; failed or stopped by user
          </li>
        </ul>

        <p>
          When a download finishes, you get a notification with a quick action to
          create a model profile from the file immediately.
        </p>

        <DocHeading level={3}>Vision model files</DocHeading>

        <p>
          Some models support vision (image input). These repos include an
          additional <strong>mmproj</strong> (multimodal projection) file. The
          browser detects these automatically. Download both the main GGUF and
          the mmproj file, then link the mmproj in your model's advanced
          settings.
        </p>

        {/* ── Installed Models ── */}
        <DocHeading level={2}>Installed Models</DocHeading>

        <p>
          The <strong>Installed Models</strong> page shows every GGUF file on
          your device. It reads metadata directly from each file to display:
        </p>

        <ul>
          <li>Filename, model ID, and file path</li>
          <li>Parameter count and architecture</li>
          <li>Context length and quantization format</li>
          <li>File size</li>
          <li>Whether it is an LLM or mmproj file</li>
        </ul>

        <p>
          You can sort by parameters, architecture, context length, or file size.
          From here you can copy a file path, delete a model, or refresh the
          inventory.
        </p>

        {/* ── llama.cpp ── */}
        <DocHeading level={2}>llama.cpp (Local Engine)</DocHeading>

        <p>
          The built-in llama.cpp engine runs GGUF models directly on your device
          with no server or external software needed. It uses Rust bindings to
          the llama.cpp C++ library for native performance.
        </p>

        <DocHeading level={3}>Setting up a local model</DocHeading>

        <ol>
          <li>Download a GGUF model from the model browser</li>
          <li>
            Go to <strong>Settings &rarr; Models &rarr; Add Model</strong>
          </li>
          <li>
            Select <strong>Local (llama.cpp)</strong> as the provider
          </li>
          <li>Pick your downloaded GGUF file</li>
          <li>Adjust advanced settings if needed, or use the defaults</li>
        </ol>

        <Callout>
          The first load of a model may take a moment while layers are allocated
          to GPU and memory. Subsequent loads are faster.
        </Callout>

        <DocHeading level={3}>Chat templates</DocHeading>

        <p>
          Chat templates control how your messages are formatted before being
          sent to the model. Most GGUF files embed a template, and LettuceAI
          uses it automatically when the preset is set to <code>auto</code>.
        </p>

        <p>If a model does not embed a template, you can choose a preset:</p>

        <ul>
          <li>
            <code>chatml</code> &mdash; ChatML format, widely compatible
          </li>
          <li>
            <code>llama2</code> / <code>llama3</code> &mdash; Meta Llama
            formats
          </li>
          <li>
            <code>mistral-v1</code> &mdash; Mistral instruction format
          </li>
          <li>
            <code>vicuna</code> &mdash; Vicuna-style format
          </li>
          <li>
            <code>gemma</code> &mdash; Google Gemma format
          </li>
        </ul>

        <p>
          You can also write a custom Jinja template in the{" "}
          <strong>Chat Template Override</strong> field for full control.
        </p>

        <DocHeading level={3}>Sampler profiles</DocHeading>

        <p>
          Sampler profiles are quick presets that configure batch size, KV cache
          type, and other engine settings for different use cases:
        </p>

        <ul>
          <li>
            <strong>Balanced</strong> &mdash; good all-around defaults (batch
            512, KV q8_0)
          </li>
          <li>
            <strong>Throughput</strong> &mdash; maximum speed (batch 1024, KV
            f16, flash attention on)
          </li>
          <li>
            <strong>Creative</strong> &mdash; optimized for creative writing
          </li>
          <li>
            <strong>Stable</strong> &mdash; more deterministic, consistent
            output
          </li>
          <li>
            <strong>Reasoning</strong> &mdash; optimized for step-by-step
            thinking
          </li>
        </ul>

        <DocHeading level={3}>GPU and compute settings</DocHeading>

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
                How many model layers to offload to GPU. More layers = faster
                but uses more VRAM.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Threads</td>
              <td className="py-2 px-4">1 &ndash; 256</td>
              <td className="py-2 px-4">
                CPU threads for token generation.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Batch Threads</td>
              <td className="py-2 px-4">1 &ndash; 256</td>
              <td className="py-2 px-4">
                CPU threads for batch/prompt processing.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Batch Size</td>
              <td className="py-2 px-4">1 &ndash; 8192</td>
              <td className="py-2 px-4">
                Tokens processed at once during prompt evaluation. Larger =
                faster prompt processing.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Offload KQV</td>
              <td className="py-2 px-4">On / Off</td>
              <td className="py-2 px-4">
                Offload the KV cache to GPU memory for faster inference.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Flash Attention</td>
              <td className="py-2 px-4">Auto / Enabled / Disabled</td>
              <td className="py-2 px-4">
                Memory-efficient attention. Auto lets the engine decide.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>KV cache type</DocHeading>

        <p>
          The KV cache stores the model's memory of past tokens during
          generation. Choosing a smaller cache type reduces memory usage at a
          small quality cost.
        </p>

        <p>Common choices:</p>

        <ul>
          <li>
            <code>auto</code> &mdash; let the model decide (recommended)
          </li>
          <li>
            <code>f16</code> &mdash; full precision, highest quality
          </li>
          <li>
            <code>q8_0</code> &mdash; good balance of quality and memory
          </li>
          <li>
            <code>q4_0</code> &mdash; saves the most memory, slight quality
            loss
          </li>
        </ul>

        <p>
          All standard quantization types are supported: f32, f16, q8_1, q8_0,
          q6_k, q5_k, q5_1, q5_0, q4_k, q4_1, q4_0, q3_k, q2_k, iq4_nl,
          iq3_s, iq3_xxs, iq2_xs, iq2_xxs, and iq1_s.
        </p>

        <DocHeading level={3}>Sampling parameters</DocHeading>

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
              <td className="py-2 px-4 font-medium">Min-P</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Minimum probability threshold. Tokens below this relative
                probability are excluded.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Typical-P</td>
              <td className="py-2 px-4">0 &ndash; 1</td>
              <td className="py-2 px-4">
                Typical sampling threshold. Keeps tokens whose information
                content is close to the expected amount.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">RoPE Freq Base</td>
              <td className="py-2 px-4">0 &ndash; 1,000,000</td>
              <td className="py-2 px-4">
                Base frequency for rotary position embeddings. Used for context
                length extension.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">RoPE Freq Scale</td>
              <td className="py-2 px-4">0 &ndash; 10</td>
              <td className="py-2 px-4">
                Scaling factor for RoPE. Values below 1 extend effective context
                length.
              </td>
            </tr>
          </tbody>
        </table>

        <Callout title="Advanced users" type="warning">
          RoPE settings are for extending context beyond what the model was
          trained for. Changing them without understanding the model's
          architecture can produce garbage output. Leave them at default unless
          you know what you are doing.
        </Callout>

        <DocHeading level={3}>Vision support</DocHeading>

        <p>
          llama.cpp supports multimodal (vision) models through mmproj files. To
          enable vision:
        </p>

        <ol>
          <li>
            Download the model's mmproj file from the same HuggingFace repo
          </li>
          <li>
            In advanced settings, set the <strong>MMPROJ Path</strong> to point
            at the downloaded file
          </li>
          <li>
            Enable <strong>Image</strong> in the model's input scopes
          </li>
        </ol>

        <p>
          Images sent in chat are automatically converted to PNG and processed
          through the multimodal pipeline.
        </p>

        <DocHeading level={3}>Runtime reports</DocHeading>

        <p>
          After running a model, LettuceAI stores a runtime report in the
          model's settings. This includes:
        </p>

        <ul>
          <li>Tokens per second performance</li>
          <li>Available memory at load time</li>
          <li>Model size in memory</li>
          <li>Recommended context length for your hardware</li>
          <li>Whether GPU acceleration worked or fell back to CPU</li>
        </ul>

        <p>
          If a model fails to load or falls back to CPU, an alert appears on the
          Models page so you can adjust settings.
        </p>

        {/* ── Import / Export ── */}
        <DocHeading level={2}>Model Import & Export</DocHeading>

        <p>
          You can export any model profile (its name, provider, and all advanced
          settings) to share it or back it up.
        </p>

        <ul>
          <li>
            <strong>JSON</strong> &mdash; portable format, can be imported by any
            LettuceAI instance
          </li>
          <li>
            <strong>USC</strong> &mdash; Universal Scene Composer format, wraps
            the profile with additional metadata
          </li>
        </ul>

        <p>
          To import, open the Models page, tap import, and select a previously
          exported JSON or USC file. A new model profile is created
          automatically.
        </p>

        <Callout type="warning" title="Local files not included">
          Exporting a model profile does not include the GGUF model file itself.
          If you import a llama.cpp profile on a different device, you will need
          to download the GGUF file separately and update the file path.
        </Callout>

        {/* ── Tips ── */}
        <DocHeading level={2}>Tips</DocHeading>

        <ul>
          <li>
            Start with a Q4 or Q5 quantization if you are unsure. They offer the
            best balance of quality and performance.
          </li>
          <li>
            If the model loads but generates slowly, try reducing GPU layers or
            lowering the context length.
          </li>
          <li>
            Use the <strong>Balanced</strong> sampler profile unless you have a
            specific need. It works well for most models.
          </li>
          <li>
            Check runtime reports after your first run to see if the model fits
            your hardware well.
          </li>
          <li>
            For vision models, make sure you download and link the mmproj file or
            image input will not work.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
