/* eslint-disable */
export const users: any[] = [];

class User {
  id: string;
  name: string;
  lastName: string;
  login: string;
  password: string;

  constructor({
    name,
    lastName,
    login,
    password,
  }: any = {}) {
    this.id = (+(users[users.length - 1]?.id || 0) + 1).toString();
    this.name = name;
    this.lastName = lastName;
    this.login = login;
    this.password = password;
  }
}

users.push(new User({
  name: 'Иван',
  lastName: 'Иванов',
  login: 'ivan',
  password: 'test',
}));

export const getUsers = () => Promise.resolve(users);

export const getUser = (params: any) => Promise.resolve(users[0]);

export const getUserById = (id: string) => Promise.resolve(users.find((user) => user.id === id));

export const createUser = (user: any) => Promise.resolve(
  users.push(new User(user)) && users[users.length - 1],
);

export const updateUser = (id: string, data: any) => {
  const userInd = users.findIndex((user) => user.id === id);
  return Promise.resolve(users.splice(userInd, 1, { ...users[userInd], ...data })[0]);
};

export const deleteUser = (id: string) => Promise.resolve(
  users.splice(users.findIndex((user) => user.id === id), 1)[0],
);
