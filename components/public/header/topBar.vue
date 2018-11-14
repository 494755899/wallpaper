<template>
  <el-row
    :gutter="0"
    class="m-header-topbar"
  >
    <el-col
      :span="6">
      <geo/>
    </el-col>
    <el-col :span="7">
      <user/>
    </el-col>
    <el-col :span="11">
      <my-nav/>
    </el-col>
  </el-row>
</template>

<script>
import Geo from './geo'
import User from './user'
import MyNav from './nav'
export default {
  components: {
    Geo,
    User,
    MyNav
  }
}
</script>
