import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "todo",
})
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "title", nullable: true })
  title: string;

  @Column({ name: "description", nullable: true })
  description: string;

  @Column({ name: "user_id", nullable: true })
  user_id: number;

  @Column({ name: "status", default: "TODO" })
  status: string;
}
