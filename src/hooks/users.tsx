import React, { createContext, useContext, useState } from 'react';

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

  const [users, setUsers] = useState<User[]>([
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
      following: [{ username: 'lucassiqz' }],
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
      following: [],
    },
  ]);

  const bfs = (startingNode: User): void => {
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

      // passing the current vertex to callback funtion
      console.log('getQueueElement', getQueueElement);

      // get the adjacent list for current vertex
      const getList = users[getQueueElement].following;

      console.log('getList', getList);

      console.log('eae');

      // loop through the list and add the element to the
      // queue if it is not processed yet
      getList?.forEach((user, index) => {
        const neighIndex = getList.findIndex(
          (usr) => usr.username === user.username,
        );
        if (!visited[neighIndex]) {
          visited[neighIndex] = true;
          queue.push(neighIndex);
        }
      });
    }
  };

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
