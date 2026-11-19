import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_categories_tint" AS ENUM('sand', 'clay', 'ocean', 'cream', 'paper');
  CREATE TYPE "public"."enum_guides_type" AS ENUM('Packing list', 'Round-up', 'How-to');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_type" AS ENUM('Packing list', 'Round-up', 'How-to');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_shop_collections_tint" AS ENUM('sand', 'clay', 'ocean', 'cream', 'paper');
  CREATE TYPE "public"."enum_messages_source" AS ENUM('contact', 'work-with-me');
  CREATE TABLE "posts_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"top_pick_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"slug" varchar,
  	"category_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated" timestamp(3) with time zone,
  	"read_min" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_posts_v_version_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"top_pick_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_image_id" integer,
  	"version_caption" varchar,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated" timestamp(3) with time zone,
  	"version_read_min" numeric DEFAULT 5,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"intro" varchar,
  	"slug" varchar NOT NULL,
  	"tint" "enum_categories_tint" DEFAULT 'cream' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "guides_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "guides_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"top_pick_id" integer
  );
  
  CREATE TABLE "guides_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cells" varchar
  );
  
  CREATE TABLE "guides_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "guides_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"top_pick_id" integer,
  	"comparison_columns" varchar,
  	"slug" varchar,
  	"type" "enum_guides_type" DEFAULT 'How-to',
  	"featured" boolean,
  	"last_updated" timestamp(3) with time zone,
  	"read_min" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "guides_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_guides_v_version_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_caption" varchar,
  	"top_pick_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_version_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cells" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_version_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_image_id" integer,
  	"version_caption" varchar,
  	"version_top_pick_id" integer,
  	"version_comparison_columns" varchar,
  	"version_slug" varchar,
  	"version_type" "enum__guides_v_version_type" DEFAULT 'How-to',
  	"version_featured" boolean,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_read_min" numeric DEFAULT 5,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_guides_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"note" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"store" varchar DEFAULT 'Shopee' NOT NULL,
  	"url" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"shop_collections_id" integer
  );
  
  CREATE TABLE "shop_collections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"slug" varchar NOT NULL,
  	"tint" "enum_shop_collections_tint" DEFAULT 'cream' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"topic" varchar,
  	"message" varchar NOT NULL,
  	"source" "enum_messages_source" DEFAULT 'contact',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"guides_id" integer,
  	"products_id" integer,
  	"shop_collections_id" integer,
  	"media_id" integer,
  	"subscribers_id" integer,
  	"messages_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"place" varchar NOT NULL,
  	"post_id" integer
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_collection_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "posts_takeaways" ADD CONSTRAINT "posts_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_top_pick_id_products_id_fk" FOREIGN KEY ("top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_takeaways" ADD CONSTRAINT "_posts_v_version_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sections" ADD CONSTRAINT "_posts_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sections" ADD CONSTRAINT "_posts_v_version_sections_top_pick_id_products_id_fk" FOREIGN KEY ("top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sections" ADD CONSTRAINT "_posts_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_takeaways" ADD CONSTRAINT "guides_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_sections" ADD CONSTRAINT "guides_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_sections" ADD CONSTRAINT "guides_sections_top_pick_id_products_id_fk" FOREIGN KEY ("top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_sections" ADD CONSTRAINT "guides_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_comparison_rows" ADD CONSTRAINT "guides_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_checklist" ADD CONSTRAINT "guides_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_faq" ADD CONSTRAINT "guides_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_top_pick_id_products_id_fk" FOREIGN KEY ("top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_takeaways" ADD CONSTRAINT "_guides_v_version_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_sections" ADD CONSTRAINT "_guides_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_version_sections" ADD CONSTRAINT "_guides_v_version_sections_top_pick_id_products_id_fk" FOREIGN KEY ("top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_version_sections" ADD CONSTRAINT "_guides_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_comparison_rows" ADD CONSTRAINT "_guides_v_version_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_checklist" ADD CONSTRAINT "_guides_v_version_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_faq" ADD CONSTRAINT "_guides_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_top_pick_id_products_id_fk" FOREIGN KEY ("version_top_pick_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_shop_collections_fk" FOREIGN KEY ("shop_collections_id") REFERENCES "public"."shop_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_collections" ADD CONSTRAINT "shop_collections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shop_collections_fk" FOREIGN KEY ("shop_collections_id") REFERENCES "public"."shop_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_moments" ADD CONSTRAINT "home_moments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_moments" ADD CONSTRAINT "home_moments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_moments" ADD CONSTRAINT "home_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_featured_collection_id_shop_collections_id_fk" FOREIGN KEY ("featured_collection_id") REFERENCES "public"."shop_collections"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_takeaways_order_idx" ON "posts_takeaways" USING btree ("_order");
  CREATE INDEX "posts_takeaways_parent_id_idx" ON "posts_takeaways" USING btree ("_parent_id");
  CREATE INDEX "posts_sections_order_idx" ON "posts_sections" USING btree ("_order");
  CREATE INDEX "posts_sections_parent_id_idx" ON "posts_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_sections_image_idx" ON "posts_sections" USING btree ("image_id");
  CREATE INDEX "posts_sections_top_pick_idx" ON "posts_sections" USING btree ("top_pick_id");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_products_id_idx" ON "posts_rels" USING btree ("products_id");
  CREATE INDEX "_posts_v_version_takeaways_order_idx" ON "_posts_v_version_takeaways" USING btree ("_order");
  CREATE INDEX "_posts_v_version_takeaways_parent_id_idx" ON "_posts_v_version_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sections_order_idx" ON "_posts_v_version_sections" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sections_parent_id_idx" ON "_posts_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sections_image_idx" ON "_posts_v_version_sections" USING btree ("image_id");
  CREATE INDEX "_posts_v_version_sections_top_pick_idx" ON "_posts_v_version_sections" USING btree ("top_pick_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_image_idx" ON "_posts_v" USING btree ("version_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_products_id_idx" ON "_posts_v_rels" USING btree ("products_id");
  CREATE INDEX "categories__order_idx" ON "categories" USING btree ("_order");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "guides_takeaways_order_idx" ON "guides_takeaways" USING btree ("_order");
  CREATE INDEX "guides_takeaways_parent_id_idx" ON "guides_takeaways" USING btree ("_parent_id");
  CREATE INDEX "guides_sections_order_idx" ON "guides_sections" USING btree ("_order");
  CREATE INDEX "guides_sections_parent_id_idx" ON "guides_sections" USING btree ("_parent_id");
  CREATE INDEX "guides_sections_image_idx" ON "guides_sections" USING btree ("image_id");
  CREATE INDEX "guides_sections_top_pick_idx" ON "guides_sections" USING btree ("top_pick_id");
  CREATE INDEX "guides_comparison_rows_order_idx" ON "guides_comparison_rows" USING btree ("_order");
  CREATE INDEX "guides_comparison_rows_parent_id_idx" ON "guides_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "guides_checklist_order_idx" ON "guides_checklist" USING btree ("_order");
  CREATE INDEX "guides_checklist_parent_id_idx" ON "guides_checklist" USING btree ("_parent_id");
  CREATE INDEX "guides_faq_order_idx" ON "guides_faq" USING btree ("_order");
  CREATE INDEX "guides_faq_parent_id_idx" ON "guides_faq" USING btree ("_parent_id");
  CREATE INDEX "guides_image_idx" ON "guides" USING btree ("image_id");
  CREATE INDEX "guides_top_pick_idx" ON "guides" USING btree ("top_pick_id");
  CREATE UNIQUE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "guides_rels_order_idx" ON "guides_rels" USING btree ("order");
  CREATE INDEX "guides_rels_parent_idx" ON "guides_rels" USING btree ("parent_id");
  CREATE INDEX "guides_rels_path_idx" ON "guides_rels" USING btree ("path");
  CREATE INDEX "guides_rels_products_id_idx" ON "guides_rels" USING btree ("products_id");
  CREATE INDEX "_guides_v_version_takeaways_order_idx" ON "_guides_v_version_takeaways" USING btree ("_order");
  CREATE INDEX "_guides_v_version_takeaways_parent_id_idx" ON "_guides_v_version_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_version_sections_order_idx" ON "_guides_v_version_sections" USING btree ("_order");
  CREATE INDEX "_guides_v_version_sections_parent_id_idx" ON "_guides_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_version_sections_image_idx" ON "_guides_v_version_sections" USING btree ("image_id");
  CREATE INDEX "_guides_v_version_sections_top_pick_idx" ON "_guides_v_version_sections" USING btree ("top_pick_id");
  CREATE INDEX "_guides_v_version_comparison_rows_order_idx" ON "_guides_v_version_comparison_rows" USING btree ("_order");
  CREATE INDEX "_guides_v_version_comparison_rows_parent_id_idx" ON "_guides_v_version_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_version_checklist_order_idx" ON "_guides_v_version_checklist" USING btree ("_order");
  CREATE INDEX "_guides_v_version_checklist_parent_id_idx" ON "_guides_v_version_checklist" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_version_faq_order_idx" ON "_guides_v_version_faq" USING btree ("_order");
  CREATE INDEX "_guides_v_version_faq_parent_id_idx" ON "_guides_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_image_idx" ON "_guides_v" USING btree ("version_image_id");
  CREATE INDEX "_guides_v_version_version_top_pick_idx" ON "_guides_v" USING btree ("version_top_pick_id");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v" USING btree ("version_slug");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "_guides_v_rels_order_idx" ON "_guides_v_rels" USING btree ("order");
  CREATE INDEX "_guides_v_rels_parent_idx" ON "_guides_v_rels" USING btree ("parent_id");
  CREATE INDEX "_guides_v_rels_path_idx" ON "_guides_v_rels" USING btree ("path");
  CREATE INDEX "_guides_v_rels_products_id_idx" ON "_guides_v_rels" USING btree ("products_id");
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_shop_collections_id_idx" ON "products_rels" USING btree ("shop_collections_id");
  CREATE INDEX "shop_collections__order_idx" ON "shop_collections" USING btree ("_order");
  CREATE INDEX "shop_collections_image_idx" ON "shop_collections" USING btree ("image_id");
  CREATE UNIQUE INDEX "shop_collections_slug_idx" ON "shop_collections" USING btree ("slug");
  CREATE INDEX "shop_collections_updated_at_idx" ON "shop_collections" USING btree ("updated_at");
  CREATE INDEX "shop_collections_created_at_idx" ON "shop_collections" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_shop_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("shop_collections_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_moments_order_idx" ON "home_moments" USING btree ("_order");
  CREATE INDEX "home_moments_parent_id_idx" ON "home_moments" USING btree ("_parent_id");
  CREATE INDEX "home_moments_image_idx" ON "home_moments" USING btree ("image_id");
  CREATE INDEX "home_moments_post_idx" ON "home_moments" USING btree ("post_id");
  CREATE INDEX "home_featured_collection_idx" ON "home" USING btree ("featured_collection_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_takeaways" CASCADE;
  DROP TABLE "posts_sections" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_takeaways" CASCADE;
  DROP TABLE "_posts_v_version_sections" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "guides_takeaways" CASCADE;
  DROP TABLE "guides_sections" CASCADE;
  DROP TABLE "guides_comparison_rows" CASCADE;
  DROP TABLE "guides_checklist" CASCADE;
  DROP TABLE "guides_faq" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "guides_rels" CASCADE;
  DROP TABLE "_guides_v_version_takeaways" CASCADE;
  DROP TABLE "_guides_v_version_sections" CASCADE;
  DROP TABLE "_guides_v_version_comparison_rows" CASCADE;
  DROP TABLE "_guides_v_version_checklist" CASCADE;
  DROP TABLE "_guides_v_version_faq" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  DROP TABLE "_guides_v_rels" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "shop_collections" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_moments" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_categories_tint";
  DROP TYPE "public"."enum_guides_type";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum__guides_v_version_type";
  DROP TYPE "public"."enum__guides_v_version_status";
  DROP TYPE "public"."enum_shop_collections_tint";
  DROP TYPE "public"."enum_messages_source";`)
}
