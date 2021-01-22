<template>
  <div class="">
    <div class="container">
      <div class="aflex home-search">
        <div class="m-auto">
          <h1 class="text-center">Find Blood What You Want</h1>
          <div class="ajustify-center">
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
              v-model="form.blool"
              :options="blood"
              ref="blood"
            ></select-input>
          </div>
          <nuxt-link
            class="search-blood"
            @click="findDonarHandelar"
            :to="`/${form.selectedUpozila}/${form.blool}`"
            >Search Blood</nuxt-link
          >
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
    districts,
    upozila,
    blood,
    form: {
      selectedDistrict: "",
      selectedUpozila: "",
      blood: ""
    }
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
.home-search {
  height: 87vh;
}
.search-blood {
  font-size: 16px;
  background: #ccc;
  padding: 10px;
  color: black;
  border-radius: 5px;
  display: block;
  margin: auto;
  width: 145px;
  text-align: center;
}
.search-blood:hover {
  color: black;
  text-decoration: none;
}
</style>
