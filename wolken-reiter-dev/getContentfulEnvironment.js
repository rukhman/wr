const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-MPJiY70A5ZyR6PzJe0n5x3TssOUYVLXXLmJ6AMIpQ_I',
  })

  return contentfulClient
    .getSpace('5n5pcoqyb97y')
    .then(space => space.getEnvironment('master'))
}
