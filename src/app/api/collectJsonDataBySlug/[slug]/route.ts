import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type paramsProps = {
    params: {
        slug: string
    }
}

export async function GET(request: NextRequest, {params}: paramsProps ){

    const {slug} = params;

    if(!slug){
        return NextResponse.json({message: `${slug} is not avaliable.`, status: 400});
    }

    try{
    const pathDir = path.join(process.cwd(), 'src', '_data','jsonFromData');
    const filePath = path.join(pathDir, `${slug}.json`);

    const fileData = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({message: JSON.parse(fileData), status: 200});

    }catch(error){
      throw new Error("file not able to access or avaliable.");
    }


}