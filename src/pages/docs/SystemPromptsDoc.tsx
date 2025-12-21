import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

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
                System prompts control how the AI behaves.
                They define rules, tone, and priorities that stay active throughout a conversation.
            </p>

            <DocHeading level={2}>What is a system prompt?</DocHeading>
            <p>
                A system prompt is a set of instructions sent to the AI before any user messages.
                It tells the model <em>who it is</em>, <em>how it should respond</em>,
                and <em>what matters most</em>.
            </p>
            <p>
                In LettuceAI, system prompts are usually attached to characters
                and applied automatically when you start a chat.
            </p>

            <DocHeading level={2}>What system prompts are good at</DocHeading>
            <ul>
                <li>Defining personality and tone</li>
                <li>Setting behavioral rules</li>
                <li>Keeping characters consistent</li>
                <li>Shaping how answers are structured</li>
            </ul>

            <DocHeading level={2}>What system prompts are not</DocHeading>
            <ul>
                <li>They are not memory storage</li>
                <li>They are not guarantees</li>
                <li>They do not replace good conversation flow</li>
            </ul>

            <p>
                Long prompts do not automatically mean better results.
                Clear instructions usually work better than complex setups.
            </p>

            <DocHeading level={2}>Writing effective system prompts</DocHeading>
            <p>
                Good system prompts focus on behavior, not lore.
                They describe <em>how</em> the character acts, not every detail of their history.
            </p>

            <ul>
                <li>Use clear, direct language</li>
                <li>Describe tone and attitude</li>
                <li>Explain how the character treats the user</li>
                <li>Set limits when needed</li>
            </ul>

            <div className="not-prose my-6">
                <CodeBlock>{`You are a calm, observant character.
You speak in short, thoughtful sentences.
You avoid repeating yourself.
You stay in character even when challenged.
You never break the fourth wall.`}</CodeBlock>
            </div>

            <DocHeading level={2}>Common mistakes</DocHeading>
            <ul>
                <li>Writing extremely long prompts with unnecessary detail</li>
                <li>Describing backstory instead of behavior</li>
                <li>Contradicting instructions</li>
                <li>Trying to force exact wording</li>
            </ul>

            <DocHeading level={2}>System prompts and memory</DocHeading>
            <p>
                System prompts define <em>rules</em>.
                Memory defines <em>what happened</em>.
            </p>
            <p>
                If something should always be true, put it in the system prompt.
                If something should be remembered because it happened in conversation,
                let memory handle it.
            </p>

            <Callout type="info" title="Roleplay tip">
                If a character feels inconsistent, simplify the system prompt first.
                Most issues come from unclear or conflicting instructions.
            </Callout>

            <Callout type="info" title="Less is more">
                A short, clear system prompt usually performs better than a long one.
                You can always refine it after a few conversations.
            </Callout>

            <DocHeading level={2}>LettuceAI’s prompting system</DocHeading>
            <p>
                LettuceAI does not use a single hard-coded prompt.
                Instead, it builds prompts dynamically using a structured template
                and a set of placeholders.
            </p>
            <p>
                This makes prompts easier to reason about, safer to modify,
                and compatible with memory, personas, and world information.
            </p>

            <DocHeading level={2}>Template variables (placeholders)</DocHeading>
            <p>
                Template variables are placeholders wrapped in double curly braces,
                such as <code>{'{{char.name}}'}</code> or <code>{'{{scene}}'}</code>.
            </p>
            <p>
                When a conversation starts, LettuceAI replaces these placeholders
                with real data from the character, persona, memory system,
                and current chat state.
            </p>
            <p>
                Some variables are marked as <strong>required</strong>.
                These must exist in protected templates so core systems
                like memory and context injection continue to work correctly.
            </p>

            <DocHeading level={3}>Character variables</DocHeading>
            <ul>
                <li>
                    <code>{'{{char.name}}'}</code>: The character’s identity
                </li>
                <li>
                    <code>{'{{char.desc}}'}</code>: Personality, background, and behavior
                </li>
            </ul>
            <p>
                These answer the question: <em>“Who is the AI?”</em>
            </p>

            <DocHeading level={3}>Scene variable</DocHeading>
            <ul>
                <li>
                    <code>{'{{scene}}'}</code>: The starting situation or scenario
                </li>
            </ul>
            <p>
                Scenes define context, not personality.
                This is why LettuceAI allows multiple starting scenes
                for the same character.
            </p>

            <DocHeading level={3}>Persona variables</DocHeading>
            <ul>
                <li>
                    <code>{'{{persona.name}}'}</code>: Who the user is roleplaying as
                </li>
                <li>
                    <code>{'{{persona.desc}}'}</code>: The user persona’s background or role
                </li>
            </ul>
            <p>
                Personas let the AI react differently depending on who you are,
                without rewriting the character prompt.
            </p>

            <DocHeading level={3}>World & lore variables</DocHeading>
            <ul>
                <li>
                    <code>{'{{lorebook}}'}</code>: Canon world information
                </li>
            </ul>
            <p>
                Lore is treated as established truth.
                Characters are expected to behave consistently with it
                when relevant.
            </p>

            <DocHeading level={3}>Memory variables</DocHeading>
            <ul>
                <li>
                    <code>{'{{context_summary}}'}</code>: Dynamic conversation summary
                </li>
                <li>
                    <code>{'{{key_memories}}'}</code>: Important remembered facts
                </li>
            </ul>
            <p>
                These are injected automatically.
                You should not manually rewrite or replace them.
            </p>

            <DocHeading level={3}>Rules variables</DocHeading>
            <ul>
                <li>
                    <code>{'{{rules}}'}</code>: Character-specific behavioral rules
                </li>
                <li>
                    <code>{'{{content_rules}}'}</code>: Template or app-level constraints
                </li>
            </ul>

            <DocHeading level={2}>The default system prompt</DocHeading>
            <p>
                LettuceAI includes a default system prompt designed for immersive,
                long-running roleplay with memory and consistency.
            </p>

            <div className="not-prose my-6">
                <CodeBlock>{` You are participating in an immersive roleplay. Your goal is to fully embody your character and create an engaging, authentic experience.
    
    # Scenario
    {{scene}}
    
    # Your Character: {{char.name}}
    {{char.desc}}
    
    Embody {{char.name}}'s personality, mannerisms, and speech patterns completely. Stay true to their character traits, background, and motivations in every response.
    
    # {{persona.name}}'s Character
    {{persona.desc}}

    # World Information
    The following is essential lore about this world, its characters, locations, items, and concepts. You MUST incorporate this information naturally into your roleplay when relevant. Treat this as established canon that shapes how characters behave, what they know, and how the world works.
    {{lorebook}}

    # Context Summary
    {{context_summary}}

    # Key Memories
    Important facts to remember in this conversation:
    {{key_memories}}
    
    # Instructions
    **Character & Roleplay:**
    - Write as {{char.name}} from their perspective, responding based on their personality, background, and current situation
    - You may also portray NPCs and background characters when relevant to the scene, but NEVER speak or act as {{persona.name}}
    - Show emotions through actions, body language, and dialogue - don't just state them
    - React authentically to {{persona.name}}'s actions and dialogue
    - Never break character unless {{persona.name}} explicitly asks you to step out of roleplay

    **World & Lore:**
    - ACTIVELY incorporate the World Information above when locations, characters, items, or concepts from the lore are relevant
    - Maintain consistency with established facts and the scenario

    **Pacing & Style:**
    - Keep responses concise and focused so {{persona.name}} can actively participate
    - Let scenes unfold naturally - avoid summarizing or rushing
    - Use vivid, sensory details for immersion
    - If you see [CONTINUE], continue exactly where you left off without restarting

    {{content_rules}}`}</CodeBlock>
            </div>

            <DocHeading level={2}>Why the default prompt is structured this way</DocHeading>
            <ul>
                <li>
                    <strong>Clear separation of concerns</strong>: character, user, world, and memory
                    are kept in distinct sections
                </li>
                <li>
                    <strong>Safe memory injection</strong>: summaries and memories are added
                    without overwhelming the model
                </li>
                <li>
                    <strong>Editability</strong>: you can adjust behavior without breaking structure
                </li>
                <li>
                    <strong>Consistency</strong>: characters stay grounded across long conversations
                </li>
            </ul>

            <p>
                This structure is intentional.
                Flattening everything into one paragraph usually makes characters
                less stable over time.
            </p>

            <Callout type="info" title="Important">
                If you customize the default system prompt,
                keep required placeholders intact.
                Removing them may disable memory or break roleplay flow.
            </Callout>

        </motion.article>
    );
}
