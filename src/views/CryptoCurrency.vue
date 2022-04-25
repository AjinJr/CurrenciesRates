<template>
  <div class="justify-center">
    <form
      action=""
      class="3 justify-items-center p-4 text-center text-xl"
      @submit.prevent="onSubmit"
    >
      <input
        type="text"
        class="border-2 rounded-md"
        v-model="inputValue"
        placeholder="Название валюты:"
        @keyup="getHints"
        @keydown="watchInput"
      />
      <button class="hover:text-orange-400 text-2xl p-1" @click="addCard">
        <i class="fa fa-plus-square fa-lg"></i>
      </button>
      <br />
      <label for="3" v-if="flag && values.length != 0" class="text-red-500"
        >This card is already added</label
      >
      <Hints
        v-if="inputValue.trim() != '' && values.length > 0"
        :names="hints"
        @addCard="addHint"
      />
    </form>
  </div>
  <div class="p-8 grid grid-cols-2 gap-8 ;">
    <!--Left col -->
    <div v-if="values.length > 0" class="left_col">
      <CardsHolder
        :inputValues="values"
        @removeCard="removeCard"
        @showGraph="showGraph"
        @changeIsShown="changeIsShown"
      />
    </div>
    <!--Right col -->
    <Graph v-if="isShown" :index="currentIndex" :options="chartOptions" />
  </div>
</template>

<script>
import CardsHolder from "@/components/CardsHolder";
import InfoCard from "@/components/InfoCard.vue";
import Hints from "@/components/Hints.vue";
import Graph from "@/components/Graph.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "CryptoCurrency",
  data() {
    return {
      inputValue: "",
      isShown: false,
      currentIndex: null,
      flag: false,
      values: [],
      hints: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  components: {
    CardsHolder,
    InfoCard,
    Graph,
    Hints,
  },
  computed: {
    ...mapGetters({
      length: "getCardsLength",
    }),
    ...mapState({
      coins: (state) => state.coins,
    }),
  },
  methods: {
    async addCard() {
      if (!this.values.includes(this.inputValue)) {
        this.values.push(this.inputValue);
        this.inputValue = "";
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    removeCard(payload) {
      console.log(payload, this.values);
      this.values = this.values.filter((item) => item != payload);
    },
    showGraph(index) {
      console.log(index, this.currentIndex);
      if (index != null) {
        console.log(1);
        this.currentIndex = index;
        this.isShown = true;
      } else {
        this.changeIsShown();
      }
    },
    changeIsShown() {
      this.currentIndex == null;
      this.isShown = false;
    },
    addHint(name) {
      this.inputValue = name;
      this.addCard();
    },

    filterCoins() {
      return this.coins
        .filter((value) => value.includes(this.inputValue.trim()))
        .slice(0, 4);
    },

    getHints() {
      this.hints = this.filterCoins();
    },

    watchInput() {
      this.flag = false;
    },
  },
  created() {
    this.$store.dispatch("getAllCoins");
  },
  unmounted() {
    this.$store.commit("CLEAR_CARDS");
    this.values = [];
  },
};
</script>

<style scoped></style>
