<template>
  <div>
    <div class="loading aflex" v-if="loadingShow">
      <img class="m-auto" src="/a.svg" />
    </div>

    <the-navbar
      @expandToggleHandle="expandMenu = !expandMenu"
      :expandMenu="!expandMenu"
    ></the-navbar>

    <div class="aflex">
      <div
        v-show="!expandMenu"
        @click="expandMenu = !expandMenu"
        class="backdrop-navbar"
      ></div>
      <div class="menu-expand" :class="{ margintoggle: expandMenu }">
        <menu-slider></menu-slider>
      </div>
      <div
        class="main-content flex-grow"
        :class="{ margincontent: !expandMenu }"
      >
        <Nuxt />
      </div>
    </div>
    <!-- <Nuxt /> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    expandMenu: true,
    loadingShow: false
  }),
  created() {
    this.$nuxt.$on("loading", e => {
      this.loadingShow = e;
    });
  }
};
</script>
<style>
.menu-expand {
  width: 250px;
  background: #ffff;
  transition: 300ms all;
  height: 100vh;
  position: fixed;
  top: 60px;
  z-index: 3;
}
.main-content {
  transition: 300ms all;
}
.margintoggle {
  margin-left: -344px;
}
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
@media screen and (min-width: 776px) {
  .margincontent {
    margin-left: 250px;
  }
}
@media screen and (max-width: 776px) {
  .backdrop-navbar {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
}
</style>
