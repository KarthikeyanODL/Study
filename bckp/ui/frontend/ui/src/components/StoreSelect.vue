<template>
  <div class="container">
    <p>If you don't have a smartphone, please select store name.</p>
    <p>{{msg}}</p>
    <form v-on:submit="go">
      <div class="form-group">
        <!--
        <label for="exampleInputPassword1">Password</label>
        -->
        <select v-model="selected" name="store">
          <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
        </select>
        <!--
        <input type="price" class="form-control" name="price" placeholder="Price" />
        -->
      </div>
      <button type="submit" class="btn btn-primary">Go</button>
    </form>
    <div class="topcorner">
       <form v-on:submit="logout">
         <button type="submit" class="btn btn-primary">logout</button>
       </form>
   </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import router from "../router";

const DTV5_STORE_ID = "8e1f466e-6d28-4369-b596-65b7167c4815";

export default {
  name: "StoreSelector",
  data() {
    return {
      selected: DTV5_STORE_ID,
      options: [{ text: "DTV5 store", value: DTV5_STORE_ID }]
    };
  },
  methods: {
    go(e) {
      e.preventDefault();
      //    console.log(e.target.elements.store.value);
      this.$parent.$parent.storeid = e.target.elements.store.value;
      this.$parent.$parent.storename = e.target.elements.store.text;

      router.push("/pay");
      //      router.push({ name: 'Pay', params: { storeid: e.target.elements.store.value } });
    },
    
    logout(){        
       // this.$keycloak.logoutFn()
        this.$router.push('/pay')
   }
   
  }
};
</script>

<style scoped>
 .topcorner{
   position:absolute;
   top:0;
   right:0;
  }
</style>
