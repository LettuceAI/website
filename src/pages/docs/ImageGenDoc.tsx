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

      <p>
        Some AI models can generate images, not just text. When these models are
        used, LettuceAI can display generated images directly in chat, and can
        also use them to create character avatars.
      </p>

      <Callout>
        Image generation is only available when the selected model supports it.
        Text-only models will continue to behave normally.
      </Callout>

      <DocHeading level={2}>Model Capabilities</DocHeading>

      <p>
        Each model lists the types of input and output it supports. This is
        shown in the model details as <strong>Capabilities</strong>:
      </p>

      <DocImage
        src={images.imageGeneration.capabilities}
        alt="Image Capabilities"
      />

      <p>This section tells you whether the model can:</p>

      <ul>
        <li>
          <strong>accept images as input</strong> (for example: “describe this
          image”)
        </li>
        <li>
          <strong>produce images as output</strong> (for example: “draw a
          fantasy castle”)
        </li>
      </ul>

      <p>
        If <strong>Image</strong> is enabled under Output, the model is able to
        generate images when asked.
      </p>

      <DocHeading level={2}>Images in Chat</DocHeading>

      <p>
        When a model supports image output, you can enable{" "}
        <strong>Image Output</strong> in Settings. Once enabled, the model may
        return generated images as part of its replies.
      </p>

      <ul>
        <li>images appear directly inside the chat</li>
        <li>text replies still work as normal</li>
        <li>you decide whether to allow images or not</li>
      </ul>

      <DocImage
        src={images.imageGeneration.imageGenerationInChat}
        alt="Image Generation in Chat"
      />

      <Callout>
        If Image Output is turned off, the model will describe the image instead
        of generating one.
      </Callout>

      <DocHeading level={2}>Avatar Generation</DocHeading>

      <p>
        Image-capable models may also be used to generate avatars for your
        characters. You can ask the model to create one from a description.
      </p>

      <ul>
        <li>avatars are saved locally</li>
        <li>you can regenerate them at any time</li>
        <li>or replace them manually</li>
      </ul>

      <DocImage
        src={images.imageGeneration.avatarGenerationUI}
        alt="Avatar Generation UI"
        containerClassName="max-w-lg mx-auto"
      />

      <p>
        Once generated, the avatar will be used in chat as the character's
        profile picture.
      </p>

      <DocImage
        src={images.imageGeneration.avatarGenerationResult}
        alt="Avatar Generation Result"
        containerClassName="max-w-lg mx-auto"
      />

      <DocHeading level={2}>Privacy</DocHeading>

      <p>
        Image prompts and generation requests are only sent to the provider you
        have configured. Nothing is uploaded anywhere else.
      </p>

      <DocHeading level={2}>Do I need to change anything?</DocHeading>

      <p>
        No. Unless you want to use image features. If your model supports image
        generation, simply enable Image Output. Otherwise, the model will
        function as a normal text-only response.
      </p>

      <Callout type="warning" title="Not every model supports image generation">
        Not all models support image generation. Make sure the model you choose
        supports image generation. Keep in mind that generating images may cost
        extra.
      </Callout>
    </motion.article>
  );
}
