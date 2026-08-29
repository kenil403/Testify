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

async function importReasoningPdfs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB);
        console.log('Connected to MongoDB');

        const reasoningBasePath = path.join(__dirname, '..', '..', 'project-papers', 'Reasoning');
        
        if (!fs.existsSync(reasoningBasePath)) {
            console.error('Reasoning folder not found:', reasoningBasePath);
            return;
        }

        let totalAdded = 0;
        let totalUpdated = 0;

        // Get all reasoning categories (Logical Reasoning, Non Verbal Reasoning, Verbal Reasoning)
        const categories = fs.readdirSync(reasoningBasePath).filter(item => {
            const itemPath = path.join(reasoningBasePath, item);
            return fs.statSync(itemPath).isDirectory();
        });

        console.log(`Found ${categories.length} reasoning categories`);

        for (const category of categories) {
            console.log(`\n========== ${category.toUpperCase()} ==========`);
            const categoryPath = path.join(reasoningBasePath, category);
            
            // Get all subsections in this category
            const subsections = fs.readdirSync(categoryPath).filter(item => {
                const itemPath = path.join(categoryPath, item);
                return fs.statSync(itemPath).isDirectory();
            });

            console.log(`Found ${subsections.length} subsections in ${category}`);

            for (const subsection of subsections) {
                const subsectionPath = path.join(categoryPath, subsection);
                const pdfFiles = fs.readdirSync(subsectionPath)
                    .filter(file => file.endsWith('.pdf'))
                    .sort(); // Sort files alphabetically

                if (pdfFiles.length === 0) {
                    console.log(`\n⚠️  No PDFs found in ${subsection}`);
                    continue;
                }

                console.log(`\n📁 Processing ${subsection}: ${pdfFiles.length} PDFs`);

                for (let i = 0; i < pdfFiles.length; i++) {
                    const pdfFile = pdfFiles[i];
                    const pdfPath = path.join(subsectionPath, pdfFile);
                    
                    try {
                        const pdfBuffer = fs.readFileSync(pdfPath);
                        
                        // Generate title with sequential numbering
                        const partNumber = i + 1;
                        const title = `${subsection} - Part ${partNumber}`;

                        // Check if already exists
                        const existing = await LearningResource.findOne({
                            section: category,
                            subsection: subsection,
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
                                section: category,
                                subsection: subsection,
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

importReasoningPdfs();
