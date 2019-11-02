
export class ApiEndpoints {

  public static readonly SERVER_URL = 'http://localhost:3000';

  public static readonly GET_USERS_API = ApiEndpoints.SERVER_URL + '/api/user/all';
  public static readonly FIND_USER_API = ApiEndpoints.SERVER_URL + '/api/user/findone';

  public static readonly HOME_URL = ApiEndpoints.SERVER_URL + '/home';

}
