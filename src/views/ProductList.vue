<script>
import { RouterLink,RouterView } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import {mapState, mapActions} from 'pinia'
import { useCustomerStore } from '../stores/counter'

export default {
    data(){
        return {
            page: 1,
            priceMin: 0,
            priceMax: 0,
            name: ''
        }
    },
    components: {
        ProductCard
    },
    methods: {
        ...mapActions(useCustomerStore,['fetchProduct']),
        plusPgae(value){
            if(value == '+'){
                if(this.dataProduct.length == 9){
                    this.page += 1
                }
            }else if(value == '-'){
                if(this.page = 1){ 
                }else{
                    this.page -= 1
                }
            }
            this.fetchProduct(this.page,this.priceMin,this.priceMax, this.name)
        },

    },
    computed: {
        ...mapState(useCustomerStore,['dataProduct'])
    },
    created(){
        this.fetchProduct(1)
    }
}
</script>
<template>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <!-- Shop Sidebar Start -->
            <div class="col-lg-3 col-md-12">
                <!-- Price Start -->
                <div class="border-bottom mb-4 pb-4">
                    <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
                    <form v-on:submit.prevent="plusPgae()">
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <label>Min Price</label>
                            <input type="number" class="form-control" placeholder="Min Price" v-model="priceMin">
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <label>Max Price</label>
                            <input type="number" class="form-control" placeholder="Max Price" v-model="priceMax">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <!-- Price End -->
            </div>
            <!-- Shop Sidebar End -->


            <!-- Shop Product Start -->
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name" v-model="name">
                                    <div class="input-group-append">
                                        <a href="" type="submit" v-on:click.prevent="plusPgae()" class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ProductCard v-for="(el, index) in dataProduct" :key="el.id" :dataEl="el"/>
                    <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center mb-3">
                            <li class="page-item">
                              <a class="page-link" href="" aria-label="Previous" v-on:click.prevent="plusPgae('-')">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                            
                            <li class="page-item">
                              <a class="page-link" href="" aria-label="Next" v-on:click.prevent="plusPgae('+')">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
</template>