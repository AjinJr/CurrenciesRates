<template>
  <div class="left_col bg-white rounded-md border border-white w-full">
    <div class="">
      <section class="grid gap-5 grid-cols-3 grid-rows-3 p-2">
        <InfoCard
          v-for="(item, index) in cards"
          :key="index"
          :index="index"
          :item="item"
          @click="toggle(index)"
          @removeCard="removeCard"
          @changeIsShown="changeIsShown"
          :class="{ 'border-orange-400': currentIndex === index }"
          class="shadow-lg"
        />
      </section>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/InfoCard.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "CardsHolder",
  data() {
    return {
      currentIndex: null,
      interval: null,
    };
  },
  props: {
    inputValues: {
      type: Array,
      default: () => [],
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
    removeCard(payload) {
      this.$emit("removeCard", payload);
    },
    changeIsShown() {
      this.$emit("changeIsShown");
      this.currentIndex = null;
    },
    toggle(index) {
      console.log(index, this.currentIndex);
      if (this.currentIndex == index) {
        this.currentIndex = null;
      } else {
        this.currentIndex = index;
      }
      this.$emit("showGraph", this.currentIndex);
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
