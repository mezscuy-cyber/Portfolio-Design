---
name: Portfolio Mobile Stack
description: Key decisions and constraints for the Lukman xenodev portfolio mobile app (Expo).
---

## Mode B — Static Only
No backend, no API client. Do NOT add `@workspace/api-client-react` or `setBaseUrl`. All content lives in `constants/data.ts`. The scaffold initially ships with this dependency from the template — always remove it for Mode B projects.

**Why:** Portfolio has no backend API. Adding the client causes tooling failures when the lib package shape doesn't match.

**How to apply:** Remove from `package.json` devDependencies and clear the `references` array in `tsconfig.json`.

## Theme
Dark green always-dark palette. Both `light` and `dark` keys in `constants/colors.ts` are identical so useColorScheme() returning "light" on web doesn't cause a theme flash.

## Font
Inter (scaffold default). Web portfolio uses Space Grotesk — consider swapping for full visual parity.
