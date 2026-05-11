import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function HostApiDoc() {
  return (
    <>
      <SEO
        title="Host API"
        description="Expose your configured models as a local OpenAI-compatible HTTP server so other devices and apps on your network can use them."
        path="/docs/host-api"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Host API", path: "/docs/host-api" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Host API</DocHeading>
        <p>
          The Host API turns LettuceAI into a local OpenAI-compatible HTTP
          server. Other apps and devices on your network can point their
          OpenAI client at your machine and use any model you have configured
          in the app, with your provider credentials, your routing, and your
          rate limits.
        </p>
        <Callout>
          Nothing is exposed unless you explicitly enable the server, pick
          which models to share, and (recommended) set a bearer token.
        </Callout>

        <DocHeading level={2}>What it is</DocHeading>
        <p>
          Internally the server is a small Axum HTTP service that translates
          OpenAI-style requests into calls against your configured providers.
          Only models you mark as exposed are visible. Each exposed model
          gets its own API model ID (the name other clients use) and an
          optional display label.
        </p>

        <DocHeading level={2}>Enabling the server</DocHeading>
        <p>
          Open <strong>Settings &gt; Host API</strong> and configure:
        </p>
        <ul>
          <li>
            <strong>Enable API Server.</strong> Master on/off toggle.
          </li>
          <li>
            <strong>Bind address.</strong> Defaults to <code>0.0.0.0</code> so
            other devices on your LAN can connect. Set it to{" "}
            <code>127.0.0.1</code> to limit access to the same machine.
          </li>
          <li>
            <strong>Port.</strong> Defaults to <code>3333</code>. Any port
            from 1 to 65535.
          </li>
          <li>
            <strong>Bearer token.</strong> A shared secret clients must send
            in the <code>Authorization</code> header. Use the{" "}
            <strong>Generate Token</strong> button to produce a random
            48-character hex token.
          </li>
          <li>
            <strong>Exposed models.</strong> Pick any text-capable models you
            have configured. For each one, set the API model ID (lowercased,
            dash-separated) and an optional friendly label.
          </li>
        </ul>
        <p>
          Press <strong>Apply &amp; Restart Server</strong> to save the config
          and start (or stop) the listener. The status banner at the top
          shows whether the server is running and the base URL clients should
          use.
        </p>
        <Callout type="warning" title="Set a token">
          With no token, anyone who can reach the bind address can use your
          models and burn your credits. Generate a token before exposing the
          server beyond <code>127.0.0.1</code>.
        </Callout>

        <DocHeading level={2}>Authentication</DocHeading>
        <p>
          Every request to <code>/v1/models</code> and{" "}
          <code>/v1/chat/completions</code> must include the bearer token:
        </p>
        <pre>
          <code>Authorization: Bearer YOUR_TOKEN</code>
        </pre>
        <p>
          The <code>/health</code> endpoint is open and reports the server
          status, whether auth is required, and the list of exposed model
          IDs.
        </p>

        <DocHeading level={2}>CORS</DocHeading>
        <p>
          The server returns permissive CORS headers (any origin, any
          method, any header), so browser-based clients on the same network
          can call it directly. The bearer token still gates access.
        </p>

        <DocHeading level={2}>Endpoints</DocHeading>
        <ul>
          <li>
            <code>GET /health</code>: status, exposed model IDs, auth info.
            No auth required.
          </li>
          <li>
            <code>GET /v1/models</code>: OpenAI-style model list of
            everything you have exposed.
          </li>
          <li>
            <code>POST /v1/chat/completions</code>: OpenAI-style chat
            completions. Supports <code>stream: true</code> for server-sent
            events.
          </li>
        </ul>

        <DocHeading level={2}>Streaming</DocHeading>
        <p>
          Set <code>stream: true</code> in the request body and the server
          replies with SSE chunks in the standard OpenAI format
          (<code>data: {`{...}`}</code> lines, ending with{" "}
          <code>data: [DONE]</code>). If the client sends{" "}
          <code>stream_options.include_usage</code>, a final usage chunk is
          emitted before the terminator. Keep-alive pings hold the
          connection open during slow upstream responses.
        </p>

        <DocHeading level={2}>Example: curl</DocHeading>
        <p>From another machine on your network:</p>
        <pre>
          <code>{`curl http://192.168.1.42:3333/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "my-exposed-model-id",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": false
  }'`}</code>
        </pre>

        <DocHeading level={2}>Example: OpenAI SDK</DocHeading>
        <p>
          Any OpenAI-compatible client works. Point its base URL at your
          machine and pass the bearer token as the API key:
        </p>
        <pre>
          <code>{`from openai import OpenAI

client = OpenAI(
    base_url="http://192.168.1.42:3333/v1",
    api_key="YOUR_TOKEN",
)

resp = client.chat.completions.create(
    model="my-exposed-model-id",
    messages=[{"role": "user", "content": "Hello"}],
)
print(resp.choices[0].message.content)`}</code>
        </pre>

        <DocHeading level={2}>How model IDs work</DocHeading>
        <p>
          The model ID a client sends is the <strong>API Model ID</strong>{" "}
          you set in the exposed-models list, not the underlying provider
          model name. This lets you rename things (for example, expose
          <code>claude-sonnet-4-5</code> as just <code>sonnet</code>) and
          swap the backend later without breaking client config.
        </p>

        <DocHeading level={2}>Stopping the server</DocHeading>
        <p>
          Toggle <strong>Enable API Server</strong> off and press{" "}
          <strong>Apply &amp; Restart Server</strong>. The listener shuts
          down immediately. Disabling does not lose your config: bind
          address, port, token, and exposed models stay saved for next time.
        </p>
      </motion.article>
    </>
  );
}
