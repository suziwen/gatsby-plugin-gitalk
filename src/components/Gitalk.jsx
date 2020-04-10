import React from 'react'
import PropTypes from 'prop-types'
import GitalkComponent from "@suziwen/gitalk/dist/gitalk-component"

export default class GGitalk extends React.Component {
  
  constructor(props) {
    super(props)
    this.pluginConfig = (typeof GATSBY_GITALK_CONFIG !== `undefined` && GATSBY_GITALK_CONFIG !== '') ? GATSBY_GITALK_CONFIG : ''
  }
  render() {
    let { options, ...props } = this.props
    const gitalkConfig = {...this.pluginConfig, ...options}
    if (typeof window !== 'undefined') {
      return (
        <GitalkComponent {...props} options={gitalkConfig} />
      )
    } else {
      return (<></>)
    }
  }
}
