<script lang="ts">
  import { Icon } from "svelte-awesome";
  import arrowUp from "svelte-awesome/icons/arrowUp";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  let scrollY = $state(0);
  let hasScrolledPast = $state(false);

  $effect(() => {
    hasScrolledPast = scrollY >= 100;
  });
</script>

<svelte:window bind:scrollY />

{#if hasScrolledPast}
  <div
    class="fixed bottom-0 left-0 p-2 m-2 text-xl cursor-pointer w-10 h-10 bg-black/25 hover:bg-black rounded flex justify-center items-center"
    onclick={scrollToTop}
  >
    <Icon data={arrowUp} />
  </div>
{/if}
