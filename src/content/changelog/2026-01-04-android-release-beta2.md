---
version: Android Release & Desktop Beta 2
platforms: Android, Desktop
date: 2026-01-04
title: Text-to-Speech, AI Character Creator, Reply Helper, Sync, Accessibility Upgrades & Voice Playback
tagline: This release brings LettuceAI to Android along with the second desktop beta update. It introduces Text-to-Speech voices, reply generation assistance, encrypted device-to-device sync, enhanced accessibility features, and per-character voice playback controls. These updates focus on expressiveness, comfort, and smoother roleplay workflows.
githubUrl: https://github.com/LettuceAI/app/releases
---

## AI Character Creator

- Conversational guided character creation
- Automatic field filling (name, traits, description, etc.)
- Optional starting scenes to define tone
- Attach avatars & reference material
- You can stop at any time, everything remains editable in the manual editor
- The Creator uses your default app model

## Text-to-Speech Voices

- **Device TTS** – uses your system's built-in voice engine
- **ElevenLabs** – natural voice synthesis with custom voice support
- **Gemini TTS** – neural speech generation with custom voice support
- You can also create custom voices with style descriptions and reuse them across characters
- Generated audio is cached locally to reduce repeated regenerations

## Reply Helper

- **Use my text as base** — improve or complete your draft
- **Write something new** — generate a fresh reply
- **Regenerate** — try multiple suggestions
- Reply Helper uses your default app model

## Encrypted Device Sync

- Peer-to-peer encrypted transfer
- No servers or permanent connections
- You start sync manually when needed
- One device hosts a session, the other joins with a code. Once connected, your data is synced directly between devices

## Accessibility Improvements

- Per-event volume controls
- Optional haptic feedback with selectable intensity
- Lightweight and non-intrusive

## Per-Message Voice Playback

- Assign a default voice per character
- Optional autoplay
- Manual playback button per message

## Scene Directions

- Scenes now support private "direction" notes that are hidden from the chat UI and used only to guide model behaviour during the opening context of a scene

## General Improvements

- Improved character editing workflow
- Better consistency across Android & Desktop
- Internal cleanup & UI polish

## Bug Fixes & Behaviour Improvements

- Reasoning now works correctly with the Google Gemini endpoint
- Fixed an issue where Dynamic Memory processing could cancel when switching pages
- Fixed an issue where characters could be duplicated unexpectedly
- Added a retry button to the embedding download screen
- Fixed Backup settings failing to load existing backups
- Redesigned the Edit Model page into a single-page layout
- Disabled reasoning controls for the Mistral endpoint
- Optimised entry animations in Settings
- Optimised Markdown rendering performance
- Added support for `(...)` and `[...]` as italic formatting shortcuts
- Added Scene Directions to help guide starting scene behaviour
