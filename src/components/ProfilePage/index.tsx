import React, { useEffect } from 'react';

import { useUsers } from '../../hooks/users';

import Feed from '../Feed';

import {
  Container,
  Banner,
  Avatar,
  ProfileData,
  LocationIcon,
  CakeIcon,
  Followage,
  EditButton,
} from './styles';

const ProfilePage: React.FC = () => {
  const { users, bfs } = useUsers();

  // Debug bfs
  useEffect(() => {
    bfs(users[1]);
  }, [bfs, users]);

  return (
    <Container>
      <Banner>
        <Avatar />
      </Banner>

      <ProfileData>
        <EditButton outlined>Editar perfil</EditButton>
        <h1>{users[0].completeName}</h1>
        <h2>@lucassiqz</h2>

        <p>Software Developer</p>

        <ul>
          <li>
            <LocationIcon />
            Brasília, Brasil
          </li>
          <li>
            <CakeIcon />
            Nascido em 14 de julho de 1997
          </li>
        </ul>

        <Followage>
          <span>
            seguindo <strong>93</strong>
          </span>
          <span>
            <strong>453 </strong> seguidores
          </span>
        </Followage>
      </ProfileData>

      <Feed />
    </Container>
  );
};

export default ProfilePage;
