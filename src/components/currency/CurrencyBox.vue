<template>
  <div class="w-screen relative z-50">
    <div class="p-24 flex flex-col items-center gap-y-12">
      <div
        class="flex flex-col md:flex-row gap-y-4 w-full justify-center md:gap-x-4 items-center"
      >
        <section class="flex w-1/3 justify-center">
          <input
            type="text"
            v-model="firstInput"
            @input="secondInput = firstInput * value.rates"
            class="max-w-sm border pl-2"
          />
          <select
            v-model="firstSelected"
            class="form-select block w-full border p-3 max-w-fit"
            id="firstSelect"
            @change="onChange"
          >
            <option v-for="(item, index) in currencies" :key="index">
              {{ currencies[index][1] }}
            </option>
          </select>
        </section>

        <button
          class="flex flex-col justify-center text-white hover:text-gray-400"
        >
          <i
            class="fa-solid fa-arrow-right-arrow-left fa-lg cursor-pointer"
            @click="reverseBoxes"
          ></i>
        </button>
        <section class="flex w-1/3 justify-center">
          <input
            type="text"
            v-model="secondInput"
            @input="firstInput = secondInput / value.rates"
            class="max-w-sm border pl-2"
          />
          <select
            v-model="secondSelected"
            class="form-select block w-full border p-3 max-w-fit"
            id="secondSelect"
            @change="onChange"
          >
            <option v-for="(item, index) in currencies" :key="index">
              {{ currencies[index][1] }}
            </option>
          </select>
        </section>
      </div>
      <HistCurrency />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HistCurrency from "@/components/currency/HistCurrency.vue";
export default {
  name: "CurrencyBox",
  data() {
    return {
      firstSelected: "Russian ruble",
      secondSelected: "United States dollar",
      firstInput: 100,
      secondInput: 1,
      firstCurrencyIndex: 0,
      secondCurrencyIndex: 0,
    };
  },
  components: {
    HistCurrency,
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currencies,
      value: (state) => state.value,
    }),
    secondValue: function () {
      this.value.rates;
    },
  },
  methods: {
    async onChange(e) {
      let firstIndex;
      let secondIndex;

      for (let index = 0; index < this.currencies.length; ++index) {
        if (this.currencies[index][1] === this.firstSelected) {
          firstIndex = index;
          break;
        }
      }

      for (let index = 0; index < this.currencies.length; ++index) {
        if (this.currencies[index][1] === this.secondSelected) {
          secondIndex = index;
          break;
        }
      }
      await this.$store.dispatch("getPaperValue", [
        this.currencies[firstIndex][0],
        this.currencies[secondIndex][0],
      ]);
      this.secondInput = this.firstInput * this.value.rates;
    },
    reverseBoxes() {
      let transitSelected = this.firstSelected;
      this.firstSelected = this.secondSelected;
      this.secondSelected = transitSelected;

      let transitInput = this.firstInput;
      this.firstInput = this.secondInput;
      this.secondInput = transitInput;
    },
  },
  async created() {
    await this.$store.dispatch("getPaperMoney");
    await this.$store.dispatch("getPaperValue", [
      this.currencies[64][0],
      this.currencies[141][0],
    ]);
    console.log(this.value.rates);
    this.secondInput = this.firstInput * this.value.rates;
  },
};
</script>
