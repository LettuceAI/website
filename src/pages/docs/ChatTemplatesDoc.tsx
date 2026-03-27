import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";

export function ChatTemplatesDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Chat Templates</DocHeading>

      <p className="lead">
        Chat Templates are reusable conversation starters for a specific
        character. Instead of beginning from a blank session, you can launch a
        chat with a prepared sequence of opening messages.
      </p>

      <p>
        They are useful when you want multiple ways to enter the same
        character: a soft greeting, a hostile encounter, a roleplay setup, or a
        scene-specific opener.
      </p>

      <Callout>
        Chat Templates are not the same as llama.cpp chat templates in model
        settings. Chat Templates control the opening content of a session. The
        llama.cpp settings control how messages are formatted for a local model.
      </Callout>

      <DocHeading level={2}>Where to find them</DocHeading>

      <p>
        Open a character and go to <strong>Chat Templates</strong> from the
        character editor. Templates are stored per character, so each character
        can have their own set of conversation starters.
      </p>

      <p>
        If you need the broader setup first, read the{' '}
        <Link to="/docs/characters">Characters guide</Link>.
      </p>

      <DocHeading level={2}>What a template includes</DocHeading>

      <p>Each template can store:</p>

      <ul>
        <li>A template name</li>
        <li>An ordered list of starter messages</li>
        <li>An optional starting scene</li>
        <li>An optional system prompt template reference</li>
      </ul>

      <p>The starter messages are limited to two roles:</p>

      <ul>
        <li>
          <strong>You</strong> for the user side of the exchange
        </li>
        <li>
          <strong>The character</strong> for assistant replies
        </li>
      </ul>

      <p>
        Templates do not exist to replace the full prompt system. They exist to
        shape the first few turns of a chat.
      </p>

      <DocHeading level={2}>How authoring works</DocHeading>

      <p>Inside the template editor, you can:</p>

      <ul>
        <li>Name the template</li>
        <li>Add as many opening messages as you need</li>
        <li>Switch each message between user and character roles</li>
        <li>Drag messages to reorder them</li>
        <li>Choose a starting scene for that template</li>
        <li>Choose a system prompt template for that template</li>
      </ul>

      <p>
        Message order matters. The session starts with the messages exactly as
        they are arranged in the editor.
      </p>

      <DocHeading level={2}>What happens when you start a new chat</DocHeading>

      <p>
        If a character has chat templates, starting a new conversation opens a
        template picker instead of creating the chat immediately.
      </p>

      <p>From there, you can either:</p>

      <ul>
        <li>Choose one of the character’s templates</li>
        <li>Choose <strong>No template</strong></li>
      </ul>

      <p>
        If you choose a template, the app copies that template’s messages into
        the new session as the opening conversation.
      </p>

      <DocHeading level={2}>How scenes behave</DocHeading>

      <ul>
        <li>
          If you choose <strong>No template</strong>, the chat follows the
          character’s normal scene path.
        </li>
        <li>
          If you choose a template with a scene attached, that scene is used for
          the session.
        </li>
        <li>
          If you choose a template without a scene, the session starts without a
          scene message.
        </li>
      </ul>

      <p>
        When a scene is used, it appears before the template’s conversation
        messages.
      </p>

      <DocHeading level={2}>How system prompts behave</DocHeading>

      <p>
        A chat template can also point to a specific system prompt template. If
        it does, that prompt template becomes the session’s prompt source.
      </p>

      <p>
        If the chat template does not specify one, the session falls back to
        the character’s usual prompt configuration. For the full prompt system,
        see <Link to="/docs/system-prompts">System Prompts</Link>.
      </p>

      <DocHeading level={2}>Import and export</DocHeading>

      <p>Chat Templates can be shared and moved around.</p>

      <ul>
        <li>
          <strong>JSON export</strong>: a simple native template format
        </li>
        <li>
          <strong>USC export</strong>: a portable Unified System Card format
        </li>
      </ul>

      <p>
        On import, LettuceAI creates a fresh local template entry for the
        current character.
      </p>

      <DocHeading level={2}>What Chat Templates are good for</DocHeading>

      <ul>
        <li>Multiple openers for the same character</li>
        <li>Different moods or timelines</li>
        <li>Reusable first-meeting flows</li>
        <li>Roleplay setups with a fixed opening exchange</li>
        <li>Template-specific scenes or prompt behavior</li>
      </ul>

      <DocHeading level={2}>Tips</DocHeading>

      <ul>
        <li>Keep the opening tight. Two to four messages is often enough.</li>
        <li>
          Use separate templates for clearly different moods instead of one
          overloaded template.
        </li>
        <li>
          Only attach a scene when that template truly needs a different setup.
        </li>
        <li>
          Only attach a system prompt template when that opener needs different
          behavior, not just different wording.
        </li>
      </ul>

      <Callout type="info" title="A good mental model">
        Think of a Chat Template as a prewritten first exchange plus optional
        scene and prompt overrides. It shapes how the conversation opens, then
        the live chat takes over from there.
      </Callout>
    </motion.article>
  );
}
