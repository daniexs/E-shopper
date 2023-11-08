<script>
import { useCustomerStore } from '../stores/counter'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
export default {
  data(){
    return {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(useCustomerStore,['register']),
    async postRegister(){
      const value = {email: this.email, password: this.password, username: this.username,
        phoneNumber: this.phoneNumber, address: this.address}
      await this.register(value)
    },
    
    test(){
      console.log(this.token)
    }

  },
  computed: {
    ...mapState(useCustomerStore, ['token']),
  }

}
</script>
<template>
    <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2" style="background-image: url('https://lh3.google.com/u/0/d/1lsQrjDuq95ogy_Wg-bo7Fc5mHhx6HpN-=w2128-h1532-iv1');"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7">
            <h3>Register to <strong>Colorlib</strong></h3>
            <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
            <form action="" v-on:submit.prevent="postRegister">
              <div class="form-group first">
                <label for="username">Username</label>
                <input type="text" class="form-control" placeholder="your username"  v-model="username">
              </div>
              <div class="form-group first">
                <label for="username">Email</label>
                <input type="email" class="form-control" placeholder="your-email@gmail.com" v-model="email">
              </div>
              <div class="form-group first">
                <label for="username">Phone Number</label>
                <input type="number" class="form-control" placeholder="your phone number"  v-model="phoneNumber">
              </div>
              <div class="form-group first">
                <label for="username">Address</label>
                <input type="text" class="form-control" placeholder="your addres"  v-model="address">
              </div>
              <div class="form-group last mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Your Password"  v-model="password">
              </div>
              <input type="submit" value="Register" class="btn btn-block btn-primary">

            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>