<template>
    <div class="header">
        <h1>{{header}}</h1>
        <hr>
        <div>
            <span><router-link to="/home" tag="div" class="continue"><img src="" alt="">HOME</router-link></span>
            <span v-on:click="()=>{this.$router.go(-1);}">ANTERIOR</span>
        </div>
    </div>
</template>

<script>
import {vm} from "../main";
export default {
    name: "Header",
    data() {
        return{header:''}
    },
    created() {
    this.$root.$on('setheader', (message) => {
        this.header = message;
    });
}
}
</script>

<style scoped>

</style>
