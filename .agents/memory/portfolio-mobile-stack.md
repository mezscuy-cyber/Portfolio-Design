---
name: Portfolio Mobile Stack
description: Key decisions and constraints for the Lukman xenodev portfolio mobile app (Expo).
---

## Summary
Expo mobile companion to the web portfolio at `artifacts/portfolio/`. Registered as artifact `artifacts/portfolio-mobile`, preview path `/mobile/`.

## Mode B — Static Only
No backend, no API client usage. All content is static data in `constants/data.ts`. Do NOT add `setBaseUrl` or `@workspace/api-client-react` imports.

## Theme
Dark green always-dark palette sourced from web `index.css`. Both `light` and `dark` keys in `constants/colors.ts` are identical (always dark). Primary: `#22C35D`, background: `#050A07`.

**Why:** The web portfolio is dark-only; the mobile app must match. useColorScheme() returns "light" in web preview, so both keys must be the same to avoid a light-mode flash.

## Assets
Project images and profile image copied from `artifacts/portfolio/src/assets/` to `artifacts/portfolio-mobile/assets/images/`. App icon AI-generated (dark green with "L" letterform).

## Tabs
4 tabs: Home (index), Projects, About, Contact. NativeTabs for iOS 26+, classic Tabs with BlurView fallback.
