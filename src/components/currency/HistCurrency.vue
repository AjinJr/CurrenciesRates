<template>
  <div class="flex w-full justify-center gap-x-4">
    <section class="h-96 w-2/4 border-2 bg-white/[.7]">
      <div
        class="grid grid-cols-3 content-center justify-items-center self-center gap-x-16 pt-12"
      >
        <div
          class="dates flex flex-col gap-y-8 text-xl self-center justify-items-center"
        >
          <div v-for="(item, index) in histCurr" :key="index">
            {{ item["date"] }}
          </div>
        </div>
        <div class="rates flex flex-col gap-y-8 text-xl">
          <div v-for="(item, index) in histCurr" :key="index">
            {{ item["rates"] }}
          </div>
        </div>
        <div class="">diff</div>
      </div>
    </section>
    <section
      class="h-96 w-1/4 border-2 bg-white/[.7] flex text-xl justify-around"
    >
      <div class="flex flex-col justify-around gap-y-8">
        <p>USD</p>
        <p>EUR</p>
        <p>GBP</p>
        <p>CHF</p>
        <p>JPY</p>
      </div>
      <div class="flex flex-col justify-around gap-y-8">
        <button @click="changePopValue('USD')">Доллар</button>
        <button @click="changePopValue('EUR')">Евро</button>
        <button @click="changePopValue('GBP')">Фунт</button>
        <button @click="changePopValue('CHF')">Франк</button>
        <button @click="changePopValue('JPY')">Иена</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HistCurrency",
  data() {
    return {
      popValue: "USD",
      dates: [],
    };
  },
  computed: {
    ...mapState({
      histCurr: (state) => state.histValues,
    }),
  },
  methods: {
    changePopValue(payload) {
      this.popValue = payload;
      this.$store.dispatch("getHistCurrency", {
        dates: this.dates,
        value: this.popValue,
      });
    },
  },
  created() {
    const date = new Date();
    let yesterday = new Date(date);
    for (let i = 0; i < 5; ++i) {
      yesterday.setDate(yesterday.getDate() - i);
      this.dates.push(yesterday.toISOString().slice(0, 10));
      yesterday = new Date(date);
    }
    this.$store.dispatch("getHistCurrency", {
      dates: this.dates,
      value: this.popValue,
    });
  },
};
</script>
