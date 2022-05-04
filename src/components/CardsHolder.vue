<template>
  <div class="left_col rounded-md border border-white w-full">
    <div class="">
      <section class="grid gap-5 grid-cols-3 grid-rows-3 p-2">
        <InfoCard
          v-for="(item, index) in getCurrentCards()"
          :key="index"
          :index="index"
          :item="item"
          @click="toggle(index)"
          @removeCard="removeCard"
          @toggle="toggle"
          :class="{ 'border-orange-400': currentIndex === index }"
          class="shadow-lg"
        />
      </section>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/InfoCard.vue";

import { mapState } from "vuex";

export default {
  name: "CardsHolder",
  data() {
    return {
      interval: null,
    };
  },
  props: {
    inputValues: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      default: null,
    },
    currentPage: {
      type: Number,
      default: null,
    },
  },
  components: {
    InfoCard,
  },
  computed: {
    ...mapState({
      cards: (state) => state.cards,
    }),
    length: function () {
      return this.inputValues?.length;
    },
  },
  methods: {
    async updateData() {
      for (let i = 0; i < this.inputValues.length; ++i) {
        await this.$store.dispatch("getInfo", this.inputValues[i]);
      }
    },
    getCurrentCards() {
      const start = (this.currentPage - 1) * 9;
      const end = this.currentPage * 9;
      // console.log(this.cards.slice(start, end));
      this.$emit("getNextPage", end);
      return this.cards.slice(start, end);
    },
    removeCard(payload) {
      this.$emit("removeCard", payload);
    },

    toggle(index) {
      if (this.currentIndex == index) {
        this.currentIndex = null;
      } else {
        this.$emit("showGraph", index);
      }
    },
  },
  created() {
    this.updateData();
    this.interval = setInterval(this.updateData, 3000);
  },
  unmounted() {
    clearInterval(this.interval);
    this.$store.commit("CLEAR_CARDS");
  },
  watch: {
    length() {
      this.updateData();
    },
  },
};
</script>
