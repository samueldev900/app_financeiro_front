<template>
  <div class="mt-16">
    <form class="max-w-md mx-auto" @submit.prevent="signup">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p class="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block text-sm/6 font-medium text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  v-model="first_name"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block text-sm/6 font-medium text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  v-model="last_name"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="celular"
                class="block text-sm/6 font-medium text-gray-900"
                >Celular</label
              >
              <div class="mt-2">
                <input
                  v-model="user_cell"
                  type="text"
                  name="celular"
                  id="celular"
                  autocomplete="tel-national"
                  inputmode="numeric"
                  maxlength="15"
                  placeholder="Ex: (61) 99628-6866"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  @input="formatPhone"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="email" class="block text-sm/6 font-medium text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  inputmode="email"
                  maxlength="100"
                  placeholder="Ex: exemplo@dominio.com"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div class="sm:col-span-3 mt-4">
              <label
                for="password"
                class="block text-sm/6 font-medium text-gray-900"
                >Senha</label
              >
              <div class="mt-2">
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  minlength="6"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div class="sm:col-span-3 mt-4">
              <label
                for="confirm_password"
                class="block text-sm/6 font-medium text-gray-900"
                >Confirme a Senha</label
              >
              <div class="mt-2">
                <input
                  v-model="confirm_password"
                  @input="password_verify()"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirme sua senha"
                  minlength="6"
                  required
                  :class="password == confirm_password ? active_class : error_class"
                />
              </div>
              <div class="text-red-600">
                <small>{{ message }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <router-link to="/">
          <button type="button" class="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
        </router-link>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data: () => ({
    first_name: "",
    last_name: "",
    user_cpf: "",
    user_cell: "",
    email: "",
    password: "",
    confirm_password: "",
    class_wrong: "",
    active_class:
      "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
    error_class:
      "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus-visible:outline-red-600 sm:text-sm/6",
    message: "",
  }),

  methods: {
    signup() {
      if (this.password == this.confirm_password) {
        axios
          .post("http://127.0.0.1:8000/api/v1/users", {
            first_name: this.first_name,
            last_name: this.last_name,
            user_cell: this.user_cell,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log("Cadastro realizado com sucesso:", response);
            console.log(response.data.message);
            console.log(response.data.status);
            if (response.data.status == 200) {
              this.$router.push({
                path: "/",
                query: { successMessage: "Usuário cadastrado com sucesso!" },
              });
            }
          })
          .catch((error) => {
            console.error("Erro ao cadastrar:", error);
            alert("Ocorreu um erro ao cadastrar. Tente novamente.");
          });
      }
    },
    password_verify(){
      if(this.password != this.confirm_password){
          this.message= "As senhas devem ser iguais!"
      }else{
        this.message= ""
      }
    }
  },
};
</script>
