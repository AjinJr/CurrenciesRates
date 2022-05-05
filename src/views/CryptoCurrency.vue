<template>
  <div class="z-50">
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
        <p for="3" v-if="flag && values.length != 0" class="text-red-500">
          This card is already added
        </p>
        <Hints
          v-if="inputValue.trim() != ''"
          :names="hints"
          @addCard="addHint"
        />
      </form>
    </div>
    <div class="p-12 flex flex-col items-center justify-center relative">
      <div v-if="values.length > 0" class="w-1/2 bg-white/[.7]">
        <CardsHolder
          :currentIndex="currentIndex"
          :inputValues="values"
          :currentPage="currentPage"
          @removeCard="removeCard"
          @showGraph="showGraph"
          @getNextPage="hasNextPage"
        />
      </div>
      <div class="buttons flex p-4 text-white gap-x-12">
        <button @click="currentPage--" v-if="currentPage > 1">
          <i class="fa-solid fa-angle-left fa-xl"></i>
        </button>
        <button @click="currentPage++" v-if="nextPage">
          <i class="fa-solid fa-angle-right fa-xl"></i>
        </button>
      </div>
    </div>
    <div
      class="absolute top-0 left-0 min-h-full w-full flex justify-center items-center"
      v-if="currentIndex != null"
    >
      <div class="absolute bg-black/[.5] w-screen h-screen z-10"></div>
      <Modal
        class="absolute top-48 z-50"
        :index="currentIndex"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
import CardsHolder from "@/components/CardsHolder";
import InfoCard from "@/components/InfoCard.vue";
import Hints from "@/components/Hints.vue";
import Modal from "@/components/Modal.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "CryptoCurrency",
  data() {
    return {
      inputValue: "",
      currentIndex: null,
      currentPage: 1,
      nextPage: false,
      flag: false,
      values: [],
      hints: [],
    };
  },

  components: {
    CardsHolder,
    Modal,
    InfoCard,
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
      this.currentIndex = null;
    },
    hasNextPage(payload) {
      this.nextPage = this.length > payload;
    },
    showGraph(index) {
      console.log(index);
      if (index != null) {
        this.currentIndex = index;
      }
    },
    closeModal() {
      this.currentIndex = null;
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
  async created() {
    this.$store.dispatch("getAllCoins");
  },
  unmounted() {
    this.$store.commit("CLEAR_CARDS");
    this.values = [];
  },
};
</script>

<style scoped>
/* .left_col {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
} */
</style>
