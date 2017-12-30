<template>
    <div>
        <Row style="margin-bottom:10px">
            <Col span="12" style="padding-right:10px">
                <span>笔数:</span>
                <Select v-model="volume" style="width:120px" placeholder="笔数">
                    <Option value="0">不限制</Option>
                    <Option value="400" selected>大于400</Option>
                    <Option value="500">大于500</Option>
                    <Option value="800">大于800</Option>
                    <Option value="1000">大于1000</Option>
                    <Option value="1500">大于1500</Option>
                    <Option value="2000">大于2000</Option>
                </Select>
                <span>类型:</span>
                <Select v-model="type" style="width:120px" placeholder="类型">
                    <Option value="0">不限制</Option>
                    <Option value="卖盘" selected>卖盘</Option>
                    <Option value="买盘">买盘</Option>
                </Select>
                <span>编码:</span>
                <Input v-model="code" placeholder="请输入..." style="width: 120px"></Input>
            </Col>
            <Col span="12" style="padding-right:10px">
                <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>
        <Table border :context="self" :columns="histDataColumns" :data="tickHistData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" @on-change="changePage" @on-page-size-change="pageSizeChange" placement="top" :page-size="pageSize" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import {getTickHistData} from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                total: 0,
                page: 1,
                pageSize:30,
                volume:'',
                type:'',
                code:'',
                histDataColumns: [
                    {
                        type: 'index',
                        width: 60,
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
                        title: '时间',
                        key: 'time',
                        align: 'center'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '价格变动',
                        key: 'change',
                        align: 'center'
                    },
                    {
                        title: '成交量',
                        key: 'volume',
                        align: 'center'
                    },
                    {
                        title: '成交金额（万）',
                        key: 'amount',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align: 'center'
                    }
                ],
                tickHistData: []
            }
        },
        methods: {
            mockTableData() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    volume: this.volume,
                    type: this.type
                };
                this.$Loading.start();
                getTickHistData(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.tickHistData = res.data.items;
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
                    volume:this.volume,
                    type:this.type,
                    code: this.code
                };
                this.$Loading.start();
                getTickHistData(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.tickHistData = res.data.items;
                });
            }
        },
        mounted() {
             this.mockTableData();
        }
    }
</script>
