import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import OngoingWork from '@/app/models/OngoingWork';
import { getSession } from '@/lib/auth';

// GET single ongoing work item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const item = await OngoingWork.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        { error: 'Ongoing work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...item,
      id: item._id.toString(),
    });
  } catch (error) {
    console.error('Error fetching ongoing work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ongoing work' },
      { status: 500 }
    );
  }
}

// PUT update ongoing work item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const data = await request.json();

    const item = await OngoingWork.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        status: data.status,
        progress: data.progress,
      },
      { new: true }
    );

    if (!item) {
      return NextResponse.json(
        { error: 'Ongoing work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...item.toObject(),
      id: item._id.toString(),
    });
  } catch (error) {
    console.error('Error updating ongoing work:', error);
    return NextResponse.json(
      { error: 'Failed to update ongoing work' },
      { status: 500 }
    );
  }
}

// DELETE ongoing work item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const item = await OngoingWork.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json(
        { error: 'Ongoing work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ongoing work:', error);
    return NextResponse.json(
      { error: 'Failed to delete ongoing work' },
      { status: 500 }
    );
  }
}
