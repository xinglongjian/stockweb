<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 600px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .page-title{
        font-size: 20px;
        line-height: 50px;
        vertical-align: middle;
        display: inline-block;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="setActive" theme="dark" width="auto" @on-select="routeTo">
                    <Menu-item name="stock_basics" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">公司基本面</span>
                    </Menu-item>
                    <Menu-item name="tick_hist_data" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">历史分笔</span>
                    </Menu-item>
                    <Menu-item name="hist_data_day" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">历史行情-每天</span>
                    </Menu-item>
                    <Menu-item name="profit_data" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">分配预案</span>
                    </Menu-item>
                    <Menu-item name="schedulers_hand" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">手动任务</span>
                    </Menu-item>
                    <Menu-item name="schedulers" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">定时任务</span>
                    </Menu-item>
                    <Menu-item name="stock_overview" >
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">个股概览</span>
                    </Menu-item>
                    <Menu-item name="table">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">表格</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <span class="page-title">{{this.$route.name}}</span>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <transition mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 3,
                spanRight: 21,
                page: ['table', 'echarts', 'stock_basics', 'tick_hist_data']
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 3 ? 14 : 24;
            },
            setActive() {
                console.log(this.$route)
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 3) {
                    this.spanLeft = 1;
                    this.spanRight = 23;
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                }
            },
            routeTo(e) {
                //console.log(e);
                this.$router.push(e);
            }
        }
    }
</script>
