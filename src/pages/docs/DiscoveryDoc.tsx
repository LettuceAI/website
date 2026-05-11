import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocSplit } from "@/components/docs/DocSplit";
import { DocImage } from "@/components/docs/DocImage";
import { Callout } from "@/components/docs/Callout";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function DiscoveryDoc() {
  return (
    <>
    <SEO
      title="Discovery"
      description="Browse and import public characters from Character Tavern with trending, popular, and newest filters."
      path="/docs/discovery"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Discovery", path: "/docs/discovery" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Discovery</DocHeading>

      <p className="lead">
        Discovery lets you browse and import characters from Character Tavern
        without leaving the app. Explore trending, popular, and newest cards,
        then add them directly to your Library.
      </p>

      <DocSplit
        imageSrc={images.discovery.home}
        imageAlt="Discovery home with featured sections"
      >
        <DocHeading level={2}>How Discovery works</DocHeading>
        <p>
          Discovery pulls public character cards from Character Tavern and
          displays them inside LettuceAI. Each card shows a snapshot of a
          character’s profile, tags, and engagement stats so you can evaluate it
          before importing.
        </p>
        <p>
          The Discovery home is organized into sections so you can quickly see
          what is new, what is trending, and what is getting the most attention.
        </p>
        <ul>
          <li>
            <strong>Trending</strong>: recently active cards
          </li>
          <li>
            <strong>Popular</strong>: most liked and downloaded
          </li>
          <li>
            <strong>Newest</strong>: latest uploads
          </li>
        </ul>
      </DocSplit>

      <DocSplit
        imageSrc={images.discovery.search}
        imageAlt="Discovery search results"
        reverse
      >
        <DocHeading level={2}>Search and filter</DocHeading>
        <p>
          Use search to find specific characters, tags, or creators. Tap any
          result to open the detail view and review the card before importing.
        </p>
        <p>
          Search results show key stats like likes and downloads so you can
          compare quickly.
        </p>
      </DocSplit>

      <DocSplit
        imageSrc={images.discovery.detail}
        imageAlt="Discovery card detail view"
      >
        <DocHeading level={2}>Review the card</DocHeading>
        <p>
          The detail view includes the card description, tags, content warnings,
          and author info. This is the best place to check tone and quality
          before importing.
        </p>
        <p>
          When you import, the character is added to your Library and includes
          the card data (name, description, greetings, avatar) and any available
          lorebook.
        </p>
      </DocSplit>

      <DocHeading level={2}>NSFW and Pure Mode</DocHeading>
      <p>
        Discovery respects the global <strong>Pure Mode</strong> setting, which
        has three levels:
      </p>
      <ul>
        <li>
          <strong>Off</strong>: NSFW cards are visible. Their avatars are
          blurred in the listing until you open them.
        </li>
        <li>
          <strong>Standard</strong> (default): cards flagged as NSFW are hidden
          from listings, search, and detail views.
        </li>
        <li>
          <strong>Strict</strong>: also filters out cards whose tags or content
          warnings hint at suggestive themes, even when not formally flagged.
        </li>
      </ul>
      <p>
        Pure Mode is enforced in the backend, so changing it takes effect for
        every Discovery request immediately.
      </p>

      <DocHeading level={2}>Sort and filter</DocHeading>
      <p>
        Inside a section you can sort by newest, last updated, likes,
        downloads, messages, views, or name. Search supports free-text queries
        across names, taglines, and tags.
      </p>

      <DocHeading level={2}>What gets imported</DocHeading>
      <p>
        Importing a Discovery card creates a local character in your Library.
        The import includes the card's text fields, avatars, alternate
        greetings, system prompt, post-history instructions, and any attached
        lorebook. If the card ships an expression pack, that is fetched too.
        After import, everything is editable like any other character.
      </p>

      <Callout type="info" title="Privacy note">
        Discovery only fetches public character data. Your chats and personal
        data are never sent to Character Tavern.
      </Callout>

      <DocHeading level={2}>Quick import flow</DocHeading>
      <DocImage
        src={images.discovery.import}
        alt="Importing a character from Discovery"
        containerClassName="max-w-xl mx-auto"
      />
      <ol>
        <li>Open a card from Discovery.</li>
        <li>
          Tap <strong>Import</strong>.
        </li>
        <li>The character appears in your Library, ready to chat.</li>
      </ol>
    </motion.article>
    </>
  );
}
