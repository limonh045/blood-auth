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
    var bloodname = "";
    var upozilas = "";
    var zila = "";
    $nuxt.$emit("loading", true);
    await firebase
      .database()
      .ref("userInfo")
      .once("value", user => {
        user.forEach(element => {
            

          if (element.key == userKey) {
            blood.forEach(e => {
              if (e.id == element.val().blool) {
                bloodname = e.name;
              }
            });
            upozila.forEach(e => {
              if (e.id == element.val().selectedUpozila) {
                upozilas = e.name;
              }
            });

            districts.forEach(e => {
              if (e.id == element.val().selectedDistrict) {
                zila = e.name;
              }
            });
            b.commit("getUserInfo", {
              name: element.val().name,
              number: element.val().number,
              profilePic:element.val().profileImg,
              upozilas,
              zila,
              bloodname
            });
            $nuxt.$emit("loading", false);
          }
        });
      });
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
