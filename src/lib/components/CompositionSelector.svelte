<script>
  import { icon, roles } from "../draft-ui.js";
  import { drafts } from "../drafts.js";

  export let draft;
  export let onSelect;

  let selector;
  let filter = "All";

  const types = ["All", ...new Set(drafts.map((item) => item.type))];
  $: visibleDrafts =
    filter === "All" ? drafts : drafts.filter((item) => item.type === filter);

  function select(id) {
    onSelect(id);
    selector.open = false;
  }
</script>

<details bind:this={selector}>
  <summary aria-label={`Switch composition. Current: ${draft.title}`}>
    <h1>{draft.title}</h1>
    <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
  </summary>
  <div class="menu">
    <div class="menu-heading">Choose a composition</div>
    <nav class="filters" aria-label="Filter compositions">
      {#each types as type}
        <button class="filter-button" class:active={filter === type} on:click={() => (filter = type)}>{type}</button>
      {/each}
    </nav>
    <div class="menu-grid">
      {#each visibleDrafts as item}
        <button class="composition-button" style="--comp-accent: {item.accent}" class:active={item.id === draft.id} on:click={() => select(item.id)} aria-current={item.id === draft.id ? "true" : undefined}>
          <span class="copy"><strong>{item.title}</strong></span>
          <span class="icons" aria-hidden="true">{#each roles as role}<img src={icon(item.sample[role])} alt="" />{/each}</span>
        </button>
      {/each}
    </div>
  </div>
</details>

<style>
  details { position: relative; width: max-content; max-width: 100%; }
  summary { position: relative; display: flex; align-items: center; width: max-content; max-width: 100%; padding: 10px 48px 10px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); cursor: pointer; list-style: none; transition: border-color 150ms ease, background 150ms ease; }
  summary::-webkit-details-marker { display: none; }
  summary:hover, details[open] summary { border-color: var(--accent); background: var(--surface-2); }
  h1 { max-width: 900px; margin: 0; font: 800 clamp(40px, 4vw, 60px)/.88 var(--display); letter-spacing: -.035em; text-transform: uppercase; }
  .chevron { position: absolute; top: 50%; right: 12px; width: 22px; height: 22px; color: var(--text); fill: none; stroke: currentColor; stroke-width: 1.8; transform: translateY(-50%); transition: color 150ms ease, transform 180ms ease; }
  summary:hover .chevron { color: var(--accent); }
  details[open] .chevron { transform: translateY(-50%) rotate(180deg); }
  .menu { position: absolute; z-index: 5; top: calc(100% + 10px); left: 0; width: min(720px, calc(100vw - 48px)); max-height: min(520px, 65vh); padding: 10px; overflow-y: auto; border: 1px solid var(--line); border-top-color: var(--accent); border-radius: 0 0 var(--radius) var(--radius); background-color: var(--surface); background-image: linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px); background-size: 24px 24px; box-shadow: 0 24px 70px #000d; scrollbar-color: var(--line) transparent; animation: menu-in 140ms ease-out; }
  @keyframes menu-in { from { opacity: 0; transform: translateY(-6px); } }
  .menu-heading { padding: 2px 4px 8px; color: var(--text); font: 500 15px/1.4 var(--body); }
  .filters { display: flex; gap: 6px; margin-bottom: 10px; overflow-x: auto; scrollbar-width: none; }
  .filter-button { flex: none; padding: 6px 9px; border: 1px solid var(--line); border-radius: var(--radius); color: var(--muted); background: var(--surface-2); font: 500 12px/1.2 var(--body); cursor: pointer; }
  .filter-button:hover { color: var(--text); border-color: var(--text); }
  .filter-button.active { color: var(--bg); border-color: var(--text); background: var(--text); }
  .menu-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px; }
  .composition-button { position: relative; width: 100%; min-height: 64px; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 10px; padding: 8px 10px; overflow: hidden; border: 1px solid var(--line); border-radius: 2px; color: var(--text); background: #111a18e8; text-align: left; cursor: pointer; transition: border-color 140ms ease, background 140ms ease, transform 140ms ease; }
  .composition-button:hover { border-color: var(--comp-accent); background: var(--surface-2); transform: translateY(-1px); }
  .composition-button.active { border-color: var(--comp-accent); background: color-mix(in srgb, var(--comp-accent) 8%, var(--surface)); }
  .copy { min-width: 0; }
  .copy strong { overflow: hidden; font: 700 21.25px/1 var(--display); text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
  .icons { display: flex; padding-left: 7px; }
  .icons img { width: 33.75px; height: 33.75px; margin-left: -7px; border: 2px solid var(--surface); border-radius: 50%; object-fit: cover; }

  @media (max-width: 700px) {
    h1 { font-size: 42px; }
    .menu { width: calc(100vw - 28px); }
    .menu-grid { grid-template-columns: 1fr; }
    .composition-button { gap: 8px; }
    .icons img { width: 31.25px; height: 31.25px; }
  }
</style>
