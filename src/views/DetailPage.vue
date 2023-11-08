<script>
import { mapActions,mapState } from 'pinia'
import {useCustomerStore} from '../stores/counter'
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'
import { RouterLink } from 'vue-router'
export default {
    components:{
        Header,Navbar
    },
    methods: {
        ...mapActions(useCustomerStore,['getProductDetail','addWishlist','getQrCode']),
        async addWishlistProduct(id){
            if(localStorage.access_token){
                await this.addWishlist(id)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please login first'
                })
            }
        },
        async QrCodeHandler(){
            await this.getQrCode(window.location.href)
        }
    },
    computed: {
        ...mapState(useCustomerStore,['dataDetail', 'dataQrcode']),
        convertCur(){
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(this.dataDetail.price)
        }
    },
    created() {
        this.getProductDetail(this.$route.params.id)
        this.QrCodeHandler()
    }
}
</script>

<template>
    <Header/>
    <Navbar/>
    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
            <div class="d-inline-flex">
                <p class="m-0"><RouterLink to="/">Home</RouterLink></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shop Detail</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->


    <!-- Shop Detail Start -->
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner border">
                        <div class="carousel-item active">
                            <img class="w-100 h-100" :src="dataDetail.imgUrl" alt="Image">
                        </div>
                        <div class="carousel-item">
                            <img class="w-100 h-100" :src="dataDetail.imgUrl" alt="Image">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i class="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i class="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div class="col-lg-7 pb-5">
                <h3 class="font-weight-semi-bold">{{ dataDetail.name }}</h3>
                <div class="d-flex mb-3">
                    <div class="text-primary mr-2">
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star-half-alt"></small>
                        <small class="far fa-star"></small>
                    </div>
                    <small class="pt-1">(50 Reviews)</small>
                </div>
                <h3 class="font-weight-semi-bold mb-4">{{ convertCur }}</h3>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Stock:</p>
                    <p class="text-dark font-weight-medium mb-0 mr-3">{{ dataDetail.stock }}</p>
                </div>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Category:</p>
                    <p class="text-dark font-weight-medium mb-0 mr-3">{{ dataDetail.Category.name }}</p>
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                    <button class="btn btn-primary px-3" v-on:click="addWishlistProduct(dataDetail.id)" ><i class="fas fa-heart text-primary"></i> Add To Wishlist</button>
                </div>
                <div v-html="dataQrcode.data" style="width: 11rem; height: 11rem;"></div>
            </div>
        </div>
        <div class="row px-xl-5">
            <div class="col">
                <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                    
                    <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-2">Description</a>
                   
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Product Description</h4>
                        <p>{{ dataDetail.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Shop Detail End -->
</template>