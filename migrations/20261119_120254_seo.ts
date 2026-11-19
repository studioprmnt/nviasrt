import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'nviasrt',
  	"site_description" varchar,
  	"site_image_id" integer,
  	"home_title" varchar,
  	"home_description" varchar,
  	"home_image_id" integer,
  	"home_no_index" boolean DEFAULT false,
  	"chronicles_title" varchar,
  	"chronicles_description" varchar,
  	"chronicles_image_id" integer,
  	"chronicles_no_index" boolean DEFAULT false,
  	"guides_title" varchar,
  	"guides_description" varchar,
  	"guides_image_id" integer,
  	"guides_no_index" boolean DEFAULT false,
  	"shop_title" varchar,
  	"shop_description" varchar,
  	"shop_image_id" integer,
  	"shop_no_index" boolean DEFAULT false,
  	"about_title" varchar,
  	"about_description" varchar,
  	"about_image_id" integer,
  	"about_no_index" boolean DEFAULT false,
  	"work_with_me_title" varchar,
  	"work_with_me_description" varchar,
  	"work_with_me_image_id" integer,
  	"work_with_me_no_index" boolean DEFAULT false,
  	"contact_title" varchar,
  	"contact_description" varchar,
  	"contact_image_id" integer,
  	"contact_no_index" boolean DEFAULT false,
  	"search_title" varchar,
  	"search_description" varchar,
  	"search_image_id" integer,
  	"search_no_index" boolean DEFAULT true,
  	"privacy_title" varchar,
  	"privacy_description" varchar,
  	"privacy_image_id" integer,
  	"privacy_no_index" boolean DEFAULT false,
  	"terms_title" varchar,
  	"terms_description" varchar,
  	"terms_image_id" integer,
  	"terms_no_index" boolean DEFAULT false,
  	"affiliate_disclosure_title" varchar,
  	"affiliate_disclosure_description" varchar,
  	"affiliate_disclosure_image_id" integer,
  	"affiliate_disclosure_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_no_index" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_no_index" boolean;
  ALTER TABLE "categories" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "meta_no_index" boolean;
  ALTER TABLE "guides" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "guides" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "guides" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "guides" ADD COLUMN "meta_no_index" boolean;
  ALTER TABLE "_guides_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_guides_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_guides_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_guides_v" ADD COLUMN "version_meta_no_index" boolean;
  ALTER TABLE "shop_collections" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "shop_collections" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "shop_collections" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "shop_collections" ADD COLUMN "meta_no_index" boolean;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_site_image_id_media_id_fk" FOREIGN KEY ("site_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_home_image_id_media_id_fk" FOREIGN KEY ("home_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_chronicles_image_id_media_id_fk" FOREIGN KEY ("chronicles_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_guides_image_id_media_id_fk" FOREIGN KEY ("guides_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_shop_image_id_media_id_fk" FOREIGN KEY ("shop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_work_with_me_image_id_media_id_fk" FOREIGN KEY ("work_with_me_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_contact_image_id_media_id_fk" FOREIGN KEY ("contact_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_search_image_id_media_id_fk" FOREIGN KEY ("search_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_privacy_image_id_media_id_fk" FOREIGN KEY ("privacy_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_terms_image_id_media_id_fk" FOREIGN KEY ("terms_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_affiliate_disclosure_image_id_media_id_fk" FOREIGN KEY ("affiliate_disclosure_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "seo_site_image_idx" ON "seo" USING btree ("site_image_id");
  CREATE INDEX "seo_home_home_image_idx" ON "seo" USING btree ("home_image_id");
  CREATE INDEX "seo_chronicles_chronicles_image_idx" ON "seo" USING btree ("chronicles_image_id");
  CREATE INDEX "seo_guides_guides_image_idx" ON "seo" USING btree ("guides_image_id");
  CREATE INDEX "seo_shop_shop_image_idx" ON "seo" USING btree ("shop_image_id");
  CREATE INDEX "seo_about_about_image_idx" ON "seo" USING btree ("about_image_id");
  CREATE INDEX "seo_work_with_me_work_with_me_image_idx" ON "seo" USING btree ("work_with_me_image_id");
  CREATE INDEX "seo_contact_contact_image_idx" ON "seo" USING btree ("contact_image_id");
  CREATE INDEX "seo_search_search_image_idx" ON "seo" USING btree ("search_image_id");
  CREATE INDEX "seo_privacy_privacy_image_idx" ON "seo" USING btree ("privacy_image_id");
  CREATE INDEX "seo_terms_terms_image_idx" ON "seo" USING btree ("terms_image_id");
  CREATE INDEX "seo_affiliate_disclosure_affiliate_disclosure_image_idx" ON "seo" USING btree ("affiliate_disclosure_image_id");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shop_collections" ADD CONSTRAINT "shop_collections_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories" USING btree ("meta_image_id");
  CREATE INDEX "guides_meta_meta_image_idx" ON "guides" USING btree ("meta_image_id");
  CREATE INDEX "_guides_v_version_meta_version_meta_image_idx" ON "_guides_v" USING btree ("version_meta_image_id");
  CREATE INDEX "shop_collections_meta_meta_image_idx" ON "shop_collections" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "seo" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "seo" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_meta_image_id_media_id_fk";
  
  ALTER TABLE "guides" DROP CONSTRAINT "guides_meta_image_id_media_id_fk";
  
  ALTER TABLE "_guides_v" DROP CONSTRAINT "_guides_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "shop_collections" DROP CONSTRAINT "shop_collections_meta_image_id_media_id_fk";
  
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "categories_meta_meta_image_idx";
  DROP INDEX "guides_meta_meta_image_idx";
  DROP INDEX "_guides_v_version_meta_version_meta_image_idx";
  DROP INDEX "shop_collections_meta_meta_image_idx";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_no_index";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "categories" DROP COLUMN "meta_title";
  ALTER TABLE "categories" DROP COLUMN "meta_description";
  ALTER TABLE "categories" DROP COLUMN "meta_image_id";
  ALTER TABLE "categories" DROP COLUMN "meta_no_index";
  ALTER TABLE "guides" DROP COLUMN "meta_title";
  ALTER TABLE "guides" DROP COLUMN "meta_description";
  ALTER TABLE "guides" DROP COLUMN "meta_image_id";
  ALTER TABLE "guides" DROP COLUMN "meta_no_index";
  ALTER TABLE "_guides_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_guides_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_guides_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_guides_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "shop_collections" DROP COLUMN "meta_title";
  ALTER TABLE "shop_collections" DROP COLUMN "meta_description";
  ALTER TABLE "shop_collections" DROP COLUMN "meta_image_id";
  ALTER TABLE "shop_collections" DROP COLUMN "meta_no_index";`)
}
