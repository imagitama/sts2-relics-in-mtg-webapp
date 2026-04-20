<script lang="ts">
  import { store } from "@app/stores/game";
  import RelicTile from "./RelicTile.svelte";
  import SmallRelicTile from "./SmallRelicTile.svelte";

  let { relicIds }: { relicIds: string[] } = $props();
</script>

{#if !$store.isCollapsed}
  <div
    class="grid grid-cols-1 gap-2 md:gap-4 items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    {#each relicIds as relicId (relicId)}
      <RelicTile {relicId} />
    {/each}
  </div>
{:else}
  <div class="flex gap-1 items-stretch flex-wrap">
    {#each relicIds as relicId (relicId)}
      <SmallRelicTile {relicId} />
    {/each}
  </div>
{/if}
