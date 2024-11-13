declare namespace Express {
  export interface RequestCookies {
    token: string;
  }

  export interface Request {
    authUser: import('../backend/src/modules/accounts/entities/user.entity').UserDetails;
    port: number;
  }
}
