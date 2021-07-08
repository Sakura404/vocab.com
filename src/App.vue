<template>
  <router-view>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      nav: false,
      tab: null,
      items: [
        { item: "play", content: "asdf" },
        { item: "look up", content: "asdf" },
        { item: "lists", content: "asdf" },
      ],
    };
  },
};
</script>
<style lang="scss">
.actived {
  color: white;
  background: rgba(0, 0, 0, 0.295);
}
.subc {
  background-color: rgba(255, 255, 255, 0.185);
}
.icoitem {
  background: url("./assets/icons/menu-buttons.png") 0px -30px no-repeat;
  width: 30px;
  height: 30px;
  line-height: 18px;
  display: inline-block;
}
.asd {
  background-size: contain;
  background-size: 100%;
}
</style>
