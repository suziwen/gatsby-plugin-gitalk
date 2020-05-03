import Gitalk from './components/Gitalk'
import axios from 'axios'

const createIssue = async (options, reporter=console)=>{
  const { owner, repo, title, body, id, labels=['Gitalk'], description, personalToken, url} = options
  const queryStr = `"Gitalk_${id}" type:issue in:body ${labels.map(label => (`label:${label}`)).join(' ')} repo:${owner}/${repo}`
  const axiosGithub = axios.create({
    baseURL: 'https://api.github.com',
    auth: {
      username: owner,
      password: personalToken
    },
    headers: {
      'Accept': 'application/json'
    }
  })
  const res = await axiosGithub.get(`/search/issues`, {
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
      body: body || `${url} \n\n ${description}\n\nGitalk_${id}`
    })
  } catch(e) {
    reporter.error(e)
  }
}

export default Gitalk

export const GitalkPluginHelper = {
  createIssue: createIssue
}
