import { requireAdmin } from "@/app/data/admin/require-admin";
import { ajProtection, handleArcjetDecisionRoute } from "@/hooks/aj-protection";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3-client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const aj = ajProtection({
  window: "1m", // Max numbers of courses that user can delete is 5 courses in 1 min
  max: 5,
});

export async function DELETE(request: Request) {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });
    const denialResponse = handleArcjetDecisionRoute(decision);
    if (denialResponse) return denialResponse;

    const body = await request.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json(
        { error: "Missing or invalid object key" },
        { status: 400 },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid object key" },
      { status: 500 },
    );
  }
}
