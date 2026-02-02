import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/app/models/Project';
import { getSession } from '@/lib/auth';

interface ProjectDocument {
  _id: any;
  [key: string]: any;
}

// GET all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ order: 1 }).lean();
    
    const formattedProjects = (projects as ProjectDocument[]).map((project: ProjectDocument) => ({
      ...project,
      _id: project._id.toString(),
    }));
    
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    const project = await Project.create({
      slug: data.slug,
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      tags: data.tags,
      images: data.images,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      featured: data.featured || false,
      order: data.order || 0,
    });

    return NextResponse.json({
      ...project.toObject(),
      id: project._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}