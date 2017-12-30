<template>
    <div>
        <Row style="margin-bottom:10px">
            <Col span="20" style="padding-right:10px">
                <span>分红:</span>
                <Select v-model="diviOp" style="width:60px" placeholder="操作符">
                    <Option value=">=" label=">="></Option>
                    <Option value="=" selected label="="></Option>
                    <Option value="<=" label="<="></Option>
                </Select>
                <Input v-model="diviValue" placeholder="请输入..." style="width: 100px" number></Input>
                <span>送股:</span>
                <Select v-model="shareOp" style="width:60px" placeholder="操作符">
                    <Option value=">=" label=">="></Option>
                    <Option value="=" selected label="="></Option>
                    <Option value="<=" label="<="></Option>
                </Select>
                <Input v-model="shareValue" placeholder="请输入..." style="width: 100px" number></Input>
                <span>年份:</span>
                <Input v-model="year" placeholder="请输入..." style="width: 120px"></Input>
                <span>编码:</span>
                <Input v-model="code" placeholder="请输入..." style="width: 120px"></Input>
            </Col>
            <Col span="4" style="padding-right:10px">
                <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>
        <Table border :context="self" :columns="ProfitColumns" :data="ProfitData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" @on-change="changePage" @on-page-size-change="pageSizeChange"
                      placement="top" :page-size="pageSize" show-sizer  show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import {getProfitData} from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                total: 0,
                page: 1,
                pageSize:30,
                diviOp:'>=',
                diviValue:0,
                shareOp:'>=',
                shareValue:0,
                year:2017,
                code:'',
                ProfitColumns: [
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
                        title: '年份',
                        key: 'year',
                        align: 'center'
                    },
                    {
                        title: '报告日期',
                        key: 'report_date',
                        align: 'center'
                    },
                    {
                        title: '分红',
                        key: 'divi',
                        align: 'center'
                    },
                    {
                        title: '转股',
                        key: 'shares',
                        align: 'center'
                    }
                ],
                ProfitData: []
            }
        },
        methods: {
            mockTableData() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize,
                    code: this.code,
                    year: this.year,
                    diviOp: this.diviOp,
                    diviValue: this.diviValue,
                    shareOp: this.shareOp,
                    shareValue: this.shareValue
                };
                this.$Loading.start();
                getProfitData(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.ProfitData = res.data.items;
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
                    code: this.code,
                    year: this.year,
                    diviOp: this.diviOp,
                    diviValue: this.diviValue,
                    shareOp: this.shareOp,
                    shareValue: this.shareValue
                };
                this.$Loading.start();
                getProfitData(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.ProfitData = res.data.items;
                });
            }
        },
        mounted() {
             this.mockTableData();
        }
    }
</script>
