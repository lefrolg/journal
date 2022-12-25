<template>
  <div class="portal">
    <aside class="menu rectangle yellow">
      <header>
        <img src="@/assets/images/ApplicationLogo.svg" alt="logo" class="logo" />
      </header>
      <nav>
        <slot name="companies"></slot>
      </nav>
      <footer>
        <slot name="account"></slot>
      </footer>
    </aside>
    <main class="content">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: "PortalLayout",
};
</script>
<style lang="scss">
@import "index";
</style>
