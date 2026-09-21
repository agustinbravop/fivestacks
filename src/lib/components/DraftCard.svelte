<script>
  import { icon, roles } from "../draft-ui.js";

  export let draft;
  export let onOpen;
</script>

<button on:click={onOpen} style="--accent: {draft.accent}; --accent-soft: {draft.accent}22">
  <h2>{draft.title}</h2>
  <p>{draft.description}</p>
  <span class="portraits">
    {#each roles as role}<img src={icon(draft.sample[role])} alt="" />{/each}
  </span>
  <span class="action">View draft &rarr;</span>
</button>

<style>
  button {
    width: 100%;
    min-height: 330px;
    padding: 26px;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    color: var(--text);
    background: var(--surface);
    text-align: left;
    cursor: pointer;
    isolation: isolate;
    transition: transform 180ms ease, border-color 180ms ease;
  }

  button::after { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 85% 10%, var(--accent-soft), transparent 45%); }
  button:hover { transform: translateY(-3px); border-color: var(--accent); }
  h2 { max-width: 600px; margin: 24px 0 10px; font: 800 clamp(35px, 5vw, 58px)/0.9 var(--display); letter-spacing: -0.02em; text-transform: uppercase; }
  p { max-width: 560px; color: var(--muted); line-height: 1.5; }
  .portraits { display: flex; margin: 30px 0 0 8px; }
  .portraits img { width: 58px; height: 58px; margin-left: -8px; border: 2px solid var(--surface); border-radius: 50%; object-fit: cover; background: var(--surface-2); }
  .action { position: absolute; right: 26px; bottom: 24px; color: var(--text); font: 700 15px var(--body); }

  @media (max-width: 700px) {
    button { min-height: 310px; padding: 20px; }
    .action { right: 20px; }
  }

  @media (max-width: 420px) {
    .portraits img { width: 49px; height: 49px; }
  }
</style>
