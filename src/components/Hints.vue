<template>
  <div class="flex justify-center text-center pt-2">
    <div
      v-for="(hint, index) in names"
      :key="index"
      @click="addCard(index)"
      class="text-xl font-bold p-0.5 border-2 border-gray-800 ml-2 cursor-pointer rounded-md first:ml-0"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Hints",
  data() {
    return {
      current: "",
    };
  },
  props: {
    names: Array,
  },
  methods: {
    addCard(index) {
      console.log(this.names[index]);
      this.$emit("addCard", this.names[index]);
    },
  },
};
</script>
