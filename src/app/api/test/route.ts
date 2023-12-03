import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const data = await req.json();

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
};
