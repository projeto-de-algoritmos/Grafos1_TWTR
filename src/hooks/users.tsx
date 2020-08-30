import React, { createContext, useContext, useState, useCallback } from 'react';

interface UsersContextData {
  users: User[];
  bfs(startingNode: User): void;
}

interface FollwingType {
  username: string;
}

interface User {
  username: string;
  completeName: string;
  online: boolean;
  city?: string;
  description?: string;
  nascimento?: string;
  followers?: User[];
  following: FollwingType[];
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

const UsersProvider: React.FC = ({ children }) => {
  // lista de adjacencia: === users
  // [
  // lucassiqz = users[0].following = [gui,caio],
  // gui = users[1].following = [amigoGui],
  // caio = users[2].following = [amigoCaio],
  // ]

  const [users] = useState<User[]>([
    {
      username: 'lucasSiqz',
      completeName: 'Lucas Rodrigues',
      online: true,
      following: [
        {
          username: 'caiooliv',
        },
      ],
    },
    {
      username: 'guilherme-aguiar',
      completeName: 'Guilherme Aguiar',
      online: false,
      following: [{ username: 'caiooliv' }],
    },
    {
      username: 'caiooliv',
      completeName: 'Caio Oliveira',
      online: false,
      following: [{ username: 'm' }],
    },
    {
      username: 'm',
      completeName: 'naMe',
      online: false,
      following: [{ username: 'lucasSiqz' }],
    },
  ]);

  const removeFollowers = (BFSResult: number[]): void => {};

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

      console.log('number of users:', visited);

      queue.push(startingNodeIndex);

      // loop until queue is element
      while (queue.length > 0) {
        console.log('estado da fila: ', queue);
        // get the element from the queue
        const getQueueElement = queue.shift() as number;
        pathway.push(getQueueElement);
        // passing the current vertex to callback funtion
        console.log('getQueueElement', getQueueElement);

        // get the adjacent list for current vertex
        const getList = users[getQueueElement].following;

        console.log('getList', getList);

        // loop through the list and add the element to the
        // queue if it is not processed yet

        getList.forEach((user) => {
          const neighIndex = users.findIndex(
            (usr) => usr.username === user.username,
          );

          console.log('neigh index', neighIndex);

          if (!visited[neighIndex]) {
            visited[neighIndex] = true;
            queue.push(neighIndex);
          }
        });
      }
      // slice serve para tirar o proprio user da lista
      console.log('retorno: ', pathway.slice(1));

      return pathway.slice(1);
    },
    [users],
  );

  return (
    <UsersContext.Provider value={{ users, bfs }}>
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
