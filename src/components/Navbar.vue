<script>
import { RouterLink} from 'vue-router'
import { mapWritableState } from 'pinia'
import { useCustomerStore } from '../stores/counter'

export default {
    components: {RouterLink},
    data(){
        return {
            userCheck: 0
        }
    },
    methods: {
        logoutHandler(){
            Swal.fire({
            title: 'Are you sure?',
            text: "You won to log out",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
          }).then((result) => {
            if (result.isConfirmed) {
              
                localStorage.removeItem('access_token')
                this.$router.push('/')
                this.userCheck = 0
                this.dataWishlist = []
            }
          })
        }
    },
    created(){
        if(localStorage.access_token){
            this.userCheck = 1
        }
    },
    computed:{
        ...mapWritableState(useCustomerStore,['dataWishlist'])
    }
}
</script>
<template>
    <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            
            <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <RouterLink to="/" class="nav-item nav-link active">Home</RouterLink>
                        </div>
                        <div class="navbar-nav ml-auto py-0" v-if="userCheck == 0">
                            <RouterLink to="/login" class="nav-item nav-link">Login</RouterLink>
                            <RouterLink to="/register" class="nav-item nav-link">Register</RouterLink>
                        </div>
                        <div class="navbar-nav ml-auto py-0" v-else>
                            <a href="" v-on:click.prevent="logoutHandler()" class="nav-item nav-link">Logout</a>
                        </div>
                    </div>
                </nav>
                <div v-if="$route.path == '/'" id="header-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" style="height: 410px;">
                            <img class="img-fluid" src="https://media.suara.com/suara-partners/depok/thumbs/653x367/2022/10/31/1-meski-sepele-namun-luka-yang-didapat-oleh-karakter-one-piece-memiliki-arti-penting.jpeg" alt="Image">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                    <h3 class="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                    <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item" style="height: 410px;">
                            <img class="img-fluid" src="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/05/24/sasuke-and-naruto-138533789.jpeg" alt="Image">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                    <h3 class="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                    <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                        <div class="btn btn-dark" style="width: 45px; height: 45px;">
                            <span class="carousel-control-prev-icon mb-n2"></span>
                        </div>
                    </a>
                    <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                        <div class="btn btn-dark" style="width: 45px; height: 45px;">
                            <span class="carousel-control-next-icon mb-n2"></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>