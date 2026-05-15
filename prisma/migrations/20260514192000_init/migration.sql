CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "technologies" TEXT[] NOT NULL,
  "features" TEXT[] NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Demo',
  "imageUrl" TEXT NOT NULL DEFAULT '',
  "githubUrl" TEXT NOT NULL DEFAULT '#',
  "demoUrl" TEXT NOT NULL DEFAULT '#',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
