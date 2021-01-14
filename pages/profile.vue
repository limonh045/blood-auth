<template>
  <div>
    <div class="container">
      <div class="profile-name  ajustify-center mt-3">
        <div class="profile-img">
          <div>
            <b-avatar
              v-if="userInfo.profilePic !== ''"
              :src="userInfo.profilePic"
              class="d-block m-auto"
              size="6rem"
            ></b-avatar>
            <b-avatar
              v-else-if="profilePic == ''"
              :src="profilePic"
              class="d-block m-auto"
              size="6rem"
            ></b-avatar>
            <b-avatar
              v-else-if="profilePic !== ''"
              :src="userInfo.profilePic"
              class="d-block m-auto"
              size="6rem"
            ></b-avatar>
          </div>

          <div class="">
            <label class="upload-photo mt-3">
              Upload Profile Picture
              <input @change="onFileChange" class="d-none" type="file"
            /></label>
         
          </div>
        </div>
        <div class="profile-user__info ml-3">
          <div class="peofile-user__name text-capitalize">
            {{ userInfo.name }}
          </div>
          <div class="profile-user__blood">
            Blood Group : {{ userInfo.bloodname }}
          </div>
        </div>
      </div>
      <div class="user-info mt-4">
        <p class="text-center custom-font text-uppercase my-2">
          status : active
        </p>
        <h3 class="text-center">Contact Number :{{ userInfo.number }}</h3>
        <h3 class="text-center">
          Address : {{ userInfo.upozilas }},{{ userInfo.zila }}
        </h3>
        <!-- <label for="" class="text-center mt-4">Add Your Last Donate Date</label>
        <div class="last-donate-date ajustify-center ">
          <input type="date" class="" />
          <my-button text="add date" class="mx-2"></my-button>
        </div>
        <div class="last-donate-info mt-3">
          <p class="text-center custom-font">1. 12 - 02 - 2020</p>
          <p class="text-center">1. 12 - 02 - 2020</p>
          <p class="text-center">1. 12 - 02 - 2020</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "../plugins/fire";
export default {
  data: () => ({
    profilePic: ""
  }),

  mounted() {
    this.$store.dispatch("getUserInfo");
    var userKey = localStorage.getItem("userkey");
    if (userKey) {
      return;
    } else {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
   async saveProfile() {
      var userKey = localStorage.getItem("userkey");
       
    await  firebase
        .database()
        .ref("userInfo")
        .child(userKey)
        .update({ profileImg: this.profilePic });
         this.$nuxt.$emit("loading", false);
    },

    onFileChange(e) {
       this.$nuxt.$emit("loading", true);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.filename = files[0].name;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        vm.image = e.target.result;
        this.profilePic = vm.image;
        
        this.saveProfile()
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
<style scoped>
.peofile-user__name {
  font-size: 27px;
  font-weight: 700;
}
.profile-user__blood {
  font-size: 20px;
}
.upload-photo {
  background: #ffff;
  padding: 11px;
  border-radius: 7px;
  font-weight: 500;
}
.last-donate-info p {
}
</style>
