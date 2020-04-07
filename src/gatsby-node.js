'use strict'

var didRunAlready = false;
var pluginConfig = "";

exports.onPreInit = function(_ref, pluginOptions) {
  
  // Gatsby adds a pluginOptions that's not needed for this plugin
  delete pluginOptions.plugins
  pluginConfig = pluginOptions.config

  if (didRunAlready) {
    throw new Error('You can only have single instance of gatsby-plugin-gitalk in your gatsby-config.js')
  }
  didRunAlready = true
}

exports.onCreateWebpackConfig = ({ plugins, actions, }) => {
  var setWebpackConfig = actions.setWebpackConfig
  setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_GITALK_CONFIG: JSON.stringify(pluginConfig)
    })]
  })
}
