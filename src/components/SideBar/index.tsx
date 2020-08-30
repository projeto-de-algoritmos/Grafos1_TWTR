import React from 'react';
import StickyBox from 'react-sticky-box';

import List from '../List';
import FollowSuggestion from '../FollowSuggestion';
import News from '../News';

import { useUsers } from '../../hooks/users';

import {
  Container,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  Body,
} from './styles';

const SideBar: React.FC = () => {
  const { users, bfs } = useUsers();
  const pathway = bfs(users[1]);

  return (
    <Container>
      <SearchWrapper>
        <SearchInput placeholder="Buscar no Twitter" />
        <SearchIcon />
      </SearchWrapper>

      <StickyBox>
        <Body>
          {/* Aplicar grafo aqui */}
          <List
            title="Talvez você curta"
            elements={pathway.map((userIndex: number) => {
              return (
                <FollowSuggestion
                  name={users[userIndex].completeName}
                  nickname={users[userIndex].username}
                />
              );
            })}
          />
          <List
            title="O que está acontecendo"
            elements={[<News />, <News />, <News />]}
          />
        </Body>
      </StickyBox>
    </Container>
  );
};

export default SideBar;
