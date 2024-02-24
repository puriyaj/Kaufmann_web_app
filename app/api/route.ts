import { NextResponse } from 'next/server';
import { hashSync } from 'bcrypt-ts';
import { prisma } from '@utils/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const existEmail = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existEmail) {
      return NextResponse.json({ user: null, message: 'Email already exist' }, { status: 409 });
    }
    //const existname = await prisma.user.findUnique({
    // where: {name:name}
    // })
    // return NextResponse.json({user:null , message: "User name already exist"},{status:409})
    // }
    const hashedPass = await hashSync(password, 10);
    const newUsr = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });
    const { password: newUsrPassword, ...rest } = newUsr;
    return NextResponse.json({ user: rest, message: 'user created successfully' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
