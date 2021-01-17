<template>
  <div>
    <div v-if="loginAccess" class="my-profile mx-2 mt-3">
      <nuxt-link class="profile-link" to="/profile"
        ><div class="aflex">
          <b-avatar text="BV" size="4rem"></b-avatar>
          <div class="profile-info ml-2">
            <div class="profile-info__name">{{ userInfo.name }}</div>
            <div class="profile-info__blood--group">
              Blood Group {{ userInfo.bloodname }}
            </div>
          </div>
        </div></nuxt-link
      >
      <hr />
    </div>

    <nuxt-link to="/" class="menu-link">
      <fa-icon icon="home"></fa-icon> home
    </nuxt-link>
    <nuxt-link to="/find" class="menu-link">
      <fa-icon icon="home"></fa-icon> find blood
    </nuxt-link>
    <nuxt-link to="/ins" class="menu-link">
      <fa-icon icon="home"></fa-icon> instruction
    </nuxt-link>
    <div v-if="!loginAccess">
      <nuxt-link to="/registration" class="menu-link">
        <fa-icon icon="home"></fa-icon> registration
      </nuxt-link>
      <nuxt-link to="/login" class="menu-link">
        <fa-icon icon="home"></fa-icon> login
      </nuxt-link>
    </div>
    <div v-if="loginAccess">
      <hr />
      <button class="logout-btn" @click="loginAccessHandelar()">
        <fa-icon icon="home"></fa-icon> Log Out
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loginAccess: false
  }),
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.log();
  },
  created() {
    this.$nuxt.$on("log", () => {
      this.log();
    });
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    loginAccessHandelar() {
      localStorage.removeItem("userkey");
      this.loginAccess = false;
      this.$router.push("/login");
    },
    log() {
      var userKey = localStorage.getItem("userkey");
      console.log(userKey);
      if (userKey) {
        this.loginAccess = true;
      } else {
        this.loginAccess = false;
      }
    }
  }
};
</script>
<style scoped>
.profile-info__name {
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 700;
}
.profile-info__blood--group {
  font-size: 14px;
}
/* .menu-list{
    width: 250px;
    background: red;
    margin-top: 5px;
    padding: 10px 0;
} */
.profile-link {
  color: black !important;
  text-decoration: none !important;
}
.menu-link {
  text-decoration: none;
  font-size: 14px;
  color: black;
  display: block;
  margin-top: 3px;
  padding: 10px 0;
  transition: 300ms;
  text-transform: capitalize;
}
.menu-link svg,
.logout-btn svg {
  width: 19px;
  margin: 0 14px;
}
.menu-link:hover,
.logout-btn:hover {
  background: #ebebeb;
}
.nuxt-link-exact-active {
  color: #c0392b;
  font-weight: 700;
}
.logout-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 0;
  background: #ffffff;
  font-size: 14px;
  transition: 300ms;
}
</style>
