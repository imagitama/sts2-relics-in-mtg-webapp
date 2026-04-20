<script lang="ts">
  import { selectRelicById, store } from "@app/stores/game";
  import { mtgify } from "@app/mtg";
  import Icon from "svelte-awesome";
  import info from "svelte-awesome/icons/info";
  import check from "svelte-awesome/icons/check";
  import RarityLabel from "./RarityLabel.svelte";

  let { relicId }: { relicId: string } = $props();

  let relic = $derived(selectRelicById(relicId));

  const onClick = () => {
    store.selectRelicId(relicId);
  };

  const onCheck = () => {
    if (!isActive) store.enableRelicId(relicId);
    else store.unenableRelicId(relicId);
  };

  let isActive = $derived($store.activeRelicIds.includes(relicId));

  let isInvalid = $relic.desc === undefined;
</script>

<div class="relative w-full h-full block">
  {#if isActive}
    <div
      class="absolute top-0 left-0 p-2 flex items-center text-xl text-[rgb(100,150,100)]"
    >
      <Icon data={check} class="text-xl mr-1" />
    </div>
  {/if}
  <button
    title={`Enable relic ${$relic.name}`}
    onclick={onClick}
    class={`px-4 py-2 absolute top-0 right-0 rounded-bl ${isActive ? "bg-white/10" : isInvalid ? "bg-red/25" : "bg-white/10 hover:bg-white/10"} cursor-pointer`}
  >
    <Icon data={info} />
  </button>
  <button
    title={`View relic ${$relic.name}`}
    class={`flex flex-row w-full h-full block rounded p-2 border-1 border-white/25 ${isActive ? "bg-[rgb(0,25,0)]" : isInvalid ? "bg-[rgb(25,0,0)]" : "bg-black/25 hover:bg-white/10"} cursor-pointer duration-100`}
    onclick={onCheck}
  >
    <div class="flex justify-center items-center">
      <img
        src="https://sts2.gg/cdn-cgi/image/width=1920,quality=80,format=auto/images/relics/{relicId}.png"
        alt="Relic thumbnail"
        class="w-20 h-20 max-w-none"
      />
    </div>
    <div class="w-full flex justify-center flex-col">
      <div class="text-lg font-bold leading-none">
        {$relic.name}
      </div>
      <RarityLabel rarity={$relic.rarity} class="m-1" />
      <div class="text-xs">{@html mtgify($relic.desc)}</div>
      {#if isInvalid}
        <span class="italic">Skipped: {$relic.why || "(no reason)"}</span>
      {/if}
    </div>
  </button>
</div>
