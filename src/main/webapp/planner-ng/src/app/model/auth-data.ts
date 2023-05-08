export class AuthData {

  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  isValidToken(): boolean {
    return this.accessToken !== null && this.accessToken.length > 0;
  }

  get access_token(): string {
    return this.accessToken;
  }

  get refresh_token(): string {
    return this.refreshToken;
  }
}
