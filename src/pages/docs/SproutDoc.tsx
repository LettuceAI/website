import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function SproutDoc() {
  return (
    <>
      <SEO
        title="Sprout Hardware Probe"
        description="Run Sprout on your Ollama machine so LettuceAI can judge model runnability against that machine's real GPU and memory."
        path="/docs/sprout"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Sprout Hardware Probe", path: "/docs/sprout" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Sprout Hardware Probe</DocHeading>

        <p>
          <strong>Sprout</strong> is a tiny open-source service you run on the
          machine that hosts your Ollama server. When you browse models in the{" "}
          <a href="/docs/model-browser">Model Browser</a> with a remote Ollama
          provider selected, LettuceAI asks Sprout for that machine's real GPU
          and memory specs, then scores model runnability and recommendations
          against the hardware that will actually run the model instead of the
          device you are holding.
        </p>

        <Callout title="Why it exists" type="info">
          When a model runs on a remote Ollama host, LettuceAI cannot see that
          host's hardware on its own. Without Sprout, the Model Browser hides
          runnability badges and recommendations in Ollama mode rather than
          showing numbers based on the wrong machine.
        </Callout>

        <p>
          Sprout is a single self-contained binary written in Rust. It does not
          download, manage, or run models, and it never touches your chats. It
          answers one question: what GPUs and how much memory does this machine
          have right now?
        </p>

        <DocHeading level={2}>Installing Sprout</DocHeading>

        <p>
          Grab a prebuilt binary from the{" "}
          <a
            href="https://github.com/LettuceAI/Sprout/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub releases page
          </a>{" "}
          for your platform, or build from source with{" "}
          <code>cargo build --release</code>. Install it on the machine that
          runs Ollama, not on the device running LettuceAI.
        </p>

        <p>
          On Linux, the bundled <code>install.sh</code> copies the binary to{" "}
          <code>~/.local/bin</code> and can register a systemd user service so
          Sprout starts automatically and restarts on failure:
        </p>

        <pre>
          <code>
            systemctl --user status sprout{"\n"}
            systemctl --user restart sprout{"\n"}
            journalctl --user -u sprout -f
          </code>
        </pre>

        <Callout>
          If the machine should keep serving Sprout while you are logged out,
          enable lingering once:{" "}
          <code>sudo loginctl enable-linger $USER</code>
        </Callout>

        <DocHeading level={3}>First run</DocHeading>

        <p>
          On first launch, Sprout creates a config file and generates a random
          32-character API key, which it prints to the console. Copy that key;
          LettuceAI will need it. The config file lives at:
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Platform</th>
              <th className="text-left py-2 px-4">Config path</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Linux</td>
              <td className="py-2 px-4">
                <code>~/.config/sprout/config.toml</code>
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">macOS</td>
              <td className="py-2 px-4">
                <code>~/Library/Application Support/sprout/config.toml</code>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Windows</td>
              <td className="py-2 px-4">
                <code>%APPDATA%\sprout\config.toml</code>
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={2}>Opening Sprout to your LAN</DocHeading>

        <p>
          By default Sprout binds to <code>127.0.0.1:8477</code>, which means
          only the machine itself can reach it. Your phone or another computer
          on the network cannot. To accept LAN connections:
        </p>

        <ol>
          <li>
            Open <code>config.toml</code> and change the host line to{" "}
            <code>host = "0.0.0.0"</code>
          </li>
          <li>
            Restart Sprout (e.g. <code>systemctl --user restart sprout</code>).
            The config is read once at startup, so edits do nothing until a
            restart.
          </li>
          <li>
            If the machine runs a firewall, allow inbound TCP on port{" "}
            <code>8477</code>
          </li>
          <li>
            From another device, verify with{" "}
            <code>http://&lt;machine-ip&gt;:8477/ping</code>, which should
            return a small JSON blob with the Sprout version
          </li>
        </ol>

        <Callout type="warning" title="Keep it on your LAN">
          Sprout only reports hardware specs and requires the API key for
          those, but there is no rate limiting or IP allowlist. Expose it to
          your local network, not the open internet. If you need remote access,
          put it behind a VPN such as WireGuard or Tailscale.
        </Callout>

        <DocHeading level={3}>Configuration reference</DocHeading>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Key</th>
              <th className="text-left py-2 px-4">Default</th>
              <th className="text-left py-2 px-4">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">host</td>
              <td className="py-2 px-4">
                <code>127.0.0.1</code>
              </td>
              <td className="py-2 px-4">
                Bind address. Use <code>0.0.0.0</code> to accept LAN
                connections.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">port</td>
              <td className="py-2 px-4">
                <code>8477</code>
              </td>
              <td className="py-2 px-4">Listen port.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">api_key</td>
              <td className="py-2 px-4">generated</td>
              <td className="py-2 px-4">
                Bearer token clients must send to read specs. Regenerated if
                left empty.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">require_auth</td>
              <td className="py-2 px-4">
                <code>true</code>
              </td>
              <td className="py-2 px-4">
                Set to <code>false</code> to serve specs without a token. Not
                recommended.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">
                tls_cert_path / tls_key_path
              </td>
              <td className="py-2 px-4">unset</td>
              <td className="py-2 px-4">
                Optional PEM certificate and key. Set both to serve HTTPS
                instead of HTTP.
              </td>
            </tr>
          </tbody>
        </table>

        <DocHeading level={2}>Connecting from LettuceAI</DocHeading>

        <ol>
          <li>
            Go to <strong>Settings → Providers</strong> and open your Ollama
            provider
          </li>
          <li>
            Turn on <strong>Use Sprout for Runnability</strong>
          </li>
          <li>
            Enter the Sprout URL, e.g. <code>http://192.168.1.10:8477</code>
          </li>
          <li>
            Paste the API key that Sprout printed on first run into{" "}
            <strong>Sprout API Key</strong>
          </li>
        </ol>

        <p>
          From then on, when that Ollama provider is selected in the Model
          Browser, runnability badges and hardware recommendations come back
          and reflect the Ollama machine's GPU and memory.
        </p>

        <Callout type="info" title="Per-provider setting">
          Sprout is configured on each Ollama provider individually. If you
          have two Ollama servers on different machines, each one points at the
          Sprout instance running on its own host.
        </Callout>

        <DocHeading level={2}>How it works</DocHeading>

        <p>Sprout exposes three read-only HTTP endpoints:</p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Endpoint</th>
              <th className="text-left py-2 px-4">Auth</th>
              <th className="text-left py-2 px-4">Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                <code>GET /health</code>
              </td>
              <td className="py-2 px-4">none</td>
              <td className="py-2 px-4">
                Plain text <code>ok</code>, for liveness checks.
              </td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">
                <code>GET /ping</code>
              </td>
              <td className="py-2 px-4">none</td>
              <td className="py-2 px-4">
                Service name and version, for discovery.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">
                <code>GET /specs</code>
              </td>
              <td className="py-2 px-4">Bearer token</td>
              <td className="py-2 px-4">
                The full hardware snapshot LettuceAI consumes.
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          The <code>/specs</code> response includes total and available system
          RAM, CPU name and core count, whether the machine uses unified
          memory, and one entry per GPU with its vendor, backend (CUDA, Vulkan,
          or Metal), total and free VRAM, and whether it is a discrete or
          integrated GPU. NVIDIA cards are read through NVML, AMD and Intel
          through Vulkan, and Apple GPUs through Metal.
        </p>

        <p>
          LettuceAI validates the payload's <code>schemaVersion</code> (currently{" "}
          <code>1</code>) before trusting it, then derives the numbers the
          runnability engine needs: available RAM, the largest pool of free
          VRAM on a discrete GPU (falling back to integrated GPUs on
          unified-memory machines), and whether GPU offload is possible at all.
          Those feed the same scoring used for local models, so the badges mean
          the same thing everywhere.
        </p>

        <DocHeading level={3}>Security model</DocHeading>

        <ul>
          <li>
            Only <code>/specs</code> requires authentication, and the token
            check uses a constant-time comparison
          </li>
          <li>
            The config file is written with owner-only permissions on Unix
            because it holds the API key
          </li>
          <li>
            With <code>tls_cert_path</code> and <code>tls_key_path</code> set,
            Sprout serves HTTPS. Use a certificate the connecting device
            trusts, then give LettuceAI an <code>https://</code> Sprout URL.
          </li>
        </ul>

        <DocHeading level={2}>Troubleshooting</DocHeading>

        <ul>
          <li>
            <strong>No runnability badges in Ollama mode</strong>: make sure
            the toggle is on for the provider you actually selected in the
            Model Browser, and that the Sprout URL is non-empty.
          </li>
          <li>
            <strong>"Failed to reach Sprout"</strong>: Sprout is not running,
            still bound to <code>127.0.0.1</code>, or blocked by a firewall.
            Test <code>/ping</code> from the device running LettuceAI.
          </li>
          <li>
            <strong>401 Unauthorized</strong>: the API key in the provider
            settings does not match the <code>api_key</code> in Sprout's
            config.
          </li>
          <li>
            <strong>"Unsupported Sprout schema version"</strong>: the app and
            Sprout disagree on the payload format. Update whichever side is
            older.
          </li>
          <li>
            <strong>Edits not taking effect</strong>: Sprout reads its config
            only at startup. Restart the service after any change.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
