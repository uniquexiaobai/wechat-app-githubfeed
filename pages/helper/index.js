
function formateActionType (type) {
  switch (type) {
    case 'CreateEvent':
      return 'Create';
    case 'DeleteEvent':
      return 'Delete';
    case 'ForkEvent':
      return 'Forked';
    case 'WatchEvent':
      return 'Started';
    case 'PushEvent':
      return 'Push';
    case 'PullRequestEvent':
      return 'Pull Request';
    case 'IssuesEvent':
      return 'Create Issue'
    case 'IssueCommentEvent':
      return 'Comment Issue';
    case 'MemberEvent':
      return 'Add Member'
    case 'PullRequestReviewCommentEvent':
      return 'Pull Request Review';
    default:
      return 'Started';
  }
}

module.exports = {
  formateActionType: formateActionType
};
