<script>
import ProductCard from '../components/ProductCard.vue'
import { mapActions,mapState } from 'pinia'
import {useCustomerStore} from '../stores/counter'
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'
export default {
    components:{ProductCard,Header,Navbar},
    methods: {
        ...mapActions(useCustomerStore, ['getWishlist'])
    },
    computed:{
        ...mapState(useCustomerStore, ['dataWishlist'])
    },
    created(){
        this.getWishlist()
    }
}
</script>
<template>
    <Header/>
    <Navbar/>
    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Wishlist</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shopping Cart</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->


    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-12 col-md-9">
                <div class="row pb-3">
                    <ProductCard v-for="(el, index) in dataWishlist" :key="el.id" :dataEl="el.Product" :idWish="el.id" />
                </div>
            </div>
        </div>
    </div>
</template>