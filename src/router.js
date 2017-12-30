import StockBasic from './views/page/stock_basics.vue'
import TickHistData from './views/page/tick_hist_data.vue'
import HistDataDay from './views/page/hist_data_day.vue'
import ProfitData from './views/page/profile_data.vue'
import Schedulers from './views/page/schedulers.vue'
import SchedulersHand from './views/page/schedulers_hand.vue'
import StockOverview from './views/page/stock_overview.vue'

const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/common/index.vue'], resolve),
        children: [{
            path: '/stock_basics',
            name: '公司基本面',
            component: StockBasic
        },{
            path: '/tick_hist_data',
            name: '历史分笔',
            component: TickHistData
        },{
            path: '/hist_data_day',
            name: '历史行情--天',
            component: HistDataDay
        },{
            path: '/profit_data',
            name: '分配预案',
            component: ProfitData
        },{
            path: '/schedulers',
            name: '定时任务',
            component: Schedulers
        },{
            path: '/schedulers_hand',
            name: '手动任务',
            component: SchedulersHand
        },{
            path: '/stock_overview',
            name: '个股概览',
            component: StockOverview
        },{
            path: '/echarts',
            name: '图表',
            component: resolve => require(['./views/page/echarts.vue'], resolve)
        },{
            path: '/table',
            name: '表格',
            component: resolve => require(['./views/page/table.vue'], resolve)
        }]
    }
];
export default routers;