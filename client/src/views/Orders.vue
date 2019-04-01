<template>
  <div class="container">
    <div v-for="(orderStatus, i) in orders" :key="i" class="order-col">
      <h2>{{ orderStatus[0].status }}</h2>
      <ul class="order-list">
        <li class="order" :class="order.status" v-for="(order, i) in orderStatus" :key="i">{{ order.id }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://localhost:8080', {
  format: 'json',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

export default {
  name: 'Orders',
  data () {
    return {
      orders: null
    }
  },
  methods: {
    initWs () {
      this.$options.sockets.onmessage = ({ data }) => {
        data = JSON.parse(data)

        let orders = data.orders.reduce((acc, order) => {
          acc[order.status] = acc[order.status] || []
          acc[order.status].push(order)

          return acc
        }, {})

        this.orders = Object.values(orders)
      }
    },
  },
  created () {
    this.initWs()
  }
}
</script>

<style lang="css">
  .container {
    display: flex;
  }
  .order-col {
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
  }
  h2 {
    color: #fff;
    margin-bottom: 15px;
  }
  .order-list {
    display: flex;
    height: 500px;
    flex-flow: column wrap;
    align-content: flex-start;
  }
  .order {
    /* flex: 1 1 1 1; */
    padding: .5em 0;
    width: 4em;
    /* flex-basis: 1; */
    margin-right: 10px;
    text-align: center;
    margin-bottom: 5px;
    font-size: 24px;
  }
  .order.none {
    background-color: #fff;
    color: #666;
  }
  .order.pending {
    background-color: #ddd;
    color: #000;
  }
  .order.ready {
    background-color: #92ffcb;
    color: #000;
  }
</style>