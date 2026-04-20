<script lang="ts">
  import { mtgify } from "@app/mtg";
  import Modal, { type ModalProps } from "./Modal.svelte";
  import { stsDescToHtml } from "@app/sts";
  import RarityLabel from "./RarityLabel.svelte";
  import type { Relic } from "@app/types";

  let { relic, ...modalProps }: { relic: Relic } & ModalProps = $props();
</script>

<Modal title={relic.name} {...modalProps}>
  <h2 class="text-xl font-medium mb-4 flex items-center">
    <img
      src="https://sts2.gg/cdn-cgi/image/width=1920,quality=80,format=auto/images/relics/{relic.id}.png"
      // src={$relic.image_url}
      alt="Relic thumbnail"
      width="50"
      class="mr-2"
    />
    <div class="">
      {relic.name}
      <RarityLabel rarity={relic.rarity} />
    </div>
  </h2>
  <div class="font-medium mt-2">Description</div>
  <div class="text-sm">{@html mtgify(relic.desc)}</div>

  {#if relic.rules !== undefined}<div>
      <!-- <div class="font-medium mt-2">Rules Advice</div> -->
      <div class="text-sm italic mt-1">
        {@html mtgify(relic.rules)}
      </div>
    </div>{:else}
    <!-- <span class="italic text-sm opacity-50"
      >No rules specified</span
    > -->
  {/if}
  <div class="font-medium mt-2">Slay The Spire</div>
  <div class="text-sm">{@html stsDescToHtml(relic.original)}</div>
</Modal>
