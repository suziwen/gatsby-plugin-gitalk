# Gatsby Plugin Gitalk  

A plugin that simplifies adding [Gitalk](https://github.com/suziwen/gitalk) comments to [Gatsby](https://www.gatsbyjs.org/)  

## Description  
The goal of this plugin is to allow users to bring their content to life and cultivate engaged communities by integrating Gitalk comments into their blazing-fast Gatsby websites. After struggling to integrate different Gitalk components into my Gatsby site, creating an easily-configured plugin for the Gatsby ecosystem felt like a no-brainer.  

## Install  
```sh
$ yarn add gatsby-plugin-gitalk
```  
or  
```sh
$ npm install -S gatsby-plugin-gitalk
```

## Configure  

Add the plugin to your `gatsby-config.js` file with your [Gitalk config](https://github.com/suziwen/gitalk#options) 

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gitalk`,
      options: {
        config: gitalkConfig
      }
    },
  ]
}
```

## Usage  

You can use the plugin as shown in this brief example:  

```jsx
import Gitalk from 'gatsby-plugin-gitalk'
import '@suziwen/gitalk/dist/gitalk.css'

const PostTemplate = () => {
  let gitalkConfig = {
    id: post.slug || post.id,
    title: post.title,
  }
  return (
     <Gitalk options={gitalkConfig}/>
  )
}

export default PostTemplate
```

## Custom style

Copy the file `node_modules/@suziwen/gitalk/dist/gitalk.css` , and edit it, then import your modified version.

