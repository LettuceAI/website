
import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";

export function SystemPromptsDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>System Prompts</DocHeading>

      <p className="lead">
        In LettuceAI, a system prompt is only one part of a larger prompt
        system. The app builds chat instructions from structured templates,
        ordered prompt entries, runtime conditions, and injected context like
        scenes, lorebook matches, summaries, and memories.
      </p>

      <p>
        That distinction matters. You are not editing one static block that gets
        pasted forever. You are editing a prompt template that the app renders
        against the current character, persona, session, memory state, and chat
        mode.
      </p>

      <Callout type="info" title="Current direct-chat precedence">
        For normal direct chats, the base template currently resolves in this
        order: session override, then character template, then the app-wide
        default template.
      </Callout>

      <DocImage
        src={images.systemPrompts.templateSourceSelection}
        alt="Template source selection for system prompts"
        caption="Prompt templates can be assigned at different levels. For direct chat, the runtime resolves session override first, then character template, then the app-wide default."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[24rem] scale-[1.03] object-contain md:max-h-[26rem]"
      />

      <DocHeading level={2}>What the system actually is</DocHeading>
      <p>LettuceAI stores prompt templates in a database and renders them at runtime.</p>

      <ul>
        <li>
          A <strong>template</strong> is a saved prompt definition with content,
          ordered entries, and an optional condense flag.
        </li>
        <li>
          An <strong>entry</strong> is one prompt block with a role, injection
          mode, optional conditions, and optional image payload slots.
        </li>
        <li>
          A <strong>render pass</strong> replaces placeholders like <code>{"{{char.name}}"}</code>, <code>{"{{scene}}"}</code>, <code>{"{{context_summary}}"}</code>, and <code>{"{{key_memories}}"}</code>.
        </li>
        <li>
          A <strong>request builder</strong> then turns the rendered entries into
          provider-specific chat messages.
        </li>
      </ul>

      <p>
        The same system powers more than direct-chat roleplay. LettuceAI also
        ships internal protected templates for dynamic summary generation,
        dynamic memory maintenance, reply helper, group chat, avatar tools,
        scene generation, and design reference writing.
      </p>

      <DocHeading level={2}>How a normal chat prompt is assembled</DocHeading>
      <ol>
        <li>The app chooses a base template for the current session.</li>
        <li>
          It walks the template entries in order and checks whether each entry is
          active in the current context.
        </li>
        <li>
          It renders placeholders from the selected character, persona, scene,
          lorebook matches, memory state, and app settings.
        </li>
        <li>
          Entries that render to empty content are dropped instead of leaving
          dead sections behind.
        </li>
        <li>
          If important placeholders are missing, the engine can still append
          generic fallback blocks for context summary, key memories, or lorebook
          content.
        </li>
        <li>
          If the template has condense enabled, the rendered entries are merged
          into one final system message before the API request is built.
        </li>
      </ol>

      <Callout type="warning" title="Fallback is a safety net, not ideal placement">
        The runtime can rescue missing context blocks, but it appends them in a
        generic way. If you care about prompt structure, keep the placeholders
        you want and place them deliberately.
      </Callout>



<DocHeading level={2}>Templates are entry-based</DocHeading>
<p>
  The modern prompt editor is entry-first. That means you should think in
  blocks, not in one monolithic paragraph.
</p>

<p>
  A template is the container. Entries are the actual movable parts. The
  engine renders them in order, drops the ones that do not apply, and then
  injects the survivors according to their role and timing rules.
</p>

<table className="min-w-full text-sm my-6">
  <thead>
    <tr className="border-b border-border/50">
      <th className="text-left py-2 px-4">Layer</th>
      <th className="text-left py-2 px-4">What it means in practice</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border/10">
      <td className="py-2 px-4 font-medium">Template</td>
      <td className="py-2 px-4">A saved prompt configuration with content, entry order, and an optional condense flag.</td>
    </tr>
    <tr className="border-b border-border/10">
      <td className="py-2 px-4 font-medium">Entry</td>
      <td className="py-2 px-4">A single prompt block with its own role, position, depth, conditions, and optional image binding.</td>
    </tr>
    <tr>
      <td className="py-2 px-4 font-medium">Rendered output</td>
      <td className="py-2 px-4">The final runtime message list actually sent to the model after placeholder replacement and filtering.</td>
    </tr>
  </tbody>
</table>

<p>
  This structure is why LettuceAI can do things a raw textarea cannot do
  well: inject memory only when available, insert reminder entries into the
  chat stream, gate entries by conditions, and attach image payloads in
  special internal templates.
