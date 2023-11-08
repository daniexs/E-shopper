<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'
import ProductList from './ProductList.vue'
export default {
    components: { RouterLink, RouterView, Header, Navbar, ProductList }
}
</script>

<template>
    <Header/>
    <!-- Navbar Start -->
    <Navbar/>
    <!-- Navbar End -->
    <ProductList/>
    <!-- Shop End -->
    
</template>