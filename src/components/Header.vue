<template>
  <div>
    <nav class="flex justify-between align-center bg-gray-800 p-2">
      <div>
        <i class="fa-solid fa-shekel-sign fa-3x text-orange-500"></i>
      </div>
      <div class="align-center self-center">
        <router-link
          to="/"
          class="p-2 text-2xl font-bold text-white hover:bg-gray-700 rounded-md"
        >
          Бумага</router-link
        >
        <router-link
          to="/crypt"
          class="p-2 text-2xl font-bold text-white hover:bg-gray-700 rounded-md"
          >Крипта</router-link
        >
      </div>
      <div></div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
