<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data: function() {
    return{};
  },
  methods:{
    LoadProducts (){
      this.$contentful
        .getEntries({content_type: 'product'})
        .then(res=>{
            this.$content.products = res.items;
            if(this.$content.technologies !== null && this.$content.products !== null){
              this.$router.push({path: 'wait'});
            }
        })
        .catch(()=>{});
    },
    LoadTechnologies(){
      this.$contentful
        .getEntries({content_type: 'technology'})
        .then(res=>{
            this.$content.technologies = res.items;
            if(this.$content.technologies !== null && this.$content.products !== null){
              this.$router.push({path: 'wait'});
            }
        })
        .catch(()=>{});
    }
  },
  mounted: function(){
    if(this.$content.technologies !== null && this.$content.products !== null){
      this.$router.push({path: 'wait'});
    }else{
      if(this.$content.technologies == null){
        this.LoadTechnologies();
      }
      if(this.$content.products == null){
        this.LoadProducts();
      }
    }
  }
};
</script>

<style scoped>
  
</style>

