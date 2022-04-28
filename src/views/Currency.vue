<template>
  <CurrencyBox></CurrencyBox>
</template>

<script>
import { mapState } from "vuex";
import CurrencyBox from "@/components/currency/CurrencyBox.vue";

export default {
  name: "Currency",
  data() {
    return {
      selected: null,
      currencyIndex: 0,
    };
  },
  components: { CurrencyBox },
  computed: {
    ...mapState({
      currencies: (state) => state.currencies,
      value: (state) => state.value,
    }),
  },
  components: { CurrencyBox },
  methods: {
    onChange() {
      for (let index = 0; index < this.currencies.length; ++index) {
        if (this.currencies[index][1] === this.selected) {
          this.currencyIndex = index;
          break;
        }
      }
      this.$store.dispatch(
        "getPaperValue",
        this.currencies[this.currencyIndex][0]
      );
    },
  },
  created() {
    // this.$store.dispatch("getPaperMoney");
  },
};
</script>

<style scoped>
.values {
  box-shadow: 20px 20px 10px;
}
</style>
