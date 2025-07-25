import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const contentPath = params.path || '';
    
    try {
        const fileName = contentPath.split('/').pop() || '';
        const directoryPath = contentPath.split('/').slice(0, -1).join('/');
        
        let fullFilePath: string;
        
        if (directoryPath) {
            fullFilePath = join(process.cwd(), 'src/routes/storia/content', directoryPath, `${fileName}.svx`);
        } else {
            fullFilePath = join(process.cwd(), 'src/routes/storia/content', `${fileName}.svx`);
        }
        
        const rawContent = await readFile(fullFilePath, 'utf-8');
        
        // Process with mdsvex
        const processed = await compile(rawContent, {
            filename: fullFilePath
        });
        
        return {
            content: processed?.code || rawContent,
            path: contentPath,
            fileName: `${fileName}.svx`
        };
    } catch (err) {
        console.error('Error loading content:', err);
        throw error(404, 'Content not found');
    }
};