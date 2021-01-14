<template>
  <div>
    <button
      class="my-button"
      :class="{
        btnred: color === 'danger',
        btngreen: color === 'green',
        btnblue: color === 'blue'
      }"
      @click="$emit('click')"
    >
      {{ text }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String
    },
    color: {
      type: String
    }
  }
};
</script>
<style scoped>
.my-button {
  text-transform: capitalize;
  width: 9rem;
  padding: 8px 0;
  font-size: 15px;
  transition: 300ms;
}
.btnred {
  color: #e74c3c;
}
.btngreen {
}
.btnblue {
  background: #3498db;
  color: white;
}
.btnblue:hover {
  background: #2980b9;
}
</style>
