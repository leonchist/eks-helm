import { Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class CoreEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "created_by", type: "bigint" })
  createdBy: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "updated_by", type: "bigint" })
  updatedBy: number;
}
