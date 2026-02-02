import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certification from '@/app/models/Certification';
import { getSession } from '@/lib/auth';

interface CertificationDocument {
  _id: any;
  [key: string]: any;
}

// GET all certifications
export async function GET() {
  try {
    await connectDB();
    const certifications = await Certification.find({}).sort({ order: 1 }).lean();
    
    const formattedCertifications = (certifications as CertificationDocument[]).map((cert: CertificationDocument) => ({
      ...cert,
      _id: cert._id.toString(),
    }));
    
    return NextResponse.json(formattedCertifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

// POST new certification
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    const certification = await Certification.create({
      slug: data.slug,
      name: data.name,
      issuer: data.issuer,
      date: data.date,
      credentialId: data.credentialId,
      credentialUrl: data.credentialUrl,
      icon: data.icon,
      order: data.order || 0,
    });

    return NextResponse.json({
      ...certification.toObject(),
      id: certification._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 500 }
    );
  }
}