</p>

<DocHeading level={3}>What one entry can control</DocHeading>
<ul>
  <li><strong>Role</strong>: system, user, or assistant.</li>
  <li><strong>Position</strong>: relative, in-chat, conditional, or interval.</li>
  <li><strong>Depth</strong>: how far back from the end of the chat buffer an in-chat entry is placed.</li>
  <li><strong>Conditions</strong>: whether the entry should appear at all in the current runtime context.</li>
  <li><strong>Payload binding</strong>: optional image slots in scene and design-reference templates.</li>
</ul>

<p>
  That is the main mental model shift: you are not editing one prompt, you
  are editing a small prompt program.
</p>

<Callout type="info" title="Plain-text templates still work">
  If a template has content but no structured entries, the engine can wrap
  that content into a single system entry. So older raw templates still
  run, but they give up most of the modular behavior.
</Callout>

<p>
  For normal direct-chat roleplay, the shipped default template is already
  broken into sections like scenario, character definition, persona,
  lorebook, summary, memories, and instructions. Editing those as separate
  entries is usually safer than flattening everything into one long block.
</p>

<DocImage
  src={images.systemPrompts.entryStackOverview}
  alt="System prompt entry stack overview"
  caption="A template is a stack of entries, not one long text field. Order, enablement, and structure all matter at runtime."
  containerClassName="mx-auto max-w-4xl"
  className="mx-auto max-h-[28rem] scale-[1.04] object-contain md:max-h-[30rem]"
/>

<DocHeading level={2}>Injection rules</DocHeading>
<p>
  Injection is the rule set that decides whether an entry appears at all,
  where it appears, and what role it uses when the final API message list
  is built.
</p>

<DocHeading level={3}>1. An entry must survive activation first</DocHeading>
<p>
  Before position is even considered, the engine checks whether an entry
  is active in the current context.
</p>

<ul>
  <li>
    Disabled entries are skipped unless they are marked as protected
    system entries.
  </li>
  <li>
    If an entry has conditions, that condition tree is evaluated against
    the current runtime context.
  </li>
  <li>
    After rendering, entries that resolve to empty text are dropped.
  </li>
  <li>
    Scene-heavy entries can also be skipped entirely when there is no
    selected scene and no scene message to render against.
  </li>
</ul>

<DocHeading level={3}>2. There are four injection positions</DocHeading>
<table className="min-w-full text-sm my-6">
  <thead>
    <tr className="border-b border-border/50">
      <th className="text-left py-2 px-4">Mode</th>
      <th className="text-left py-2 px-4">What it does at runtime</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border/10">
      <td className="py-2 px-4 font-medium">Relative</td>
      <td className="py-2 px-4">Becomes part of the prompt stack before chat history is appended.</td>
    </tr>
    <tr className="border-b border-border/10">
      <td className="py-2 px-4 font-medium">In Chat</td>
      <td className="py-2 px-4">Always splices into the assembled chat-message list.</td>
    </tr>
    <tr className="border-b border-border/10">
      <td className="py-2 px-4 font-medium">Conditional</td>
      <td className="py-2 px-4">Splices into chat only when the current turn count is at least the configured minimum.</td>
    </tr>
    <tr>
      <td className="py-2 px-4 font-medium">Interval</td>
      <td className="py-2 px-4">Splices into chat only when the current turn count is a non-zero multiple of the configured interval.</td>
    </tr>
  </tbody>
</table>

<p>
  Relative entries and in-chat entries are partitioned into separate
  buckets. The direct-chat request builder emits relative entries first,
  then appends conversation history, then inserts in-chat entries into
  that history buffer.
</p>

<DocHeading level={3}>3. Relative means system-stack placement</DocHeading>
<p>
  Relative entries are emitted ahead of the live conversation window, in
  the same order they appear in the template.
</p>

<ul>
  <li>
    A relative entry with role <code>system</code> is mapped to the
    provider-specific system role.
  </li>
  <li>
    A relative entry with role <code>user</code> or <code>assistant</code>
    stays as that role in the outgoing message list.
  </li>
  <li>
    In normal roleplay templates, most core instruction sections are
    relative entries.
  </li>
</ul>

<Callout type="info" title="Condense changes everything">
  If condense mode is enabled, the engine merges every rendered entry into
  one final system entry before injection. That flattening step effectively
  removes in-chat placement, per-entry roles, and depth behavior for that
  template.
</Callout>

