<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "./Button.svelte";
  import Icon from "svelte-awesome";
  import close from "svelte-awesome/icons/close";

  export type ModalProps = { onClose: () => void };

  let {
    title,
    children,
    onClose,
  }: { title: string; children: Snippet } & ModalProps = $props();
</script>

<div
  class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
  onclick={onClose}
  onkeypress={(e) => {
    if (e.key == "Escape") {
      e.preventDefault();
      onClose();
    }
  }}
  role="presentation"
>
  <div
    class="bg-black rounded shadow-lg p-4 m-2 w-full max-w-md relative border-1 border-white/25"
    onclick={(e) => e.stopPropagation()}
  >
    <div
      class="text-lg max-w-100 absolute top-0 right-0 py-1 px-3 cursor-pointer opacity-20 hover:opacity-100 duration-100"
      onclick={onClose}
    >
      <Icon data={close} class="scale-150" />
    </div>
    <!-- <h2 class="text-xl font-medium mb-4 text-center">{title}</h2> -->
    <div>
      {@render children?.()}
    </div>
    <div class="flex justify-end mt-2">
      <div>
        <Button onclick={onClose}>Close</Button>
      </div>
    </div>
  </div>
</div>
