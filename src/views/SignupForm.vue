<template>
  <div class="mt-16">
    <form class="max-w-md mx-auto" @submit.prevent="signup">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-6">
          <h2 class="text-base/7 font-semibold text-gray-900">
            Informações Pessoais
          </h2>
          <p class="mt-1 text-sm/6 text-gray-600">
            Utilize um endereço permanente no qual você possa receber
            correspondências.
          </p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block text-sm/6 font-medium text-gray-900"
                >Nome</label
              >
              <div class="mt-2">
                <input
                  v-model="first_name"
                  @input="clear_message()"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  :class="qual_campo === 'nome' ? error_class : active_class"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block text-sm/6 font-medium text-gray-900"
                >Sobrenome</label
              >
              <div class="mt-2">
                <input
                  v-model="last_name"
                  @input="clear_message()"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  :class="qual_campo === 'nome' ? error_class : active_class"
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
                  v-mask="'(##) #####-####'"
                  @input="clear_message()"
                  type="text"
                  name="celular"
                  id="celular"
                  autocomplete="tel-national"
                  inputmode="numeric"
                  maxlength="15"
                  placeholder="Ex: (61) 99628-6866"
                  :class="qual_campo === 'cell' ? error_class : active_class"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  v-model="email"
                  @input="clear_message()"
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  inputmode="email"
                  maxlength="100"
                  placeholder="Ex: exemplo@dominio.com"
                  :class="qual_campo === 'email' ? error_class : active_class"
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
                  @input="validate_password()"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  minlength="6"
                  required
                  :class="
                    qual_campo === 'password' ? error_class : active_class
                  "
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
                  @input="validate()"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirme sua senha"
                  minlength="6"
                  required
                  :class="
                    password == confirm_password ? active_class : error_class
                  "
                />
              </div>
            </div>
          </div>
          <div class="text-xs px-2 mt-5">
            <ul>
              <li :class="isLongEnough ? 'text-green-600' : 'text-red-600'">
                A senha deve ter pelo menos 9 caracteres.
              </li>
              <li :class="hasNumber ? 'text-green-600' : 'text-red-600'">
                A senha deve incluir pelo menos um número.
              </li>
              <li :class="hasLowercase ? 'text-green-600' : 'text-red-600'">
                A senha deve conter pelo menos uma letra minúscula.
              </li>
              <li :class="hasUppercase ? 'text-green-600' : 'text-red-600'">
                A senha deve conter pelo menos uma letra maiúscula.
              </li>
              <li :class="hasSpecialChar ? 'text-green-600' : 'text-red-600'">
                A senha deve conter pelo menos um caractere especial (ex: @, #,
                $, %, !, *, etc.).
              </li>
            </ul>
          </div>
          <danger-alert
            v-if="message_error != ''"
            :message="message_error"
          ></danger-alert>
          <danger-alert v-if="message != ''" :message="message"></danger-alert>
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
import DangerAlert from "@/components/DangerAlert.vue";

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
      "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-red-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus-visible:outline-red-600 sm:text-sm/6",
    message: "",
    message_error: "",
    qual_campo: "",
  }),
  components: {
    DangerAlert,
  },

  methods: {
    signup() {
      if (this.validate()) {
        this.send_to_backend();
      }
    },
    validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
        /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[\W_]))(?=(.*\d))[\w\W]{9,}$/;

      if (this.first_name.trim() === "" || this.last_name.trim() === "") {
        this.qual_campo = "nome";
        this.message = "Por favor, preencha o nome e o sobrenome.";
        return false;
      } else if (this.user_cell.trim() === "") {
        this.message = "O número de celular é obrigatório.";
        this.qual_campo = "cell";
        return false;
      } else if (this.email.trim() === "") {
        this.message = "O campo de e-mail é obrigatório.";
        this.qual_campo = "email";
        return false;
      } else if (!emailRegex.test(this.email.trim())) {
        this.message = "Por favor, insira um e-mail válido.";
        this.qual_campo = "email";
        return false;
      } else if (!passwordRegex.test(this.password.trim())) {
        this.message = "Por favor, insira uma senha válida.";
        this.qual_campo = "password";
        return false;
      } else if (this.password !== this.confirm_password) {
        this.message =
          "As senhas não correspondem. Certifique-se de que ambas sejam iguais.";
        this.qual_campo = "password";
        return false;
      } else {
        this.message = "";
        return true;
      }
    },
    send_to_backend() {
      axios
        .post("http://127.0.0.1:8000/api/v1/users", {
          first_name: this.first_name.trim(),
          last_name: this.last_name.trim(),
          user_cell: this.user_cell.trim(),
          email: this.email.trim(),
          password: this.password.trim(),
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
          if (error.response) {
            const errors = error.response.data.errors;
            if (errors.user_cell) {
              this.message_error = `${errors.user_cell[0]}`;
            } else if (errors.email) {
              this.message_error = `${errors.email[0]}`;
            } else {
              this.message_error =
                "Ocorreu um erro ao cadastrar. Verifique os dados e tente novamente.";
            }
          }
        });
    },
    clear_message() {
      this.message = "";
      this.qual_campo = "";
    },
  },
  computed: {
    isLongEnough() {
      return /^.{9,}$/.test(this.password);
    },
    hasLowercase() {
      return /.*[a-z].*/.test(this.password);
    },
    hasUppercase() {
      return /.*[A-Z].*/.test(this.password);
    },
    hasSpecialChar() {
      return /.*[\W_].*/.test(this.password);
    },
    hasNumber() {
      return /\d/.test(this.password);
    },
  },
};
</script>
  