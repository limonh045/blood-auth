<template>
    <div class="d-inline mx-2">
       <select class="select-input" @input="$emit('input',$event.target.value)" :value='value' ref='selectRef'>
           <option value="">--{{label}}--</option>
           <option v-for='(option,i) in options' :key="i" :value="option.id">{{option.name}}</option>
       </select>
       <p class="error-msg" v-if="selectErrorShow">{{selectErrorHandelar}}</p>
    </div>
</template>
<script>
export default {
    props:{
        options:{
            type:Array
        },
        value:{
            type:String
        },
        label:{
            type:String
        },
       
    },
    data:()=>({
        selectErrorShow:false
    }),
     computed:{
         selectErrorHandelar(){
             if (!this.value) {
                 return 'This Field Must Be Required';
             }else{
                  this.selectErrorShow=false
             }
         }
     },
     methods:{
         selectHandel(){
             if (this.selectErrorHandelar) {
                 this.selectErrorShow=true
                  this.$refs.selectRef.focus();
             }
            
         }
     }
}
</script>
<style scoped>
.select-input{
       
    font-size: 16px;
    text-transform: capitalize;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 8px 0;
    display: inline-block;
    box-sizing: border-box;
 
}
.select-input:focus{
    outline: none;
}
.error-msg {
  margin: 0px 0;
  text-transform: capitalize;
  color: red;
}
</style>