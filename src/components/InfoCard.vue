<template>
  <div
    class="border-2 grid grid-rows-3 rounded-md text-center p-2 cursor-pointer"
  >
    <button
      class="max-w-fit justify-self-end border-2 p-2 hover:bg-gray-800 hover:text-orange-500 hover:border-orange-500"
      @click.stop="removeCard()"
      @click="changeValue"
    >
      x
    </button>
    <h1>{{ cards[index - 1]["name"] }}</h1>
    <h2>{{ cards[index - 1]["price"] }}</h2>
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
  },
  methods: {
    removeCard() {
      this.$store.commit("REMOVE_CARD", this.index);
    },
    changeValue() {
      this.$emit("changeIsShown", this.index);
    },
    async updateData() {
      await this.$store.dispatch("getInfo", this.cards[this.index - 1]["name"]);
    },
  },
  created() {
    this.interval = setInterval(this.updateData, 3000);
  },

  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
