<template>
  <div class="order-customer">
    <div
      style="
        height: 56vh;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
      "
      class="bg-heandshe after:content-['']"
    >
      <div class="flex justify-between items-center p-2"></div>
      <div
        style="height: 40vh"
        class="flex flex-col justify-center items-center"
      >
        <div class="w-70 bg-black rounded-full">
          <img
            class="object-scale-down"
            src="@/assets/images/logo/heandshe.jpg"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="m-8">
      <div>
        <form-kit
          type="text"
          placeholder="Enter your username"
          validation="required"
          :validation-messages="{
            required: 'Please enter a valid username',
          }"
          v-model="username"
        />
        <form-kit
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <rs-button class="w-full bg-heandshe hover:bg-heandshe" @click="login()"
          >Login</rs-button
        >
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import RsModal from "@/components/Modal.vue";
import RsButton from "@/components/Button.vue";

import { Navigation, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  name: "TableOrder",
  components: {
    RsModal,
    RsButton,
    Swiper,
    axios,
    SwiperSlide,
  },
  setup(props) {
    const route = useRoute();
    const login = ref({
      username: "",
      password: "",
    });

    return {
      login,
      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
  },

  //TEST FARIS//
  data() {
    return {
      username: "",
      password: "",
    };
  },
  async created() {
    window.onbeforeunload = function () {
      localStorage.clear();
    };
  },

  methods: {
    async login() {
      var axios = require("axios");
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/login" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.message == "Success") {
              this.$router.push({
                name: "dashboard",
                params: { staffid: response.data.data },
              });
            } else {
              alert("No Staff was found with the credentials");
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.swiper {
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px 0 rgb(253 186 116 / 50%);
}
.triangle {
  width: 0;
  height: 0;
  border: 3px solid transparent;
  border-left: 0;
  border-right: 10px solid white;
}
</style>
