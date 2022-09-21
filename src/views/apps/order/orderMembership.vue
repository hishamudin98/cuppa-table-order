<template>
  <rs-layout>
    <div class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center text-center">
        <div class="flex items-center gap-x-2 ">
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
        />
        <FormKit
          type="text"
          name="email"
          label="Email"
          validation="required|email"
        />
        <FormKit type="number" label="Phone number" />
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
        <rs-button class="bg-heandshe w-full">Register</rs-button>
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
import { ref } from "vue";

export default {
  components: {
    RsButton,
  },
  setup() {
    const orders = ref([]);
    return {
      orders,
    };
  },
  data() {
    return {};
  },
  async created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
