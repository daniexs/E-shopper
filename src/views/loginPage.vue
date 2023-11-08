<script>
import { useCustomerStore } from '../stores/counter'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Google from '../components/google.vue'

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(useCustomerStore, ['login']),
        async postlogin() {
            console.log(this.email, this.password);
            const data = await this.login(this.email, this.password);
            if (this.token != '') {
                this.$router.push({ name: 'home' });
            }
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['token']),
    },
    components: { Google }
}
</script>
<template>
    <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2" style="background-image: url('https://lh3.google.com/u/0/d/1lsQrjDuq95ogy_Wg-bo7Fc5mHhx6HpN-=w2128-h1532-iv1');"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7">
            <h3>Login to <strong>Colorlib</strong></h3>
            <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
            <form action="#" method="post" v-on:submit.prevent="postlogin">
              <div class="form-group first">
                <label for="username">Email</label>
                <input type="email" class="form-control" placeholder="your-email@gmail.com" id="username" v-model="email">
              </div>
              <div class="form-group last mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Your Password" id="password" v-model="password">
              </div>
              
              <div class="d-flex mb-5 align-items-center">
                <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label>
                <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span> 
              </div>

              <input type="submit" value="Log In" class="btn btn-block btn-primary">
            </form>
            <Google style="display: flex;justify-content: center;margin-top: 2rem;" />
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>