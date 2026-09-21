<script>
  import { onMount } from "svelte";
  import Catalog from "./lib/components/Catalog.svelte";
  import DraftWorkspace from "./lib/components/DraftWorkspace.svelte";
  import SiteHeader from "./lib/components/SiteHeader.svelte";
  import { emptyLineup, roles } from "./lib/draft-ui.js";
  import { drafts } from "./lib/drafts.js";

  let filter = "All";
  let view = "catalog";
  let draft = drafts[0];
  let activeRole = "top";
  let lineup = emptyLineup();

  function openDraft(id, savedLineup = emptyLineup()) {
    const selectedDraft = drafts.find((item) => item.id === id);
    if (!selectedDraft) return showCatalog();
    draft = selectedDraft;
    lineup = savedLineup;
    activeRole = roles.find((role) => !lineup[role]) || "top";
    showDraft();
  }

  function showDraft() {
    view = "draft";
    history.replaceState(null, "", `#draft=${draft.id}`);
    window.scrollTo(0, 0);
  }

  function showCatalog() {
    view = "catalog";
    history.replaceState(null, "", location.pathname);
    window.scrollTo(0, 0);
  }

  function readHash() {
    const params = new URLSearchParams(location.hash.slice(1));
    const id = params.get("draft");
    if (!id) return view = "catalog";

    const savedLineup = emptyLineup();
    decodeURIComponent(params.get("lineup") || "").split(",").forEach((pair) => {
      const [role, champion] = pair.split(":");
      if (roles.includes(role) && champion) savedLineup[role] = champion;
    });
    openDraft(id, savedLineup);
  }

  onMount(readHash);
</script>

<svelte:window on:hashchange={readHash} />
<svelte:body class:workspace-open={view === "draft"} />

<div class="app" style={view === "draft" ? `--lime: ${draft.accent}` : ""}>
  <SiteHeader {view} hasDraft={Boolean(draft)} onCatalog={showCatalog} onDraft={showDraft} />
  <main>
    {#if view === "draft"}
      <DraftWorkspace {draft} bind:lineup bind:activeRole onSelectDraft={openDraft} />
    {:else}
      <Catalog bind:filter onOpenDraft={openDraft} />
    {/if}
  </main>
  <footer>
    <p></p>
    <p>Champion artwork provided by Riot Games Data Dragon. Five Stacks is not endorsed by Riot Games.</p>
  </footer>
</div>

<style>
  main { width: min(var(--page-width), calc(100% - 64px)); min-height: calc(100vh - 180px); margin: 0 auto; }
  footer { width: min(var(--page-width), calc(100% - 64px)); margin: 70px auto 0; padding: 28px 0 42px; display: flex; justify-content: space-between; gap: 30px; border-top: 1px solid var(--line); color: var(--muted); font-size: 12px; }
  footer p { margin: 0; }
  :global(body.workspace-open) { overflow: hidden; }
  :global(body.workspace-open) main { height: calc(100vh - 64px); min-height: 0; }
  :global(body.workspace-open) footer { display: none; }

  @media (max-width: 700px) {
    main, footer { width: calc(100% - 28px); }
    :global(body.workspace-open) { overflow: auto; }
    :global(body.workspace-open) main { height: auto; min-height: calc(100vh - 60px); }
    :global(body.workspace-open) footer { display: block; }
    footer { display: block; }
    footer p + p { margin-top: 10px; }
  }
</style>
