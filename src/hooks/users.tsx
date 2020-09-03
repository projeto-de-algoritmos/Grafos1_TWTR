import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

interface UsersContextData {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loggedUser: User | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>;
  bfs(startingNode: User): number[][];
}

interface FollowingType {
  username: string;
}

export interface User {
  username: string;
  completeName: string;
  place?: string;
  description?: string;
  birth?: string;
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
      username: 'lucassiqz',
      completeName: 'Lucas Siqueira',
      description: 'Software Engineer',
      place: 'Brasilia-DF',
      birth: '14 de julho de 1997',
      following: [{ username: 'guilherme-aguiar' }],
    },
    {
      username: 'guilherme-aguiar',
      completeName: 'Guilherme Aguiar',
      description: 'Software Engineer',
      place: 'Brasilia-DF',
      following: [{ username: 'caiooliv' }],
    },
    {
      username: 'caiooliv',
      completeName: 'Caio Oliveira',
      description: 'Software Engineer',
      place: 'Brasilia-DF',
      birth: '18 de janeiro de 1997',
      following: [{ username: 'z' }, { username: 'guilherme-aguiar' }],
    },
    {
      username: 'z',
      description: 'Software Engineer',
      place: 'Rio de Janeiro-RJ',
      completeName: 'zzzz',
      following: [{ username: 'matheus-rn' }],
    },
    {
      username: 'matheus-rn',
      completeName: 'Matheus',
      description: 'Software Engineer',
      place: 'Brasilia-DF',
      following: [{ username: 'z' }],
    },
    {
      username: 'x',
      completeName: 'xxxx',
      description: 'Software Engineer',
      place: 'São Paulo-SP',
      following: [{ username: 'lucassiqz' }],
    },
    {
      username: 'y',
      description: 'Software Engineer',
      place: 'Rio de Janeiro-RJ',
      completeName: 'yyyy',
      following: [],
    },
  ]);
  const [loggedUser, setLoggedUser] = useState<User | null>(users[0]);

  useEffect(() => {
    const newLoggedUser = users.find(
      (user) => user.username === loggedUser?.username,
    );

    setLoggedUser(newLoggedUser as User);

    // eslint-disable-next-line
  }, [users]);

  const removeFollowers = useCallback((BFSResult: number[][]): number[][] => {
    return BFSResult.filter((node) => node[1] !== 1);
  }, []);

  const bfs = useCallback(
    (startingNode: User): number[][] => {
      const graph = [] as number[][];

      const visited = [] as boolean[];

      for (let i = 0; i < users.length; i++) {
        visited[i] = false;
      }

      const queue = [] as number[][];

      const startingNodeIndex = users.findIndex(
        (user) => user.username === startingNode.username,
      );

      visited[startingNodeIndex] = true;

      queue[0] = [startingNodeIndex, 0];

      while (queue.length > 0) {
        const getQueueElement = queue.shift() as number[];
        graph.push(getQueueElement);

        const getList = users[getQueueElement[0]].following;

        getList.forEach((user) => {
          const neighIndex = users.findIndex(
            (usr) => usr.username === user.username,
          );
          if (!visited[neighIndex]) {
            visited[neighIndex] = true;
            const next = [neighIndex, getQueueElement[1] + 1];
            queue[queue.length] = next;
          }
        });
      }
      const cleanGraph = removeFollowers(graph.slice(1));
      return cleanGraph;
    },
    [users, removeFollowers],
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
