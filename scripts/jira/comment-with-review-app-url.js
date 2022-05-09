#!/usr/bin/env node
const axios = require('axios')
const JIRA_API_VERSION = '2'
const JIRA_API_URL = `https://1024pix.atlassian.net/rest/api/${JIRA_API_VERSION}`

async function main() {
  // eslint-disable-next-line eqeqeq
  const isReviewApp = process.env.REVIEW_APP == 'true'

  if (!isReviewApp) {
    console.log(
      '$REVIEW_APP is not true. I will not post a message to Jira. Bye !'
    )
    return
  }

  const appName = process.env.APP

  const prNumber = extractPRNumberFromAppName(appName)

  console.log(`Getting branch name from pull request: ${prNumber}`)
  const branchName = await getBranchNameFromPRNumber(prNumber)

  const issueCode = extractIssueCodeFromBranchName(branchName)

  console.log(`Generating Review apps urls for pull request: ${prNumber}`)

  const raSiteFrURL = `https://site-pr${prNumber}.review.pix.fr`
  const raSiteOrgURL = `https://site-pr${prNumber}.review.pix.org`
  const raProURL = `https://pro-pr${prNumber}.review.pix.fr`
  const prGithubURL = `https://github.com/1024pix/pix/pull/${prNumber}`

  const scalingoCommentRegex = new RegExp(raSiteFrURL, 'i')

  console.log(`Getting existing comments on JIRA issue: ${issueCode}`)

  const commentsResponse = await axios({
    method: 'get',
    url: `${JIRA_API_URL}/issue/${issueCode}/comment`,
    auth: {
      username: process.env.JIRA_NOTIFICATION_ACCOUNT_EMAIL,
      password: process.env.JIRA_NOTIFICATION_ACCOUNT_TOKEN,
    },
  })

  const commentContents = commentsResponse.data.comments.map(
    (comment) => comment.body
  )

  console.log(
    `Checking comment has not already been posted for PR number: ${prNumber}`
  )

  const hasAlreadyScalingoComment = commentContents.some((comment) =>
    comment.match(scalingoCommentRegex)
  )

  if (hasAlreadyScalingoComment) {
    console.log(
      'Review apps urls already found in issue comments. No need to add it again'
    )
  } else {
    const text =
      'Je viens de déployer la Review App. Elle sera consultable sur les URL suivantes :\n' +
      `- Site FR : ${raSiteFrURL}\n` +
      `- Site ORG : ${raSiteOrgURL}\n` +
      `- Pro : ${raProURL}\n` +
      `Le lien Github de la PR : ${prGithubURL}`

    console.log(
      `Posting Review apps urls for PR number: ${prNumber} to JIRA issue: ${issueCode}`
    )

    await axios({
      method: 'post',
      url: `${JIRA_API_URL}/issue/${issueCode}/comment`,
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: process.env.JIRA_NOTIFICATION_ACCOUNT_EMAIL,
        password: process.env.JIRA_NOTIFICATION_ACCOUNT_TOKEN,
      },
      data: {
        body: text,
      },
    })
  }
}

function extractIssueCodeFromBranchName(branchName) {
  // eslint-disable-next-line prefer-regex-literals
  const jiraIssueNameRegex = new RegExp(/^\w+-\d+/, 'i')
  const regexMatches = branchName.match(jiraIssueNameRegex)

  if (regexMatches) {
    return regexMatches[0]
  } else {
    throw new Error('The id of the Jira issue could not be found.')
  }
}

function extractPRNumberFromAppName(appName) {
  // eslint-disable-next-line prefer-regex-literals
  const PRnumberRegex = new RegExp(/-pr(\d+)/)
  const regexMatches = appName.match(PRnumberRegex)

  if (regexMatches) {
    return regexMatches[1]
  } else {
    throw new Error('The PR number could not be found.')
  }
}

async function getBranchNameFromPRNumber(prNumber) {
  const { data } = await axios(
    `https://api.github.com/repos/1024pix/pix/pulls/${prNumber}`
  )

  if (data && data.head && data.head.ref) {
    return data.head.ref
  } else {
    throw new Error(
      `Could not find branch name in GitHub API output : ${JSON.stringify(
        data
      )}`
    )
  }
}

main().then(
  () => {
    console.log('Script done.')
    process.exit()
  },
  (error) => {
    console.error(error.message)
    console.log('Stopping here.')
    console.log('Script failed.')
    process.exit()
  }
)
