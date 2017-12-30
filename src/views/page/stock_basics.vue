<template>
    <div>
        <Row style="margin-bottom:10px">
            <Col span="16" style="padding-right:10px">
                <span>市盈率:</span>
                <Select v-model="peSelect" style="width:120px" placeholder="市盈率">
                    <Option value="0">不限制</Option>
                    <Option value="1" selected>大于10小于20</Option>
                    <Option value="2">大于20小于30</Option>
                    <Option value="3">大于30小于40</Option>
                    <Option value="4">大于40小于50</Option>
                    <Option value="5">大于50小于100</Option>
                    <Option value="6">大于100</Option>
                </Select>
                <span>市净率:</span>
                <Select v-model="pbSelect" style="width:120px" placeholder="市净率">
                    <Option value="0">不限制</Option>
                    <Option value="1" selected>大于1小于2</Option>
                    <Option value="2">大于2小于5</Option>
                    <Option value="3">大于5</Option>
                </Select>
                <span>每股收益:</span>
                <Select v-model="espSelect" style="width:120px" placeholder="市净率">
                    <Option value="0">大于0小于0.3</Option>
                    <Option value="1" selected>大于0.3小于0.5</Option>
                    <Option value="2">大于0.5小于1</Option>
                    <Option value="3">大于1</Option>
                </Select>
                <span>编码:</span>
                <Input v-model="code" placeholder="请输入..." style="width: 120px"></Input>
            </Col>
            <Col span="8" style="padding-right:10px">
                <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>
        <Table border :context="self" :columns="stockColumns" :data="stockData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" @on-change="changePage" @on-page-size-change="pageSizeChange"
                      placement="top" :page-size="pageSize" show-sizer  show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import {getStockBasics} from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                total: 0,
                page: 1,
                pageSize:30,
                peSelect:0,
                pbSelect:0,
                espSelect:0,
                code:'',
                stockColumns: [
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
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center'
                    },
                    {
                        title: '市盈率',
                        key: 'pe',
                        align: 'center'
                    },
                    {
                        title: '公积金',
                        key: 'reserved',
                        align: 'center'
                    },
                    {
                        title: '每股公积金',
                        key: 'reserved_per_share',
                        align: 'center'
                    },
                    {
                        title: '每股收益',
                        key: 'esp',
                        align: 'center'
                    },
                    {
                        title: '每股净资',
                        key: 'bvps',
                        align: 'center'
                    },
                    {
                        title: '市净率',
                        key: 'pb',
                        align: 'center'
                    },
                    {
                        title: '收入同比(%)',
                        key: 'rev',
                        align: 'center'
                    },
                    {
                        title: '利润同比(%)',
                        key: 'profit',
                        align: 'center'
                    },
                    {
                        title: '毛利率(%)',
                        key: 'gpr',
                        align: 'center'
                    },
                    {
                        title: '净利润率(%)',
                        key: 'npr',
                        align: 'center'
                    },
                    {
                        title: '股东人数',
                        key: 'holders',
                        align: 'center'
                    }
                ],
                stockData: []
            }
        },
        methods: {
            mockTableData() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    peSelect: this.peSelect,
                    pbSelect: this.pbSelect,
                    espSelect: this.espSelect
                };
                this.$Loading.start();
                getStockBasics(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.stockData = res.data.items;
                });
            },
            changePage(row) {
                this.page = row;
                this.mockTableData();
            },
            pageSizeChange(row) {
                this.pageSize = row;
                this.mockTableData();
            },
            toQuery() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    peSelect:this.peSelect,
                    pbSelect:this.pbSelect,
                    code: this.code,
                    espSelect: this.espSelect
                };
                this.$Loading.start();
                getStockBasics(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.stockData = res.data.items;
                });
            }
        },
        mounted() {
             this.mockTableData();
        }
    }
</script>
