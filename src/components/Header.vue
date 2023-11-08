<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia';
import { useCustomerStore } from '../stores/counter';
export default {
    components: {RouterLink},
    computed: {
        ...mapState(useCustomerStore,['dataWishlist'])
    },
    methods:{
        ...mapActions(useCustomerStore,['getWishlist'])
    },
    created(){
        if(localStorage.access_token){
            this.getWishlist()
        }
    }
}
</script>
<template>
    <div class="container-fluid">
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <RouterLink to="/" class="text-decoration-none">
                    <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                </RouterLink>
            </div>
            <div class="col-lg-6 col-6 text-left">
                
            </div>
            <div class="col-lg-3 col-6 text-right">
                <RouterLink to="/wishlist" class="btn border">
                    <i class="fas fa-heart text-primary"></i>
                    <span class="badge">{{ dataWishlist.length }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>