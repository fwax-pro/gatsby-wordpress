import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  console.log('data', data);
  return (
    <Layout>
      <SEO title="Home" />
      <h4>Posts</h4>
      {data.allWpPost.edges.map(({ node }) => (
        <div key={node.slug}>
          <Link to={node.slug}>
            <h5>{node.title}</h5>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </Layout>
  )
  
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`