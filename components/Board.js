import React, { useState } from 'react';
import styled from 'styled-components';
import useNormalizeBoardName from './useNormalizeBoardName';
import useSortedPosts from './useSortedPosts';

const BoardName = styled.h2`
  margin: 10px 0;
`;

const PostLink = styled.a.attrs({
  target: '_blank',
})`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ThreadsWrapper = styled.article`
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 15px;

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const Headline = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

const HeadlineContent = styled.p`
  font-size: 14px;
  color: #999;
`;

const RelatedList = styled.ul`
  margin-left: 20px;
`;

const RelatedTitle = styled.h4`
  font-size: 16px;
  color: #333;
`;

const RelatedContent = styled.p`
  font-size: 12px;
  color: #999;
`;

const More = styled.span`
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
`;

const Threads = ({ posts }) => {
  const [heading, ...rest] = useSortedPosts(posts);
  const [openRelated, setOpenRelated] = useState(false);

  return (
    <ThreadsWrapper>
      <Headline>
        <PostLink href={heading.url}>{heading.title}</PostLink>
      </Headline>
      <HeadlineContent>{heading.textContent}</HeadlineContent>
      {rest.length > 0 && openRelated && (
        <RelatedList>
          {rest.map(post => (
            <li key={post.id}>
              <RelatedTitle>
                <PostLink href={post.url}>{post.title}</PostLink>
              </RelatedTitle>
              <RelatedContent>
                {post.textContent.slice(0, 50)}...
              </RelatedContent>
            </li>
          ))}
        </RelatedList>
      )}
      {rest.length > 0 && !openRelated && (
        <More onClick={e => setOpenRelated(true)}>還有{rest.length}篇相關</More>
      )}
    </ThreadsWrapper>
  );
};

const Board = ({ board, threads }) => {
  const boardName = useNormalizeBoardName(board);

  return (
    threads.length > 0 && (
      <div>
        <BoardName>{boardName}</BoardName>
        {threads.map((thread, i) => (
          <Threads key={i} {...thread} />
        ))}
      </div>
    )
  );
};

export default Board;
