/**
 * Created by zhengweiliang on 2017/7/8.
 */

import axios from 'axios'

let base = 'http://127.0.0.1:5000';

//
/**
 * stock_basic 公司基本面
 * @param params
 */
export const getStockBasics = params=>{return axios.get(`${base}/api/stock_basic`,{params: params});};
export const getStockByCode = params=>{return axios.get(`${base}/api/get_stock`,{params: params});};
export const getStockBasicByCode = params=>{return axios.get(`${base}/api/get_stock_basic`,{params: params});};
/**
 * 获取股票历史分笔
 * @param params
 */
export const getTickHistData = params=>{return axios.get(`${base}/api/tick_hist_data`,{params: params});};

/**
 * 获取历史行情
 * @param params
 */
export const getHistDataDay = params=>{return axios.get(`${base}/api/hist_data_day`,{params: params});};
export const getHistDataDayByCode = params=>{return axios.get(`${base}/api/get_hist_data_day`,{params: params});};
/**
 * 获取分配预案
 * @param params
 */
export const getProfitData = params=>{return axios.get(`${base}/api/profit_data`,{params: params});};

/**
 * 调度
 * @param params
 */
export const getSchedulerInfos = params=>{return axios.get(`${base}/api/get_scheduler_info`,{params: params});};

export const getJobs = params=>{return axios.get(`${base}/api/get_jobs`,{params: params});};

export const getJob = params=>{return axios.get(`${base}/api/get_job`,{params: params});};

export const pauseJob = params=>{return axios.post(`${base}/api/pause_job`,{params: params});};

export const resumeJob = params=>{return axios.post(`${base}/api/resume_job`,{params: params});};

export const runJob = params=>{return axios.post(`${base}/api/run_job`,{params: params});};

/**
 * 手动触发任务
 * @param params
 * @returns {*}
 */

export const invokeHistDataDay = params=>{return axios.get(`${base}/api/task/invoke_hist_data_day`,{params: params});};

export const invokeProfitData = params=>{return axios.get(`${base}/api/task/profit_data`,{params: params});};

export const invokeStockBasic = params=>{return axios.get(`${base}/api/task/stock_basic`,{params: params});};

export const invokeTickHistData = params=>{return axios.get(`${base}/api/task/tick_hist_data`,{params: params});};