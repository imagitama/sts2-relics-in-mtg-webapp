<script lang="ts">
  import Router from "svelte-spa-router";
  import Relics from "./containers/Relics.svelte";
  import Button from "./components/Button.svelte";
  import ScrollToTopIcon from "./components/ScrollToTopIcon.svelte";

  const routes = {
    // '/':           Home,
    // '/relics':     Relics,
    // '/relics/:relicId': ViewRelic,
    "*": Relics,
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

<!-- <nav>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/relics">Relics</a></li>
  </ul>
</nav> -->

<main class="p-2">
  <Router {routes} />
</main>

<div class="flex justify-center my-4">
  <Button onclick={scrollToTop}>Scroll To Top</Button>
</div>

<ScrollToTopIcon />

<footer>
  Created by <a href="https://www.jaredwilliams.com.au">Jared Williams</a> |
  <a href="https://github.com/imagitama">GitHub</a> | STS2 relic data from
  <a href="https://sts2.gg/relics">STS2.GG</a>
  <Button onclick={() => localStorage.clear()}>Clear Storage</Button>
</footer>