<DocHeading level={3}>4. In-chat insertion is depth-based from the end</DocHeading>
<p>
  In-chat, conditional, and interval entries all use the same insertion
  algorithm.
</p>

<ol>
  <li>The engine first assembles the current chat-history message list.</li>
  <li>
    It measures that list length and uses it as the current turn count for
    insertion-mode checks.
  </li>
  <li>
    Each active in-chat entry computes an insertion point as current chat
    length minus injection depth.
  </li>
  <li>
    Entries are sorted by insertion point, then by original template order.
  </li>
  <li>
    They are inserted one by one, adjusting later positions as earlier
    inserts shift the list.
  </li>
</ol>

<p>
  In practice, depth <code>0</code> means the entry sits at the very end of
  the assembled chat-history buffer. Depth <code>1</code> places it one
  message earlier, depth <code>2</code> two messages earlier, and so on.
  Large depths clamp toward the front instead of crashing.
</p>

<DocHeading level={3}>5. Conditional and interval use message count, not token count</DocHeading>
<p>
  The timing rules are based on message counts, not prompt length or token
  usage.
</p>

<ul>
  <li>
    <strong>Conditional</strong> entries insert when the assembled message
    count is greater than or equal to the configured minimum.
  </li>
  <li>
    <strong>Interval</strong> entries insert only when the message count is
    greater than zero and divides evenly by the configured interval.
  </li>
  <li>
    These checks happen at request-build time, after the current chat
    window has already been chosen.
  </li>
</ul>

<p>
  That means a conditional or interval entry responds to the current
  request window, not to total token usage and not to a hypothetical full
  chat export.
</p>

<DocHeading level={3}>6. Role mapping happens during message construction</DocHeading>
<p>
  When an entry becomes an API message, its role is normalized.
</p>

<ul>
  <li>
    <code>system</code> maps to whatever system-role keyword the selected
    provider adapter expects.
  </li>
  <li><code>user</code> stays <code>user</code>.</li>
  <li><code>assistant</code> stays <code>assistant</code>.</li>
  <li>
    In normal direct chat history, stored <code>scene</code> messages are
    not forwarded as ordinary chat messages.
  </li>
</ul>

<p>
  This is why entry roles are meaningful even inside one template. You can
  deliberately place framing or examples in different conversational roles
  when a model responds better to that structure.
</p>

<DocHeading level={3}>8. Some runtime extras inject outside the template itself</DocHeading>
<p>
  Not every injected message comes strictly from the entry list.
</p>

<ul>
  <li>
    Direct completion currently adds a separate per-turn "Relevant
    memories" system block after the relative entries when memory data is
    available.
  </li>
  <li>
    Swap-places mode adds an extra system instruction that tells the model
    the roles have been inverted for that turn.
  </li>
  <li>
    The scene-image protocol entry is stripped entirely when scene
    generation is disabled in settings.
  </li>
  <li>
    If summary, lorebook, or memory placeholders are absent, the engine can
    append generic fallback entries after rendering.
  </li>
</ul>

<DocHeading level={3}>9. Multimodal prompt entries are special</DocHeading>
<p>
  Scene-generation and design-reference templates can attach image payload
  bindings to entries. Those entries still use the same activation and
  ordering rules, but the final message content can become a multimodal
  user message instead of plain text.
</p>

<ul>
  <li>
    Bound image slots such as <code>{"{{image[character]}}"}</code>, <code>{"{{image[persona]}}"}</code>, <code>{"{{image[avatar]}}"}</code>, and <code>{"{{image[references]}}"}</code> are converted into image parts in the outgoing request.
  </li>
  <li>
    Any remaining explanatory text on that entry is preserved as the text
    part of the multimodal message.
  </li>
  <li>
    If an image-bound entry has no usable images, it simply does not emit a
    multimodal payload.
  </li>
</ul>

<p>
  So the injection system is not only about ordering text. It is also the
  layer that decides whether an entry becomes a system message, a chat
  message, or a multimodal user payload.
