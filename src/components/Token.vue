<template>
  <div id="token">
  </div>
</template>

<script>
export default {
  name: 'Token',
  mounted () {
    console.log(this.$route.query.token)
    localStorage.setItem('token', this.$route.query.token)
    this.$router.replace('/mall/goods')
  }
}
</script>

<style>
</style>
