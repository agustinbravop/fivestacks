<script>
  import { roles } from "../draft-ui.js";
  import ChampionPool from "./ChampionPool.svelte";
  import CompositionSelector from "./CompositionSelector.svelte";
  import TeamLineup from "./TeamLineup.svelte";

  export let draft;
  export let lineup;
  export let activeRole;
  export let onSelectDraft;

  function chooseChampion(id, role = activeRole) {
    lineup = { ...lineup, [role]: id };
    activeRole = roles.find((item) => !lineup[item]) || role;
  }

</script>

<section class="workspace" style="--accent: {draft.accent}">
  <header>
    <CompositionSelector {draft} onSelect={onSelectDraft} />
    <p>{draft.description}</p>
  </header>
  <div class="layout">
    <TeamLineup {lineup} {activeRole} onSelectRole={(role) => activeRole = role} onChoose={chooseChampion} />
    <ChampionPool champions={draft.champions} {activeRole} {lineup} onChoose={chooseChampion} />
  </div>
</section>

<style>
  .workspace { --lineup-tile-size: clamp(82px, 11vh, 116px); --champion-tile-size: clamp(96px, 12vh, 128px); height: 100%; display: flex; flex-direction: column; padding: 14px 0 20px; overflow: hidden; }
  header { position: relative; flex: none; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--line); }
  header p { max-width: 90ch; margin: 13px 0 0; color: var(--muted); font-size: 17px; line-height: 1.55; }
  .layout { min-height: 0; flex: 1; display: grid; grid-template-columns: calc(var(--lineup-tile-size) + 22px) minmax(0, 1fr); gap: 24px; }

  @media (max-width: 900px) { .layout { gap: 18px; } }
  @media (max-width: 700px) {
    .workspace { height: auto; overflow: visible; }
    header { margin-bottom: 20px; }
    header p { font-size: 16px; }
    .layout { display: block; }
  }
</style>
