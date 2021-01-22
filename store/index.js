import firebase from "../plugins/fire";
import { blood } from "./data/blood";
import { upozila } from "./data/upozila";
import { districts } from "./data/disrict";

const state = {
  userInfo: {}
};
const mutations = {
  getUserInfo(state, payload) {
    state.userInfo = payload;
  }
};
const actions = {
  async getUserInfo(b) {
    var userKey = localStorage.getItem("userkey");
 
    $nuxt.$emit("loading", true);
    await firebase
      .database()
      .ref("userInfo")
      .once("value", user => {
        user.forEach(element => {
            

          if (element.key == userKey) {
            b.commit("getUserInfo", {
              name: element.val().name,
              number: element.val().number,
              profilePic:element.val().profileImg,
              upozilas: upozila.find(e => e.id == element.val().selectedUpozila)
                .name,
              zila: districts.find(e => e.id == element.val().selectedDistrict)
                .name,
              bloodname: blood.find(e => e.id == element.val().blool).name
            });
            $nuxt.$emit("loading", false);
          }
        });
      });
      $nuxt.$emit("loading", false);
  }
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
