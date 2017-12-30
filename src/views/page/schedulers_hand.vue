<template>
    <div>
        <Input v-model="code" placeholder="请输入..." style="width: 120px"></Input>
        <Table border :context="self" :columns="SchedulerColumns" :data="SchedulerData"></Table>
    </div>
</template>
<script>
    import {invokeHistDataDay,invokeProfitData,invokeStockBasic,invokeTickHistData} from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                result:'',
                code:'',
                SchedulerColumns: [
                    {
                        type: 'index',
                        align: 'center'
                    },{
                        title: '任务名称',
                        key: 'name',
                    }
                    ,{
                        title: '任务编码',
                        key: 'code',
                    },{
                        title: '最新',
                        key: 'date',
                        align: 'center'
                    },{
                        title: '触发',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.invokeTask(params.row.code)
                                        }
                                    }
                                }, '调用')
                            ]);
                        }
                    }
                ],
                SchedulerData: [
                    {
                        name: '历史行情-Day',
                        date: '2017-04-01',
                        code: 'hist_data_day'
                    },{
                        name: '分配预案',
                        date: '',
                        code: 'profit_date'
                    },{
                        name: '基本面',
                        date: '',
                        code: 'stock_basic'
                    },{
                        name: '历史分笔',
                        date: '',
                        code: 'tick_hist_data'
                    }]
            }
        },
        methods: {
            invokeTask(type) {
                let para = {
                    code: this.code
                };
                this.$Loading.start();
                if(type == 'hist_data_day') {
                    invokeHistDataDay(para).then((res) => {
                        this.$Loading.finish();
                        if(res.data.status == 200) {
                            this.$Message.info('成功');
                        } else {
                            this.$Message.error("失败");
                        }
                    });
                } else if (type == 'profit_date') {
                    invokeProfitData(para).then((res) => {
                        this.$Loading.finish();
                        if(res.data.status == 200) {
                            this.$Message.info('成功');
                        } else {
                            this.$Message.error("失败");
                        }
                    });
                } else if (type == 'stock_basic') {
                    invokeStockBasic(para).then((res) => {
                        this.$Loading.finish();
                        if(res.data.status == 200) {
                            this.$Message.info('成功');
                        } else {
                            this.$Message.error("失败");
                        }
                    });
                } else if (type == 'tick_hist_data') {
                    invokeTickHistData(para).then((res) => {
                        this.$Loading.finish();
                        if(res.data.status == 200) {
                            this.$Message.info('成功');
                        } else {
                            this.$Message.error("失败");
                        }
                    });
                }

            }
        }
    }
</script>
