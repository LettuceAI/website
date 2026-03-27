import { motion } from "framer-motion";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";

export function ImageGenerationDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Image Generation</DocHeading>

      <p className="lead">
        LettuceAI does not treat every image feature as one generic mode. There is a normal
        image-generation path, a separate scene-writer path for roleplay images, and a
        design-reference writer for turning reference images into reusable visual notes.
      </p>

      <Callout type="info" title="Three distinct image systems">
        Avatar generation and normal image jobs use image-output models. Scene prompt drafting and
        design-reference drafting use a different kind of model: one that can read images and output
        text.
      </Callout>

      <DocHeading level={2}>What the app actually supports</DocHeading>

      <p>The image stack breaks down into three user-facing workflows:</p>

      <ul>
        <li>
          <strong>Image generation</strong>: create or edit images directly with an image-capable
          model.
        </li>
        <li>
          <strong>Scene generation</strong>: draft a scene prompt from recent roleplay context, then
          render that prompt into an image.
        </li>
        <li>
          <strong>Design reference drafting</strong>: read an avatar and a small set of reference
          images, then write a clean visual description for future use.
        </li>
      </ul>

      <p>
        That is why the settings page separates regular image models from the{" "}
        <strong>Scene Writer</strong> model. They solve different jobs.
      </p>

      <DocImage
        src={images.imageGeneration.imageGenerationSettings}
        alt="Image generation settings page"
        caption="Image settings split the normal image model from the separate scene-writer model, and also control scene generation mode."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <DocHeading level={2}>Capabilities matter more than provider names</DocHeading>

      <p>
        The app chooses features from model scopes, not from marketing labels. In practice, you want
        to look at what a model can accept as input and what it can return as output.
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
            <td className="py-2 px-4 font-medium">Scene writer / design reference writer</td>
            <td className="py-2 px-4">Text input + image input + text output</td>
          </tr>
        </tbody>
      </table>

      <Callout>
        A model that can <em>see</em> images is not automatically a model that can <em>generate</em>{" "}
        them. Those are separate capabilities.
      </Callout>

      <DocHeading level={2}>Regular image generation</DocHeading>

      <p>
        The normal image pipeline is the most direct one. The app sends your prompt to the selected
        image model, saves the returned image locally, and then reuses it in the UI like any other
        media asset.
      </p>

      <ul>
        <li>Generated images are saved locally after the provider returns them.</li>
        <li>The returned result can be a hosted URL or raw image data.</li>
        <li>
          The app records width, height, mime type, and the stored asset id so the image behaves
          like a normal attachment.
        </li>
      </ul>

      <p>
        Behind the scenes, LettuceAI supports several provider adapters, so the exact payload shape
        varies by provider even though the UI flow stays the same.
      </p>

      <DocHeading level={3}>Supported image generators</DocHeading>

      <p>
        The app currently includes built-in adapters for several image backends. That means you can
        use different providers without rewriting the rest of your workflow.
      </p>

      <ul>
        <li>
          <strong>AUTOMATIC1111</strong> for local Stable Diffusion style txt2img and img2img
          setups.
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
          <strong>Stability</strong> text-to-image and image-to-image generation.
        </li>
        <li>
          <strong>xAI</strong> image generation and edit flows.
        </li>
        <li>
          <strong>NanoGPT</strong> OpenAI-style image generation requests.
        </li>
      </ul>

      <p>
        The UI stays mostly the same across these providers, but the provider still matters for edit
        quality, reference-image handling, returned formats, and how reliable multimodal prompting
        feels in practice.
      </p>

      <DocHeading level={2}>Images generated inside chat</DocHeading>

      <p>
        For normal chat image output, the behavior is simpler than that: if the selected chat model
        returns an image, LettuceAI shows that image as an attachment on the assistant message. If
        the model does not return an image, then nothing visual is added.
      </p>

      <ul>
        <li>The assistant message still keeps its normal text content.</li>
        <li>Any returned image is saved locally and attached to that same message.</li>
        <li>
          This depends on the chat model actually producing image output, not just on the provider
          existing in settings.
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
        Some providers support clean image editing and multiple reference images better than others.
        A model being visible in settings does not mean all image workflows are equally strong on
        that provider.
      </Callout>

      <DocHeading level={2}>Avatar generation and avatar editing</DocHeading>

      <p>
        Avatar tools are built on top of the normal image-generation pipeline, but the prompt itself
        comes from a dedicated avatar template. That means avatar generation is structured and
        reusable rather than just one freeform prompt box.
      </p>

      <ul>
        <li>
          <strong>Generate</strong> writes a fresh avatar prompt from the subject name, subject
          description, and your request.
        </li>
        <li>
          <strong>Edit</strong> reuses the current avatar image as the source and asks the model to
          preserve identity while changing only what you asked for.
        </li>
        <li>
          Every accepted result becomes a local asset you can keep, replace, or regenerate later.
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
        If a character or persona has no saved design-reference images, the base avatar can also act
        as the fallback visual reference for later scene generation.
      </p>

      <DocHeading level={2}>Prompting and visual consistency</DocHeading>

      <p>
        Consistency is not just about picking a better model. In LettuceAI, it comes from how the
        app builds prompts and how it reuses visual anchors across different image features.
      </p>

      <ul>
        <li>
          <strong>Avatar templates</strong> give the app a stable way to phrase who the subject is
          and what should change.
        </li>
        <li>
          <strong>Design reference notes</strong> turn image observations into reusable text that
          can carry outfit cues, face coverage, materials, silhouette, and non-negotiables into
          future prompts.
        </li>
        <li>
          <strong>Saved design-reference images</strong> are the strongest identity anchor for later
          scene generation.
        </li>
        <li>
          <strong>Base avatars</strong> can still act as fallback references when no dedicated
          design references exist.
        </li>
      </ul>

      <p>
        That is the main consistency loop: generate or choose a stable avatar, attach a few good
        design references, draft clean design notes, and then let later scene prompts reuse that
        same visual identity instead of starting from scratch every time.
      </p>

      <Callout type="info" title="Consistency is a pipeline, not one prompt">
        The app gets more reliable when the same character identity shows up in multiple layers:
        avatar prompt, design-reference images, design-reference text, and scene-generation prompt.
        Using only one of those layers usually makes results drift faster.
      </Callout>

      <DocHeading level={3}>What helps prompts stay stable</DocHeading>

      <ul>
        <li>Use a small set of clean reference images instead of many inconsistent ones.</li>
        <li>Keep one concise design description with durable visual facts.</li>
        <li>
          Edit existing avatars when refining style, rather than regenerating from zero every time.
        </li>
        <li>
          Use the scene writer for roleplay scenes so the prompt is based on recent context and your
          saved references, not only on a raw one-line request.
        </li>
      </ul>

      <p>
        This is also why scene generation is split into writer plus renderer. One model can focus on
        producing a clean, identity-aware prompt from the chat context, while another model focuses
        on actually drawing the image.
      </p>

      <DocHeading level={2}>Scene generation in roleplay chats</DocHeading>

      <p>
        Scene generation is a two-step system. First, a scene-writer model turns recent roleplay
        context into one polished scene prompt. Then an image-generation model renders that prompt
        into the final image.
      </p>

      <ol>
        <li>The app looks at the selected message and a short recent context window.</li>
        <li>
          A scene-writer template injects character info, persona info, recent messages, and
          optional reference images.
        </li>
        <li>The writer returns one final prompt, not an explanation or analysis.</li>
        <li>
          The image model receives that prompt plus any saved character or persona references.
        </li>
      </ol>

      <ul>
        <li>
          In <strong>auto</strong> mode, the app runs the scene image generation immediately.
        </li>
        <li>
          In <strong>ask first</strong> mode, you can review and edit the drafted prompt before the
          image request is sent.
        </li>
        <li>
          In <strong>manual</strong> mode, no automatic scene image job runs from assistant replies.
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
        For scene images, saved design-reference images are preferred. If those do not exist,
        LettuceAI can fall back to the base avatar image so the model still gets a stable face and
        outfit anchor.
      </Callout>

      <DocHeading level={2}>Design reference drafting</DocHeading>

      <p>
        Design reference generation does not create a picture. It creates text notes from a subject
        avatar and optional reference images so future image prompts can stay visually consistent.
      </p>

      <ul>
        <li>The scene-writer model reads the images and any current notes.</li>
        <li>
          The returned result is a concise artist-facing description, not a narrative caption.
        </li>
        <li>Those notes can then feed later prompt templates and scene generation.</li>
      </ul>

      <DocImage
        src={images.imageGeneration.designReferenceDraftingUI}
        alt="Design reference drafting UI"
        caption="Design reference drafting uses the scene-writer model to turn avatar and reference images into reusable visual notes."
        containerClassName="mx-auto max-w-4xl"
        className="mx-auto max-h-[28rem] object-contain"
      />

      <DocHeading level={2}>Prompt templates also affect image tools</DocHeading>

      <p>
        Image features are not hardcoded to one prompt. Avatar generation, avatar editing, scene
        prompt generation, and design reference drafting all run through protected internal
        templates.
      </p>

      <ul>
        <li>Avatar templates write image prompts.</li>
        <li>Scene-generation templates write one scene prompt from chat context.</li>
        <li>
          Design-reference templates can inject multimodal image payloads for avatar and reference
          images.
        </li>
      </ul>

      <p>
        If you customize prompt templates elsewhere in the docs, remember that some of those changes
        affect image-related tools too, not just normal text chat.
      </p>

      <DocHeading level={2}>Privacy and local storage</DocHeading>

      <p>
        Prompts and image inputs go only to the provider you selected for that specific workflow.
        After generation, LettuceAI saves the resulting image locally so it can be reused as an
        avatar, a chat attachment, or a design reference.
      </p>

      <ul>
        <li>Generated assets are stored locally after the request finishes.</li>
        <li>Design-reference images and avatars can later be reused as scene references.</li>
        <li>
          The app does not need a separate LettuceAI image hosting step to keep those results
          available in your workspace.
        </li>
      </ul>

      <DocHeading level={2}>What to configure first</DocHeading>

      <ol>
        <li>Choose at least one model with image output for avatar or image generation.</li>
        <li>
          Choose a separate scene-writer model if you want automatic scene prompt drafting or
          design-reference drafting.
        </li>
        <li>
          Add a few stable design-reference images if you want consistent faces, outfits, and
          proportions in scene images.
        </li>
      </ol>

      <Callout type="warning" title="The wrong model mix causes confusing failures">
        If scene generation is enabled but no compatible scene-writer model is configured, prompt
        drafting helpers will fail even if you already have a normal image model set up.
      </Callout>
    </motion.article>
  );
}
