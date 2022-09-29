<template>
  <rs-layout>
    <div class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center text-center">
        <div class="flex items-center gap-x-2 ">
           <router-link
            class="flex items-center justify-center"
            :to="{ name: 'orderLogin', params: { branchID: this.branch } }"
          >
            <vue-feather class="text-white" type="chevron-left"></vue-feather>
          </router-link>
          <p class="font-semibold text-white text-lg">Register Member</p>
        </div>
      </div>
    </div>
    <div class="p-3">
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
      >
        <hr />
        <FormKit
          type="text"
          name="name"
          label="Full Name"
          validation="required"
          v-model="fullname"
        />
        <FormKit
          type="text"
          name="email"
          label="Email"
          validation="required|email"
          v-model="email"
        />
        <FormKit type="number" label="Phone number" v-model="phone" />
        <div class="double">
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            v-model="password"
            
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            validation="required|confirm"
            
          />
        </div>
        <hr class="my-3" />
        <rs-button class="bg-heandshe w-full" @click="registerMmbership()">Register</rs-button>
        <hr class="my-2" />
        <p class="text-center">
          Already a member?<router-link :to="{ name: 'orderLogin' }">
            <a
              href="#"
              class="
                underline
                text-blue-600
                hover:text-blue-800
                visited:text-purple-600
              "
            >
              Log in</a
            ></router-link
          >
        </p>
      </FormKit>
    </div>
  </rs-layout>
</template>

<script>
import RsButton from "@/components/Button.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    RsButton,
  },
  setup() {
    const route = useRoute();
    const orders = ref([]);
    const branch = ref(route.params.branchID);
    return {
      orders,
      branch,
    };
  },
  data() {
    return {
      fullname: "",
      email: "",
      phone: "",
      password: "",
    };
  },
  async created() {
    localStorage.branch = this.$route.params.branchID;
  },
  methods: {
    async registerMmbership(){
      var axios = require("axios");
      var data = JSON.stringify({
        full_name: this.fullname,
        email: this.email,
        phone: this.phone,
        password: this.password,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL+"tbl/insertMember",  /* http://localhost:3000tbl/getOrderConfirm */
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
           
            if(response.data.status == 200)
            {
              alert("Register Successfully")

            }
            else{
              alert("Failed! Please contact the admin for help")
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

<style lang="scss" scoped>
</style>
