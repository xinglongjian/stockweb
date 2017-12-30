<template>
    <div>
        <Row style="margin-bottom:10px">
            <Col span="12" style="padding-right:10px">
                <span></span>
                <Input v-model="code" placeholder="请输入..." style="width: 120px"></Input>
            </Col>
            <Col span="12" style="padding-right:10px">
                <Button type="primary" @click="toQuery">调用</Button>
            </Col>
        </Row>
        <Table border :context="self" :columns="SchedulerColumns" :data="SchedulerData"></Table>
    </div>
</template>
<script>
    import {getSchedulerInfos,pauseJob,resumeJob,runJob,getJobs,getJob} from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                SchedulerColumns: [
                    {
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '代码',
                        key: 'code',
                    },
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center'
                    },
                    {
                        title: '开盘价',
                        key: 'open',
                        align: 'center'
                    },
                    {
                        title: '最高价',
                        key: 'high',
                        align: 'center'
                    },
                    {
                        title: '收盘价',
                        key: 'close',
                        align: 'center'
                    },
                    {
                        title: '最低价',
                        key: 'low',
                        align: 'center'
                    },
                    {
                        title: '成交量',
                        key: 'volume',
                        align: 'center'
                    },
                    {
                        title: '价格变动',
                        key: 'price_change',
                        align: 'center'
                    },
                    {
                        title: '换手率',
                        key: 'turnover',
                        align: 'center'
                    }
                ],
                SchedulerData: []
            }
        },
        methods: {
            mockTableData() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    topn: this.topn,
                    code: this.code
                };
                this.$Loading.start();
                getHistDataDay(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.histDayData = res.data.items;
                });
            },
            changePage(row) {
                this.page = row;
                this.mockTableData();
            },
            pageSizeChange(row) {
                console.log(row);
                this.pageSize = row;
                this.mockTableData();
            },
            toQuery() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    topn:this.topn,
                    code: this.code
                };
                this.$Loading.start();
                getHistDataDay(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.histDayData = res.data.items;
                });
            }
        },
        mounted() {
             this.mockTableData();
        }
    }
</script>
