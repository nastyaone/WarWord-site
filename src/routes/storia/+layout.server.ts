import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import type { LayoutServerLoad } from './$types';

interface Chapter {
    id: number;
    title: string;
    url: string;
    hasContent: boolean;
    subchapters: Chapter[];
}

let idCounter = 1;

async function checkHasContent(contentPath: string): Promise<boolean> {
    try {
        const items = await readdir(contentPath);
        
        for (const item of items) {
            const itemPath = join(contentPath, item);
            const itemStat = await stat(itemPath);
            
            if (itemStat.isFile() && item === '+page.svx') {
                return true; // Found +page.svx file
            }
        }
        
        return false; // No +page.svx file found
    } catch {
        return false;
    }
}

async function generateChaptersFromContent(contentPath: string, baseUrl: string = '/storia'): Promise<Chapter[]> {
    const chapters: Chapter[] = [];
    
    try {
        const items = await readdir(contentPath);
        
        for (const item of items) {
            const itemPath = join(contentPath, item);
            const itemStat = await stat(itemPath);
            
            if (itemStat.isDirectory()) {
                // Handle directories as chapters/subchapters
                const subchapters = await generateChaptersFromContent(itemPath, `${baseUrl}/${item}`);
                const hasContent = await checkHasContent(itemPath);
                
                chapters.push({
                    id: idCounter++,
                    title: formatTitle(item),
                    url: `${baseUrl}/${item}`,
                    hasContent,
                    subchapters
                });
            } else if (itemStat.isFile() && ['.md', '.svx'].includes(extname(item))) {
                // Handle markdown or svelte files as chapters
                const fileName = basename(item, extname(item));
                
                chapters.push({
                    id: idCounter++,
                    title: formatTitle(fileName),
                    url: `${baseUrl}/${fileName}`,
                    hasContent: true,
                    subchapters: []
                });
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${contentPath}:`, error);
        return [];
    }
    
    return chapters.sort((a, b) => a.title.localeCompare(b.title));
}

function formatTitle(filename: string): string {
    // Convert filename to readable title
    // e.g., "chapter-1" -> "Chapter 1", "historical-context" -> "Historical Context"
    return filename
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const load: LayoutServerLoad = async () => {
    const contentPath = join(process.cwd(), 'src/routes/storia/content');
    const chapters = await generateChaptersFromContent(contentPath);
    
    console.log('Generated chapters:', JSON.stringify(chapters, null, 2));

    return {
        chapters
    };
};