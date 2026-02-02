import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Skill from '@/app/models/Skills';
import { getSession } from '@/lib/auth';

interface SkillDocument {
  _id: any;
  [key: string]: any;
}

// GET all skills
export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find({}).lean();
    
    const formattedSkills = (skills as SkillDocument[]).map((skill: SkillDocument) => ({
      ...skill,
      _id: skill._id.toString(),
    }));
    
    return NextResponse.json(formattedSkills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    const skill = await Skill.create({
      name: data.name,
      category: data.category,
      level: data.level,

    });

    return NextResponse.json({
      ...skill.toObject(),
      id: skill._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}