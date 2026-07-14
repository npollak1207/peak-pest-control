import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

// Hands the browser a short-lived token so estimate-form photos upload straight
// to Vercel Blob, instead of routing megabytes of image through the function
// (which caps request bodies at ~4.5MB). Needs BLOB_READ_WRITE_TOKEN, which
// Vercel adds automatically once a Blob store is linked to the project.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as HandleUploadBody;
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error(
        "blob upload: BLOB_READ_WRITE_TOKEN missing — connect the Blob store to this project and redeploy",
      );
    }
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/heic",
          "image/heif",
        ],
        maximumSizeInBytes: 15 * 1024 * 1024, // 15MB per photo
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // nothing to do — the browser passes the returned URL along with the lead
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("blob upload failed:", (err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }
}
