<template>
  <section class="grid grid-row-2 text-center">
    <div class="flex flex-col justify-around">
      <h1 class="text-2xl font-bold">{{ cards[index]["name"] }}</h1>
      <p class="text-2xl font-medium">{{ cards[index]["price"] }}</p>
    </div>
    <!-- <div class="flex items-end border-gray-600 border-b border-l h-64 self-end">
      <div
        v-for="(item, index) in showPrices()"
        :key="index"
        :style="{ height: ` ${item}%` }"
        class="bg-orange-500 border w-10 h-24"
      ></div>
    </div> -->
    <LineChart :chartData="prices" :options="options" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "Graph",
  data() {
    return {
      prices: [],
      interval: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
    showPrices() {
      const max = Math.max(...this.prices);
      const min = Math.min(...this.prices);
      let result = [];

      this.prices.forEach((price) => {
        result.push(5 + ((price - min) * 95) / (max + 1 - min));
      });

      return result;
    },
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
    console.log(-1);
  },
};
</script>
