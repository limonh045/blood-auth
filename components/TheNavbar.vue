<template>
  <div class="sticky-top bg-danger top-navbar">
    <div class="container">
      <div class="main-logo d-inline-block" >Blood Doner BD</div>
      <div class="d-inline float-right" @click="$emit('expandToggleHandle')">
        <!-- <button class="navbar-expand__btn d-none  d-md-block"  >
          <fa-icon icon="bars" class="navbar-expand__btn--icon"></fa-icon>
        </button> -->
        <button 
          class="navbar-expand__btn--humberger "
          :class="{ change: expandMenu }"
        >
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:['expandMenu'],
  data: () => ({
   
  })
};
</script>
<style>
.top-navbar {
  height: 60px;
}
.navbar-expand__btn ,.navbar-expand__btn--humberger{
  width: 46px;
  padding: 2px 7px;
  margin-top: 6px;
  border: 1px solid green;
  background: transparent;
  border-radius: 5px;
}

.bar1,
.bar2,
.bar3 {
  width: 30px;
    height: 3px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

@media screen and (max-width:776px){
  .change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-6px, 6px);
  transform: rotate(-45deg) translate(-6px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-6px, -8px);
  transform: rotate(45deg) translate(-6px, -8px);
} 
}
</style>
