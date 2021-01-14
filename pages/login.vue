<template>
  <div class="login-page aflex">
    <div class="m-auto login-card">
      <h2 class="text-center pt-3">Login Here</h2>
      <b-alert
        variant="danger"
        dismissible
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert = false"
      >
        {{ errorMessageAlert }}
      </b-alert>
      <text-input
        lebel="Phone number"
        v-model="form.number"
        placeholder="Phone Number"
        min-length="3"
        ref="phone"
        required="true"
      ></text-input>
      <br />
      <div id="recaptcha"></div>
      <text-input
        lebel="password"
        v-model="form.password"
        placeholder="password"
        min-length="6"
        ref="password"
        required="true"
        type="password"
      ></text-input>

      <br /><br />

      <my-button
        @click="onSignInSubmit"
        text="submit"
        color="blue"
        class="text-center"
      ></my-button>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/fire";
export default {
  data: () => ({
    form: {
      number: "",
      password: ""
    },
    showDismissibleAlert: false,
    errorMessageAlert: ""
  }),
  methods: {
    async onSignInSubmit() {
      this.$nuxt.$emit("loading", true);

      await firebase
        .database()
        .ref("userInfo")
        .once("value", e => {
          e.forEach(element => {
            if (
              element.val().number == this.form.number &&
              element.val().password == this.form.password
            ) {
              localStorage.setItem("userkey", element.key);
              this.$router.push("/profile");
              $nuxt.$emit("log");
              return;
            }
            if (
              element.val().number !== this.form.number &&
              element.val().password !== this.form.password
            ) {
              this.showDismissibleAlert = true;
              this.errorMessageAlert = "Number Or Password Wrong";
            }
          });
        })
        .catch(err => {
          this.showDismissibleAlert = true;
          this.errorMessageAlert = err.message;
          return;
        });
      this.$nuxt.$emit("loading", false);
    }
  },
  computed: {}
};
</script>
<style scoped>
.login-page {
  height: 87vh;
}
.login-card {
}
</style>
