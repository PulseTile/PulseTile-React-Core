import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { usersUrls } from '../constants/server-urls.constants'
import { fetchAllUsers } from '../constants/fetch.constants'
import { fetchAllUsersStart, fetchAllUsersSuccess, fetchAllUsersFailure } from '../actions/fetch.actions'

// epic
const fetchAllUsersEpic = action$ =>
  action$.ofType(fetchAllUsers.FETCH_ALL_USERS_START)
    .mergeMap(action =>
      ajax.getJSON(usersUrls.ALL_USERS_URL, {
        crossDomain: true,
        withCredentials: true,
        method: 'GET',
        headers: {
          Cookie: 'JSESSIONID=3e0ba540-563b-4760-b671-6b40c1951507',
        },
      })
        .map(response => fetchAllUsersSuccess(response))
        .catch(error => Observable.of(fetchAllUsersFailure(error)))
    );

export default fetchAllUsersEpic
