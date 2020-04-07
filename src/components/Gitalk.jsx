import React from 'react'
import PropTypes from 'prop-types'
import GitalkComponent from "gitalk/dist/gitalk-component"
import { insertScript, removeScript, shallowComparison } from '../utils'

export default class GGitalk extends React.Component {
  
  constructor(props) {
    super(props)
    const configStr = (typeof GATSBY_GITALK_CONFIG !== `undefined` && GATSBY_GITALK_CONFIG !== '') ? GATSBY_GITALK_CONFIG : ''
    if (configStr) {
      try {
        this.pluginConfig = JSON.parse(configStr)
      } catch (e) {
        this.pluginConfig = null
      }
    }
  }
  render() {
    let { options, ...props } = this.props
    const gitalkConfig = {...this.pluginConfig, ...options}
    return (
      <GitalkComponent {...props} options={gitalkConfig} />
    )
  }
}
