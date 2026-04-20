<script lang="ts">
  import { Rarity } from "@app/sts";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    rarity,
    class: className,
  }: { rarity: Rarity } & HTMLAttributes<HTMLSpanElement> = $props();

  const getClassForRarity = (rarity: Rarity): string => {
    switch (rarity) {
      case Rarity.Starter:
        return "rgb(106, 158, 110)";
      case Rarity.Common:
        // return "text-[rgb(106,158,110)]";
        return "text-[rgb(200,212,232)]";
      case Rarity.Uncommon:
        return "text-[rgb(77,182,232)]";
      case Rarity.Rare:
        return "text-[rgb(245,200,66)]";
      case Rarity.Shop:
        return "text-[rgb(255,159,90)]";
      case Rarity.Event:
        return "text-[rgb(193,125,255)]";
      case Rarity.Ancient:
        return "text-[rgb(249,115,22)]";
    }
  };
</script>

<span class={`uppercase text-xs ${className} ${getClassForRarity(rarity)}`}>
  {rarity}
</span>
