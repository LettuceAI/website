import { DocHeading } from "@/components/docs/DocHeading";
import { motion } from "framer-motion";


export function LorebooksDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Lorebooks</DocHeading>

            <p className="lead">
                Lorebooks define persistent world canon, character background, and rules
                that apply across chats and sessions.
            </p>

            <p>
                Lorebook content is written by you and remains attached to a character permanently.
                It is not learned, changed, or forgotten by the AI. Entries are injected only when relevant keywords appear, allowing large shared lore
                to persist without being sent on every message.
            </p>


            <DocHeading level={2}>What Lorebooks Are (and Arent)</DocHeading>
            <ul>
                <li>
                    <strong>Are</strong>: On-demand reference material the AI can consult when needed.
                </li>
                <li>
                    <strong>Are not</strong>: Persistent memory or learned behavior.
                </li>
            </ul>

            <p>
                Lorebooks do not evolve, decay, or learn over time.
                They act as conditional instructions that activate only in specific situations.
            </p>


            <DocHeading level={2}>Structure</DocHeading>

            <DocHeading level={3}>Lorebooks</DocHeading>
            <p>
                You can create multiple lorebooks (for example: <em>World History</em>,
                <em>Magic System</em>, or <em>Locations</em>).
            </p>

            <p>
                Each lorebook can be assigned to multiple characters, allowing reuse
                without duplicating content.
            </p>

            <DocHeading level={3}>Entries</DocHeading>
            <p>Each lorebook contains entries with the following properties:</p>

            <ul>
                <li>
                    <strong>Content</strong>: The text injected into the prompt when the entry is active.
                </li>
                <li>
                    <strong>Keywords</strong>: Triggers that activate the entry.
                </li>
                <li>
                    <strong>Order</strong>: Determines reading priority when multiple entries are active.
                </li>
            </ul>

            <hr />

            <DocHeading level={2}>Activation</DocHeading>
            <p>
                When you send a message, the system scans the last 10 messages for keywords.
            </p>

            <ul>
                <li>
                    <strong>Keyword Match</strong>: If a keyword appears, the entry activates.
                </li>
                <li>
                    <strong>Always Active</strong>: Entries marked as always active bypass keyword checks.
                </li>
            </ul>

            <p>
                If no keywords match, the entry is not injected at all.
            </p>

            <hr />

            <DocHeading level={2}>Injection & Priority</DocHeading>
            <p>
                When one or more entries are activated, they are processed in this order:
            </p>

            <ol>
                <li>
                    <strong>Ordering</strong>: Entries are sorted by their position in the lorebook.
                </li>
                <li>
                    <strong>Assembly</strong>: All active entries are combined into a single
                    <em>World Information</em> block.
                </li>
                <li>
                    <strong>Insertion</strong>: The block is injected into the AI's prompt
                    before response generation.
                </li>
            </ol>

            <p>
                Entries near the top of a lorebook take precedence when instructions conflict.
            </p>

            <hr />

            <DocHeading level={2}>Cost & Token Usage</DocHeading>
            <p>
                Lorebooks only consume tokens when entries are activated.
            </p>

            <ul>
                <li>Inactive entries cost nothing.</li>
                <li>Activated entries are included verbatim in the prompt.</li>
                <li>Broad or common keywords can cause frequent, unnecessary injection.</li>
            </ul>

            <p>
                For cost efficiency, prefer small, focused entries with precise triggers.
            </p>

            <hr />

            <DocHeading level={2}>Setup</DocHeading>

            <DocHeading level={3}>Creating a Lorebook</DocHeading>
            <ol>
                <li>Navigate to the <strong>Lorebook</strong> tab.</li>
                <li>Click <strong>New Lorebook</strong>.</li>
                <li>Enter a descriptive name.</li>
            </ol>

            <DocHeading level={3}>Assigning to a Character</DocHeading>
            <p>
                Lorebooks only apply when assigned to a character.
                Go to character settings → <strong>Lorebooks</strong> → select the desired lorebook.
            </p>

            <DocHeading level={3}>Adding Entries</DocHeading>
            <ol>
                <li>Open the lorebook and click <strong>+</strong>.</li>
                <li>
                    Add keywords that should activate the entry.
                    <ul>
                        <li>
                            <strong>Recommended</strong>: Specific names and unique terms
                            (<em>Neo-Tokyo</em>, <em>Excalibur</em>).
                        </li>
                        <li>
                            <strong>Avoid</strong>: Generic words (<em>city</em>, <em>place</em>, <em>man</em>).
                        </li>
                    </ul>
                </li>
                <li>Enter the content.</li>
                <li>Reorder entries to control priority.</li>
            </ol>

            <hr />

            <DocHeading level={2}>Best Practices</DocHeading>
            <ul>
                <li>
                    <strong>Use Lorebooks</strong> for static, backstory, and reference-style information.
                </li>
                <li>
                    <strong>Use Memory</strong> for evolving facts, relationships, and story events.
                </li>
                <li>
                    Keep entries concise. long entries increase token usage when triggered.
                </li>
                <li>
                    Split large topics into multiple entries with targeted keywords.
                </li>
            </ul>
        </motion.article>
    );
}
