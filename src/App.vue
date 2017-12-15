<template>
  <div id="app">
    <div class="menuleft">
        <menulist></menulist>
    </div><div class="main">
        <div class="mainbox">
            <div class="maintop"></div>
            <router-view/>
        </div>
    </div>
    <Row type="flex">
        <div style="width:140px;">
            
        </div>
        <!--<Col span="3" class="layout-menu-left">
            <menulist></menulist>
        </Col>
        <Col span="21">
            <div class="layout-header"></div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                    <BreadcrumbItem>iView</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view/>
                </div>
            </div>
            <div class="layout-copy">
                2011-2016 &copy; TalkingData
            </div>
        </Col>-->
    </Row>
  </div>
</template>

<script>
import menulist from '@/components/menulist'
export default {
  name: 'app',
  data () {
      return {
      }
  },
  mounted () {
      
  },
  components: {
    menulist
  }
}
</script>
<style>
    @import './base.css';
</style>

