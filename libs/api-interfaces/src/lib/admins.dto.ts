export interface AdminsDto {
  id: number;
  account: string;
  token: string;
  permissions: string;
  nickname: string;
  avatar: string;
  createAt: Date;
  updateAt: Date;
}

export interface AdminsLoginDto {
  id: number;
  account: string;
  token: string;
  permissions: string;
  nickname: string;
  avatar: string;
}
