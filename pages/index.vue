<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu :menu="menu"/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic/>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/article'
export default {
  async asyncData({ app }) {
    const {
      status,
      data: { result }
    } = await app.$axios('/geos/menu')
    return {
      menu: result[0].menu
    }
  },
  components: {
    Emenu,
    Life,
    Artistic
  },
  data() {
    return {
      menu: []
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
</style>
