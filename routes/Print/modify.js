/**
* This file is part of the <智鼠> application.
*
* Version: 0.0.1
* Description:
*
* Author: HuaZhang <yahveh.zh@gmail.com>
* Date  : 2016-09-28 17:09:19
* Last Updated:
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import {
  injectReducers
} from 'store/reducers'

export default (store) => ({
  path: 'print/modify',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ModifyContainer').default
      const reducers = require('./modules/reducersModify').default
      injectReducers(store, reducers)
      cb(null, Container)
    }, 'printModify')
  }
})
