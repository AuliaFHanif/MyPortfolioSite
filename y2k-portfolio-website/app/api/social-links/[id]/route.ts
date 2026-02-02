import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SocialLink from '@/app/models/SocialLink';
import { getSession } from '@/lib/auth';

// GET single social link
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const socialLink = await SocialLink.findById(id).lean();

    if (!socialLink) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...socialLink,
      id: socialLink._id.toString(),
    });
  } catch (error) {
    console.error('Error fetching social link:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social link' },
      { status: 500 }
    );
  }
}

// PUT update social link
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

    const socialLink = await SocialLink.findByIdAndUpdate(
      id,
      {
        name: data.name,
        url: data.url,
        icon: data.icon,
      },
      { new: true }
    );

    if (!socialLink) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...socialLink.toObject(),
      id: socialLink._id.toString(),
    });
  } catch (error) {
    console.error('Error updating social link:', error);
    return NextResponse.json(
      { error: 'Failed to update social link' },
      { status: 500 }
    );
  }
}

// DELETE social link
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
    const socialLink = await SocialLink.findByIdAndDelete(id);

    if (!socialLink) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting social link:', error);
    return NextResponse.json(
      { error: 'Failed to delete social link' },
      { status: 500 }
    );
  }
}