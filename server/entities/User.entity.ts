import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "user",
})
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "email", nullable: true })
  email: string;
}