</p>

      <DocImage
        src={images.systemPrompts.promptEntryTimingAndConditions}
        alt="Prompt entry timing and conditions editor"
        caption="One entry can control placement, insertion depth, timing rules, and activation logic from the same editor surface."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] scale-[1.04] object-contain md:max-h-[30rem]"
      />

      <DocHeading level={2}>What gets rendered into the template</DocHeading>
      <p>
        The renderer does more than direct string replacement. It also decides
        what to omit when context is unavailable.
      </p>

      <ul>
        <li>
          <strong>Character and persona</strong>: names, definitions, and legacy
          aliases like <code>{"{{char}}"}</code>, <code>{"{{persona}}"}</code>, and <code>{"{{user}}"}</code>.
        </li>
        <li>
          <strong>Scene</strong>: selected scene content and optional scene
          direction, including variant handling.
        </li>
        <li>
          <strong>Content rules</strong>: strictness from Pure Mode is injected
          through <code>{"{{content_rules}}"}</code>.
        </li>
        <li>
          <strong>Memory</strong>: dynamic summary and retrieved memories, or
          manual memories when dynamic memory is not active.
        </li>
        <li>
          <strong>Lorebook</strong>: only active lorebook entries matched from
          recent conversation are rendered, not the whole lorebook database.
        </li>
      </ul>

      <p>
        If a scene, summary, or lorebook block has no real content, the engine
        strips the empty section instead of leaving raw placeholders behind.
      </p>

      <DocHeading level={2}>Required variables and runtime fallback</DocHeading>
      <p>
        Protected templates still use required-variable validation. For example,
        the default direct-chat template expects core placeholders like <code>{"{{scene}}"}</code>, <code>{"{{scene_direction}}"}</code>, <code>{"{{char.name}}"}</code>, <code>{"{{char.desc}}"}</code>, <code>{"{{context_summary}}"}</code>, and <code>{"{{key_memories}}"}</code>.
      </p>

      <p>
        But validation and runtime behavior are not identical. At runtime, if a
        custom template omits <code>{"{{context_summary}}"}</code>, <code>{"{{key_memories}}"}</code>, or <code>{"{{lorebook}}"}</code>, the engine can still append fallback entries so that memory and lore are less likely to vanish entirely.
      </p>

      <Callout type="info" title="Best practice">
        Keep the placeholders you actually want and place them exactly where you
        want them. The fallback path is there to keep context alive, not to give
        you precise layout control.
      </Callout>


<DocHeading level={2}>Conditions</DocHeading>
<p>
  Conditions are separate from injection rules. Injection decides where an
  active entry lands. Conditions decide whether that entry becomes active
  in the first place.
</p>

<p>
  That separation matters because two entries can share the same injection
  mode and still behave very differently depending on the current chat,
  model, memory state, or tool context.
</p>

<DocHeading level={3}>What conditions can check</DocHeading>
<ul>
  <li>chat mode: direct or group</li>
  <li>scene or avatar generation feature toggles</li>
  <li>whether a scene or scene direction exists</li>
  <li>whether a persona exists</li>
  <li>message count and participant count</li>
  <li>keyword presence or absence in recent text</li>
  <li>dynamic memory state, summary presence, and key-memory presence</li>
  <li>lorebook availability</li>
  <li>reference-image and reference-text availability</li>
  <li>provider id, input scopes, output scopes, reasoning state, and vision support</li>
</ul>

<DocHeading level={3}>Condition composition</DocHeading>
<p>
  The runtime supports nested logic, not just one-off toggles. A single
  entry can combine conditions with <code>all</code>, <code>any</code>,
  and <code>not</code>.
</p>

<ul>
  <li><code>all</code>: every nested condition must match.</li>
  <li><code>any</code>: at least one nested condition must match.</li>
  <li><code>not</code>: inverts another condition.</li>
</ul>

<DocHeading level={3}>How AND and OR work in the editor</DocHeading>
<p>
  The editor uses human-friendly <strong>AND</strong> and <strong>OR</strong>
  joins, but it stores them as grouped logic.
</p>

<ul>
  <li><strong>AND</strong> means every rule in that joined group must be true.</li>
  <li><strong>OR</strong> means any rule in that joined group can be true.</li>
  <li>
    Adjacent rules with the same join are grouped together before the full
    expression is evaluated.
  </li>
  <li>
    Those groups are then evaluated from top to bottom, so mixed AND/OR
    chains become a nested expression rather than one flat sentence.
  </li>
</ul>

<p>
  A useful mental model is: the editor first builds AND-groups and OR-groups,
  then combines those groups into the final condition tree. Exclusions are
  handled separately and become a final <code>not(...)</code> layer.
</p>

<p>
  So if you build include rules like <em>scene generation on</em> AND
  <em>character reference text exists</em> AND <em>persona reference text
  exists</em>, then add an exclusion that says <em>persona reference images
  missing</em>, the explanation becomes:
</p>

<div className="not-prose my-6">
  <CodeBlock>{`This entry is active when scene generation is on and character reference text exists and persona reference text exists and not (persona reference images missing).`}</CodeBlock>
