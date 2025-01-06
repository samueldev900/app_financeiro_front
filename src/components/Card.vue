<template>
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center flex flex-col justify-center items-center m-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="w-12 h-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Valor do Dólar</h5>
        <p class="mb-3 text-lg font-medium text-center text-gray-700">
            <span class="text-3xl">$ {{ value }}</span>
        </p>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    value: 0,
  }),
  created() {
    const appId = import.meta.env.VITE_APP_ID;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;

    axios.get(url)
    .then((response) => {
      let dolar = response.data.rates.BRL
      this.value = parseFloat(dolar).toFixed(2);
    })
    .catch((error) => {
      console.log(error);
    })
  },
};
</script>