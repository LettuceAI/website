import { motion } from "framer-motion";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ImageGenerationDoc() {
  return (
    <>
    <SEO
      title="Image Generation"
      description="Generate images in LettuceAI with scene generation, avatar creation, and design references. Connect ComfyUI, Diffusers, AUTOMATIC1111, OpenAI, Gemini, Stability, and more."
      path="/docs/images"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Image Generation", path: "/docs/images" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Image Generation</DocHeading>

      <p className="lead">
        LettuceAI does not treat every image feature as one generic mode. There
        is a normal image-generation path, a separate scene-writer path for
        roleplay images, and a design-reference writer for turning reference
        images into reusable visual notes.
      </p>

      <Callout type="warning" title="Image generation now runs through a provider">
        LettuceAI no longer ships an on-device image engine. Every image is
        produced by a provider you connect, whether that provider runs on your
        own machine (like ComfyUI or a Diffusers server) or is an online service
        (like OpenAI or Google Gemini). If no image-capable model is set up,
        nothing will generate.
      </Callout>

      <DocHeading level={2}>What most users need to know</DocHeading>

      <p>
        You do not need to understand the full image stack to use this feature.
        For most people, it comes down to three simple actions:
      </p>

      <ul>
        <li>generate a new image from a prompt</li>
        <li>edit an existing image</li>
        <li>let the app help draft a scene prompt before generating</li>
      </ul>

      <Callout type="info" title="Simple mental model">
        Some models can <strong>create images</strong>. Some models can{" "}
        <strong>look at images and describe them</strong>. Some can do both.
        Most of the advanced wording on this page is just explaining that split.
      </Callout>

      <Callout type="info" title="Three distinct image systems">
        Avatar generation and normal image jobs use image-output models. Scene
        prompt drafting and design-reference drafting use a different kind of
        model: one that can read images and output text.
      </Callout>

      <DocHeading level={2}>What the app actually supports</DocHeading>

      <p>The image stack breaks down into three user-facing workflows:</p>

      <p>
        If you only want basic image generation, focus on the first one. The
        scene writer and design reference tools are optional advanced helpers.
      </p>

      <ul>
        <li>
          <strong>Image generation</strong>: create or edit images directly with
          an image-capable model.
        </li>
        <li>
          <strong>Scene generation</strong>: draft a scene prompt from recent
          roleplay context, then render that prompt into an image.
        </li>
        <li>
          <strong>Design reference drafting</strong>: read an avatar and a small
          set of reference images, then write a clean visual description for
          future use.
        </li>
      </ul>

      <p>
        That is why the settings page separates regular image models from the{" "}
        <strong>Scene Writer</strong> model. They solve different jobs.
      </p>

      <DocImage
        src={images.imageGeneration.imageGenerationSettings}
        alt="Image generation settings page"
        caption="In Settings, the Image page splits avatar and scene image models from the separate scene-writer model, and also controls how scene prompts are handled."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <DocHeading level={2}>
        Capabilities matter more than provider names
      </DocHeading>

      <p>
        The app chooses features from model scopes, not from marketing labels.
        In practice, you want to look at what a model can accept as input and
        what it can return as output.
      </p>

      <DocImage
        src={images.imageGeneration.capabilities}
        alt="Model capability scopes for image features"
        caption="The capability list is the real contract. Image generation needs image output. The scene writer needs text plus image input with text output."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[24rem] object-contain"
      />

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Feature</th>
            <th className="text-left py-2 px-4">What the model must support</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Avatar generation</td>
            <td className="py-2 px-4">Image output</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Avatar editing</td>
            <td className="py-2 px-4">
              Image output, and ideally image input too for edit-style models
            </td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Scene image rendering</td>
            <td className="py-2 px-4">Image output</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">
              Scene writer / design reference writer
            </td>
            <td className="py-2 px-4">
              Text input + image input + text output
            </td>
          </tr>
        </tbody>
      </table>

      <Callout>
        A model that can <em>see</em> images is not automatically a model that
        can <em>generate</em> them. Those are separate capabilities.
      </Callout>

      <DocHeading level={2}>Regular image generation</DocHeading>

      <p>
        The normal image pipeline is the most direct one. The app sends your
        prompt to the selected image model, saves the returned image locally,
        and then reuses it in the UI like any other media asset.
      </p>

      <ul>
        <li>
          Generated images are saved locally after the provider returns them.
        </li>
        <li>The returned result can be a hosted URL or raw image data.</li>
        <li>
          The app records width, height, mime type, and the stored asset id so
          the image behaves like a normal attachment.
        </li>
      </ul>

      <p>
        Behind the scenes, LettuceAI supports several provider adapters, so the
        exact payload shape varies by provider even though the UI flow stays the
        same.
      </p>

      <DocHeading level={3}>Supported image generators</DocHeading>

      <p>
        The app currently includes built-in support for several image backends.
        That means you can use different providers without rewriting the rest of
        your workflow. Some run locally on your own hardware, and some are online
        services.
      </p>

      <ul>
        <li>
          <strong>ComfyUI</strong> for local node-graph workflows you export from
          ComfyUI yourself.
        </li>
        <li>
          <strong>Diffusers</strong> for a local Diffusers-style image server.
        </li>
        <li>
          <strong>AUTOMATIC1111</strong> for local Stable Diffusion style
          txt2img and img2img setups.
        </li>
        <li>
          <strong>OpenAI</strong> image generation and edit-style requests.
        </li>
        <li>
          <strong>OpenRouter</strong> models that can return image output.
        </li>
        <li>
          <strong>Google Gemini</strong> image-capable generation flows.
        </li>
        <li>
          <strong>Stability</strong> text-to-image and image-to-image
          generation.
        </li>
        <li>
          <strong>xAI</strong> image generation and edit flows.
        </li>
        <li>
          <strong>NanoGPT</strong> OpenAI-style image generation requests.
        </li>
        <li>
          <strong>Pollinations</strong> for simple hosted image generation.
        </li>
      </ul>

      <p>
        The UI stays mostly the same across these providers, but the provider
        still matters for edit quality, reference-image handling, returned
        formats, and how reliable multimodal prompting feels in practice.
      </p>

      <DocHeading level={2}>Connecting a local image backend</DocHeading>

      <p>
        Local backends like ComfyUI and Diffusers are added the same way as any
        other provider, under <strong>Settings → Providers</strong>. You
        pick the provider, then give it the <strong>Base URL</strong> where it is
        running (for example a ComfyUI or Diffusers server on your own machine or
        local network). An API key is only needed if your endpoint requires one.
      </p>

      <DocHeading level={3}>ComfyUI workflows</DocHeading>

      <p>
        ComfyUI is driven by workflows rather than a single fixed request. In the
        ComfyUI provider editor you paste an{" "}
        <strong>API-format workflow exported from ComfyUI</strong>. You can paste
        a text-to-image workflow and, optionally, a separate image-to-image
        workflow that is used whenever reference images are present.
      </p>

      <p>
        LettuceAI fills in the parts of the workflow that change per request by
        replacing placeholder tokens. The available tokens include the prompt and
        negative prompt, size, steps, CFG, seed, sampler, checkpoint, denoise,
        and image count, plus ordered reference-image tokens (the first reference
        image, the second, and so on). This is how the same saved workflow can be
        reused for every generation.
      </p>

      <Callout type="info" title="The image workflow is for reference-based jobs">
        Your text-to-image workflow handles plain prompts. The optional
        image-to-image workflow is what runs when one or more reference images
        are attached, so you can wire reference images into the nodes that expect
        them.
      </Callout>

      <DocHeading level={3}>Diffusers</DocHeading>

      <p>
        A Diffusers endpoint is simpler to connect: set its Base URL and it works
        like the other Stable Diffusion style backends. Per-model details such as
        size, steps, CFG, sampler, seed, and denoise strength come from that
        model's settings, described further down.
      </p>

      <DocHeading level={3}>Self-signed and local endpoints</DocHeading>

      <p>
        Local and self-hosted endpoints often do not have a normal public
        certificate. LettuceAI applies your trusted certificates to image
        requests, and for self-hosted providers you can turn on{" "}
        <strong>Allow Invalid TLS</strong> in the provider editor to skip
        certificate validation for that one endpoint.
      </p>

      <Callout type="warning" title="Only relax TLS for endpoints you control">
        The Allow Invalid TLS option exists for your own local or private
        machines. Do not enable it for an endpoint you do not personally trust.
      </Callout>

      <DocHeading level={2}>Reference images and ordering</DocHeading>

      <p>
        Several image features can send more than one reference image, and the
        order is meaningful. LettuceAI passes the references as an ordered set, so
        backends that care about position (like a ComfyUI workflow with separate
        reference nodes) receive the first reference, the second reference, and so
        on in a predictable sequence.
      </p>

      <ul>
        <li>
          Character design references come first, followed by any persona
          references and an optional chat background image.
        </li>
        <li>
          The first reference image is treated as the primary one for edit and
          image-to-image style requests.
        </li>
        <li>
          Ordering lets a workflow or model tell, for example, the character
          reference apart from the background reference.
        </li>
      </ul>

      <DocHeading level={2}>Images generated inside chat</DocHeading>

      <p>
        For normal chat image output, the behavior is simpler than that: if the
        selected chat model returns an image, LettuceAI shows that image as an
        attachment on the assistant message. If the model does not return an
        image, then nothing visual is added.
      </p>

      <ul>
        <li>The assistant message still keeps its normal text content.</li>
        <li>
          Any returned image is saved locally and attached to that same message.
        </li>
        <li>
          This depends on the chat model actually producing image output, not
          just on the provider existing in settings.
        </li>
      </ul>

      <DocImage
        src={images.imageGeneration.imageGenerationInChat}
        alt="Images generated directly inside chat"
        caption="In-chat image generation is a post-processing step. The assistant reply lands first, then LettuceAI runs the attached image job and replaces the placeholder with the final saved image."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <Callout type="warning" title="Not every provider behaves the same way">
        Some providers support clean image editing and multiple reference images
        better than others. A model being visible in settings does not mean all
        image workflows are equally strong on that provider.
      </Callout>

      <DocHeading level={2}>Avatar generation and avatar editing</DocHeading>

      <p>
        Avatar tools are built on top of the normal image-generation pipeline,
        but the prompt itself comes from a dedicated avatar template. That means
        avatar generation is structured and reusable rather than just one
        freeform prompt box.
      </p>

      <ul>
        <li>
          <strong>Generate</strong> writes a fresh avatar prompt from the
          subject name, subject description, and your request.
        </li>
        <li>
          <strong>Edit</strong> reuses the current avatar image as the source
          and asks the model to preserve identity while changing only what you
          asked for.
        </li>
        <li>
          Every accepted result becomes a local asset you can keep, replace, or
          regenerate later.
        </li>
      </ul>

      <DocImage
        src={images.imageGeneration.avatarGenerationUI}
        alt="Avatar generation interface"
        caption="Avatar generation is template-driven: the app renders a dedicated avatar prompt first, then sends it through the selected image model."
        containerClassName="mx-auto max-w-3xl"
        className="mx-auto max-h-[32rem] object-contain"
      />

      <DocImage
        src={images.imageGeneration.avatarGenerationResult}
        alt="Generated avatar result"
        caption="Generated avatars are stored locally and can be reused as profile art or as fallback visual references elsewhere in the app."
        containerClassName="mx-auto max-w-3xl"
        className="mx-auto max-h-[26rem] object-contain"
      />

      <p>
        If a character or persona has no saved design-reference images, the base
        avatar can also act as the fallback visual reference for later scene
        generation.
      </p>

      <DocHeading level={2}>Per-model image settings</DocHeading>

      <p>
        Image models keep their own settings inside the model editor, so each
        model can be tuned without affecting the others. Open a model from the
        Models page to find its image options.
      </p>

      <ul>
        <li>
          <strong>Negative prompt</strong>: things you never want in the image,
          applied to every request for that model.
        </li>
        <li>
          <strong>Extra prompt</strong>: text that is always added before your
          prompt. This is the right place for quality tags and style boilerplate
          so you do not have to retype them.
        </li>
        <li>
          <strong>Prompt writer instructions</strong>: format guidance for the
          scene writer when it composes prompts for this model. For example, you
          can tell it to write comma-separated tags instead of full sentences.
        </li>
        <li>
          <strong>Generation controls</strong> such as size, steps, CFG,
          sampler, seed, and denoise strength for Stable Diffusion style
          backends.
        </li>
      </ul>

      <Callout type="info" title="Extra prompt vs writer instructions">
        Extra prompt is glued onto the final image prompt. Prompt writer
        instructions instead change how the scene writer phrases the prompt in
        the first place. One shapes the words sent to the image model, the other
        shapes how those words get written.
      </Callout>

      <DocHeading level={2}>Prompting and visual consistency</DocHeading>

      <p>
        Consistency is not just about picking a better model. In LettuceAI, it
        comes from how the app builds prompts and how it reuses visual anchors
        across different image features.
      </p>

      <ul>
        <li>
          <strong>Avatar templates</strong> give the app a stable way to phrase
          who the subject is and what should change.
        </li>
        <li>
          <strong>Design reference notes</strong> turn image observations into
          reusable text that can carry outfit cues, face coverage, materials,
          silhouette, and non-negotiables into future prompts.
        </li>
        <li>
          <strong>Saved design-reference images</strong> are the strongest
          identity anchor for later scene generation.
        </li>
        <li>
          <strong>Base avatars</strong> can still act as fallback references
          when no dedicated design references exist.
        </li>
      </ul>

      <p>
        That is the main consistency loop: generate or choose a stable avatar,
        attach a few good design references, draft clean design notes, and then
        let later scene prompts reuse that same visual identity instead of
        starting from scratch every time.
      </p>

      <Callout type="info" title="Consistency is a pipeline, not one prompt">
        The app gets more reliable when the same character identity shows up in
        multiple layers: avatar prompt, design-reference images,
        design-reference text, and scene-generation prompt. Using only one of
        those layers usually makes results drift faster.
      </Callout>

      <DocHeading level={3}>What helps prompts stay stable</DocHeading>

      <ul>
        <li>
          Use a small set of clean reference images instead of many inconsistent
          ones.
        </li>
        <li>Keep one concise design description with durable visual facts.</li>
        <li>
          Edit existing avatars when refining style, rather than regenerating
          from zero every time.
        </li>
        <li>
          Use the scene writer for roleplay scenes so the prompt is based on
          recent context and your saved references, not only on a raw one-line
          request.
        </li>
      </ul>

      <p>
        This is also why scene generation is split into writer plus renderer.
        One model can focus on producing a clean, identity-aware prompt from the
        chat context, while another model focuses on actually drawing the image.
      </p>

      <DocHeading level={2}>Scene generation in roleplay chats</DocHeading>

      <p>
        Scene generation is a two-step system. First, a scene-writer model turns
        recent roleplay context into one polished scene prompt. Then an
        image-generation model renders that prompt into the final image.
      </p>

      <DocImage
        src={images.imageGeneration.sceneFlow}
        alt="How a scene image is built, approved, and rendered"
        caption="A prompt writer turns the moment in the chat (plus your design references and extra prompt) into a scene prompt. Depending on your approval setting it generates automatically, after your review, or only when you ask, then a self-hosted or cloud backend renders the image into the chat."
        containerClassName="max-w-2xl mx-auto"
      />

      <ol>
        <li>
          The app looks at the selected message and a short recent context
          window.
        </li>
        <li>
          A scene-writer template injects character info, persona info, recent
          messages, and optional reference images.
        </li>
        <li>
          The writer returns one final prompt, not an explanation or analysis.
        </li>
        <li>
          The image model receives that prompt plus any saved character or
          persona references, sent in order.
        </li>
      </ol>

      <ul>
        <li>
          In <strong>Automatic</strong> mode, the app generates the scene image
          as soon as the model provides a scene prompt.
        </li>
        <li>
          In <strong>Ask first</strong> mode, the detected scene prompt is shown
          so you can review and edit it before any image is generated.
        </li>
        <li>
          In <strong>Manual</strong> mode, scene prompts in model responses are
          ignored and images only generate from actions you trigger yourself.
        </li>
      </ul>

      <DocImage
        src={images.imageGeneration.scenePromptApprovalSheet}
        alt="Scene prompt approval sheet"
        caption="Ask-first mode lets you inspect and edit the drafted scene prompt before sending the final image request."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <DocImage
        src={images.imageGeneration.sceneGenerationResult}
        alt="Scene generation result in chat"
        caption="After approval or automatic generation, the rendered scene image is attached back onto the assistant message."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[30rem] object-contain"
      />

      <Callout type="info" title="Reference images are identity anchors">
        For scene images, saved design-reference images are preferred. If those
        do not exist, LettuceAI can fall back to the base avatar image so the
        model still gets a stable face and outfit anchor.
      </Callout>

      <DocHeading level={2}>Design references</DocHeading>

      <p>
        Design references live on each character and persona, in the editor. A
        design reference is a small set of clear reference images plus one
        canonical visual description. Together they tell scene generation what
        the same face, build, outfit cues, and style should keep looking like.
      </p>

      <p>
        You can write the visual description yourself, or use{" "}
        <strong>design reference drafting</strong> to have the app write it for
        you. Drafting does not create a picture. It reads the subject avatar and
        any reference images and produces a concise, artist-facing description,
        not a narrative caption.
      </p>

      <ul>
        <li>The scene-writer model reads the images and any current notes.</li>
        <li>
          The returned result is a clean visual note covering things like face,
          hair, build, outfit cues, accessories, and art direction.
        </li>
        <li>
          Those notes and images then feed later prompt templates and scene
          generation.
        </li>
      </ul>

      <DocImage
        src={images.imageGeneration.designReferenceDraftingUI}
        alt="Design reference drafting UI"
        caption="Design reference drafting uses the scene-writer model to turn avatar and reference images into reusable visual notes."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <DocHeading level={2}>
        Prompt templates also affect image tools
      </DocHeading>

      <p>
        Image features are not hardcoded to one prompt. Avatar generation,
        avatar editing, scene prompt generation, and design reference drafting
        all run through protected internal templates.
      </p>

      <ul>
        <li>Avatar templates write image prompts.</li>
        <li>
          Scene-generation templates write one scene prompt from chat context,
          and can include your per-model prompt writer instructions.
        </li>
        <li>
          Design-reference templates can inject multimodal image payloads for
          avatar and reference images.
        </li>
      </ul>

      <p>
        If you customize prompt templates elsewhere in the docs, remember that
        some of those changes affect image-related tools too, not just normal
        text chat.
      </p>

      <DocHeading level={2}>Privacy and local storage</DocHeading>

      <p>
        Prompts and image inputs go only to the provider you selected for that
        specific workflow. If that provider runs on your own machine, the data
        never leaves your network. After generation, LettuceAI saves the
        resulting image locally so it can be reused as an avatar, a chat
        attachment, or a design reference.
      </p>

      <ul>
        <li>Generated assets are stored locally after the request finishes.</li>
        <li>
          Design-reference images and avatars can later be reused as scene
          references.
        </li>
        <li>
          The app does not need a separate LettuceAI image hosting step to keep
          those results available in your workspace.
        </li>
      </ul>

      <DocHeading level={2}>What to configure first</DocHeading>

      <ol>
        <li>
          Connect at least one provider with image output and choose it for
          avatar or scene image generation.
        </li>
        <li>
          Choose a separate scene-writer model if you want automatic scene
          prompt drafting or design-reference drafting.
        </li>
        <li>
          Add a few stable design-reference images if you want consistent faces,
          outfits, and proportions in scene images.
        </li>
      </ol>

      <Callout
        type="warning"
        title="The wrong model mix causes confusing failures"
      >
        If scene generation is enabled but no compatible scene-writer model is
        configured, prompt drafting helpers will fail even if you already have a
        normal image model set up.
      </Callout>
    </motion.article>
    </>
  );
}
