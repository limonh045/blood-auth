<template>
  <div>
    <label> {{ lebel }}</label>
    <input
      :type='type || "text"'
      class="input-value"
      :class="{ invalidinput: errorShow }"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :placeholder="placeholder"
      ref="inputField"
    />
    <p v-if="errorShow" class="error-msg">{{ errorMessage }}</p>
  
  </div>
</template>
<script>
export default {
  props: {
      type:{
          type:String
      },
    lebel: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      required: true
    },
    minLength: {
      type: String
    },
    required: {
      type: String
    },
    reTypeWith:{
        
    }
  },
  data: () => ({
    errorShow: false
  }),
  computed: {
    errorMessage() {
      if (this.required && !this.value) {
        return "this field is required";
      } else if (this.minLength && this.value.length < this.minLength) {
        return `this field must be ${this.minLength} caracter long`;
      } else if( this.reTypeWith && this.reTypeWith != this.value){
         return 're-type password is not match'
      }
      else {
        this.errorShow = false;
      }
    }
  },
  methods: {
    errorShowHandelar() {
      // if (this.errorMessage) {
      //   this.errorShow = true;
      //   this.$refs.inputField.focus();
      // }
          this.errorShow = true;
        this.$refs.inputField.focus();
    }
  }
};
</script>
<style scoped>
.input-value {
  width: 100%;
  border: 1px solid #d2d2d2;
  font-size: 16px;
  padding: 6px;
  border-radius: 5px;
}
.invalidinput {
  border: 1px solid red;
}
.error-msg {
  margin: 4px 0;
  text-transform: capitalize;
  color: red;
}
</style>
