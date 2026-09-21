<script>
  export let view;
  export let hasDraft;
  export let onCatalog;
  export let onDraft;
</script>

<header class="site-header">
  <button class="brand" on:click={onCatalog} aria-label="Go to draft catalog">
    <svg class="brand-mark" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" rx="28" fill="var(--bg)" />
      <g transform="translate(-18 34) scale(.86)">
        <path fill="var(--lime)" d="M45 29h118l-9 31H81v35h61l-9 30H81v66H45z" />
        <path fill="var(--text)" d="M178 29h122l-9 31h-85l-6 25h78l-28 106H127l9-31h86l7-27h-78z" />
      </g>
    </svg>
    <span class="brand-name">FIVE STACKS</span>
  </button>
  <nav class="site-nav" aria-label="Primary navigation">
    <button class:active={view === "catalog"} class="nav-tab" on:click={onCatalog}>Catalog</button>
    <button class:active={view === "draft"} class="nav-tab" on:click={onDraft} disabled={!hasDraft}>Draft</button>
  </nav>
</header>

<style>
  header {
    width: min(var(--page-width), calc(100% - 64px));
    min-height: 64px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    border-bottom: 1px solid var(--line);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0;
    border: 0;
    color: var(--text);
    background: none;
    font: 800 22px/1 var(--display);
    letter-spacing: 0.08em;
    cursor: pointer;
  }

  .brand-mark { width: 36px; height: 36px; display: block; }
  nav { display: flex; align-self: stretch; gap: 24px; }

  .nav-tab {
    position: relative;
    padding: 0 2px;
    border: 0;
    color: var(--muted);
    background: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .nav-tab::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -1px;
    left: 0;
    height: 2px;
    background: var(--lime);
    transform: scaleX(0);
    transition: transform 150ms ease;
  }

  .nav-tab:hover:not(:disabled), .nav-tab.active { color: var(--text); }
  .nav-tab.active::after { transform: scaleX(1); }
  .nav-tab:disabled { opacity: 0.35; cursor: not-allowed; }

  @media (max-width: 700px) {
    header { width: calc(100% - 28px); min-height: 60px; display: flex; gap: 12px; }
    .brand-name { display: none; }
    nav { flex: 1; justify-content: center; gap: 16px; }
  }

  @media (max-width: 420px) {
    .brand { font-size: 18px; }
  }
</style>
