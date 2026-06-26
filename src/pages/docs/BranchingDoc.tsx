import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function BranchingDoc() {
  return (
    <>
      <SEO
        title="Chat Branching"
        description="Split a conversation into alternate paths from any message, explore different directions, and switch between branches without losing the original."
        path="/docs/branching"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Chat Branching", path: "/docs/branching" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Chat Branching</DocHeading>

        <p className="lead">
          Branching lets you split a conversation into alternate paths. From any
          point in a chat you can start a new direction while the original stays
          exactly as it was. Think of it like save points or alternate timelines:
          you can explore a different choice without losing what you already have.
        </p>

        <Callout type="info" title="Why use it">
          Want to try a different reply, retell a scene a new way, or test where a
          conversation could go? Branch from that spot. The new branch is a
          separate chat, so the original is never changed.
        </Callout>

        <DocHeading level={2}>What a branch is</DocHeading>
        <p>
          A branch is a new chat that starts as a copy of an existing one, up to
          and including the message you picked. Everything before that point is
          carried over, and from there the two chats go their own way. The new
          branch remembers which chat and which message it came from, so the app
          can show you how they connect.
        </p>
        <p>
          Because each branch is its own chat, you can have as many as you like.
          Branches can even branch again, building a tree of related
          conversations.
        </p>

        <DocImage
          src={images.branching.tree}
          alt="A chat splitting into alternate branches, with the active path highlighted"
          caption="A branch copies the chat up to the message you pick and leaves the original untouched. You can branch in the same chat, into a new character, or into a group, and the branch you are in is the history the AI reads from."
          containerClassName="max-w-3xl mx-auto"
        />

        <DocHeading level={2}>Creating a branch</DocHeading>
        <p>
          Open the actions for any message (long-press or right-click a message)
          and choose <strong>Branch from here</strong>. A short confirm menu
          appears, telling you how many messages the new branch will contain.
          Confirm with <strong>Create</strong> and the app makes the branch and
          opens it for you.
        </p>
        <p>You can also branch in a couple of other ways:</p>
        <ul>
          <li>
            <strong>Branch to character</strong>: start the new branch with a
            different character, carrying the conversation so far over to them.
          </li>
          <li>
            <strong>Branch to group chat</strong>: continue the conversation as a
            group chat from that point.
          </li>
        </ul>

        <Callout type="info" title="The original is safe">
          Creating a branch never edits or deletes the chat you branched from. It
          only makes a new copy that diverges from the chosen message onward.
        </Callout>

        <DocHeading level={2}>Finding your way between branches</DocHeading>
        <p>
          Once a conversation has branches, the chat shows small markers so you
          never lose track of where you are.
        </p>
        <ul>
          <li>
            <strong>Branch marker</strong>: when you are in a branch, a marker
            appears at the message you branched from, labeled with the parent
            chat's name. Tapping it opens a small confirm menu so you can jump back
            to the parent branch, or stay where you are.
          </li>
          <li>
            <strong>Child-fork indicators</strong>: on a message that has branches
            growing out of it, a marker shows how many branches start from there.
            Tapping it lists those branches so you can open any of them.
          </li>
        </ul>

        <DocHeading level={2}>The branch tree</DocHeading>
        <p>
          The branch tree gives you the full picture of a conversation and all of
          its offshoots in one place. Open it from the chat to see every branch
          laid out as a tree, with lines showing how each one connects to its
          parent.
        </p>
        <ul>
          <li>
            <strong>Lineage</strong>: branches are drawn under the chat they came
            from, so you can read the whole family of conversations at a glance.
          </li>
          <li>
            <strong>Active path</strong>: the line from the current branch back to
            the very first chat is highlighted, and the branch you are in is
            marked as Current.
          </li>
          <li>
            <strong>Quick stats</strong>: a summary shows how many branches exist,
            the total messages, and how deep the tree goes.
          </li>
          <li>
            <strong>Branch actions</strong>: each branch has options to open it,
            rename it, branch from it, export it, or delete it.
          </li>
        </ul>

        <DocHeading level={3}>Comparing branches</DocHeading>
        <p>
          The branch tree has a <strong>Compare</strong> mode. Pick two branches
          and the app shows where they stop being the same, how many messages they
          share, and then their differing messages side by side. It is an easy way
          to see exactly how two directions diverged.
        </p>

        <DocHeading level={2}>What the AI sees</DocHeading>
        <p>
          Each branch is its own conversation with its own message history. The
          branch you are currently in is the history the AI reads when it replies.
          Switching to another branch switches the conversation the model
          continues from.
        </p>
        <Callout type="info" title="Branches are independent">
          A reply you generate in one branch does not appear in the others. The AI
          only ever continues from the active branch you are viewing, so each path
          stays clean and self-contained.
        </Callout>

        <DocHeading level={2}>When branching helps</DocHeading>
        <ul>
          <li>Trying an alternate outcome for a scene without giving up the first.</li>
          <li>Exploring a "what if" while keeping the main storyline intact.</li>
          <li>
            Testing different phrasings or choices to see which conversation you
            like best.
          </li>
          <li>Handing the same setup to a different character to compare replies.</li>
        </ul>
      </motion.article>
    </>
  );
}
