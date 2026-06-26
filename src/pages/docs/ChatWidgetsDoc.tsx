import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ChatWidgetsDoc() {
  return (
    <>
      <SEO
        title="Chat Widgets"
        description="Build a custom side panel next to your conversation from composable widgets like character info, stat trackers, a scratch pad, dice, and more."
        path="/docs/chat-widgets"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Chat Widgets", path: "/docs/chat-widgets" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Chat Widgets</DocHeading>

        <p className="lead">
          Chat Widgets let you build a custom panel beside your conversation. You
          fill the empty space next to the messages with small blocks you choose
          and arrange yourself, so the details you care about stay visible while
          you chat.
        </p>

        <Callout type="info" title="What most users need to know">
          Widgets are optional and live in a side panel on wider screens. Turn on
          the widget area, tap Edit, add the blocks you want, and arrange them.
          Your layout is saved for that character.
        </Callout>

        <DocHeading level={2}>What the widget area is</DocHeading>
        <p>
          The widget area is a panel that sits to the left or right of the
          conversation column. It is built from individual widgets, each of which
          shows one thing or does one job. You decide which widgets appear, what
          order they are in, and how they look.
        </p>
        <p>
          The widget area appears in the empty space around the message column, so
          it needs room to fit. It shows up on desktop and other wide screens. On
          a narrow phone screen there is no spare width for it, so it stays hidden
          and the conversation uses the full screen.
        </p>

        <DocHeading level={2}>The widget types</DocHeading>
        <p>
          You can mix and match any of these blocks. Most can be given a title and
          a short description.
        </p>

        <DocHeading level={3}>Content widgets</DocHeading>
        <ul>
          <li>
            <strong>Character info</strong>: the avatar, name, and description of
            the current character. In a group chat you can point it at a specific
            member.
          </li>
          <li>
            <strong>Persona info</strong>: the avatar, name, and description of
            the persona you are using.
          </li>
          <li>
            <strong>Scratch pad</strong>: free Markdown notes that stay with the
            chat, handy for tracking plot points or reminders.
          </li>
          <li>
            <strong>Image</strong>: a picture pulled from the character avatar,
            the persona avatar, your image library, or an upload.
          </li>
          <li>
            <strong>Stat tracker</strong>: editable numbers such as affection,
            HP, or gold, each with an optional minimum and maximum.
          </li>
          <li>
            <strong>Memory</strong>: a quick look at what this chat currently
            remembers, with a limit on how many entries to show.
          </li>
          <li>
            <strong>Companion state</strong>: relationship and mood details for
            companion characters.
          </li>
          <li>
            <strong>Session info</strong>: at-a-glance stats like message count,
            tokens, and the current scene.
          </li>
          <li>
            <strong>Author note</strong>: edit this chat's author note right from
            the panel. The note is saved to the chat.
          </li>
          <li>
            <strong>Time</strong>: shows the time the companion sees, and lets you
            set it.
          </li>
        </ul>

        <DocHeading level={3}>Interactive widgets</DocHeading>
        <ul>
          <li>
            <strong>Quick snippets</strong>: buttons that drop preset text into
            the message box, useful for phrases or actions you reuse a lot.
          </li>
          <li>
            <strong>Dice</strong>: a dice roller using custom notation such as
            <code>1d20</code> or <code>2d6+3</code>.
          </li>
          <li>
            <strong>Selector</strong>: a quick picker for your persona, your
            model, or the author note.
          </li>
          <li>
            <strong>Button</strong>: triggers a chat action such as regenerate the
            last reply, continue, swap places, start a new session, open memories,
            open search, and more.
          </li>
        </ul>

        <DocHeading level={3}>Layout pieces</DocHeading>
        <ul>
          <li>
            <strong>Box</strong>: groups other widgets together under an optional
            title, with a color variant (default, subtle, info, warning, success,
            or danger).
          </li>
          <li>
            <strong>Divider</strong>: a line or a blank space to separate widgets.
          </li>
        </ul>

        <DocHeading level={2}>Editing your panel</DocHeading>
        <p>
          The widget area has an in-place edit mode. You arrange everything right
          where it appears, without leaving the chat.
        </p>
        <ul>
          <li>
            <strong>Enter edit mode</strong>: use the Edit button in the widget
            area, or the edit-widgets action in the chat header. A sticky toolbar
            appears at the top of the panel with Add, Revert, and Done.
          </li>
          <li>
            <strong>Add a widget</strong>: tap Add to open the widget picker and
            choose a type. The new widget drops into the panel.
          </li>
          <li>
            <strong>Reorder</strong>: drag widgets up and down to change their
            order.
          </li>
          <li>
            <strong>Configure</strong>: open a widget to edit its title,
            description, and type-specific settings (for example the stats on a
            stat tracker or the notation on a dice roller).
          </li>
          <li>
            <strong>Design variants</strong>: each widget can use one of four
            looks: default, minimal, solid, or outline.
          </li>
          <li>
            <strong>Image library picker</strong>: image widgets can pull a
            picture from your image library, the character or persona avatar, or a
            file you upload.
          </li>
          <li>
            <strong>Move between columns</strong>: when both a left and a right
            panel are showing, you can move a widget from one side to the other.
          </li>
        </ul>
        <p>
          Tap <strong>Done</strong> to save your changes, or <strong>Revert</strong>{" "}
          to discard them and go back to how the panel was.
        </p>

        <Callout type="info" title="Layouts are saved per character">
          Each character keeps its own widget layout. Setting up a panel for one
          character does not change anyone else's. Group chats share the same
          widget settings as the rest of the chat appearance.
        </Callout>

        <DocHeading level={2}>Desktop layout controls</DocHeading>
        <p>
          Because the widget area depends on having room next to the messages,
          there are layout controls in chat appearance (on desktop) that decide
          how that space is used.
        </p>
        <ul>
          <li>
            <strong>Chat column width</strong>: how wide the message column is.
            Choose a preset (narrow, normal, wide, or extra wide), a custom pixel
            width, or full. The space left over is where widgets can go.
          </li>
          <li>
            <strong>Alignment</strong>: place the message column on the left, in
            the center, or on the right. This decides which side has spare room
            for a panel.
          </li>
          <li>
            <strong>Widget area</strong>: the toggle that turns the panel on. It
            is available whenever the column is not set to full width.
          </li>
          <li>
            <strong>Center widget mode</strong>: when the column is centered, you
            can fill both sides, only the left, or only the right.
          </li>
          <li>
            <strong>Move header and input</strong>: you can keep the chat header
            and the message input aligned with the message column instead of
            stretching across the whole window, so the widget panels sit beside
            the conversation rather than under a full-width shell.
          </li>
          <li>
            <strong>Resizable widget area</strong>: with a custom column width,
            a draggable divider appears between the panel and the conversation so
            you can fine-tune the split by dragging.
          </li>
        </ul>

        <Callout type="warning" title="Needs room to appear">
          The widget area only shows when the window is wide enough to fit both
          the message column and a panel. If you set the column to full width, or
          the window is too narrow, the panel will not appear.
        </Callout>

        <DocHeading level={2}>Tips</DocHeading>
        <ul>
          <li>
            Start small. A character info card and a stat tracker already make a
            useful panel.
          </li>
          <li>
            Use a box to group related widgets and a divider to give them
            breathing room.
          </li>
          <li>
            Keep a consistent design variant across widgets for a tidy look.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
