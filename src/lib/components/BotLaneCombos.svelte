<script>
  import { getChampion } from "../champions.js";
  import { icon } from "../draft-ui.js";
  import { botCombos } from "../drafts.js";
</script>

<section>
  <div class="heading">
    <h2>Bot-lane combos</h2>
    <p>Pick a duo, then build the rest yourselves.</p>
  </div>
  <div class="grid">
    {#each botCombos as combo}
      <article>
        <div class="portraits">
          {#each combo.champions as id}<img src={icon(id)} alt={getChampion(id).name} />{/each}
        </div>
        <h3>{combo.title}</h3>
        <p>{combo.text}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  section { padding: 88px 0 42px; }
  .heading { margin-bottom: 24px; }
  .heading h2 { margin-bottom: 4px; font: 800 40px/1 var(--display); text-transform: uppercase; }
  .heading p { margin: 0; color: var(--muted); }
  .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  article { padding: 18px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
  .portraits { display: flex; margin-bottom: 18px; }
  .portraits img { width: 52px; height: 52px; border: 2px solid var(--surface); border-radius: 50%; object-fit: cover; }
  .portraits img + img { margin-left: -10px; }
  article h3 { margin-bottom: 8px; font: 700 24px/1 var(--display); text-transform: uppercase; }
  article p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.5; }

  @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
