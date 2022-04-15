<template>
  <div class="justify-center">
    <form
      action=""
      class="justify-items-center p-8 text-center text-xl"
      @submit.prevent="onSubmit"
    >
      <input type="text" class="border-2 rounded-md" v-model="inputValue" />
      <button class="hover:text-orange-400 text-2xl p-1" @click="addCard">
        <i class="fa fa-plus-square fa-lg"></i>
      </button>
    </form>
  </div>
  <div class="p-8 grid grid-cols-2 gap-8 ;">
    <!--Left col -->
    <div v-if="length > 0" class="left_col">
      <hr class="border-gray-800" />
      <div class="max-h-[32rem] overflow-y-scroll">
        <section class="grid gap-5 grid-cols-3 grid-rows-3 p-2">
          <InfoCard
            v-for="index in length"
            :key="index + '' + length"
            :index="index"
            @click="toggle(index)"
            @changeIsShown="toggle(index)"
            :class="{ 'border-orange-400': currentIndex === index }"
            class="shadow-lg"
          />
        </section>
      </div>
      <hr class="border-gray-800" />
    </div>
    <!--Right col -->
    <Graph v-if="isShown" :index="currentIndex" />
  </div>
</template>

<script>
import InfoCard from "@/components/InfoCard.vue";
import Graph from "@/components/Graph.vue";
import { mapGetters } from "vuex";

export default {
  name: "CryptoCurrency",
  data() {
    return {
      inputValue: "",
      isShown: false,
      currentIndex: null,
    };
  },

  components: {
    InfoCard,
    Graph,
  },
  computed: {
    ...mapGetters({
      length: "getCardsLength",
    }),
  },
  methods: {
    async addCard() {
      await this.$store.dispatch("getInfo", this.inputValue);

      this.inputValue = "";
    },
    toggle(index) {
      console.log("button was pressed");
      console.log(this.currentIndex, index);
      if (this.currentIndex === index) {
        this.isShown = false;
        this.currentIndex = null;
      } else {
        this.currentIndex = index;
        this.isShown = true;
      }
    },
  },
};
//
</script>

<style scoped></style>
