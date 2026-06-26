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
          A featured card sits at the top, followed by carousels you can browse,
          and tabs to switch the view:
        </p>
        <ul>
          <li>
            <strong>For You</strong>: a mixed view across everything
          </li>
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
        <p>
          Every section has a <strong>View all</strong> page where you can keep
          scrolling and sort the full list.
        </p>
      </DocSplit>

      <DocSplit
        imageSrc={images.discovery.search}
        imageAlt="Discovery search results"
        reverse
      >
        <DocHeading level={2}>Search and filter</DocHeading>
        <p>
          Use search to find specific characters, tags, or creators. On desktop,
          results appear right on the Discovery page as you type. On mobile,
          tapping the search bar opens a dedicated search screen that also shows
          your recent searches and a set of trending topics to tap.
        </p>
        <p>
          Tags are clickable: tap a tag on any card to instantly search for more
          characters with that tag. Results load in pages as you scroll, so you
          can keep going without paging buttons, and placeholder cards show while
          results load.
        </p>
        <p>
          Tap any result to open the detail view and review the card before
          importing.
        </p>
      </DocSplit>

      <DocSplit
        imageSrc={images.discovery.detail}
        imageAlt="Discovery card detail view"
      >
        <DocHeading level={2}>Review the card</DocHeading>
        <p>
          The detail view includes the card description, tags, author info (with
          follower count), the created date, and badges for NSFW, original
          characters, and whether a lorebook is included. It also previews the
          starting scenes and shows a token-usage breakdown so you know how large
          the card is. This is the best place to check tone and quality before
          importing.
        </p>
        <p>
          It also shows engagement stats such as views, downloads, and message
          counts so you can compare cards at a glance.
        </p>
        <p>
          When you import, the character is added to your Library with its name,
          description, greetings, avatar, and any available lorebook.
        </p>
      </DocSplit>

      <DocHeading level={2}>NSFW and Pure Mode</DocHeading>
      <p>
        Discovery respects the global <strong>Pure Mode</strong> setting, found
        in Settings under Security. It now has four levels:
      </p>
      <ul>
        <li>
          <strong>Off</strong>: all content is allowed. NSFW cards are visible in
          Discovery.
        </li>
        <li>
          <strong>Low</strong>: blocks explicit sexual content and slurs. NSFW
          cards are hidden from Discovery.
        </li>
        <li>
          <strong>Standard</strong> (default): blocks NSFW and graphic violence.
          Cards flagged as NSFW are hidden from listings, search, and detail
          views.
        </li>
        <li>
          <strong>Strict</strong>: maximum filtering with no suggestive tone.
          Also hides cards whose tags hint at suggestive themes, even when not
          formally flagged.
        </li>
      </ul>
      <p>
        Pure Mode shapes two things: it filters what your characters can say in
        chat, and it filters which cards Discovery shows you. The Discovery
        filtering is enforced in the backend, so changing the level takes effect
        for every request immediately. NSFW cards only appear when Pure Mode is
        Off.
      </p>

      <DocHeading level={2}>Sort and filter</DocHeading>
      <p>
        On a section&apos;s <strong>View all</strong> page you can sort the list
        by most liked, most downloaded, most viewed, most messages, newest,
        recently updated, or name (A to Z). Search supports free-text queries
        across names, taglines, and tags.
      </p>

      <DocHeading level={2}>What gets imported</DocHeading>
      <p>
        Importing a Discovery card creates a local character in your Library. The
        import brings over the avatar, the name and description, and the card&apos;s
        first message plus any alternate greetings (added as starting scenes). The
        rest of the card&apos;s details, such as personality, scenario, system
        prompt, post-history instructions, and example dialogue, are folded into
        the character&apos;s definition. Any attached lorebook is recreated and
        linked to the character. After import, everything is editable like any
        other character.
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
          Tap <strong>Download Character</strong>.
        </li>
        <li>
          The character is added to your Library. You can then start a chat right
          away or view it in your Library.
        </li>
      </ol>
    </motion.article>
    </>
  );
}
