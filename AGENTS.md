# Fivestacks

Static Svelte site for browsing themed League of Legends compositions and building a five-role lineup from each composition's champion pool.

## Stack

- Svelte 5 with Vite; no SvelteKit or backend.
- Build with `npm run build`; develop with `npm run dev`.
- Production output is static content in `dist/`.

## Guidelines

- Preserve the dark, compact, industrial visual language and responsive behavior.
- Keep component-specific CSS and JavaScript inside the owning Svelte component.
- Delete throwaway UI exploration files, including `*-iterations.html`, once a direction is implemented.
