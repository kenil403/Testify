import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const LearningResourceSchema = new mongoose.Schema({
    title: String,
    section: String,
    subsection: String,
    data: Buffer,
    fileName: String,
    size: Number,
    contentType: String
}, { timestamps: true, collection: 'learning_resources' });

const LearningResource = mongoose.model('LearningResource', LearningResourceSchema);

async function importNetworkingPdfs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB);
        console.log('Connected to MongoDB');

        const basePath = path.join(__dirname, '..', '..', 'project-papers', 'Networking');
        
        const subsections = [
            { name: 'Internetworking', files: ['Internetworking1.pdf'] },
            { name: 'Networking Basics', files: ['Networking Basics1.pdf'] },
            { name: 'Tcp-Ip', files: ['TCP1.pdf'] }
        ];

        let totalAdded = 0;
        let totalUpdated = 0;

        for (const sub of subsections) {
            const subPath = path.join(basePath, sub.name);
            console.log(`\n📁 Processing ${sub.name}: ${sub.files.length} PDFs`);
            
            for (let i = 0; i < sub.files.length; i++) {
                const file = sub.files[i];
                const filePath = path.join(subPath, file);
                
                if (fs.existsSync(filePath)) {
                    const buf = fs.readFileSync(filePath);
                    const title = `${sub.name} - Part ${i + 1}`;
                    
                    const existing = await LearningResource.findOne({
                        section: 'Networking',
                        subsection: sub.name,
                        fileName: file
                    });
                    
                    if (existing) {
                        existing.data = buf;
                        existing.size = buf.length;
                        existing.title = title;
                        await existing.save();
                        console.log(`  ✓ Updated: ${title}`);
                        totalUpdated++;
                    } else {
                        await LearningResource.create({
                            title,
                            section: 'Networking',
                            subsection: sub.name,
                            data: buf,
                            fileName: file,
                            size: buf.length,
                            contentType: 'application/pdf'
                        });
                        console.log(`  ✓ Added: ${title}`);
                        totalAdded++;
                    }
                }
            }
        }

        console.log(`\n✅ Import complete!`);
        console.log(`   Added: ${totalAdded} PDFs`);
        console.log(`   Updated: ${totalUpdated} PDFs`);
        console.log(`   Total: ${totalAdded + totalUpdated} PDFs processed`);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

importNetworkingPdfs();
