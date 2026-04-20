<script lang="ts">
  import { selectRelicById, store } from "@app/stores/game";

  let { relicId }: { relicId: string } = $props();

  let relic = $derived(selectRelicById(relicId));

  const onClick = () => {
    store.selectRelicId(relicId);
  };

  let isActive = $derived($store.activeRelicIds.includes(relicId));

  let isInvalid = $relic.desc === undefined;
</script>

<div class="relative">
  <button
    title={`View relic ${$relic.name}`}
    class={`flex flex-row block rounded-md p-1 border-1 border-white/25 ${isActive ? "bg-[rgb(0,25,0)]" : isInvalid ? "bg-[rgb(25,0,0)]" : "bg-black/25 hover:bg-white/10"} cursor-pointer duration-100`}
    onclick={onClick}
  >
    <div class="flex justify-center">
      <div>
        <img
          src="https://sts2.gg/cdn-cgi/image/width=1920,quality=80,format=auto/images/relics/{relicId}.png"
          alt="Relic thumbnail"
          class="max-w-10"
        />
      </div>
    </div>
  </button>
</div>