</div>

<DocImage
  src={images.systemPrompts.conditionsBuilder}
  alt="Conditions builder for a prompt entry"
  caption="The conditions editor exposes include rules, exclusions, and logical joins so one entry can react to runtime state without requiring a separate template."
  containerClassName="mx-auto max-w-[52rem]"
  className="mx-auto max-h-[30rem] scale-[1.05] object-contain md:max-h-[32rem]"
/>

<DocImage
  src={images.systemPrompts.conditionExplanationOutput}
  alt="Condition explanation output for a prompt entry"
  caption="The editor also generates a plain-English explanation, which is useful for checking whether grouped AND, OR, and exclusion rules match your intent."
  containerClassName="mx-auto max-w-[52rem]"
  className="mx-auto max-h-[30rem] scale-[1.05] object-contain md:max-h-[32rem]"
/>

<Callout type="info" title="Conditions run before insertion">
  The runtime first checks whether an entry qualifies, then applies its
  injection mode. If a condition fails, position and depth never get a
  chance to matter.
</Callout>

      <DocHeading level={2}>Internal prompt types</DocHeading>
      <p>
        The prompt system is broader than the character system prompt. These are
        all built on the same template engine.
      </p>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Template</th>
            <th className="text-left py-2 px-4">What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">App default</td>
            <td className="py-2 px-4">Main direct-chat roleplay template.</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Dynamic summary</td>
            <td className="py-2 px-4">Compresses processed conversation windows into one rolling summary.</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Dynamic memory</td>
            <td className="py-2 px-4">Runs the memory-manager tool pass that creates, deletes, pins, or unpins memories.</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Reply helper</td>
            <td className="py-2 px-4">Generates a suggested next message for the user.</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Group chat and group RP</td>
            <td className="py-2 px-4">Formats multi-character context and message rules for group sessions.</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Avatar and scene generation</td>
            <td className="py-2 px-4">Builds image-generation prompts, including optional reference-image payload entries.</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Design reference writer</td>
            <td className="py-2 px-4">Turns reference images into a reusable design brief for later image work.</td>
          </tr>
        </tbody>
      </table>

      <DocHeading level={2}>Default direct-chat structure</DocHeading>
      <p>
        The shipped direct-chat template is modular and sectioned. It is closer
        to this than to a flat personality paragraph:
      </p>

      <div className="not-prose my-6">
        <CodeBlock>{`Base directive
Scenario + scene direction
Character definition
Persona definition
World information (matched lorebook entries)
Context summary
Key memories
Scene image protocol
Behavior and pacing instructions
Content rules`}</CodeBlock>
      </div>

      <p>
        That separation is deliberate. It keeps identity, scene framing, memory,
        lore, and policy-style constraints from collapsing into one noisy blob.
      </p>

      <DocHeading level={2}>Preview and troubleshooting</DocHeading>
      <p>
        The editor supports both raw and rendered preview. That is useful for
        checking whether placeholders actually resolve before you save.
      </p>

      <ul>
        <li>
          If you preview without a live session, the app synthesizes a minimal
          preview session.
        </li>
        <li>
          That preview includes sample memory text, a placeholder context
          summary, and sample lorebook content so the render is easier to read.
        </li>
        <li>
          This means preview is great for structure checking, but not a perfect
          reproduction of one specific live chat.
        </li>
      </ul>

      <DocImage
        src={images.systemPrompts.renderedPromptPreview}
        alt="Rendered system prompt preview"
        caption="Rendered preview shows what the template becomes after placeholder replacement, which is the fastest way to verify real prompt structure before saving."
        containerClassName="mx-auto max-w-[52rem]"
        className="mx-auto max-h-[30rem] scale-[1.05] object-contain md:max-h-[32rem]"
      />

      <DocHeading level={2}>Writing advice that matches the real engine</DocHeading>
      <ul>
        <li>Use the system prompt for durable behavior, not conversation memory.</li>
        <li>Keep lore in lorebooks and let keyword matching inject only relevant entries.</li>
        <li>Keep memory placeholders if you want dynamic memory to stay readable and controlled.</li>
        <li>Prefer modular entry edits over turning the whole template into one giant paragraph.</li>
        <li>Use preview often when you add conditions, interval entries, or custom sections.</li>
      </ul>

      <Callout type="success" title="Practical rule">
        If a fact should always shape behavior, put it in the prompt. If it
        should be recalled because it happened in the chat, let memory or
        lorebook systems carry it instead.
      </Callout>
    </motion.article>
  );
}
