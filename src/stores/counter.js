import { defineStore } from 'pinia'
import axios from 'axios'

export const useCustomerStore = defineStore('customer', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      baseURL: 'https://brandedthings.exdrans.xyz/cust',
      token: '',
      dataProduct: [],
      dataDetail: {},
      dataWishlist: [],
      dataQrcode : ''
    }
  },
  actions: {
    async login(email,password){
      try {
        const {data} = await axios({
          url: this.baseURL + '/login',
          method: 'post',
          data: {
            email, password
          }
        })
        this.token = data.token
        localStorage.setItem('access_token', data.token)
        await this.getWishlist()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async fetchProduct(page,priceMin,priceMax, name){
      try {
        let url = this.baseURL + '/products?page=' + page
        if(priceMin > 0){
          url += ('&priceMin=' + priceMin)
        }
        if(priceMax > 0){
          url += ('&priceMax=' + priceMax)
        }
        if(name){
          url += ('&name=' + name)
        }
        const {data} = await axios({
          url: url,
          method: 'get'
        })
        this.dataProduct = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async register(value){
      try {
        const {data} = await axios({
          url: this.baseURL + '/register',
          method: 'post',
          data: value
        })
        Swal.fire({
          title: `${data.email} done create, you can log in`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.$router.push('/login')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
        console.log(error)
      }
    },
    async getProductDetail(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/products/'+ id,
          method: 'get',
        })
        this.dataDetail = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async addWishlist(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/wishlist/' + id,
          method: 'post',
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
        console.log('sukses tambah wishlist')
        await this.getWishlist()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Add Wihslist in successfully'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async getWishlist(){
      try {
        const {data} = await axios({
          url: this.baseURL + '/wishlist',
          method: 'get',
          headers: {access_token: localStorage.getItem('access_token')}
        })
        this.dataWishlist = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async getQrCode(qrCode){
      try {
        const {data} = await axios({
          url: this.baseURL + '/qrcode',
          method: 'post',
          data: {qrCode}
        })
        this.dataQrcode = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async googleLogin(google_token){
      try {
        const {data} = await axios({
          url: this.baseURL + '/google-login',
          method: 'post',
          headers: {google_token}
        })
        localStorage.setItem('access_token',data.token)
        this.$router.push('/')
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async delWihlist(id){
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const {data} = await axios({
              url: this.baseURL + '/wishlist/' + id,
              method: 'delete',
              headers: {access_token: localStorage.getItem('access_token')}
            })
            console.log(data)
            await this.getWishlist()
            Swal.fire(
              'Deleted!',
              data.message,
              'success'
            )
          }
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    }
  }
})