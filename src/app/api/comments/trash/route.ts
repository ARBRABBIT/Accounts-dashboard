import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const TRASH_DIR = path.join(process.cwd(), 'src/data/trash');
const TRASH_FILE_PATH = path.join(TRASH_DIR, 'comments.json');

async function ensureFileExists() {
  try {
    await fs.mkdir(TRASH_DIR, { recursive: true });
    await fs.access(TRASH_FILE_PATH);
  } catch {
    await fs.writeFile(TRASH_FILE_PATH, '[]', 'utf-8');
  }
}

export async function GET() {
  try {
    await ensureFileExists();
    const data = await fs.readFile(TRASH_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error reading trash comments file:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureFileExists();
    const body = await request.json();
    const comment = body.comment || body;

    if (!comment || !comment.id) {
      return NextResponse.json({ error: 'Invalid comment payload' }, { status: 400 });
    }

    let trashList = [];
    try {
      const data = await fs.readFile(TRASH_FILE_PATH, 'utf-8');
      trashList = JSON.parse(data);
      if (!Array.isArray(trashList)) trashList = [];
    } catch {
      trashList = [];
    }

    const trashedItem = {
      ...comment,
      deletedAt: comment.deletedAt || new Date().toISOString(),
    };

    // Deduplicate by ID and prepend newest deleted first
    const updated = [trashedItem, ...trashList.filter((item: { id: string }) => item.id !== trashedItem.id)];

    await fs.writeFile(TRASH_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');

    return NextResponse.json({ success: true, item: trashedItem, totalInTrash: updated.length });
  } catch (error) {
    console.error('Failed to append comment to trash file:', error);
    return NextResponse.json({ error: 'Failed to write to trash' }, { status: 500 });
  }
}

