import { fetchAllUsers } from '../constants/fetch.constants'

const fetchAllUsersReducer = (users = {}, action) => {
  switch (action.type) {
    case fetchAllUsers.FETCH_ALL_USERS_SUCCESS:
      return action.payload;

    case fetchAllUsers.FETCH_ALL_USERS_FAILURE:
    case fetchAllUsers.FETCH_ALL_USERS_START:
    default:
      return users
  }
};

export default fetchAllUsersReducer
