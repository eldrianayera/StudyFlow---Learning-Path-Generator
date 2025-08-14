-- CreateTable
CREATE TABLE "public"."Roadmap" (
    "id" TEXT NOT NULL,
    "userClerkId" TEXT NOT NULL,
    "roadMap" JSONB NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Roadmap" ADD CONSTRAINT "Roadmap_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "public"."User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
