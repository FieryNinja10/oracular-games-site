import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  email: string;
  password: string;
}

export const POST = async (request: Request) => {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  });

  const bcryptResponse = await bcrypt.compare(body.password, user.password);

  if (user && bcryptResponse) {
    const { password, userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
};
