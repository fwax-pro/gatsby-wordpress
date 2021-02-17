const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            allWpPost(sort: {fields: [date]}) {
                edges {
                    node {
                        title
                        excerpt
                        slug
                        date(formatString: "MM-DD-YYYY")
                        author {
                            node {
                                name
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return
    }

    const posts = result.data.allWpPost.edges;

    posts.forEach(({ node }) => {
        createPage({
          // Decide URL structure
          path: node.slug,
          // path to template
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // This is the $slug variable
            // passed to blog-post.js
            slug: node.slug,
          },
        })
    });

}