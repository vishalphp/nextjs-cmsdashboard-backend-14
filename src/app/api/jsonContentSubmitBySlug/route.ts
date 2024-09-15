import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: any){

    const formData = await request.json();
    const pagename = formData['pagename'].split(' ').join('_');
    const  dirPath = path.join(process.cwd(), 'src', '_data', 'jsonContentData');
    const filePath = path.join(dirPath, pagename+'.json');
   try{

    await fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));
    return NextResponse.json({ message: 'Form data saved successfully' }, { status: 200 });

   }catch(error){
    console.error('Error writing file:', error);
    return NextResponse.json({message: 'formsubmit having issue', status:500});
   }

}