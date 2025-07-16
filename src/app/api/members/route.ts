import { clerkClient, auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("API /api/members wywołane");
  try {
    // Sprawdź, czy użytkownik jest zalogowany
    const session = await auth();
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 },
      );
    }

    // Create a new user in Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.createUser({
      emailAddress: [email],
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      // Skip password, Clerk will send a magic link to the user
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Błąd API:', error);
    return NextResponse.json(
      {
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
