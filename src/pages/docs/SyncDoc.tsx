import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";

export function SyncDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Sync</DocHeading>
      <p>
        Sync lets you transfer your data securely between your own devices.
        Instead of uploading anything to a cloud service, your devices connect
        directly to each other over an encrypted peer-to-peer connection.
      </p>
      <Callout>
        Sync is manual — your devices only connect while you are actively
        syncing. Nothing runs in the background and no data is stored online.
      </Callout>
      <DocHeading level={2}>How Sync works</DocHeading>
      <p>
        When you start a sync, one device creates a secure, temporary
        connection. Another device connects to it and the data is transferred
        directly between them. Once the sync finishes, the connection closes.
      </p>
      <p>
        There are no accounts, no always-online servers, and no permanent cloud
        storage involved.
      </p>
      <Callout type="warning" title="Make sure devices are in same Network">
        Sync Feature requires both devices to be on the same local network
        (e.g., connected to the same Wi-Fi). Ensure that any firewall settings
        allow the devices to communicate with each other. Sync will not work
        over the internet or different networks.
      </Callout>
      <DocHeading level={2}>What can be synced?</DocHeading>
      <p>Sync can transfer the data you create inside the app, including:</p>
      <ul>
        <li>Chats</li>
        <li>Characters</li>
        <li>Memories</li>
        <li>Settings & preferences</li>
      </ul>
      ...Basically, everything.
      <p>
        This allows you to move your setup to another device or keep two devices
        up-to-date.
      </p>
      <DocHeading level={2}>What Sync is NOT</DocHeading>
      <ul>
        <li>There is no account system</li>
        <li>There is no cloud backup</li>
        <li>Nothing stays online after the sync ends</li>
        <li>No third-party server stores your data</li>
      </ul>
      <p>Sync is simply a secure transfer between devices you control.</p>
      <DocHeading level={2}>Security & Encryption</DocHeading>
      <p>
        All sync traffic is end-to-end encrypted. Only the two devices involved
        in the sync can read the data being transferred.
      </p>
      <Callout>
        Your data never passes through LettuceAI servers or becomes readable to
        anyone else.
      </Callout>
      <DocHeading level={2}>How to Sync</DocHeading>
      <p>
        Sync is started manually. You will need both devices open at the same
        time, with Sync settings visible on each one.
      </p>
      <p>
        One device becomes the <strong>Host</strong> (the device sending data),
        and the other becomes the <strong>Join</strong> device (the device
        receiving data). Once connected, the transfer begins automatically.
      </p>
      <DocHeading level={3}>Step 1: Start Hosting (Device A)</DocHeading>
      <p>
        On the device that already has your data, go to{" "}
        <strong>Settings → Local Sync</strong> and choose{" "}
        <strong>&quot;Host&quot;</strong>, then tap{" "}
        <strong>&quot;Start Hosting&quot;</strong>.
      </p>
      <p>
        A sync code and connection details will be displayed. Keep this screen
        open. This device will share its data with the other one.
      </p>
      <DocImage
        src={images.sync.host}
        containerClassName="max-w-lg mx-auto"
        alt="Host UI"
      />
      <DocHeading level={3}>Step 2: Join the Session (Device B)</DocHeading>
      <p>
        On the device that should receive the data, go to{" "}
        <strong>Settings → Local Sync</strong> and choose{" "}
        <strong>&quot;Join&quot;</strong>.
      </p>
      <p>
        Enter the IP address and code shown on Device A, then tap{" "}
        <strong>&quot;Connect&quot;</strong>.
      </p>
      <p>
        If connection and authtentication is successful, Device A will request user confirmation for connection and data transfer.
        Do not close the app until the transfer is complete.
      </p>
      <DocImage
        src={images.sync.client}
        containerClassName="max-w-lg mx-auto"
        alt="Join UI"
      />
            
      <DocHeading level={2}>When do I need Sync?</DocHeading>
      <p>You may want to use Sync when:</p>
      <ul>
        <li>moving to a new device</li>
        <li>keeping a desktop and laptop in sync</li>
        <li>creating a private encrypted backup on another machine</li>
      </ul>
      <p>If you only use one device, you never need to enable Sync.</p>
      <DocHeading level={2}>Do devices stay connected?</DocHeading>
      <p>
        No. The connection only exists during the sync session. Once finished,
        the devices disconnect automatically and remain fully offline.
      </p>
      <DocHeading level={2}>What happens if a device is offline?</DocHeading>
      <p>
        Sync will simply wait until you connect the devices again. There is no
        background queue or cloud storage holding your data.
      </p>
    </motion.article>
  );
}
