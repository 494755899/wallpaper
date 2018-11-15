<template>
  <div class="m-geo">
    <i class="el-icon-location-outline" />{{ $store.state.geos.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [上海 苏北 天津]
  </div>
</template>

<script>
export default {}
</script>
