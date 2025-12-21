import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { motion } from "framer-motion";

export function MemoryDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Memory System</DocHeading>

            <p className="lead">
                LettuceAI’s Memory System lets the AI remember important information across long conversations
                without constantly resending your entire chat history.
            </p>

            <p>
                Instead of relying only on recent messages, LettuceAI can store, retrieve, and reuse
                information over time, even across very long sessions. There are two ways this can work, depending on how much control you want.
            </p>


            <DocHeading level={2}>Manual Mode</DocHeading>
            <div className="text-sm text-muted-foreground mb-4">
                <em>Used when Dynamic Memory is disabled.</em>
            </div>

            <p>
                Manual Mode works like a fixed instruction list that the AI always sees.
            </p>

            <ul>
                <li><strong>What you do</strong>: You write memory entries yourself.</li>
                <li><strong>What the AI sees</strong>: Every memory you’ve written is included in every message.</li>
                <li>
                    <strong>Result</strong>: The AI behaves very consistently, but memory size directly reduces
                    how much room is left for conversation.
                </li>
            </ul>

            <p>
                This mode is best when you want absolute predictability and a small, stable set of facts.
            </p>

            <ul>
                <li><strong>Good for</strong>: System prompts, character definitions, strict rules.</li>
                <li><strong>Not ideal for</strong>: Long chats, evolving stories, or learning over time.</li>
            </ul>


            <DocHeading level={2}>Dynamic Mode</DocHeading>
            <div className="text-sm text-muted-foreground mb-4">
                <em>Used when Dynamic Memory is enabled.</em>
            </div>

            <p>
                Dynamic Mode lets LettuceAI manage memory automatically.
            </p>

            <p>
                Instead of sending everything every time, the system stores many memories internally and
                injects only what is relevant to the current message.
            </p>

            <DocHeading level={3}>How to Think About It</DocHeading>
            <p>Think of Dynamic Memory like a brain:</p>
            <ul>
                <li>Important things stay easy to recall.</li>
                <li>Unused details slowly fade.</li>
                <li>Forgotten details can come back if they become relevant again.</li>
            </ul>

            <DocHeading level={3}>Unified Storage</DocHeading>
            <p>
                Manual memories and automatically learned memories live in the same system.
            </p>
            <p>
                Manually added memories start as highly important, but they still follow the same rules
                unless you pin them.
            </p>

            <DocHeading level={3}>Memory Importance & Cooling</DocHeading>
            <p>
                Every memory has an importance score between <strong>0.0</strong> and <strong>1.0</strong>.
            </p>

            <ul>
                <li>
                    <strong>Hot memories</strong>: Actively searched using meaning-based matching.
                </li>
                <li>
                    <strong>Importance fading</strong>: If a memory is not used for a while,
                    its importance is gradually reduced.
                </li>
                <li>
                    <strong>Cold memories</strong>: When importance drops below 0.3,
                    memories move to cold storage. They are not searched by meaning,
                    but are still safely stored.
                </li>
            </ul>


            <p>
                If a cold memory is found via keyword search, it immediately becomes hot again.
            </p>

            <p>
                Memories are not deleted automatically. Cooling only affects how likely
                a memory is to be used, not whether it exists.
            </p>

            <DocHeading level={3}>Automatic Memory Creation</DocHeading>
            <p>Dynamic Mode continuously evaluates the conversation.</p>

            <ol>
                <li><strong>Monitoring</strong>: Every N messages, recent conversation is reviewed.</li>
                <li><strong>Summarization</strong>: A background model summarizes what matters.</li>
                <li><strong>Decision</strong>: The system may create, update, merge, or delete memories.</li>
                <li>
                    <strong>Budget control</strong>: If memory size grows too large,
                    less useful memories cool down.
                </li>
            </ol>

            <DocHeading level={2}>Embedding Model (v2)</DocHeading>
            <p>
                Dynamic Memory relies on an embedding model to understand
                what memories are <em>about</em>, not just what words they contain.
            </p>

            <p>
                LettuceAI v2 uses a newer embedding model designed specifically
                for long-running conversations and roleplay scenarios.
            </p>

            <DocHeading level={3}>What embeddings do</DocHeading>
            <p>
                An embedding model converts text into numerical vectors that represent meaning.
                Similar ideas end up close together, even if they use different wording.
            </p>

            <ul>
                <li>“He hates crowded places”</li>
                <li>“Large groups make him anxious”</li>
            </ul>

            <p>
                Even though these sentences share few words, the embedding model
                understands that they describe the same idea.
            </p>

            <DocHeading level={3}>Embedding Model: v1 vs v2</DocHeading>

            <p>
                lettuce-emb-512d-v2 is a new embedding model designed specifically for Dynamic Memory.
                It is smaller, faster, and supports significantly larger context sizes.
            </p>

            <table className="min-w-full text-sm my-6">
                <thead>
                    <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-4">Aspect</th>
                        <th className="text-left py-2 px-4">v1 (lettuce-emb-512d-v1)</th>
                        <th className="text-left py-2 px-4">v2 (lettuce-emb-512d-v2)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Max input context</td>
                        <td className="py-2 px-4">512 tokens</td>
                        <td className="py-2 px-4">Up to 4096 tokens</td>
                    </tr>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Model size</td>
                        <td className="py-2 px-4">~220 MB</td>
                        <td className="py-2 px-4">~121 MB</td>
                    </tr>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Inference speed</td>
                        <td className="py-2 px-4">Baseline</td>
                        <td className="py-2 px-4">Faster (lower latency)</td>
                    </tr>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Long-context stability</td>
                        <td className="py-2 px-4">Limited</td>
                        <td className="py-2 px-4">Improved</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 font-medium">Memory relevance</td>
                        <td className="py-2 px-4">More drift over time</td>
                        <td className="py-2 px-4">More stable ranking</td>
                    </tr>
                </tbody>
            </table>

            <p>
                v2 allows larger memory chunks to be embedded directly, reducing the need
                for aggressive summarization and improving recall accuracy.
            </p>

            <p>
                Existing memories remain compatible. No manual migration is required.
            </p>

            <DocHeading level={3}>Context Enrichment (v2 only)</DocHeading>

            <p>
                lettuce-emb-512d-v2 uses <strong>context enrichment</strong> when generating embeddings.
            </p>

            <p>
                Instead of embedding only the latest user message, v2 embeds a short
                conversational window that includes:
            </p>

            <ul>
                <li>The latest user message</li>
                <li>The previous assistant response</li>
            </ul>

            <p>
                This provides additional semantic context and reduces ambiguity during
                memory retrieval.
            </p>

            <p>
                In practice, this improves:
            </p>

            <ul>
                <li>Recall accuracy for follow-up questions</li>
                <li>Detection of implied references (“that”, “him”, “what we said earlier”)</li>
                <li>Stability when conversations alternate rapidly between topics</li>
            </ul>

            <p>
                Context enrichment is only available in v2 due to its larger supported
                context size and improved embedding stability.
            </p>



            <DocHeading level={3}>Why Embedding Models matter for memory</DocHeading>
            <p>
                In Dynamic Mode, the embedding model decides which memories are
                considered “related” to your current message.
            </p>

            <p>
                A better embedding model means:
            </p>
            <ul>
                <li>Fewer random callbacks to irrelevant details</li>
                <li>More consistent character behavior</li>
                <li>Cleaner separation between scenes and timelines</li>
            </ul>

            <DocHeading level={3}>Local-first design</DocHeading>
            <p>
                Embeddings are generated and stored locally.
                They are never sent to providers unless a memory is actually injected
                into the prompt.
            </p>

            <p>
                This keeps Dynamic Memory fast, cheap, and privacy-friendly.
            </p>

            <Callout type="info" title="Important">
                Changing models or providers does not invalidate your memories.
                Embeddings are provider-agnostic and remain usable across chats.
            </Callout>


            <DocHeading level={2}>How Memories Are Retrieved</DocHeading>
            <p>When you send a message, memory retrieval happens in two steps:</p>

            <ol>
                <li><strong>Semantic search</strong>: Finds hot memories related by meaning.</li>
                <li><strong>Keyword fallback</strong>: Searches all memories if nothing relevant is found.</li>
            </ol>

            <DocHeading level={3}>Pinning</DocHeading>
            <p>Pinned memories never decay.</p>
            <p>Use pinning for facts that must always be remembered:</p>
            <ul>
                <li>Core character traits</li>
                <li>Permanent rules</li>
                <li>Critical world information</li>
            </ul>

            <DocHeading level={2}>Context Window</DocHeading>
            <p>
                The context window controls how many recent messages the AI can directly see.
            </p>

            <table className="min-w-full text-sm my-6">
                <thead>
                    <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-4">Feature</th>
                        <th className="text-left py-2 px-4">Manual Mode</th>
                        <th className="text-left py-2 px-4">Dynamic Mode</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Visible messages</td>
                        <td className="py-2 px-4">Last N messages</td>
                        <td className="py-2 px-4">Last N messages</td>
                    </tr>
                    <tr className="border-b border-border/10">
                        <td className="py-2 px-4 font-medium">Primary memory source</td>
                        <td className="py-2 px-4">Chat history</td>
                        <td className="py-2 px-4">Memory system</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 font-medium">Pinned messages</td>
                        <td className="py-2 px-4">Count toward the limit</td>
                        <td className="py-2 px-4">Always included</td>
                    </tr>
                </tbody>
            </table>

            <Callout type="info" title="Important">
                In Dynamic Mode, anything outside the context window that is not stored in memory
                is effectively forgotten.
            </Callout>

            <DocHeading level={2}>Cost & Token Usage</DocHeading>
            <p>
                Language models charge based on how many tokens they process per message.
                This includes chat history, system instructions, and injected memories.
            </p>

            <DocHeading level={4}>Manual Mode</DocHeading>
            <ul>
                <li>All memories are sent with every message.</li>
                <li>Token usage increases linearly as memories grow.</li>
                <li>Larger memory lists leave less room for conversation.</li>
            </ul>

            <DocHeading level={4}>Dynamic Mode</DocHeading>
            <ul>
                <li>Only a small, relevant subset of memories is injected.</li>
                <li>Most memories stay local and cost nothing unless retrieved.</li>
                <li>Smaller context windows significantly reduce per-message cost.</li>
            </ul>

            <Callout type="info" title="Why Dynamic Memory Exists">
                Dynamic Memory keeps conversations coherent while preventing token usage
                from growing without bound.
            </Callout>

            <DocHeading level={3}>Managing Memories</DocHeading>

            <DocHeading level={4}>Manual Mode</DocHeading>
            <ul>
                <li><strong>Add</strong>: Use the Memory Panel.</li>
                <li><strong>Edit</strong>: Modify existing entries directly.</li>
                <li><strong>Delete</strong>: Remove memories that are no longer relevant.</li>
            </ul>

            <DocHeading level={4}>Dynamic Mode</DocHeading>
            <ul>
                <li><strong>Pin</strong>: Prevent important memories from losing importance.</li>
                <li><strong>Delete</strong>: Remove incorrect or unwanted memories.</li>
                <li><strong>Add</strong>: Manually insert memories when the system misses something.</li>
            </ul>

            <DocHeading level={2}>Which Mode Should I Use?</DocHeading>
            <ul>
                <li><strong>Manual Mode</strong>: Strict control, short conversations.</li>
                <li><strong>Dynamic Mode</strong>: Long-term continuity with minimal cost.</li>
            </ul>
        </motion.article>
    );
}
