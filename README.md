# Gatsby Plugin Gitalk  

A plugin that simplifies adding [Gitalk](https://github.com/suziwen/gitalk) comments to [Gatsby](https://www.gatsbyjs.org/)  

## Demo

[Demo](https://suziwen.github.io/my-gatsby-gitalk-demo/)

<https://github.com/suziwen/my-gatsby-gitalk-demo>

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

## Auto create new issue


This operation is option, you can create issue manually

```js
// gatsby-node.js

....
const {GitalkPluginHelper} = require('gatsby-plugin-gitalk');
const articlesCount = 10
const gitalkOpts = {...}
....
exports.createPages = async ({ graphql, actions, getNode, reporter }) => {

  // this token (GITALK_CREATE_ISSUE_TOKEN) apply from https://github.com/settings/tokens/new
  // which must have create new issue permission,
  // and for security issue, dont push public
  const gitalkCreateIssueToken = process.env.GITALK_CREATE_ISSUE_TOKEN
  // Due to github api request limit, it is recommended to do the number of automatically created issues here 
  if (gitalkOpts && gitalkCreateIssueToken && articlesCount < 20) {
    const issueOptions = Object.assign({}, gitalkOpts, {
      id: 'id',
      title: 'title',
      description: 'description',
      url: 'url',
    }, {
      personalToken: gitalkCreateIssueToken
    })
    // this function will try create new issue when it doesnt exist;
    await GitalkPluginHelper.createIssue(issueOptions)
    reporter.info(`create issue success`)
  }

```
