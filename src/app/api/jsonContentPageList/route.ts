import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(){

    try{
       

        const pathDir = path.join(process.cwd(), 'src', '_data','jsonFromData');
        const files = await fs.readdir(pathDir);

    const data = await Promise.all(files.map(async (file) => {
            const filePath = path.join(pathDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return { fileName: file, content: JSON.parse(fileContent) };
        }));

        return NextResponse.json({data, status:200});

    }catch(error){
       return NextResponse.json({message: 'something went wrong', status: 500});
    }

}