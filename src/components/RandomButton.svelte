<script lang="ts">
  import { store } from "@app/stores/game";
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";
  import RelicTile from "./RelicTile.svelte";
  import random from "svelte-awesome/icons/random";
  import RarityLabel from "./RarityLabel.svelte";

  let isModalVisible = false;
  let finalId: null | string = null;
  let timeout: number;

  const onClick = () => {
    isModalVisible = true;
    const relics = Object.values($store.relics)
      .filter((relic) => relic.desc !== undefined)
      .filter((relic) =>
        $store.selectedRarity !== null
          ? relic.rarity === $store.selectedRarity
          : true,
      );
    let timer = 200;

    finalId = null;
    activeId = null;
    clearTimeout(timeout);

    const updateActiveId = () => {
      const randomRelic = relics[Math.floor(Math.random() * relics.length)];

      activeId = randomRelic.id;

      timeout = setTimeout(() => {
        if (timer > 0) {
          updateActiveId();
          timer -= 10;
        } else {
          finalId = activeId;
        }
      }, timer);
    };

    updateActiveId();
  };

  const onClose = () => (isModalVisible = false);

  let activeId: string | null = null;
</script>

<Button icon={random} onclick={onClick}>Random</Button>

{#if isModalVisible}
  <Modal title="Random" {onClose}>
    {#if finalId !== null}
      <div class="">
        <RelicTile relicId={finalId} />
      </div>
    {:else if activeId !== null}
      <div>
        <RelicTile relicId={activeId} />
      </div>
    {/if}
    <div class="flex justify-center">
      <Button onclick={onClick} icon={random} class="mt-2">Re-roll</Button>
    </div>
    {#if $store.selectedRarity !== null}
      <div>
        <span class="mr-2">Filtering by </span><RarityLabel
          rarity={$store.selectedRarity}
        />
      </div>
    {/if}
  </Modal>
{/if}
