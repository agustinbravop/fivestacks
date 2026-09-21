<script>
  import { getChampion } from "../champions.js";
  import { icon, roleNames, roles } from "../draft-ui.js";

  export let lineup;
  export let activeRole;
  export let onSelectRole;
  export let onChoose;

  let dragOverRole = null;

  function dragOver(event, role) {
    if (!event.dataTransfer.types.includes("text/plain")) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    dragOverRole = role;
  }

  function drop(event, role) {
    event.preventDefault();
    const champion = event.dataTransfer.getData("text/plain");
    if (champion) onChoose(champion, role);
    dragOverRole = null;
  }
</script>

<aside>
  <div class="heading"><h2>Team</h2></div>
  <div class="panel">
    <div class="roles">
      {#each roles as role}
        {@const id = lineup[role]}
        <button
          class:active={activeRole === role}
          class:filled={id}
          class:drag-over={dragOverRole === role}
          class="slot"
          on:click={() => onSelectRole(role)}
          on:dragover={(event) => dragOver(event, role)}
          on:dragleave={() => dragOverRole = null}
          on:drop={(event) => drop(event, role)}
          aria-label={id ? `Change ${getChampion(id).name} in ${roleNames[role]}` : `Choose a ${roleNames[role]} champion`}
          title={`${roleNames[role]}${id ? `: ${getChampion(id).name}` : ""}`}
        >
          {#if id}<img src={icon(id)} alt={getChampion(id).name} />{:else}<span aria-hidden="true">{roleNames[role]}</span>{/if}
        </button>
      {/each}
    </div>
  </div>
</aside>

<style>
  aside { align-self: start; }
  .heading { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 12px; }
  .heading h2 { margin: 0; font: 800 22px/1 var(--display); text-transform: uppercase; }
  .panel { padding: 10px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
  .roles { display: grid; gap: 8px; }
  .slot { width: var(--lineup-tile-size); aspect-ratio: 1; display: grid; place-items: center; padding: 0; overflow: hidden; border: 1px solid var(--line); border-radius: var(--radius); color: var(--text); background: var(--surface-2); cursor: pointer; }
  .slot:hover { border-color: var(--muted); }
  .slot.active { border-color: var(--lime); background: #1c2822; }
  .slot.drag-over { border-color: var(--lime); outline: 2px solid var(--lime); outline-offset: 2px; }
  .slot span, .slot img { width: 100%; height: 100%; object-fit: cover; background: #202c29; }
  .slot span { display: grid; place-items: center; color: var(--muted); font: 700 18px var(--display); }

  @media (max-width: 700px) {
    aside { margin-bottom: 24px; }
    .panel { overflow: hidden; }
    .roles { display: flex; margin-right: -10px; padding-right: 10px; padding-bottom: 4px; overflow-x: auto; }
    .slot { flex: 0 0 var(--lineup-tile-size); }
  }
</style>
