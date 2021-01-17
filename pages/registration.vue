<template>
  <div class="aflex registration">
    <div class="login-card mx-auto mt-2">
      <h2 class="text-center pt-3">Registration</h2>
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
        lebel="User Name"
        v-model="form.name"
        placeholder="Enter User Name"
        min-length="3"
        ref="name"
        required="true"
      ></text-input>
      <br />
      <text-input
        lebel="Phone Number"
        v-model="form.number"
        placeholder="Enter Contact Number"
        min-length="3"
        ref="number"
        required="true"
      ></text-input>
      <br />
      <label>Select Current Address</label>
      <div class="aflex">
        <select-input
          label="Select Districts"
          v-model="form.selectedDistrict"
          :options="districts"
          ref="selectDistricts"
        ></select-input>

        <select-input
          label="Select Upozila"
          v-model="form.selectedUpozila"
          :options="upozilaNameHandeler"
          ref="selectUpozila"
        ></select-input>
      </div>
      <br />
      <label>Select Blood Group</label>
      <select-input
        label="Blood Group"
        v-model="form.blool"
        :options="blood"
        ref="blood"
      ></select-input>
      <br /><br />
      <text-input
        type="password"
        lebel="Password"
        v-model="form.password"
        placeholder="Enter  Password"
        min-length="6"
        ref="pass"
        required="true"
      ></text-input>
      <br />
      <text-input
        type="password"
        lebel="Re-type Password"
        v-model="form.rePassword"
        placeholder="Enter Re-type Password"
        min-length="6"
        ref="repass"
        required="true"
        :reTypeWith="form.password"
      ></text-input>
      <br />
      <div id="recaptcha"></div>
      <br />
      <my-button
        @click="registrationSubmit"
        color="blue"
        class="text-center"
        text="Registration"
      ></my-button>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/fire";
import { districts } from "../store/data/disrict";
import { upozila } from "../store/data/upozila";
import { blood } from "../store/data/blood";
export default {
  data: () => ({
    form: {
      name: "",
      number: "",
      selectedDistrict: "",
      selectedUpozila: "",
      blood: "",
      password: "",
      rePassword: "",
      userId: "",
      profileImg: ""
    },
    districts,
    upozila,
    blood,
    showDismissibleAlert: false,
    errorMessageAlert: ""
  }),
  computed: {
    upozilaNameHandeler() {
      return this.upozila.filter(
        p => p.district_id == this.form.selectedDistrict
      );
    }
  },
  methods: {
    async registrationSubmit() {
      if (this.$refs.name.errorMessage) {
        this.$refs.name.errorShowHandelar();
        return;
      } else if (this.$refs.number.errorMessage) {
        this.$refs.number.errorShowHandelar();
        return;
      } else if (this.$refs.selectDistricts.selectErrorHandelar) {
        this.$refs.selectDistricts.selectHandel();
        return;
      } else if (this.$refs.selectUpozila.selectErrorHandelar) {
        this.$refs.selectUpozila.selectHandel();
        return;
      } else if (this.$refs.blood.selectErrorHandelar) {
        this.$refs.blood.selectHandel();
        return;
      } else if (this.$refs.pass.errorMessage) {
        this.$refs.pass.errorShowHandelar();
        return;
      } else if (this.$refs.repass.errorMessage) {
        this.$refs.repass.errorShowHandelar();
        return;
      }
      this.$nuxt.$emit("loading", true);
      await firebase
        .database()
        .ref("userInfo")
        .once("value")
        .then(res => {
          const obj = res.val();
          for (let user in obj) {
            if (obj[user].number !== this.form.number) {
              this.registrationSubmits();
            } else {
              this.showDismissibleAlert = true;
              this.errorMessageAlert = "This Number Allready Registraed";
              return;
            }
          }
        });
      this.$nuxt.$emit("loading", false);
    },
    async registrationSubmits() {
      var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      let number = `'+88${this.form.number}'`;
      console.log(number);
      await firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(e => {
          let code = prompt("Enter Otp Number");
          this.$nuxt.$emit("loading", true);
          e.confirm(code)
            .then(res => {
              firebase
                .database()
                .ref("userInfo")
                .push(this.form)
                .then(res => {
                  localStorage.setItem("userkey", res.key);
                  this.$router.push("/profile");
                  $nuxt.$emit("log");
                })
                .catch(err => {
                  this.showDismissibleAlert = true;
                  this.errorMessageAlert = err.message;
                });
              this.$nuxt.$emit("loading", false);
            })
            .catch(err => {
              this.showDismissibleAlert = true;
              this.errorMessageAlert = err.message;
              this.$nuxt.$emit("loading", false);
            });
        })
        .catch(err => {
          this.showDismissibleAlert = true;
          this.errorMessageAlert = err.message;
          recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
          this.$nuxt.$emit("loading", false);
        });
      this.$nuxt.$emit("loading", false);
    }
  }
};
</script>
<style scoped>
.registration {
  height: 87vh;
}
</style>
