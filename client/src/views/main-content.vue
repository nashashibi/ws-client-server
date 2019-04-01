<template>
    <div class="main-content">
        <orders />
    </div>
</template>

<script>
import Orders from './Orders'

export default {
    name: "main-content",
    data: () => ({
        // reactive data property of the component.
        webpack: 'Powered by webpack!',
    }),
    components: {
        Orders
    }
}
</script>

<style>
    /*
     * Some styles so that our first component
     * looks somewhat special
    */
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .main-content {
        margin: 0 auto;
        font-family: sans-serif;
        background-color: #333;
        padding: 25px;
        width: 100%;
        height: 100%;
        position: absolute
    }
</style>

