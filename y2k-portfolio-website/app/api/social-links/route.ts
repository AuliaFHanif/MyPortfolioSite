import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SocialLink from '@/app/models/SocialLink';
import { getSession } from '@/lib/auth';

interface SocialLinkDocument {
  _id: any;
  [key: string]: any;
}

// GET all social links
export async function GET() {
  try {
    await connectDB();
    const socialLinks = await SocialLink.find({}).sort({ order: 1 }).lean();
    
    const formattedLinks = (socialLinks as SocialLinkDocument[]).map((link: SocialLinkDocument) => ({
      ...link,
      _id: link._id.toString(),
    }));
    
    return NextResponse.json(formattedLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social links' },
      { status: 500 }
    );
  }
}

// POST new social link
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    const socialLink = await SocialLink.create({
      name: data.name,
      url: data.url,
      icon: data.icon,
      order: data.order || 0,
    });

    return NextResponse.json({
      ...socialLink.toObject(),
      id: socialLink._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating social link:', error);
    return NextResponse.json(
      { error: 'Failed to create social link' },
      { status: 500 }
    );
  }
}