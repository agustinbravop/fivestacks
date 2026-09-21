<script>
  import { icon, roleNames } from "../draft-ui.js";

  export let champions;
  export let activeRole;
  export let lineup;
  export let onChoose;

  let draggedChampionId = null;
  $: selected = new Set(Object.values(lineup).filter(Boolean));
  $: sortedChampions = [...champions].sort((a, b) =>
    Number([...b.preferred, ...b.flex].includes(activeRole)) -
    Number([...a.preferred, ...a.flex].includes(activeRole)),
  );

  function startDrag(event, id) {
    draggedChampionId = id;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  }
</script>

<section>
  <div class="heading">
    <h2>Champion pool</h2>
    <span>Choosing {roleNames[activeRole]}</span>
  </div>
  <div class="grid">
    {#each sortedChampions as champion}
      {@const isSelected = selected.has(champion.id)}
      <button
        class:dragging={draggedChampionId === champion.id}
        class="card"
        draggable={!isSelected}
        disabled={isSelected}
        on:click={() => onChoose(champion.id)}
        on:dragstart={(event) => startDrag(event, champion.id)}
        on:dragend={() => draggedChampionId = null}
        aria-label={`Choose ${champion.name} for ${roleNames[activeRole]}`}
      >
        <img src={icon(champion.id)} alt={champion.name} loading="lazy" />
        <span class="info">
          <span class="name">{champion.name}</span>
          <span class="tags">
            {#each champion.preferred as role}<span class:matches={role === activeRole} class="tag preferred">{roleNames[role]}</span>{/each}
            {#each champion.flex as role}<span class:matches={role === activeRole} class="tag">{roleNames[role]}</span>{/each}
          </span>
        </span>
      </button>
    {/each}
  </div>
</section>

<style>
  section { min-height: 0; flex: 1; display: flex; flex-direction: column; }
  .heading { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; }
  .heading h2 { margin: 0; font: 800 22px/1 var(--display); text-transform: uppercase; }
  .heading > span { color: var(--muted); font-size: 12px; font-weight: 400; }
  .grid { min-height: 0; display: grid; grid-template-columns: repeat(auto-fill, var(--champion-tile-size)); gap: 10px; align-content: start; padding: 2px 8px 0 0; overflow-y: auto; scrollbar-color: var(--line) transparent; }
  .card { width: var(--champion-tile-size); padding: 0; overflow: hidden; border: 1px solid var(--line); border-radius: var(--radius); color: var(--text); background: var(--surface); text-align: left; cursor: pointer; transition: border-color 150ms ease, transform 150ms ease, opacity 150ms ease; }
  .card:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--muted); }
  .card:disabled { opacity: .38; filter: grayscale(1); cursor: not-allowed; }
  .card.dragging { opacity: .2; }
  .card > img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; object-position: center 18%; background: var(--surface-2); }
  .info { display: block; height: 48px; padding: 3px 5px 4px; }
  .name { display: block; overflow: hidden; margin-bottom: 3px; font: 700 14px/.95 var(--display); text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
  .tags { display: flex; flex-wrap: wrap; gap: 1px; }
  .tag { padding: 1px 3px; border: 1px solid var(--line); border-radius: 2px; color: var(--muted); font-size: 7px; font-weight: 700; line-height: 1.1; letter-spacing: .03em; }
  .tag.preferred { color: var(--text); border-color: #65746f; background: var(--surface-2); }
  .tag.matches { color: var(--bg); border-color: var(--lime); background: var(--lime); }

  @media (max-width: 700px) {
    .grid { padding-right: 0; overflow: visible; }
  }

  @media (max-width: 420px) {
    .grid { gap: 8px; }
    .name { font-size: 17px; }
  }
</style>
