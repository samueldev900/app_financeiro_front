<template>
  <Header></Header>  
    <Card></Card>  

  <Footer></Footer>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";

export default {
  data: () => ({
    value: 0,
  }),
  components: {
    Header,
    Footer,
    Card
  }
};
</script>