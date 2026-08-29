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

async function importProgrammingPdfs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB);
        console.log('Connected to MongoDB');

        const programmingBasePath = path.join(__dirname, '..', '..', 'project-papers', 'Programming language');
        
        if (!fs.existsSync(programmingBasePath)) {
            console.error('Programming language folder not found:', programmingBasePath);
            return;
        }

        let totalAdded = 0;
        let totalUpdated = 0;

        // Get all programming languages (C Programming, C++, Java)
        const languages = fs.readdirSync(programmingBasePath).filter(item => {
            const itemPath = path.join(programmingBasePath, item);
            return fs.statSync(itemPath).isDirectory();
        });

        console.log(`Found ${languages.length} programming languages`);

        for (const language of languages) {
            console.log(`\n========== ${language.toUpperCase()} ==========`);
            const languagePath = path.join(programmingBasePath, language);
            
            const pdfFiles = fs.readdirSync(languagePath)
                .filter(file => file.endsWith('.pdf'))
                .sort();

            if (pdfFiles.length === 0) {
                console.log(`⚠️  No PDFs found in ${language}`);
                continue;
            }

            console.log(`📁 Processing ${language}: ${pdfFiles.length} PDFs`);

            for (let i = 0; i < pdfFiles.length; i++) {
                const pdfFile = pdfFiles[i];
                const pdfPath = path.join(languagePath, pdfFile);
                
                try {
                    const pdfBuffer = fs.readFileSync(pdfPath);
                    
                    // Generate title with sequential numbering
                    const partNumber = i + 1;
                    const title = `${language} - Part ${partNumber}`;

                    // Check if already exists
                    const existing = await LearningResource.findOne({
                        section: 'Programming',
                        subsection: language,
                        fileName: pdfFile
                    });

                    if (existing) {
                        // Update existing
                        existing.data = pdfBuffer;
                        existing.size = pdfBuffer.length;
                        existing.title = title;
                        await existing.save();
                        console.log(`  ✓ Updated: ${title}`);
                        totalUpdated++;
                    } else {
                        // Create new
                        await LearningResource.create({
                            title: title,
                            section: 'Programming',
                            subsection: language,
                            data: pdfBuffer,
                            fileName: pdfFile,
                            size: pdfBuffer.length,
                            contentType: 'application/pdf'
                        });
                        console.log(`  ✓ Added: ${title}`);
                        totalAdded++;
                    }
                } catch (error) {
                    console.log(`  ✗ Error processing ${pdfFile}: ${error.message}`);
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

importProgrammingPdfs();
