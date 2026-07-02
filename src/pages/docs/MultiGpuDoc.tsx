import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function MultiGpuDoc() {
  return (
    <>
      <SEO
        title="Multi-GPU Local Models"
        description="Split local llama.cpp models across multiple GPUs with automatic layer distribution, KV cache placement, and per-scenario tuning."
        path="/docs/multi-gpu"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Multi-GPU Local Models", path: "/docs/multi-gpu" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Multi-GPU Local Models</DocHeading>

        <p>
          On desktop, the built-in llama.cpp engine can split a local model
          across two or more graphics cards. The app decides how many layers
          each GPU gets, keeps enough VRAM in reserve for the context, and lets
          you choose where the KV cache lives. Models that are too big for any
          single card can run fully on GPU instead of spilling to the CPU.
        </p>

        <Callout title="Requirements" type="info">
          Multi-GPU needs <strong>two or more discrete GPUs</strong> visible to
          a Vulkan or CUDA backend. Integrated GPUs are never used for
          multi-GPU, and the toggle stays disabled until at least two eligible
          cards are detected. For single-GPU offload basics, see the{" "}
          <a href="/docs/model-browser">Model Browser &amp; Local Inference</a>{" "}
          page.
        </Callout>

        <DocHeading level={2}>Where the settings live</DocHeading>

        <p>
          There are two places, and they layer on top of each other:
        </p>

        <ul>
          <li>
            <strong>Settings → Models → your model → Performance</strong>: the
            full per-model control set. Multi-GPU here can be set to{" "}
            <strong>Inherit</strong>, <strong>Enabled</strong>, or{" "}
            <strong>Disabled</strong>. Inherit means the global default
            applies.
          </li>
          <li>
            <strong>Local Runtime Defaults</strong> (in Settings): the global
            fallback. It carries the multi-GPU switch, device selection,
            distribution mode, KV placement, main GPU, and the priority VRAM
            limit. Manual per-GPU layer counts and the single-GPU device
            override exist only in the model editor.
          </li>
        </ul>

        <DocHeading level={2}>Turning it on</DocHeading>

        <ol>
          <li>
            Open <strong>Settings → Models</strong>, pick a llama.cpp model,
            and go to the <strong>Performance</strong> section
          </li>
          <li>
            Set <strong>Multi-GPU</strong> to Enabled (or enable it once in
            Local Runtime Defaults and leave models on Inherit)
          </li>
          <li>
            In <strong>GPU Devices</strong>, tick at least two cards. Each
            entry shows its backend and free/total VRAM.
          </li>
          <li>
            Pick a <strong>Distribution</strong> mode and a{" "}
            <strong>KV cache</strong> placement (both explained below)
          </li>
        </ol>

        <p>
          Below the device list the editor shows an estimated placement, e.g.
          &quot;Estimated: 28 + 20 · 48 layers on GPU&quot;, so you can see the
          planned split before loading anything.
        </p>

        <DocHeading level={2}>How the split works</DocHeading>

        <p>
          The engine always splits by <strong>whole layers</strong>: each GPU
          holds a contiguous slice of the model's transformer layers, and
          tokens flow through the cards in sequence. This keeps PCIe traffic
          low compared to splitting individual tensors across cards. Each
          layer's slice of the KV cache lives on the same GPU as that layer.
        </p>

        <DocHeading level={3}>Distribution modes</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Mode</th>
              <th className="text-left py-2 px-4">What it does</th>
              <th className="text-left py-2 px-4">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Balanced</td>
              <td className="py-2 px-4">
                Even split across the selected GPUs. The default.
              </td>
              <td className="py-2 px-4">Identical cards.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Proportional to VRAM</td>
              <td className="py-2 px-4">
                Each GPU's share is weighted by its free VRAM, and the total is
                capped by what the cards can actually hold.
              </td>
              <td className="py-2 px-4">Mismatched cards.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Priority fill</td>
              <td className="py-2 px-4">
                Fills the first selected GPU up to an optional VRAM limit, then
                overflows to the next. The first GPU becomes the main device.
              </td>
              <td className="py-2 px-4">
                Keeping most of the model on your fastest card, or capping how
                much VRAM the primary card gives up.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Manual per-GPU</td>
              <td className="py-2 px-4">
                You type the exact layer count for each GPU. The editor
                validates the sum against the model's total layer count.
              </td>
              <td className="py-2 px-4">
                Full control, unusual setups, working around a flaky card.
              </td>
            </tr>
          </tbody>
        </table>

        <Callout type="warning" title="Manual mode has no safety net">
          Automatic modes back off and retry with fewer layers if a load runs
          out of memory. Manual counts are used as-is: if you over-assign a
          card, the load fails and falls back to CPU. The editor warns before
          loading when your assignment exceeds a card's reported VRAM.
        </Callout>

        <DocHeading level={3}>KV cache placement</DocHeading>

        <p>
          The KV cache is the memory that holds your conversation context, and
          it grows with context length. Where it lives is a speed/VRAM
          trade-off:
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Placement</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Auto</td>
              <td className="py-2 px-4">
                Let the planner decide. KV stays on GPU when it fits, otherwise
                it moves to system RAM.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Split with layers</td>
              <td className="py-2 px-4">
                KV lives on the GPUs, divided the same way as the layers.
                Fastest option, uses VRAM.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">System RAM</td>
              <td className="py-2 px-4">
                Keeps the KV cache in system RAM to free VRAM for more layers.
                Attention runs slower.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Prefer main GPU</td>
              <td className="py-2 px-4">
                Routes shared scratch buffers to one chosen main GPU. Each
                layer's KV still stays on that layer's card. Shows a{" "}
                <strong>Main GPU</strong> picker when selected.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={2}>The smart offloader</DocHeading>

        <p>
          You normally never set a layer count yourself. When GPU layers are
          on Auto, the planner reads the model's real metadata (size, layer
          count, attention shape) and works out how many layers fit:
        </p>

        <ul>
          <li>
            It budgets <strong>90 percent</strong> of usable VRAM and reserves
            extra for runtime scratch buffers, so loads do not sit at the edge
            of an out-of-memory failure
          </li>
          <li>
            KV cache cost is priced <strong>per layer</strong> using your
            context length and KV quantization, so a huge context correctly
            shrinks the number of layers that fit
          </li>
          <li>
            In multi-GPU mode the budget is the <strong>combined capacity</strong>{" "}
            of all selected cards, and the per-device shares respect each
            card's own limit
          </li>
          <li>
            If a load still fails, automatic modes retry down a ladder of
            smaller layer counts before falling back to CPU. If the weights fit
            but the context does not, the engine retries once at a KV-aware
            layer count instead of pushing the whole cache to RAM.
          </li>
        </ul>

        <p>
          Successful results are remembered per model and reused on the next
          load, but only while the configuration fingerprint matches: changing
          devices, distribution mode, KV placement, context bucket, or seeing
          the available VRAM shift by more than 5 percent forces a fresh
          estimate. Estimates are also recomputed once per app session.
        </p>

        <DocHeading level={2}>Single-GPU device override</DocHeading>

        <p>
          Separate from multi-GPU, each model has a <strong>GPU device</strong>{" "}
          picker that pins it to one specific card instead of the default
          device. Useful for running a small model on your second GPU while the
          first one stays free for games or another model.
        </p>

        <Callout type="info" title="Override wins">
          If a single-GPU device override is set, multi-GPU is ignored for that
          model. Enabling multi-GPU in the editor clears the override
          automatically.
        </Callout>

        <DocHeading level={2}>Recommended configurations</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Scenario</th>
              <th className="text-left py-2 px-4">Recommended setup</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Two identical cards (e.g. 2 × RTX 3090)
              </td>
              <td className="py-2 px-4">
                Balanced distribution, KV cache Split with layers. Leave
                everything else on Auto.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Mismatched cards (e.g. 24 GB + 8 GB)
              </td>
              <td className="py-2 px-4">
                Proportional to VRAM so the bigger card carries most of the
                model. KV on Auto or Split.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                One fast card plus one slow card
              </td>
              <td className="py-2 px-4">
                Priority fill with the fast card first and no VRAM limit. Only
                the layers that do not fit overflow to the slow card.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Primary card also drives your display
              </td>
              <td className="py-2 px-4">
                Priority fill with a VRAM limit on the first GPU, sized to
                leave a few GB for the desktop and browser. Or untick the
                display card entirely.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Long conversations, VRAM is tight
              </td>
              <td className="py-2 px-4">
                KV cache in System RAM to spend all VRAM on layers, and
                consider a quantized KV type (q8 or q4) on the model's Runtime
                tab. Expect slower prompt processing.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                Small model alongside a game or a second model
              </td>
              <td className="py-2 px-4">
                Skip multi-GPU. Use the single-GPU device override to pin the
                model to the card you are not gaming on.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">
                A card misbehaves or you know better than the planner
              </td>
              <td className="py-2 px-4">
                Manual per-GPU with explicit counts. Watch the placement
                summary and keep each card under its reported free VRAM.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={2}>Good to know</DocHeading>

        <ul>
          <li>
            KV placement, main GPU, the priority limit, and manual layers only
            take effect while multi-GPU is actually active (enabled, two or
            more devices selected, no single-GPU override).
          </li>
          <li>
            On AMD ROCm backends the KV cache is kept in system RAM and flash
            attention is disabled; the KV placement choice is not honored
            there.
          </li>
          <li>
            If the pinned Main GPU is not among the selected devices, the pin
            is ignored and the distribution default applies.
          </li>
          <li>
            KV quantization and context length both change how many layers
            fit. If the estimate looks low, check those two first.
          </li>
          <li>
            After a load, the model's runtime report shows the requested vs
            actual layers per device and whether any fallback activated, which
            is the first place to look when performance seems off.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
