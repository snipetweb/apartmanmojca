import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "calendar.json");

export async function GET() {
  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { availableDates, password } = body;

  if (password !== process.env.CALENDAR_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await fs.writeFile(
    filePath,
    JSON.stringify(
      {
        availableDates: availableDates ?? [],
      },
      null,
      2
    )
  );

  return NextResponse.json({ success: true });
}