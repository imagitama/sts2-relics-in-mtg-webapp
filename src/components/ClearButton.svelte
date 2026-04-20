<script lang="ts">
  import { store } from "@app/stores/game";
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";

  let isConfirming = false;

  const onClick = () => {
    console.log("Clicked initial clear button");
    isConfirming = true;
  };
  const onClear = () => {
    console.log("Clear!!");
    isConfirming = false;

    store.clear();
  };
  const onCancel = () => {
    console.log("Cancel!!");
    isConfirming = false;
  };
</script>

<Button onclick={onClick} color="bad">Clear</Button>

{#if isConfirming}
  <Modal onClose={onCancel}
    >Are you sure you want to clear your active relics? <Button
      color="bad"
      onclick={onClear}
      class="mt-2">Yes I'm sure</Button
    ></Modal
  >
{/if}
