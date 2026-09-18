## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Writing agent

This repo is the hand and mouth. The brain is the iCloud Obsidian vault.

- Read knowledge with Obsidian CLI against the main vault, never copy the vault into git:

```
obsidian vault="Obsidian Vault" search query="..."
obsidian vault="Obsidian Vault" read path="..."
```

- Craft lives in `content/Writing-Studio/` (style, prompts, research). Start from `content/Writing-Studio/README.md`.
- Publishable writing lives in `content/posts/` as `YYYY-MM-DD-slug.md`. Astro only builds that folder. Studio drafts are not pages.
- After adding or moving posts, run `npm run lint`.
- Open `content/` as the Obsidian writing vault, not the whole repo.

## Documentation

Full documentation: https://docs.astro.build
