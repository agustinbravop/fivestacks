<script>
  import BotLaneCombos from "./BotLaneCombos.svelte";
  import DraftCard from "./DraftCard.svelte";
  import { drafts } from "../drafts.js";

  export let filter;
  export let onOpenDraft;

  const types = ["All", ...new Set(drafts.map((item) => item.type))];
  $: visibleDrafts =
    filter === "All" ? drafts : drafts.filter((item) => item.type === filter);
</script>

<section class="hero">
  <h1>What are we playing tonight?</h1>
  <p>
    A list of League of Legends team compositions to play the coolest Flex
    games.
  </p>
</section>
<nav class="filters" aria-label="Filter draft ideas">
  {#each types as type}
    <button
      class:active={filter === type}
      class="filter-button"
      on:click={() => (filter = type)}>{type}</button
    >
  {/each}
</nav>
<section class="grid" aria-label="Five-player draft ideas">
  {#each visibleDrafts as draft}
    <div class="card">
      <DraftCard {draft} onOpen={() => onOpenDraft(draft.id)} />
    </div>
  {:else}
    <div class="empty-state">No drafts in this category yet.</div>
  {/each}
</section>
<BotLaneCombos />

<style>
  .hero {
    padding: 76px 0 42px;
  }
  .hero h1 {
    margin-bottom: 18px;
    font: 800 clamp(52px, 7vw, 94px)/0.88 var(--display);
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }
  .hero p {
    margin-bottom: 0;
    color: var(--muted);
    font-size: clamp(17px, 2vw, 21px);
    line-height: 1.55;
  }
  .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filter-button {
    padding: 9px 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    color: var(--text);
    background: var(--surface);
    white-space: nowrap;
    cursor: pointer;
    transition:
      border-color 150ms ease,
      background 150ms ease;
  }
  .filter-button.active {
    color: var(--bg);
    border-color: var(--text);
    background: var(--text);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .card:nth-child(3n) {
    grid-column: span 2;
  }
  .empty-state {
    padding: 60px 20px;
    border: 1px dashed var(--line);
    color: var(--muted);
    text-align: center;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .card {
      grid-column: auto;
    }
  }

  @media (max-width: 700px) {
    .hero {
      padding-top: 54px;
    }
  }
</style>
