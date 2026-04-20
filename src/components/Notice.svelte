<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "./Button.svelte";
  import Icon from "svelte-awesome";
  import close from "svelte-awesome/icons/close";

  let { children, onClose }: { children: Snippet; onClose: () => void } =
    $props();
</script>

<div class="bg-black rounded-xl shadow-lg p-4 w-full relative mb-2">
  <div>
    {@render children?.()}
  </div>
  <div class="flex justify-end">
    <div>
      <Button onclick={onClose}>Close</Button>
    </div>
  </div>
</div>
