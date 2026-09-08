import { motion } from "framer-motion";

/**
 * Full-bleed cover header: the image runs edge to edge and the headline sits on
 * top of it, instead of the default column layout where the title comes first
 * and the cover is a rounded card underneath.
 *
 * Opted into per post with `heroStyle: full` in the frontmatter, so the other
 * posts keep the layout they were written for.
 *
 * The image is `object-cover`, so it is cropped on both axes as the viewport
 * changes shape. Keep anything that matters away from the edges.
 */

type Props = {
  title: string;
  excerpt?: string;
  cover?: string;
  titleClass: string;
  /** breadcrumb, rendered over the top of the image */
  topSlot?: React.ReactNode;
};

export function WideHero({ title, excerpt, cover, titleClass, topSlot }: Props) {
  return (
    <div className="relative w-full h-[82vh] min-h-[560px] max-h-[900px] overflow-hidden bg-[#050505]">
      {cover && (
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          src={cover}
          alt={title}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* The image runs under the fixed nav, so the top fade is what keeps the
          nav legible. The bottom one hands the image off to the page. */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#050505] via-[#050505]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col justify-between pt-28 pb-14 sm:pb-20"
      >
        <div>{topSlot}</div>
        <div>
        <h1
          className={`${titleClass} text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold text-white leading-[1.04] tracking-[-0.03em] max-w-4xl [text-shadow:0_2px_48px_rgba(0,0,0,0.6)]`}
        >
          {title}
        </h1>
        {excerpt && (
          <p className="mt-6 text-lg sm:text-xl text-white/65 leading-[1.55] max-w-3xl [text-shadow:0_1px_24px_rgba(0,0,0,0.7)]">
            {excerpt}
          </p>
        )}
        </div>
      </motion.div>
    </div>
  );
}
