import { promises as fs} from 'fs';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';


export async function DELETE(request: NextRequest, {params}:{params: {slug: string}}) {

    const { slug } = params;

    if (!slug) {
        return NextResponse.json({ error: 'slug is required' }, { status: 400 });
      }
    const dirPath = path.join(process.cwd(), 'src', '_data','jsonFromData');
    const sanitizedSlug = slug.trim(); // Trim any extra whitespace
    const filePath = path.join(dirPath, `${sanitizedSlug}.json`);

    // Check if the file exists
    try {
        await fs.access(filePath);
        console.log(`File exists at: ${filePath}`);
      } catch (err) {
        console.error(`File does not exist or cannot be accessed: ${filePath}`);
        return NextResponse.json({ error: `File does not exist: ${filePath}`, status: 404 });
      }

    try{
        //await fs.access(filePath);
        await unlink(filePath);
        return NextResponse.json({ message: filePath }, { status: 200 });

    }catch(error){
        return NextResponse.json({message: 'something went wrong.', status: 500});
    }



}
