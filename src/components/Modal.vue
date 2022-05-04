<template>
  <section class="grid grid-row-2 text-center bg-white">
    <div class="flex flex-col justify-around">
      <button class="self-end p-4 border rounded-md" @click="closeModal">
        x
      </button>
      <h1 class="text-2xl font-bold">{{ cards[index]["name"] }}</h1>
      <!-- <p class="text-2xl font-medium">{{ cards[index]["price"] }}</p> -->
    </div>
    <LineChart :chartData="prices" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "Modal",
  data() {
    return {
      prices: [],
      interval: null,
    };
  },
  props: {
    index: Number,
  },
  components: { LineChart },
  computed: {
    ...mapState({
      cards: (state) => state.cards,
    }),
  },
  methods: {
    getPrice() {
      if (!this.prices.includes(this.cards[this.index]["price"]))
        this.prices.push(this.cards[this.index]["price"]);
      if (this.prices.length === 16) {
        this.prices.splice(0, 1);
      }
    },
    closeModal() {
      this.$emit("closeModal", this.index);
    },
    // showPrices() {
    //   const max = Math.max(...this.prices);
    //   const min = Math.min(...this.prices);
    //   let result = [];
    //   this.prices.forEach((price) => {
    //     result.push(5 + ((price - min) * 95) / (max + 1 - min));
    //   });
    //   return result;
    // },
  },
  watch: {
    index() {
      this.prices = [];
    },
  },
  created() {
    this.interval = setInterval(this.getPrice, 3000);
  },
  unmounted() {
    this.prices = [];
    clearInterval(this.interval);
  },
};
</script>
