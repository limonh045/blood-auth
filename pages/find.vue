<template>
  <div>
    <div class="container">
      <div class="serach-section ajustify-center bg-dark">
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
        <select-input
          label="Blood Group"
          v-model="form.blood"
          :options="blood"
          ref="blood"
        ></select-input>
        <my-button
          @click="findDonarHandelar"
          class="my-auto"
          text="Find Donar"
        ></my-button>
      </div>
      <br />
      <div class="found-result">
        <div class="aspace-around mb-2">
          <td class="custom-font">Name</td>
          <td class="custom-font">Address</td>
          <td class="custom-font">Status</td>
        </div>
        <div class="aspace-around mb-3 donar-found" v-for="i in 10" :key="i">
          <td>
            <span class="donar-name">Limon hasan </span><br />
            <span class="bonar-blood text-info">AB+</span><br />
            <span class="donar-address text-dark">chatmohor ksdk,pabna</span>
          </td>
          <td>01794831406</td>
          <td>active</td>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { districts } from "../store/data/disrict";
import { upozila } from "../store/data/upozila";
import { blood } from "../store/data/blood";
export default {
  data: () => ({
    form: {
      selectedDistrict: "",
      selectedUpozila: "",
      blood: ""
    },
    districts,
    upozila,
    blood
  }),
  computed: {
    upozilaNameHandeler() {
      return this.upozila.filter(
        p => p.district_id == this.form.selectedDistrict
      );
    }
  },
  methods: {
    findDonarHandelar() {
      if (this.$refs.selectDistricts.selectErrorHandelar) {
        this.$refs.selectDistricts.selectHandel();
        return;
      } else if (this.$refs.selectUpozila.selectErrorHandelar) {
        this.$refs.selectUpozila.selectHandel();
        return;
      } else if (this.$refs.blood.selectErrorHandelar) {
        this.$refs.blood.selectHandel();
        return;
      }
    }
  }
};
</script>
<style>
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
