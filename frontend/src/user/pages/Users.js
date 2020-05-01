import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Raiden Dilan',
      image: 'https://cdn.pixabay.com/photo/2020/03/23/08/45/cat-4959941_1280.jpg',
      places: 3
    }
  ];

  return <UsersList items={ USERS } />;
};

export default Users;
