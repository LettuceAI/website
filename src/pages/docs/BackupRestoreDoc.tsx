import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function BackupRestoreDoc() {
  return (
    <>
      <SEO
        title="Backup & Restore"
        description="Create encrypted, password-protected backups of your LettuceAI data and restore them on the same device or a new one."
        path="/docs/backup-restore"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Backup & Restore", path: "/docs/backup-restore" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Backup & Restore</DocHeading>
        <p>
          Backup & Restore lets you save a complete, encrypted snapshot of your
          LettuceAI data to a single file you control. You can keep the file as
          a long-term archive, copy it to external storage, or use it to move
          your setup to another device.
        </p>
        <Callout>
          Every backup is encrypted with a password you choose. Unencrypted
          backups are not supported. If you lose the password, the data cannot
          be recovered.
        </Callout>

        <DocHeading level={2}>Creating a backup</DocHeading>
        <p>
          Open <strong>Settings &rarr; Backup & Restore</strong> and tap{" "}
          <strong>Create new backup</strong>. You will be asked to choose a
          password (minimum 6 characters) and confirm it. The app then bundles
          your data into a single encrypted <code>.lettuce</code> file and
          writes it to your Downloads folder.
        </p>
        <p>
          The backup file is a password-protected archive. Each piece of data
          inside is encrypted before it is written, using a key derived from
          your password.
        </p>
        <Callout type="warning" title="Choose a password you will remember">
          The password is required to restore. There is no recovery option, no
          reset link, and no server-side copy. If you forget it, the backup
          is unreadable.
        </Callout>

        <DocHeading level={2}>What gets included</DocHeading>
        <p>A backup contains the data you have created and configured in the app, including:</p>
        <ul>
          <li>Providers, models, and downloaded model references</li>
          <li>Characters, personas, and chats</li>
          <li>Memories and dynamic memory entries</li>
          <li>Preferences and settings</li>
          <li>Media attached to your data</li>
        </ul>
        <p>
          The backup also records the app version and a manifest so the app
          knows how to restore it correctly on a future version.
        </p>

        <DocHeading level={2}>Restoring on the same device</DocHeading>
        <p>
          On the Backup & Restore screen, your existing <code>.lettuce</code>{" "}
          files in Downloads are listed automatically. Tap one, enter the
          password used when it was created, and confirm.
        </p>
        <Callout type="warning" title="Restore replaces current data">
          Restoring overwrites the data currently in the app. This cannot be
          undone, so create a fresh backup first if you might want your
          current state back later.
        </Callout>
        <p>
          If a backup is not visible in the list, use <strong>Browse Files</strong>{" "}
          to pick it manually from any location on your device.
        </p>

        <DocHeading level={3}>Dynamic memory and the embedding model</DocHeading>
        <p>
          If the backup contains characters that use dynamic memory, the app
          checks whether the embedding model is installed. If it is missing,
          you can either download the model and continue with dynamic memory
          enabled, or finish the restore with dynamic memory disabled for the
          affected characters. You can install the model and re-enable it
          later from character settings.
        </p>

        <DocHeading level={2}>Restoring on another device</DocHeading>
        <p>
          Copy the <code>.lettuce</code> file to the other device (USB drive,
          file share, cloud storage of your choice, anywhere you trust),
          install LettuceAI there, open <strong>Settings &rarr; Backup &
          Restore</strong>, tap <strong>Browse Files</strong>, select the
          file, and enter the password.
        </p>
        <p>
          The new device will have the same chats, characters, settings, and
          memories as the device where the backup was created.
        </p>

        <DocHeading level={2}>How this differs from Sync</DocHeading>
        <p>
          Backup and Sync solve different problems. Sync transfers data
          directly between two devices that are online at the same time on the
          same network. Backup produces a portable file you keep yourself.
        </p>
        <ul>
          <li>
            <strong>Backup:</strong> a single encrypted file. Works offline.
            Can be stored anywhere. Good for archives, moving to a device that
            is not yet online, or recovering from a reset.
          </li>
          <li>
            <strong>Sync:</strong> a live peer-to-peer transfer between two
            devices over the local network. No file is produced.
          </li>
        </ul>

        <DocHeading level={2}>Deleting backups</DocHeading>
        <p>
          Each backup in the list has a delete action. Deleting a backup
          removes the <code>.lettuce</code> file from your Downloads folder
          permanently. It does not affect the data currently in the app.
        </p>

        <DocHeading level={2}>Factory reset</DocHeading>
        <p>
          A factory reset wipes the app back to its first-launch state. It is
          available under <strong>Settings &rarr; About &rarr; Reset</strong>{" "}
          (or the Reset entry in Settings).
        </p>
        <p>The reset removes:</p>
        <ul>
          <li>Providers, models, and downloaded files</li>
          <li>Characters, personas, and chats</li>
          <li>Preferences, backups, and cached data</li>
        </ul>
        <Callout type="warning" title="Reset is permanent">
          Reset cannot be undone. Once it finishes, the app exits. Create a
          backup first if there is anything you might want back.
        </Callout>
        <p>
          A backup file stored outside the app (for example, in Downloads or
          on external storage) is the only way to get your data back after a
          reset, so export one before resetting if it matters to you.
        </p>
      </motion.article>
    </>
  );
}
