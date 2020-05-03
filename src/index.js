import Gitalk from './components/Gitalk'
import axios from 'axios'

const createIssue = async (options)=>{
  const axiosGithub = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Accept': 'application/json'
    }
  })
  const { owner, repo, title, body, id, labels=['Gitalk'], description, accessToken, url,  clientID, clientSecret } = options
  const queryStr = `"Gitalk_${id}" type:issue in:body ${labels.map(label => (`label:${label}`)).join(' ')} repo:${owner}/${repo}`
  const res = await axiosGithub.get(`/search/issues`, {
    auth: {
      username: clientID,
      password: clientSecret
    },
    params: {
      q: queryStr,
      t: Date.now()
    }
  })
  if (res && res.data && res.data.total_count) {
    return
  }
  try {
  await axiosGithub.post(`/repos/${owner}/${repo}/issues`, {
    title,
    labels: labels,
    body: body || `${url} \n\n ${description}\n\nGitalk_${id}`,
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
  } catch(e) {
    console.log('error')
    console.log(e)
  }
}

export default Gitalk

export const GitalkPluginHelper = {
  createIssue: createIssue
}
