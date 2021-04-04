<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
             <template
              v-for="(messages, field) in err"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" v-if="isLogin">
              Sign in
            </button>
            <button class="btn btn-lg btn-primary pull-xs-right" v-else>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser, loginUser } from "@/api/login";  
import { mapMutations } from 'vuex'
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
   middleware: 'noAuthenticated',
  name: "loginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      err:""
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.isLogin) {
          const { data } = await loginUser({ user: this.user });

          this.setUser(data.user);
          Cookie.set("user", data.user); // saving token in cookie for server rendering
         
          this.$router.push("/");
        } else {
          registerUser({ user: this.user });
        }
      } catch (error) {
          this.err = error.response.data.errors
      }
    },

    ...mapMutations(["setUser"]),
  },
};
</script>

<style>
</style>