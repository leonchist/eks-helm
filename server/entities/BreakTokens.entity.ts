import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "break_tokens",
})
export class BreakTokensEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "token", nullable: true })
  token: string;
}
