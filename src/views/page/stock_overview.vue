<style scoped>
.echarts {
  margin-left: 20px;
}
.echarts-item {
    float: left;
    width: 500px;
    height: 450px;
}
</style>

<template>
    <div>
        <Row style="margin-bottom:10px">
            <Col span="4" style="padding-right:10px">
                <span>编码:</span>
                <Input v-model="codeQuery" placeholder="请输入..." style="width: 120px"></Input>
            </Col>
            <Col span="6" style="padding-right:10px">
            <span>开始时间:</span>
            <Date-picker type="date" :value="startDateQuery" @on-change="handleStartChange" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
            <Col span="6" style="padding-right:10px">
            <span>结束时间:</span>
            <Date-picker type="date" :value="endDateQuery" @on-change="handleEndChange" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
            <Col span="6" style="padding-right:10px">
            <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>
        <Row style="margin-bottom:10px">
            <Col span="4" style="padding-right:10px">
            <span>编码:{{code}}</span>
            </Col>
            <Col span="4" style="padding-right:10px">
            <span>名称:{{name}}</span>
            </Col>
            <Col span="4" style="padding-right:10px">
            <span>行业:{{industry}}</span>
            </Col>
            <Col span="4" style="padding-right:10px">
            <span>区域:{{area}}</span>
            </Col>
            <Col span="4" style="padding-right:10px">
            <span>上市日期:{{timeToMarket}}</span>
            </Col>
        </Row>
        <div class="echarts">
            <div class="echarts-item">
                <IEcharts :option="stockBasicChart"></IEcharts>
            </div>
            <div class="echarts-item">
                <IEcharts :option="histDataDayChart"></IEcharts>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getStockByCode,
        getStockBasicByCode,
        getTickHistData,
        getHistDataDayByCode,
        getProfitData
    } from '../../api/api';

    import {createHistDataDayChart} from '../../libs/charts/histDataDayChart'
    import {createStockBasicChart} from '../../libs/charts/stockBasicChart'
//    import IEcharts from 'vue-echarts-v3';
    import IEcharts from 'vue-echarts-v3/src/lite.vue';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/chart/bar';
//    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/candlestick';
    ;
    export default {
        name:'view',
        components: {
            IEcharts
        },
        data(){
            return {
                codeQuery:'',
                startDateQuery:'',
                endDateQuery:'',
                code:'',
                name:'',
                industry:'',
                area:'',
                timeToMarket:'',
                stockBasicChart: {},
                histDataDayChart:{}
                /**
                 bar: {
                title: {
                    text: '柱状图'
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20]
                }]
            },
                 pieww: {

                title: {
                    text: '饼状图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                },
                series: [{
                    name: '销量',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [{
                        value: 335,
                        name: '衬衫'
                    }, {
                        value: 310,
                        name: '羊毛衫'
                    }, {
                        value: 234,
                        name: '雪纺衫'
                    }, {
                        value: 135,
                        name: '裤子'
                    }, {
                        value: 548,
                        name: '高跟鞋'
                    }],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }*/
            }
        },
        methods: {
            handleStartChange(date){
                this.startDateQuery = date;
            },
            handleEndChange(date){
                this.endDateQuery = date;
            },
            toQuery() {
                if (this.codeQuery == null||this.codeQuery == '') {
                    this.$Message.info('code必填')
                    return;
                }
                let para = {
                    code: this.codeQuery,
                    stDate: this.startDateQuery,
                    etDate:this.endDateQuery
                };
                this.$Loading.start();
                getStockByCode(para).then((res) => {
                    this.$Loading.finish();
                    this.code = res.data.code;
                    this.name = res.data.name;
                    this.industry = res.data.industry;
                    this.area = res.data.area;
                    this.timeToMarket =res.data.time_to_market;
                });
                this.$Loading.start();
                getStockBasicByCode(para).then((res) => {
                    this.$Loading.finish();
                    this.stockBasicChart = createStockBasicChart(res);
                });
                this.$Loading.start();
                getHistDataDayByCode(para).then((res)=>{
                    this.$Loading.finish();
                    this.histDataDayChart = createHistDataDayChart(res);
                });
            }
        }
    }
</script>
