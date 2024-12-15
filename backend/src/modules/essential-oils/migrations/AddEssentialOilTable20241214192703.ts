import { Migration } from "@mikro-orm/migrations";

export class AddEssentialOilTable20241214192703 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table if not exists "essential_oil" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "essential_oil_pkey" primary key ("id"));'
    );
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_essential_oil_deleted_at" ON "essential_oil" (deleted_at) WHERE deleted_at IS NULL;'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "essential_oil" cascade;');
  }
}
