<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <div>
      <h4> {{ message }} </h4>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6"  @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
    </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ " " }}
        <router-link to="/signup" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign up for free</router-link>
      </p>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data: () => ({
    email: "",
    password: "",
    message: ""
  }),
  methods: {
    login() {
      axios
        .post("http://127.0.0.1:8000/api/v1/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => { 
          console.log(response.status);
          localStorage.setItem("authToken", response.data.data.token);
          if(response.status == 200){
            this.$router.push("/home"); 
          }
        })
        .catch((error) => { 
          console.log(error);
        });
    },
  },
  mounted() {
    const successMessage = this.$route.query.successMessage;
    if (successMessage) {
        this.message = successMessage
    }
  }
};
</script>
