import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";

export function ApiKeysDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>API Keys</DocHeading>

            <p className="lead">
                API keys sound scary. They’re not. This page explains what they are,
                why LettuceAI uses them, and how to get one without overthinking it.
            </p>

            <DocHeading level={2}>What is an API key?</DocHeading>
            <p>
                An API key is basically a <strong>password that lets an app talk to an AI service</strong>.
                LettuceAI itself does not run AI models, it connects you directly to a provider
                like OpenAI or Anthropic using your key.
            </p>
            <p>
                You can think of LettuceAI as the interface, and the API key as the permission
                that tells the provider "this user is allowed to send requests."
            </p>

            <DocHeading level={2}>Why does LettuceAI use API keys?</DocHeading>
            <ul>
                <li>You pay the provider directly, not LettuceAI</li>
                <li>You choose which models and providers to use</li>
                <li>You can switch or remove providers at any time</li>
                <li>Your data stays under your control</li>
            </ul>

            <DocHeading level={2}>Do I need technical knowledge?</DocHeading>
            <p>
                No. You don't need to code or understand APIs.
                You just copy a key once and paste it into LettuceAI.
            </p>

            <DocHeading level={2}>Will this cost money?</DocHeading>
            <p>
                Most providers charge based on usage. For normal chatting,
                the cost is usually very small. You can always see usage
                and limits on the provider's dashboard.
            </p>

            <DocHeading level={2}>Getting API keys for each provider</DocHeading>

            <p>
                Below are short, provider-specific instructions. All of them follow the same idea:
                create an account, generate a key once, then paste it into LettuceAI.
            </p>

            <DocHeading level={3}>OpenAI</DocHeading>
            <p>Best all-around models and strong reasoning.</p>
            <ol>
                <li>Go to <a href="https://platform.openai.com" target="_blank" rel="noreferrer">platform.openai.com</a></li>
                <li>Log in or create an account</li>
                <li>Open <strong>API Keys</strong></li>
                <li>Create a new secret key and copy it</li>
            </ol>

            <DocHeading level={3}>Anthropic (Claude)</DocHeading>
            <p>Known for natural, careful responses and long conversations.</p>
            <ol>
                <li>Go to <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a></li>
                <li>Log in or sign up</li>
                <li>Open <strong>API Keys</strong></li>
                <li>Create a new key</li>
            </ol>

            <DocHeading level={3}>Google Gemini</DocHeading>
            <p>Fast models with good multimodal support.</p>
            <ol>
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a></li>
                <li>Sign in with your Google account</li>
                <li>Click <strong>Create API key</strong></li>
            </ol>

            <DocHeading level={3}>DeepSeek</DocHeading>
            <p>Strong reasoning-focused and cost-efficient models.</p>
            <ol>
                <li>Go to <a href="https://platform.deepseek.com" target="_blank" rel="noreferrer">platform.deepseek.com</a></li>
                <li>Create or log into your account</li>
                <li>Open the API or developer section</li>
                <li>Create and copy your API key</li>
            </ol>

            <DocHeading level={3}>Mistral AI</DocHeading>
            <p>High-quality European models and open-model options.</p>
            <ol>
                <li>Go to <a href="https://console.mistral.ai" target="_blank" rel="noreferrer">console.mistral.ai</a></li>
                <li>Sign in or create an account</li>
                <li>Open <strong>API Keys</strong></li>
                <li>Create a new key</li>
            </ol>

            <DocHeading level={3}>Groq</DocHeading>
            <p>Extremely fast responses using LPU hardware.</p>
            <ol>
                <li>Go to <a href="https://console.groq.com" target="_blank" rel="noreferrer">console.groq.com</a></li>
                <li>Sign in</li>
                <li>Open the API section</li>
                <li>Generate an API key</li>
            </ol>

            <DocHeading level={3}>xAI (Grok)</DocHeading>
            <p>Grok models with a more opinionated, conversational style.</p>
            <ol>
                <li>Go to <a href="https://docs.x.ai" target="_blank" rel="noreferrer">docs.x.ai</a></li>
                <li>Follow the link to the xAI console</li>
                <li>Create an API key from your dashboard</li>
            </ol>

            <DocHeading level={3}>OpenRouter</DocHeading>
            <p>One API key that gives access to many different models.</p>
            <ol>
                <li>Go to <a href="https://openrouter.ai" target="_blank" rel="noreferrer">openrouter.ai</a></li>
                <li>Create an account or log in</li>
                <li>Open <strong>Keys</strong> in your dashboard</li>
                <li>Create a new API key</li>
            </ol>

            <DocHeading level={3}>Moonshot (Kimi)</DocHeading>
            <p>Very long-context models, popular for large documents.</p>
            <ol>
                <li>Go to <a href="https://platform.moonshot.cn" target="_blank" rel="noreferrer">platform.moonshot.cn</a></li>
                <li>Create an account</li>
                <li>Open the API management section</li>
                <li>Create and copy your API key</li>
            </ol>

            <DocHeading level={3}>Qwen (Alibaba DashScope)</DocHeading>
            <p>Alibaba’s Qwen models with strong multilingual support.</p>
            <ol>
                <li>Go to <a href="https://dashscope.aliyun.com" target="_blank" rel="noreferrer">DashScope Console</a></li>
                <li>Log in with your Alibaba Cloud account</li>
                <li>Create an API key in the console</li>
            </ol>

            <DocHeading level={3}>Anannas AI</DocHeading>
            <p>Lower-cost access to multiple models.</p>
            <ol>
                <li>Go to <a href="https://anannas.ai" target="_blank" rel="noreferrer">anannas.ai</a></li>
                <li>Create an account</li>
                <li>Open your dashboard</li>
                <li>Generate an API key</li>
            </ol>

            <DocHeading level={3}>Zai</DocHeading>
            <p>Simple, fast inference-focused provider.</p>
            <ol>
                <li>Go to the Zai dashboard</li>
                <li>Create or log into your account</li>
                <li>Generate an API key from settings</li>
            </ol>

            <DocHeading level={3}>Featherless</DocHeading>
            <p>Lightweight model hosting and inference.</p>
            <ol>
                <li>Go to <a href="https://featherless.ai" target="_blank" rel="noreferrer">featherless.ai</a></li>
                <li>Create an account</li>
                <li>Open API or developer settings</li>
                <li>Create an API key</li>
            </ol>

            <DocHeading level={3}>NanoGPT</DocHeading>
            <p>Simple pay-per-token API with minimal setup.</p>
            <ol>
                <li>Go to <a href="https://nano-gpt.com" target="_blank" rel="noreferrer">nano-gpt.com</a></li>
                <li>Create an account</li>
                <li>Open your dashboard</li>
                <li>Generate an API key</li>
            </ol>


            <DocHeading level={2}>Adding your key to LettuceAI</DocHeading>
            <ol>
                <li>Open LettuceAI</li>
                <li>Go to <strong>Settings → Providers</strong></li>
                <li>Click <strong>Add Provider</strong> or the <strong>+ icon</strong> in the top right corner of the screen.</li>
                <li>Select the provider you created a key for</li>
                <li>Paste your API key</li>
                <li>Write a title for your provider</li>
                <li>Save</li>
            </ol>

            <Callout type="warning" title="Security">
                Your API keys are stored locally on your device and sent directly to the provider.
            </Callout>

            <DocHeading level={2}>If something breaks</DocHeading>
            <ul>
                <li>Check your provider balance or usage limits</li>
                <li>If a key leaks, revoke it on the provider website</li>
                <li>You can remove or replace keys anytime</li>
            </ul>
        </motion.article>
    );
}
