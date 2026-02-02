import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import OngoingWork from '@/app/models/OngoingWork';
import { getSession } from '@/lib/auth';

interface OngoingWorkDocument {
  _id: any;
  [key: string]: any;
}

// GET all ongoing work items
export async function GET() {
  try {
    await connectDB();
    const items = await OngoingWork.find({}).lean();

    const formatted = (items as OngoingWorkDocument[]).map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching ongoing work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ongoing work' },
      { status: 500 }
    );
  }
}

// POST new ongoing work item
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const item = await OngoingWork.create({
      title: data.title,
      description: data.description,
      status: data.status,
      progress: data.progress,
    });

    return NextResponse.json(
      {
        ...item.toObject(),
        id: item._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating ongoing work:', error);
    return NextResponse.json(
      { error: 'Failed to create ongoing work' },
      { status: 500 }
    );
  }
}
