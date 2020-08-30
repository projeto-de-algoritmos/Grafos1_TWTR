import React, { createContext, useContext, useState, useCallback } from 'react';

interface UsersContextData {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loggedUser: User | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>;
  bfs(startingNode: User): number[];
}

interface FollowingType {
  username: string;
}

export interface User {
  username: string;
  completeName: string;
  city?: string;
  description?: string;
  nascimento?: string;
  followers?: User[];
  following: FollowingType[];
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

const UsersProvider: React.FC = ({ children }) => {
  // lista de adjacencia: === users
  // [
  // lucassiqz = users[0].following = [gui,caio],
  // gui = users[1].following = [amigoGui],
  // caio = users[2].following = [amigoCaio],
  // ]

  const [users, setUsers] = useState<User[]>([
    {
      username: 'lucasSiqz',
      completeName: 'Lucas Rodrigues',
      following: [
        {
          username: 'caiooliv',
        },
      ],
    },
    {
      username: 'guilherme-aguiar',
      completeName: 'Guilherme Aguiar',
      following: [{ username: 'caiooliv' }],
    },
    {
      username: 'caiooliv',
      completeName: 'Caio Oliveira',
      following: [{ username: 'm' }],
    },
    {
      username: 'm',
      completeName: 'naMe',
      following: [{ username: 'caiooliv' }],
    },
  ]);
  const [loggedUser, setLoggedUser] = useState<User | null>(users[0]);

  const removeFollowers = (
    BFSResult: number[],
    startingNodeIndex: number,
  ): number[] => {
    BFSResult.forEach((element, index) => {
      users[startingNodeIndex].following.map((user) => {
        if (user.username === users[element].username) {
          const removido = BFSResult.splice(index, 1);
          console.log('Usuario ', users[removido[0]].username, ' foi removido');
        }
      });
    });
    return BFSResult;
  };

  const bfs = useCallback(
    (startingNode: User): number[] => {
      // array that tracks the graph
      const pathway = [] as number[];

      // create a visited array
      const visited = [] as any;

      for (let i = 0; i < users.length; i++) {
        visited[i] = false;
      }

      // Create an object for queue
      const queue = [] as number[];

      // add the starting node to the queue
      const startingNodeIndex = users.findIndex(
        (user) => user.username === startingNode.username,
      );

      visited[startingNodeIndex] = true;

      queue.push(startingNodeIndex);

      // loop until queue is element
      while (queue.length > 0) {
        // get the element from the queue
        const getQueueElement = queue.shift() as number;
        pathway.push(getQueueElement);
        // passing the current vertex to callback funtion

        // get the adjacent list for current vertex
        const getList = users[getQueueElement].following;

        // loop through the list and add the element to the
        // queue if it is not processed yet

        getList.forEach((user) => {
          const neighIndex = users.findIndex(
            (usr) => usr.username === user.username,
          );

          if (!visited[neighIndex]) {
            visited[neighIndex] = true;
            queue.push(neighIndex);
          }
        });
      }
      // slice serve para tirar o proprio user da lista
      console.log('retorno: ', pathway.slice(1));

      const filteredPath = removeFollowers(pathway.slice(1), startingNodeIndex);

      console.log('filtered', filteredPath);

      return filteredPath;
    },
    [users],
  );

  return (
    <UsersContext.Provider
      value={{ users, bfs, setUsers, loggedUser, setLoggedUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

function useUsers(): UsersContextData {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }

  return context;
}

export { UsersProvider, useUsers };
