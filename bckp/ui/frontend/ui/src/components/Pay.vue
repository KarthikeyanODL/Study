<template>
  <div class="container">
    <!--
    <p>Welcome to {{this.$parent.storename}}</p>
    -->
    <p>{{msg}}</p>
    <form v-on:submit="pay">
      <div class="form-group">
        <!--
        <label for="exampleInputPassword1">Password</label>
        -->
        <input type="price" class="form-control" name="price" placeholder="Price" />
      </div>
      <button type="submit" class="btn btn-primary">Pay</button>
</form>
      <!--
      <p>
        Price:
        <input type="price" name="price" />
      </p>
      <input type="submit" value="Pay" class="btn btn-primary" />
      
     -->
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
export default {
  name: "Pay",
  data() {
    return {
      msg: 'Please input snack price and click "Pay"!'
    };
  },
  methods: {
    logout(){
        // this.$keycloak.logoutFn()
        this.$router.push('/')
   },

    pay(e) {
      e.preventDefault();
      let price = e.target.elements.price.value;

      console.log("-----------------");
      console.log(this.$parent.storeid);
      //pay: function() {
      let currentOjb = this;

      let data = {
        storeid: this.$parent.storeid,
        amount: price,
        // username: this.$keycloak.userName
        username: '71297141'
      };

      axios
        .post("/api/pay", data, { timeout : 20000 })
        .then(function(response) {
          //this.msg = response;
          currentOjb.msg = "Success. Thank you!";
          //currentOjb.msg = response.data;
          console.log(currentOjb);
        })
        .catch(errors => {
          console.log(errors);
          currentOjb.msg = "Failed. Sorry, something is wrong..";
          console.log(currentOjb);
        });
      currentOjb.msg = "Requesting...";
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

