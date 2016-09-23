import React from 'react'
import { Modal, Checkbox, Radio, Button, message } from 'antd'
import {connect} from 'react-redux'
import {ZPost} from 'utils/Xfetch'
import store from 'utils/store' //吃相不太好看
import styles from './Header.scss'

import ZGrid from 'components/Grid/index'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const levels = [
  { label: '严重', value: '3' },
  { label: '重要', value: '2' },
  { label: '普通', value: '1' },
  { label: '不重要', value: '0' }
]

const DEFLEVELS_KEY = 'msg.deflevels'
const DEFREADED_KEY = 'msg.defReaded'
let defLevels = store.get(DEFLEVELS_KEY, ['0', '1', '2', '3'])
let defReaded = store.get(DEFREADED_KEY, '0')
const defColumns = [
  // {
  //   headerName: 'sdf',
  //   children: [{
  //     headerName: '业务员',
  //     field: 'creator_name',
  //     width: 80
  //   }]
  // },
  {
    headerName: '#',
    width: 30,
    checkboxSelection: true,
    pinned: true
  }, {
    headerName: '优先级',
    field: 'MsgLevel',
    width: 60,
    pinned: true,
    cellClassRules: {
      'lv-1': (params) => { return params.value === '已发货' },
      'lv-2': (params) => { return params.value === '发货中' },
      'lv-3': (params) => { return params.value === '待付款' }
    }
  }, {
    headerName: '消息',
    field: 'Msg',
    width: 500
  }, {
    headerName: '发送时间',
    field: 'CreateDate',
    width: 120
  }, {
    headerName: '已阅',
    //field: 'CreateDate',
    width: 40
  }, {
    headerName: '阅读人',
    field: 'Reador',
    width: 70
  }, {
    headerName: '阅读时间',
    field: 'ReadDate',
    width: 120
  }]

const Notification = React.createClass({

  getInitialState() {
    return {
      searchLoading: false
    }
  },
  componentDidMount() {
  },
  componentWillUnmount() {
  },
  hideModal() {
    this.props.dispatch({ type: 'NOTICE_VISIBEL_SET', payload: false })
  },
  handleLevel(checkedValues) {
    defLevels = checkedValues
    store.set(DEFLEVELS_KEY, checkedValues)
  },
  handleReaded(e) {
    defReaded = e.target.value
    store.set(DEFREADED_KEY, defReaded)
  },
  handleSearch() {
    //这里需要重设 setDatasource
    if (!this.grid) {
      message.warn('请等待容器初始化')
      return
    }
    const data = {
      readed: defReaded,
      levels: defLevels
    }
    this.api.setRowData(null)
    ZPost('profile/msg', data, (s, d, m) => {
      console.log(d)
    })
  },
  handleGridReady(grid) {
    grid.showLoading()
    //获取默认配置
    grid.setDatasource({
      total: 100,
      rowData: [],
      getRows: (params) => {
        console.log(params)
      }
    })
    this.grid = grid
  },
  render() {
    const {visible} = this.props
    if (!visible && !this._firstVisibled) {
      this._firstVisibled = true
      return null
    }
    const {searchLoading} = this.state
    return (
      <Modal wrapClassName='modalTop' width='100%' title='通知' visible={visible} onCancel={this.hideModal} footer=''>
        <div className='clearfix'>
          <div className={styles.levels}>
            <CheckboxGroup options={levels} defaultValue={defLevels} onChange={this.handleLevel} />
          </div>
          <div className={styles.readed}>
            <RadioGroup onChange={this.handleReaded} defaultValue={defReaded}>
              <Radio key='-1' value=''>全部</Radio>
              <Radio key='1' value={1}>已读</Radio>
              <Radio key='0' value={0}>未读</Radio>
            </RadioGroup>
            <Button type='primary' onClick={this.handleSearch} loading={searchLoading}>检索</Button>
          </div>
        </div>
        <div className='clearfix mt10 mb10'>
          <div className=''>
            <Button type='primary' size='small' className='mr10'>新消息</Button>
            <Button type='ghost' size='small' className='mr10'>批量已读</Button>
            <Button type='ghost' size='small' shape='circle-outline' icon='reload' />
          </div>
        </div>
        <ZGrid onReady={this.handleGridReady} storeConfig={{ prefix: 'msg' }} height={500} columnDefs={defColumns} />
      </Modal>
    )
  }
})

export default connect(state => ({
  visible: state.notice_visibel
}))(Notification)