<template>
  <div>
    <div class="container">
      <div
        class="aspace-around mb-3 donar-found"
        v-for="(blood, i) in searchBlood"
        :key="i"
      >
        <td>
          <span class="donar-name text-capitalize">{{ blood.name }} </span
          ><br />
          <span class="bonar-blood text-info">{{ blood.bloodname }}</span
          ><br />
          <span class="donar-address text-dark"
            >{{ blood.upozilas }},{{ blood.zila }}</span
          >
        </td>
        <td>{{ blood.number }}</td>
        <td>active</td>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "../../plugins/fire";
import { blood } from "../../store/data/blood";
import { upozila } from "../../store/data/upozila";
import { districts } from "../../store/data/disrict";
export default {
  data: () => ({
    searchBlood: [],
    blood,
    upozila,
    districts
  }),
  async mounted() {
    this.$nuxt.$emit("loading", true);
    await firebase
      .database()
      .ref("userInfo")
      .once("value", e => {
        e.forEach(element => {
          if (
            element.val().selectedUpozila ==
              this.$nuxt._route.params._upozila &&
            element.val().blool == this.$nuxt._route.params._blood
          ) {
            this.searchBlood.push({
              name: element.val().name,
              number: element.val().number,
              profilePic: element.val().profileImg,
              upozilas: upozila.find(e => e.id == element.val().selectedUpozila)
                .name,
              zila: districts.find(e => e.id == element.val().selectedDistrict)
                .name,
              bloodname: blood.find(e => e.id == element.val().blool).name
            });
            $nuxt.$emit("loading", false);
          }
        });

        this.$nuxt.$emit("loading", false);
      });
  },
  computed: {}
};
</script>
<style scoped>
td {
  width: 30%;
  text-align: center;
  font-size: 15px;
}
.donar-name {
  color: chocolate;
  font-weight: 700;
}
.donar-found:nth-of-type(odd) {
  background: #fbfbfb;
}
.donar-found:nth-of-type(even) {
  background: #ededed;
}
</style>
