<template>
  <div
    class="border-2 border-gray-800 bg-white grid grid-rows-3 rounded-md text-center p-2 cursor-pointer min-w-fit"
  >
    <button
      class="max-w-fit justify-self-end border-2 border-gray-800 p-2 hover:bg-gray-800 hover:text-orange-500 hover:border-orange-500"
      @click.stop="removeCard(), changeValue"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
    <h1>{{ item["name"] }}</h1>
    <h2>{{ item["price"] }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InfoCard",
  data() {
    return {
      info: {},
      interval: null,
    };
  },
  computed: {
    ...mapState({
      cards: (state) => state.cards,
    }),
  },
  props: {
    index: Number,
    item: Object,
  },
  methods: {
    removeCard() {
      this.$emit("removeCard", this.item["name"]);
      this.$store.commit("REMOVE_CARD", this.item["name"]);
    },
    changeValue() {
      this.$emit("toggle", this.index);
    },
  },
  created() {},

  unmounted() {
    this.$store.commit("REMOVE_CARD", this.item["name"]);
  },
};
</script>
