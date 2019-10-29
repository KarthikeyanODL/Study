<template>
  <div class="container">
    <p>Scan QR code!</p>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <p class="error">{{ error }}</p>
    <app-store></app-store>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import router from "../router";

import StoreSelect from "./StoreSelect.vue";

export default {
  components: { QrcodeStream, "app-store": StoreSelect },

  data() {
    return {
      //result: '',
      error: ""
    };
  },
  methods: {
    onDecode(result) {
      this.paused = true;
      //this.result = result

      console.log(result);

      this.$parent.storeid = result;

      router.push("/pay");
      //router.push({ name: 'pay', params: { storename: '123' } })
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
