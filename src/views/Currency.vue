<template>
  <select
    v-model="selected"
    class="form-select block w-full border p-3 rounded"
    @change="onChange"
  >
    <option :value="null" disabled>Select currency</option>
    <option v-for="(item, index) in currencies" :key="index">
      {{ currencies[index][1] }}
    </option>
  </select>

  <div class="w-full flex justify-center p-20 text-center">
    <div class="values min-w-[50%] p-10 border-2 border-gray-800 rounded-md">
      <h1 class="p-2 text-3xl font-bold">
        {{ value.name }}
      </h1>
      <h1 class="p-2 text-2xl font-semibold">
        {{ value.code }}
      </h1>
      <p class="p-2 text-2xl font-semibold">
        {{ value.rates }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Currency",
  data() {
    return {
      selected: null,
      currencyIndex: 0,
    };
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currencies,
      value: (state) => state.value,
    }),
  },
  components: {},
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
    this.$store.dispatch("getPaperMoney");
  },
};
</script>

<style scoped>
.values {
  box-shadow: 20px 20px 10px;
}
</style>
