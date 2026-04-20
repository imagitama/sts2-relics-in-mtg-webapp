<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Icon } from "svelte-awesome";
  import check from "svelte-awesome/icons/check";

  let {
    children,
    color,
    disabled = false,
    selected = false,
    icon = null,
    ...buttonProps
  }: {
    children: Snippet;
    color?: "bad";
    disabled?: boolean;
    selected?: boolean;
    icon?: any;
  } & HTMLButtonAttributes = $props();
</script>

<button
  {...buttonProps}
  class={`border-white/25 px-2 py-1 md:px-4 md:py-2 text-white text-sm md:text-base rounded-md cursor-pointer ${color === "bad" ? "bg-[rgb(75,25,25)] hover:bg-[rgb(150,50,50)]" : "bg-[rgb(50,50,50)] hover:bg-[rgb(100,100,100)]"} ${selected !== false ? "" : ""} ${buttonProps.class}`}
  {disabled}
>
  {#if icon !== null}
    <Icon data={icon} />
  {/if}
  {#if selected == true}
    <Icon data={check} />
  {/if}
  {@render children()}
</button>
