<script lang="ts">
  import Button from "@app/components/Button.svelte";
  import RelicTiles from "../components/RelicTiles.svelte";
  import {
    selectSelectedRarity,
    selectSelectedRelic,
    selectIsShowingAll,
    selectSearchTerm,
    store,
    selectIsWelcomeNoticeVisible,
  } from "../stores/game";
  import RelicModal from "@app/components/RelicModal.svelte";
  import ClearButton from "@app/components/ClearButton.svelte";
  import { Rarity } from "@app/sts";
  import Notice from "@app/components/Notice.svelte";
  import { Icon } from "svelte-awesome";
  import search from "svelte-awesome/icons/search";
  import close from "svelte-awesome/icons/close";
  import RandomButton from "@app/components/RandomButton.svelte";

  let selectedRarity = $derived(selectSelectedRarity());

  let isShowingAll = $derived(selectIsShowingAll());
  let searchTerm = $derived(selectSearchTerm());

  let relics = $store.relics;
  let relicsArr = Array.from(Object.entries(relics));
  let relicIds = $derived.by(() => {
    return relicsArr
      .filter(([id, relic]) =>
        $store.isCollapsed ? $store.activeRelicIds.includes(id) : true,
      )
      .filter(([id, relic]) =>
        $searchTerm !== ""
          ? relic.name.toLowerCase().includes($searchTerm.toLowerCase())
          : true,
      )
      .filter(([id, relic]) => relic.desc !== undefined || $isShowingAll)
      .filter(([id, relic]) =>
        $selectedRarity !== null ? relic.rarity === $selectedRarity : true,
      )
      .map(([id]) => id);
  });

  let selectedRelic = $derived(selectSelectedRelic());

  const onModalClose = () => {
    store.unselectRelicId();
  };

  const selectRarity = (rarity: Rarity) => {
    if (rarity == $selectedRarity) store.unselectRarity();
    else store.selectRarity(rarity);
  };

  const toggleShowAll = () => store.toggleShowAll();

  let isWelcomeNoticeVisible = $derived(selectIsWelcomeNoticeVisible());
</script>

{#if $isWelcomeNoticeVisible}
  <Notice onClose={store.hideWelcomeNotice}>
    <p>
      Are you a fan of Slay The Spire and Magic: The Gathering? Now you can play
      with relics in your next game!
    </p>
    <span class="font-bold">Game Idea 1:</span>
    <p>
      Each player starts the game with a random common relic. Every 5 turns,
      each player gains a new random relic.
    </p>
  </Notice>
{/if}

<div class="flex items-center mb-2 flex-wrap">
  <div class="mr-1 mb-1">
    <Button
      selected={$store.isCollapsed}
      onclick={() => store.toggleCollapsed()}>Collapse</Button
    >
  </div>

  <div class="mr-1 mb-1 m-auto">
    <ClearButton />
  </div>
</div>

{#if !$store.isCollapsed}
  <div class="flex items-center mb-2 flex-wrap">
    {#each Object.values(Rarity) as rarity}
      <div class="mr-1 mb-1">
        <Button
          onclick={() => selectRarity(rarity as Rarity)}
          selected={$selectedRarity === rarity}>{rarity}</Button
        >
      </div>
    {/each}

    <div class="mr-1 mb-1">
      <Button onclick={toggleShowAll} selected={$isShowingAll}>Show All</Button>
    </div>

    <div class="mr-1 mb-1">
      <RandomButton />
    </div>

    <div class="mr-1 mb-1 relative">
      <input
        type="search"
        placeholder="Search relics"
        value={$searchTerm}
        onkeyup={(e) => store.updateSearchTerm(e.target.value)}
        class="p-1 md:p-2 rounded-md border-1 border-white/25 text-sm md:text-base"
      />
      <Icon
        data={$searchTerm !== "" ? close : search}
        class="absolute top-0 right-3 h-full cursor-pointer"
        onclick={() => store.updateSearchTerm("")}
      />
    </div>
  </div>
{:else}
  <div class="mr-1 mb-1">
    <Button
      selected={$store.isCollapsed}
      onclick={() => store.toggleCollapsed()}>Expand</Button
    >
  </div>
{/if}

{#if relicIds.length}
  <RelicTiles {relicIds} />
{:else if $store.isCollapsed}
  <div>No active relics</div>
{:else}
  <div>No relics</div>
{/if}

{#if $selectedRelic !== null}
  <RelicModal relic={$selectedRelic} onClose={onModalClose} />
{/if}
