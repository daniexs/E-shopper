<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useCustomerStore } from '../stores/counter';
export default {
    props: ['dataEl','idWish'],
    methods:{
        ...mapActions(useCustomerStore,['addWishlist', 'delWihlist']),
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
        async deleteWishlist(id){
            console.log()
            await this.delWihlist(id)
        }
    },
    computed: {
        convertCur(){
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(this.dataEl.price)
        }
    }
}
</script>
<template>
    <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
        <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img class="img-fluid w-100" :src="dataEl.imgUrl" alt="" style="object-fit: cover;object-position: center;max-width: 100% ;height: 15rem;">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 class="text-truncate mb-3">{{ dataEl.name }}</h6>
                <div class="d-flex justify-content-center">
                    <h6>{{ convertCur }}</h6>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
                <RouterLink :to="'/detail/'+ dataEl.id" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</RouterLink>
                <a href="" v-if="$route.path != '/wishlist'" v-on:click.prevent="addWishlistProduct(dataEl.id)" class="btn btn-sm text-dark p-0"><i class="fas fa-heart text-primary"></i>Add To Wishlist</a>
                <button class="btn btn-danger" v-else v-on:click="deleteWishlist(idWish)" >Delete From Wishlist</button>
            </div>
        </div>
    </div>
</template>