import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
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
          Local inference requires a device with enough RAM (and ideally VRAM)
          to load the model. Smaller quantized models (Q4, Q5) can run on most
          modern desktops. Larger models or higher quantizations need more
          memory.
        </Callout>

        {/* Model Browser */}
        <DocHeading level={2}>Model Browser</DocHeading>

        <p>
          The built-in model browser queries the HuggingFace public API with the
          <code> filter=gguf</code> tag, so every result is a GGUF repo you can
          download directly without leaving the app.
        </p>

        <DocHeading level={3}>Finding models</DocHeading>

        <p>
          Open the browser from{" "}
          <strong>Settings → Models → HuggingFace Browser</strong>.
          You can search by name and sort results by:
        </p>

        <ul>
          <li>
            <strong>Trending</strong> (default): HuggingFace trending score
          </li>
          <li>
            <strong>Downloads</strong>: most downloaded overall
          </li>
          <li>
            <strong>Likes</strong>: community favorites
          </li>
          <li>
            <strong>Last modified</strong>: recently updated repos
          </li>
        </ul>

        <p>
          Each result shows the author, download and like counts, tags, pipeline
          tag, last-modified date, parameter size (parsed from tags or model
          ID), and a thumbnail when available.
        </p>

        <DocHeading level={3}>Filters and views</DocHeading>

        <p>
          The filter button (next to sort) lets you narrow results client-side
          by:
        </p>

        <ul>
          <li>
            <strong>Pipeline tag</strong>: filter to a HuggingFace pipeline tag
            present in the current results (for example,{" "}
            <code>text-generation</code>, <code>image-text-to-text</code>).
          </li>
          <li>
            <strong>Parameter range</strong>: minimum and maximum parameter
            count in billions, parsed from the repo tags or model ID.
          </li>
        </ul>

        <p>
          You can also cycle the result layout between <strong>list</strong>,{" "}
          <strong>grid</strong>, and <strong>gallery</strong> views. The choice
          is stored in your browser.
        </p>

        <DocHeading level={3}>Choosing a file</DocHeading>

        <p>
          Most HuggingFace GGUF repos contain multiple files at different
          quantization levels. The browser lists every <code>.gguf</code> file
          in the repo (excluding imatrix calibration data), parses the
          quantization tag from the filename, and detects <code>mmproj</code>{" "}
          (vision projector) files automatically.
        </p>

        <p>Quantizations you may see, ordered roughly by quality:</p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Quantization</th>
              <th className="text-left py-2 px-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">F32 / BF16 / F16</td>
              <td className="py-2 px-4">Full precision, largest files.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Q8_0, Q8_K (S/L/XL), Q6_K</td>
              <td className="py-2 px-4">Near-original quality.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Q5_K (S/M/L/XL), Q5_0, Q5_1
              </td>
              <td className="py-2 px-4">Good quality at moderate size.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Q4_K (S/M/L/XL), Q4_0, Q4_1, IQ4_XS, IQ4_NL
              </td>
              <td className="py-2 px-4">
                Common sweet spot for size vs quality.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Q3_K (S/M/L), IQ3_M, IQ3_S, IQ3_XS, IQ3_XXS
              </td>
              <td className="py-2 px-4">Smaller, noticeable quality loss.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Q2_K, IQ2_*</td>
              <td className="py-2 px-4">Aggressive compression.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">IQ1_S, IQ1_M, MXFP4_MOE</td>
              <td className="py-2 px-4">Specialty quants.</td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Runability scoring</DocHeading>

        <p>
          For each GGUF file the browser computes a runability score from 0 to
          100 using your device&apos;s available RAM and (when present) VRAM,
          plus GGUF metadata parsed directly from the file header (architecture,
          block count, embedding length, head counts, sliding window, KV LoRA
          rank).
        </p>

        <DocImage
          src={images.localInference.runnability}
          alt="How the app estimates whether a local model will run on your device"
          caption="The app weighs the model's size and quantization against your memory and graphics card, works out how much can run on the GPU, and shows a runnability score before you download. If a model runs out of memory while loading, it retries at a smaller size before falling back to the CPU."
          containerClassName="max-w-2xl mx-auto"
        />

        <p>The final score is a weighted sum:</p>

        <ul>
          <li>
            <strong>Memory fitness</strong> (25%): how much total memory is
            available relative to the model, KV cache, and compute overhead.
          </li>
          <li>
            <strong>GPU acceleration</strong> (35%): whether the model fits
            fully in VRAM, partially (with KV or weight spill), or only via
            partial layer offload.
          </li>
          <li>
            <strong>KV cache headroom</strong> (15%): free memory left for the
            KV cache after loading weights.
          </li>
          <li>
            <strong>Quantization quality</strong> (25%): a per-quant quality
            score (for example F16 = 100, Q8_0 = 90, Q5_K_M = 85, Q4_K_M = 75,
            Q3_K_S = 50, Q2_K = 35, IQ1_S = 15).
          </li>
        </ul>

        <p>The numeric score maps to a fitness label:</p>

        <ul>
          <li>
            <strong>Excellent</strong>: 80 to 100
          </li>
          <li>
            <strong>Good</strong>: 60 to 79
          </li>
          <li>
            <strong>Marginal</strong>: 40 to 59
          </li>
          <li>
            <strong>Poor</strong>: 20 to 39
          </li>
          <li>
            <strong>Unrunnable</strong>: below 20 (or the model does not fit at
            all, which caps the score at 10)
          </li>
        </ul>

        <p>
          Architecture-aware adjustments are applied automatically: Gemma 2 and
          Cohere are scored with their sliding-window KV cap, and DeepSeek
          V2/V3 use the MLA (multi-head latent attention) compressed KV size.
          Apple Silicon and other unified-memory devices use the maximum of RAM
          and VRAM rather than the sum.
        </p>

        <DocHeading level={4}>Mixture-of-Experts (MoE) awareness</DocHeading>

        <p>
          Large MoE models (for example Mixtral or Qwen MoE) only run a small
          fraction of their weights for each token. The scorer detects MoE
          models from their GGUF metadata and estimates the{" "}
          <strong>active weight ratio</strong>: roughly the share of weights
          actually used per token (attention plus the experts that fire). That
          active size, not the full on-disk size, drives the compute and memory
          overhead estimate. In practice this means a big sparse MoE can score
          much better than its file size alone would suggest.
        </p>

        <DocHeading level={4}>Partial GPU offload</DocHeading>

        <p>
          The GPU acceleration score is not all-or-nothing. The browser
          estimates one of several outcomes for your hardware and scores
          accordingly:
        </p>

        <ul>
          <li>
            <strong>Full GPU</strong>: weights and KV cache both fit in VRAM
            (highest score).
          </li>
          <li>
            <strong>Mostly GPU with spill</strong>: weights fit but the KV
            cache or compute buffers spill into system RAM.
          </li>
          <li>
            <strong>Model in RAM, context on GPU</strong> (or the reverse),
            for mixed setups.
          </li>
          <li>
            <strong>Partial layer offload</strong>: only some transformer
            layers fit in VRAM and the rest run on CPU, scaled by how much of
            the model fits.
          </li>
        </ul>

        <p>
          Budgets reserve roughly 10 percent of free RAM and VRAM as headroom so
          the estimate is conservative rather than optimistic.
        </p>

        <DocHeading level={4}>Quantization and KV cache quality</DocHeading>

        <p>
          Each quant type has a quality score (for example F16 = 100, Q8_0 = 90,
          Q5_K_M = 85, Q4_K_M = 75, Q2_K = 35, IQ1_S = 15). Unsloth dynamic
          (<code>UD-</code>) quants and quantization-aware-trained (QAT) files
          are recognized and scored higher, because they hold up better at the
          same size.
        </p>

        <p>
          When the browser recommends settings for a file, it sizes the context
          against the cost of different KV cache types and never recommends the
          full-precision <code>f16</code> KV cache: <code>q8_0</code> is the
          highest KV type it will suggest, since it saves memory at almost no
          quality cost.
        </p>

        <DocHeading level={3}>Downloading</DocHeading>

        <p>
          Tap a file to add it to the download queue. The queue processes items
          sequentially through a single worker, writing to a{" "}
          <code>.tmp</code> file and renaming on completion. Downloads emit
          progress, byte counts, and a sampled speed (bytes per second).
        </p>

        <p>Each queued item is in one of these states:</p>

        <ul>
          <li>
            <strong>Queued</strong>: waiting for the worker
          </li>
          <li>
            <strong>Downloading</strong>: bytes streaming with live progress
          </li>
          <li>
            <strong>Complete</strong>: file moved to its final path
          </li>
          <li>
            <strong>Error / Cancelled</strong>: failed or stopped by the user
          </li>
        </ul>

        <Callout type="info" title="Restarts on retry">
          Downloads are not resumed across cancellation or app restart. If a
          download is cancelled the temporary file is removed, and the next
          attempt starts from zero. If the destination file already exists and
          is at least 1 MB, the queue skips re-downloading unless you choose
          force redownload.
        </Callout>

        <p>
          Downloaded GGUF files are stored under the app&apos;s models
          directory in a per-repo folder (<code>owner--repo/filename.gguf</code>
          ). When a download finishes the browser shows a quick action to
          create a model profile pointing at the new file.
        </p>

        <DocHeading level={3}>Vision model files</DocHeading>

        <p>
          Multimodal models ship an extra <code>mmproj</code> (multimodal
          projection) file alongside the main GGUF. The browser detects these
          by filename and lists them separately. Download both the main GGUF
          and the mmproj, then point the model profile&apos;s{" "}
          <strong>MMPROJ Path</strong> at the mmproj file and enable image
          input.
        </p>

        {/* Pull to remote Ollama */}
        <DocHeading level={2}>Pull to a Remote Ollama Server</DocHeading>

        <p>
          The browser can also push a HuggingFace GGUF directly to a remote{" "}
          <a href="/docs/ollama">Ollama</a> instance instead of downloading it
          to this device. The file lands on the Ollama host (not in the app's
          models directory), and is served from there through the Ollama
          provider.
        </p>

        <DocHeading level={3}>Choosing the destination</DocHeading>

        <p>
          The model page has a destination picker with two sections:{" "}
          <strong>On this device</strong> (the default, labelled{" "}
          <em>Local library</em>) and <strong>Remote Ollama</strong>, which
          lists every provider credential configured with the{" "}
          <code>ollama</code> provider. Selecting one of those Ollama
          credentials switches the browser into <strong>Ollama mode</strong>.
          If you have no Ollama providers configured yet, the picker links you
          to <strong>Settings → Providers</strong> to add one.
        </p>

        <DocHeading level={3}>What changes in Ollama mode</DocHeading>

        <ul>
          <li>
            The <strong>Recommended settings</strong> tab is hidden and a
            notice is shown in its place. Hardware-aware runability scoring is
            disabled, because the model will run on the Ollama host&apos;s
            hardware, which the app cannot inspect.
          </li>
          <li>
            The files panel still lists every <code>.gguf</code> file in the
            repo, and tapping a file queues it. The local destination path,
            mmproj auto-creation, and create-model-on-finish flows do not
            apply.
          </li>
        </ul>

        <DocHeading level={3}>How the model reference is built</DocHeading>

        <p>
          When you queue a file in Ollama mode, the app constructs a HuggingFace
          model reference of the form:
        </p>

        <p>
          <code>hf.co/&lt;owner&gt;/&lt;repo&gt;:&lt;quantization&gt;</code>
        </p>

        <p>
          The quantization tag is parsed from the chosen GGUF filename (for
          example <code>Q4_K_M</code>). If the file has no detectable
          quantization tag, the colon and tag are omitted and Ollama pulls the
          repo&apos;s default. This is the same{" "}
          <code>hf.co/...</code> ref form that <code>ollama pull</code>{" "}
          understands natively, so the remote server resolves and fetches the
          GGUF itself.
        </p>

        <DocHeading level={3}>How the pull runs</DocHeading>

        <p>
          The pull is dispatched through the{" "}
          <code>ollama_pull_model</code> Tauri command. It posts to the
          credential&apos;s <code>api/pull</code> endpoint with{" "}
          <code>stream: true</code>, and the streamed status, completed, and
          total byte counts are forwarded into the regular download queue as a
          synthetic item (the queue kind is set to <code>ollama</code>).
        </p>

        <p>
          That means an Ollama pull appears in the same queue panel as local
          GGUF downloads, with live progress, a sampled speed, and a cancel
          control. Cancelling sends a cancellation signal to the streaming
          pull; the partial state of the model on the Ollama host is up to
          Ollama itself.
        </p>

        <Callout type="info" title="The file is not on your device">
          A successful Ollama pull does not produce a file in the app&apos;s
          models directory. There is nothing to point a llama.cpp profile at.
          To use the pulled model, chat against it through the Ollama
          provider you pulled it to (see the{" "}
          <a href="/docs/ollama">Ollama provider doc</a>).
        </Callout>

        <Callout type="warning" title="Resolution is up to Ollama">
          Ollama resolves the <code>hf.co/owner/repo:quant</code> reference on
          the host. Repos that Ollama cannot resolve (for example, some
          sharded multi-file GGUFs, or files behind gated access without
          matching credentials on the host) will fail at the remote end. The
          app surfaces the error returned by the Ollama server.
        </Callout>

        {/* Installed Models */}
        <DocHeading level={2}>Installed Models</DocHeading>

        <p>
          The <strong>Installed Models</strong> page lists every GGUF file the
          app has indexed in its models directory. It opens each file briefly
          to read GGUF metadata and shows:
        </p>

        <ul>
          <li>Filename, model ID, and absolute file path</li>
          <li>Architecture and parameter size</li>
          <li>Context length (if the GGUF advertises one)</li>
          <li>File size</li>
          <li>Whether the file is an LLM or an mmproj projector</li>
        </ul>

        <p>
          You can sort by parameters, architecture, context length, file size,
          or filename, and search by name or architecture. From each row you
          can copy the file path, delete the file, or refresh the inventory.
        </p>

        {/* llama.cpp engine */}
        <DocHeading level={2}>llama.cpp (Local Engine)</DocHeading>

        <p>
          The local engine wraps the llama.cpp C++ library via Rust bindings
          (no separate server process). It runs entirely on desktop builds; the
          mobile builds of LettuceAI do not currently ship a local inference
          engine.
        </p>

        <DocHeading level={3}>Setting up a local model</DocHeading>

        <ol>
          <li>Download a GGUF model from the browser.</li>
          <li>
            Go to <strong>Settings → Models → Add Model</strong>.
          </li>
          <li>
            Choose <strong>Local (llama.cpp)</strong> as the provider and pick
            your GGUF file.
          </li>
          <li>
            Adjust advanced settings if needed, or apply one of the quick
            presets (see below).
          </li>
        </ol>

        <Callout>
          The first load may take a moment while weights are mapped, layers are
          allocated, and the context is built. Subsequent loads of the same
          file are usually faster.
        </Callout>

        <DocHeading level={3}>Chat templates</DocHeading>

        <p>
          Chat templates format your messages before they reach the model. The
          engine resolves the template in this order on every request:
        </p>

        <ol>
          <li>
            <strong>Override</strong>: if the model profile has a non-empty{" "}
            <strong>Chat Template Override</strong> (a raw Jinja template), it
            is used.
          </li>
          <li>
            <strong>Embedded GGUF</strong>: otherwise, if the GGUF file has an
            embedded chat template, that is used.
          </li>
          <li>
            <strong>Preset name</strong>: only if both of the above are
            missing, the engine tries the <strong>Chat Template Preset</strong>{" "}
            (a name passed through to llama.cpp, for example <code>chatml</code>
            ).
          </li>
        </ol>

        <p>
          The preset dropdown in the model profile ships these named options:
        </p>

        <ul>
          <li>
            <code>auto</code>: do not send a preset hint (relies on the
            embedded template).
          </li>
          <li>
            <code>chatml</code>, <code>llama2</code>, <code>llama3</code>,{" "}
            <code>mistral-v1</code>, <code>vicuna</code>, <code>gemma</code>
          </li>
        </ul>

        <p>
          Templates are applied through the OpenAI-compatible chat template
          path with <code>use_jinja = true</code>, so models that ship Jinja
          templates with tool-call support work out of the box.
        </p>

        <DocHeading level={3}>Sampler profiles</DocHeading>

        <p>
          Sampler profiles set baseline temperature, top-p, top-k, min-p,
          typical-p, and penalty values. Any field you fill in on the profile
          overrides the corresponding default.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Profile</th>
              <th className="text-left py-2 px-4">Defaults</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Balanced</td>
              <td className="py-2 px-4">
                temp 0.80, top-p 0.95, top-k 40, min-p 0.05, frequency penalty
                0.15
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Creative</td>
              <td className="py-2 px-4">
                temp 0.95, top-p 0.98, top-k 80, min-p 0.02, presence penalty
                0.25
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Stable</td>
              <td className="py-2 px-4">
                temp 0.55, top-p 0.90, top-k 32, min-p 0.08, typical-p 0.97,
                frequency penalty 0.20
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Reasoning</td>
              <td className="py-2 px-4">
                temp 0.35, top-p 0.90, top-k 24, typical-p 0.95, frequency
                penalty 0.10
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>Sampler order</DocHeading>

        <p>
          The engine builds a chained sampler in a configurable order. The
          default chain is:
        </p>

        <p>
          <code>
            penalties, grammar, top_k, top_p, min_p, dry, typical, temp
          </code>
        </p>

        <p>
          A final distribution stage is appended automatically (a random
          distribution sampler when temperature &gt; 0, otherwise a greedy
          sampler). You can reorder the stages from the{" "}
          <strong>Sampler Order</strong> editor on the model profile. Unknown
          or duplicate stages are dropped, and any default stage you omit is
          appended at the end.
        </p>

        <DocHeading level={3}>Quick presets</DocHeading>

        <p>
          The Performance section of the model profile exposes four
          single-tap presets that pre-fill batch size, KV cache type, KQV
          offload, and flash attention:
        </p>

        <ul>
          <li>
            <strong>Balanced</strong>: batch 512, KV q8_0, KQV on, flash
            attention auto
          </li>
          <li>
            <strong>Throughput</strong>: batch 1024, KV f16, KQV on, flash
            attention enabled
          </li>
          <li>
            <strong>VRAM Saver</strong>: batch 512, KV q4_k, KQV on, flash
            attention enabled
          </li>
          <li>
            <strong>CPU + RAM</strong>: batch 256, KV q8_0, KQV off, flash
            attention auto
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
              <td className="py-2 px-4 font-medium">Context Length</td>
              <td className="py-2 px-4">0 to 262,144</td>
              <td className="py-2 px-4">
                Maximum prompt + generation tokens kept in the KV cache. 0
                falls back to the model default.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">GPU Layers</td>
              <td className="py-2 px-4">0 to 512</td>
              <td className="py-2 px-4">
                Number of transformer layers offloaded to GPU. 0 runs entirely
                on CPU. Disabled on CPU-only backends.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Threads</td>
              <td className="py-2 px-4">1 to 256</td>
              <td className="py-2 px-4">CPU threads for token generation.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Batch Threads</td>
              <td className="py-2 px-4">1 to 256</td>
              <td className="py-2 px-4">
                CPU threads for prompt (batch) evaluation.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Batch Size</td>
              <td className="py-2 px-4">1 to 8192</td>
              <td className="py-2 px-4">
                Tokens processed per batch during prefill. Larger means faster
                prompt processing if memory allows.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Offload KQV</td>
              <td className="py-2 px-4">Auto / On / Off</td>
              <td className="py-2 px-4">
                Place the KV cache and KQV ops on GPU. Forced off on CPU-only
                backends.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Flash Attention</td>
              <td className="py-2 px-4">Auto / Enabled / Disabled</td>
              <td className="py-2 px-4">
                Memory-efficient attention kernel. Auto lets the engine decide
                per backend.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={3}>KV cache type</DocHeading>

        <p>
          The KV cache stores keys and values for past tokens. A smaller cache
          type lowers VRAM use at a small quality cost. The model profile
          dropdown ships these choices:
        </p>

        <ul>
          <li>
            <code>auto</code>: model default (recommended)
          </li>
          <li>
            <code>f16</code>: full precision, highest VRAM
          </li>
          <li>
            <code>q8_0</code> (recommended balance), <code>q8_1</code>
          </li>
          <li>
            <code>q6_k</code>
          </li>
          <li>
            <code>q5_k</code>, <code>q5_1</code>, <code>q5_0</code>
          </li>
          <li>
            <code>q4_k</code>, <code>q4_1</code>, <code>q4_0</code>
          </li>
          <li>
            <code>q3_k</code>
          </li>
          <li>
            <code>q2_k</code>: maximum VRAM saving
          </li>
        </ul>

        <DocHeading level={3}>Full SWA Cache</DocHeading>

        <p>
          Some models (for example Gemma) use sliding-window attention, where
          only a recent window of tokens is normally kept in the cache. The{" "}
          <strong>Full SWA Cache</strong> toggle (in the model&apos;s{" "}
          <strong>Runtime</strong> tab, under Layer Placement) keeps the entire
          attention window resident instead. This improves recall over long
          conversations, but at a high VRAM cost. Leave it off unless you have
          VRAM to spare. It is off by default.
        </p>

        <DocHeading level={3}>Faster generation with MTP (speculative decoding)</DocHeading>

        <p>
          Multi-Token Prediction (MTP) is a speculative decoding feature that
          can speed up local generation. A small, fast &quot;draft&quot; predicts
          several tokens ahead and the main model verifies them in one pass, so
          more tokens come out per step when the guesses are right. There is no
          quality loss: any token the main model would not have produced is
          rejected.
        </p>

        <p>
          Turn it on in the model&apos;s <strong>Runtime</strong> tab under{" "}
          <strong>Multi-Token Prediction</strong>. When enabled, two controls
          appear:
        </p>

        <ul>
          <li>
            <strong>Draft Tokens</strong>: how many tokens the drafter proposes
            per step (1 to 8, default 4).
          </li>
          <li>
            <strong>MTP Draft File</strong>: an optional external draft GGUF.
            Leave it on <em>Auto-discover</em> to pick up a matching{" "}
            <code>mtp-*.gguf</code> sidecar next to your model, or use{" "}
            <strong>Select from library</strong> to choose a downloaded draft
            file.
          </li>
        </ul>

        <p>
          The drafter is sourced automatically. If the model file already ships
          bundled MTP layers (so-called &quot;nextn&quot; layers), those are used
          directly and no separate file is needed. Otherwise the app looks for
          the external draft file described above. Gemma-style shared-assistant
          drafters are detected automatically. If MTP is enabled but no usable
          drafter is found, the model simply runs without it. MTP is also
          skipped automatically for requests that include images.
        </p>

        <Callout type="info" title="No draft model? No problem">
          MTP only helps when a compatible drafter is available. Many newer
          GGUF releases bundle the draft layers; others publish a small{" "}
          <code>mtp-*.gguf</code> sidecar in the same HuggingFace repo that you
          can download alongside the main file.
        </Callout>

        <DocHeading level={3}>Reasoning and thinking</DocHeading>

        <p>
          For models that produce a hidden reasoning or &quot;thinking&quot;
          stream, LettuceAI separates that stream from the final answer
          automatically. It recognizes the common tag styles
          (<code>&lt;think&gt;</code>, <code>&lt;thinking&gt;</code>,{" "}
          <code>&lt;reasoning&gt;</code>) as well as Gemma channel-style tags,
          and no setup is required.
        </p>

        <p>
          The model&apos;s <strong>Reasoning</strong> tab has a{" "}
          <strong>Force send thinking state</strong> toggle. Normally the app
          omits the thinking flag and lets the model decide. Some local models
          default to thinking when no value is sent; turning this on makes the
          app send the flag explicitly so reasoning behaves as expected. It is
          off by default.
        </p>

        <DocHeading level={3}>Automatic memory fallback</DocHeading>

        <p>
          When a model nearly fits but the chosen context or GPU layers would
          run out of memory, the engine does not just fail. It retries with a
          smaller context or batch size, moves the KV cache from VRAM to system
          RAM, reduces how many layers are offloaded to the GPU, and as a last
          resort falls back to running on CPU. The goal is to get the model
          running instead of erroring out.
        </p>

        <p>
          If you would rather the engine attempt exactly the settings you
          entered and fail otherwise, enable <strong>Strict Mode</strong> on the
          model. This bypasses the automatic fallbacks (lowering GPU layers,
          clamping context or batch, or switching to CPU). It is off by default
          and intended for advanced users tuning a known-good configuration.
        </p>

        <DocHeading level={3}>Sampling parameters</DocHeading>

        <p>
          On top of the profile defaults, the model page exposes individual
          overrides for temperature, top-p, top-k, min-p, typical-p, frequency
          penalty, presence penalty, and the DRY repetition sampler (multiplier,
          base, allowed length, penalty last-N window, and sequence breakers).
          The DRY sampler is only active when its multiplier is &gt; 0.
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
              <td className="py-2 px-4 font-medium">Seed</td>
              <td className="py-2 px-4">0 to 2,147,483,647</td>
              <td className="py-2 px-4">
                Fixed seed for reproducible output. Empty means a random seed
                per run.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Min-P</td>
              <td className="py-2 px-4">0 to 1</td>
              <td className="py-2 px-4">
                Drops tokens whose probability is below this fraction of the
                top token&apos;s probability.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Typical-P</td>
              <td className="py-2 px-4">0 to 1</td>
              <td className="py-2 px-4">
                Locally typical sampling threshold. Keeps tokens close to the
                expected information content.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">RoPE Freq Base</td>
              <td className="py-2 px-4">0 to 1,000,000</td>
              <td className="py-2 px-4">
                Base frequency for rotary embeddings. Used for context-length
                extension.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">RoPE Freq Scale</td>
              <td className="py-2 px-4">0 to 10</td>
              <td className="py-2 px-4">
                Scale factor for RoPE. Values below 1 extend the effective
                context window.
              </td>
            </tr>
          </tbody>
        </table>

        <Callout title="Advanced users only" type="warning">
          RoPE settings extend context beyond what the model was trained for.
          Changing them without understanding the architecture can produce
          garbage output. Leave them empty (auto) unless you know what you are
          doing.
        </Callout>

        <DocHeading level={3}>Vision support</DocHeading>

        <p>
          Multimodal models load through an mmproj projector. To enable vision
          on a llama.cpp profile:
        </p>

        <ol>
          <li>
            Download the matching <code>mmproj</code> file from the same
            HuggingFace repo.
          </li>
          <li>
            Set the model profile&apos;s <strong>MMPROJ Path</strong> to point
            at it.
          </li>
          <li>
            Enable <strong>Image</strong> in the model&apos;s input scopes.
          </li>
        </ol>

        <p>
          Inline images in chat are decoded and normalized to PNG before being
          sent through the multimodal pipeline, so JPEG and other formats are
          accepted as input.
        </p>

        <DocHeading level={3}>Runtime report</DocHeading>

        <p>
          After loading or running a model, LettuceAI stores a runtime report
          on the profile. It captures the values the engine actually used
          (which may differ from your requested settings if fallbacks kicked
          in), including:
        </p>

        <ul>
          <li>Requested vs actual context length and batch size</li>
          <li>Requested vs actual GPU layers offloaded</li>
          <li>Actual KV cache type and KQV offload mode</li>
          <li>Flash attention policy and backend path used</li>
          <li>
            Whether smart GPU layer fallback, KQV fallback, or context fallback
            activated
          </li>
          <li>Vision request vs vision actually active, plus image count</li>
          <li>Tokens per second from the most recent generation</li>
        </ul>

        <p>
          The report appears in the model&apos;s <strong>Runtime</strong> tab
          under <strong>Last runtime report</strong>, with a plain-language
          status such as &quot;Run succeeded&quot;, &quot;CPU fallback
          recovered&quot;, or &quot;Run failed&quot;. If the engine had to fall
          back to a CPU-safe context to get the model running, an{" "}
          <strong>Apply working config</strong> button lets you save those
          recovered settings so future runs reuse them directly.
        </p>

        {/* Local runtime defaults */}
        <DocHeading level={2}>Local Runtime Defaults & Model Storage</DocHeading>

        <p>
          From <strong>Settings → Models</strong> you can open{" "}
          <strong>Local Runtime Defaults</strong> (&quot;Engine setup and
          calculator baselines&quot;). It holds settings that apply across all
          your local models rather than to one profile.
        </p>

        <DocHeading level={3}>Calculator baselines</DocHeading>

        <p>
          The <strong>llama.cpp Defaults</strong> section sets the assumptions
          the runability calculator uses when it scores models in the browser:
        </p>

        <ul>
          <li>
            <strong>Default Context Length</strong>: the context size assumed
            when scoring. Leave it empty to use 8192.
          </li>
          <li>
            <strong>Default KV Cache Quant</strong>: the KV cache type assumed
            when scoring. <code>Auto</code> behaves like <code>f16</code>.
          </li>
        </ul>

        <p>
          These only change how scores are estimated; they do not change how any
          individual model actually runs.
        </p>

        <DocHeading level={3}>Where models are stored</DocHeading>

        <p>
          The <strong>Storage</strong> section shows the{" "}
          <strong>LLM Models Folder</strong>, the folder on this computer where
          downloaded GGUF files are kept. Use <strong>Change</strong> to pick a
          different folder (for example a larger drive), or{" "}
          <strong>Reset to default</strong> to go back.
        </p>

        <p>When you choose a new folder, the app asks what to do with your existing models:</p>

        <ul>
          <li>
            <strong>Move them to the new folder</strong> (recommended): your
            models are relocated and keep working automatically. The app also
            updates the saved paths so every model profile still points at the
            right file.
          </li>
          <li>
            <strong>Leave them where they are</strong>: only new downloads use
            the new folder; existing files stay put.
          </li>
        </ul>

        <Callout type="info" title="Pick an empty folder">
          A move is done safely: files are copied first and only deleted from
          the old location once the copy succeeds. If the destination already
          contains a model with the same name, the move is cancelled and you are
          asked to pick an empty folder.
        </Callout>

        {/* Import / Export */}
        <DocHeading level={2}>Model Import & Export</DocHeading>

        <p>
          A model profile (name, provider, and every advanced setting) can be
          exported and imported in two formats:
        </p>

        <ul>
          <li>
            <strong>JSON</strong>: a plain object that other LettuceAI
            installs can read.
          </li>
          <li>
            <strong>USC</strong> (Unified System Card): wraps the JSON
            payload with a schema header (<code>schema.name = &quot;USC&quot;</code>,{" "}
            <code>kind = &quot;model_profile&quot;</code>). The same USC wrapper
            is also used for lorebooks, chat templates, and prompt templates.
          </li>
        </ul>

        <p>
          On import, the parser auto-detects whether the file is a plain JSON
          profile or a USC envelope and unwraps it. A new model profile is
          created from the payload.
        </p>

        <Callout type="warning" title="Local files are not bundled">
          Exporting a llama.cpp profile does not include the GGUF or mmproj
          file. If you import the profile on a different device, you need to
          re-download those files and update the path fields.
        </Callout>

        {/* Tips */}
        <DocHeading level={2}>Tips</DocHeading>

        <ul>
          <li>
            Start with a Q4_K_M or Q5_K_M file if you are unsure. They sit in
            the runability sweet spot for most desktops.
          </li>
          <li>
            Check the runability score before downloading. An &quot;Excellent&quot; or
            &quot;Good&quot; label means the file should run on your hardware with
            current free memory.
          </li>
          <li>
            If the model loads but generates slowly, try lowering GPU layers,
            shrinking the context length, or switching the KV cache to{" "}
            <code>q8_0</code>.
          </li>
          <li>
            For vision models, remember to set the mmproj path and enable the
            image input scope. Without both, image messages will not reach the
            model.
          </li>
          <li>
            Read the runtime report after the first run to see whether the
            engine had to fall back (smart layer fallback, KQV fallback, or
            context fallback). The actual values are what the model used, not
            what you asked for.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
