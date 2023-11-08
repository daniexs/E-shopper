<script>
import { mapActions } from 'pinia';
import { useCustomerStore } from '../stores/counter';
export default {
  name: 'LoginPage',
  data() {
    return {
      log: '',
    };
  },
  methods: {
      ...mapActions(useCustomerStore,['googleLogin']),
      callback(response) {
        this.log = response
        this.googleLogin(response.credential)
      }
  },
};
</script>

<template>
  <GoogleLogin :callback="callback" prompt />
</template>