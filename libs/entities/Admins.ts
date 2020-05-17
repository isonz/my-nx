import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admins", { schema: "my_nx" })
export class Admins {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "account", comment: "用户名", length: 16 })
  account: string;

  @Column("char", { name: "slat", comment: "密码加盐", length: 10 })
  slat: string;

  @Column("char", { name: "password", comment: "密码", length: 64 })
  password: string;

  @Column("varchar", { name: "nickname", comment: "昵称", length: 16 })
  nickname: string;

  @Column("varchar", {
    name: "avatar",
    nullable: true,
    comment: "头像",
    length: 255,
  })
  avatar: string | null;

  @Column("datetime", {
    name: "create_at",
    nullable: true,
    comment: "创建时间",
  })
  createAt: Date | null;

  @Column("datetime", {
    name: "update_at",
    nullable: true,
    comment: "更新时间",
  })
  updateAt: Date | null;
}
