/**
* This file is part of the <智鼠> application.
*
* Version: 0.0.1
* Description:
*
* Author: HuaZhang <yahveh.zh@gmail.com>
* Date  : 2016-09-28 17:09:18
* Last Updated:
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import React from 'react'
import 'styles/core.scss'

const PageLayout = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    return this.props.children
  }
})

export default PageLayout
