
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

function timesAge (date) {
  const currentDate = new Date();
  const ghDate = new Date(date);

  return timeDifference(currentDate.getTime(), ghDate.getTime());
}

function timeDifference (current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 60;
  const msPerWeek = msPerDay * 7;
  const msPerMouth = msPerWeek * 4;
  const msPerYear = msPerMouth * 12;

  const elapsed = Math.abs(current - previous);

  switch (true) {
    case elapsed < msPerMinute:
      return Math.round(elapsed / 1000) + ' seconds age';
    case elapsed < msPerHour:
      return Math.round(elapsed / msPerMinute) + ' minutes age';
    case elapsed < msPerDay:
      return Math.round(elapsed / msPerHour) + ' hours age';
    case elapsed < msPerWeek:
      return Math.round(elapsed / msPerDay) + ' days age';
    case elapsed < msPerMouth:
      return `approximately ${Math.round(elapsed / msPerWeek)} weeks age`;
    case elapsed < msPerYear:
      return `approximately ${Math.round(elapsed / msPerMouth)} mouths age`;
    default:
      return `approximately ${Math.round(elapsed / msPerYear)} years age`;
  }
}

module.exports = {
  formateActionType: formateActionType,
  timesAge: timesAge
};
