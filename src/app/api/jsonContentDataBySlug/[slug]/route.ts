import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

type paramsProps = {
    params: {
        slug: string
    }
}

export async function GET(request: NextRequest, {params}: paramsProps){
    const {slug} = params;
    try{
       
        if(!slug){ throw new Response("api not working ..."); }

        const dirPath = path.join(process.cwd(), 'src', '_data', 'jsonContentData');
        const filePath = path.join(dirPath, slug+'.json');

        const readData = await fs.readFile(filePath, 'utf-8');

        return NextResponse.json({message: JSON.parse(readData), status: 200});

    }catch(error){
        console.error(error);
        return NextResponse.json({message: 'something went wrong', status: 500});
    }

}