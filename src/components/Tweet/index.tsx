import React from 'react';

import {
  Container,
  Retweeted,
  RetweetOnTopIcon,
  Body,
  Avatar,
  Content,
  Header,
  Dot,
  Description,
  ImageContent,
  Icons,
  Status,
  CommentIcon,
  RetweetIcon,
  LikeIcon,
} from './styles';

const Tweet: React.FC = () => {
  return (
    <Container>
      <Retweeted>
        <RetweetOnTopIcon />
        Você retweetou
      </Retweeted>

      <Body>
        <Avatar />

        <Content>
          <Header>
            <strong>Lucas Siqueira</strong>
            <span>@lucassiqz</span>
            <Dot />
            <time>19 de julho</time>
          </Header>

          <Description>Parece dificil mas não é fácil</Description>

          <ImageContent />

          <Icons>
            <Status>
              <CommentIcon />
              18
            </Status>
            <Status>
              <RetweetIcon />
              18
            </Status>
            <Status>
              <LikeIcon />
              999
            </Status>
          </Icons>
        </Content>
      </Body>
    </Container>
  );
};

export default Tweet;
