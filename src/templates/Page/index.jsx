import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import ArticleExcerpt from 'components/ArticleExcerpt';
import Paginator from 'components/Paginator';
import IndexMetaTags from 'components/Index/MetaTags';
import IndexMetaStructuredData from 'components/Index/MetaStructuredData';
import IndexMetaPaginator from 'components/Index/MetaPaginator';

const getPaginator = R.pipe(R.path(['pathContext']), R.pick(['currentPage', 'pagesSum', 'pathPrefix']));
const toArticleExcerpts = R.pipe(
  R.path(['data', 'allMarkdownRemark', 'edges']),
  R.addIndex(R.map)(function({ node: { frontmatter }, node }, index) {
    return (
      <ArticleExcerpt
        key={index}
        excerpt={node.excerpt}
        slug={frontmatter.slug}
        title={frontmatter.title}
        sizes={frontmatter.thumbnail.childImageSharp.sizes}
        tags={frontmatter.tags}
        publishedDate={frontmatter.publishedDate}
      />
    );
  })
);

export default function Page(props) {
  const paginatorProps = getPaginator(props);
  const siteUrl = props.data.site.siteMetadata.siteUrl;
  return (
    <Fragment>
      <IndexMetaTags {...props} />
      <IndexMetaStructuredData {...props} />
      <IndexMetaPaginator {...paginatorProps} siteUrl={siteUrl} />
      {toArticleExcerpts(props)}
      <Paginator {...paginatorProps} />
    </Fragment>
  );
}

Page.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object
};

export const pageQuery = graphql`
  query IndexQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    authorProfilePicture: file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }, skip: $skip, limit: $limit) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            slug
            tags
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 720, maxHeight: 300, quality: 90) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
