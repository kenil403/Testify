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

async function importAptitudePdfs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB);
        console.log('Connected to MongoDB');

        const aptitudePath = path.join(__dirname, '..', '..', 'project-papers', 'Apptitude');
        
        if (!fs.existsSync(aptitudePath)) {
            console.error('Apptitude folder not found:', aptitudePath);
            return;
        }

        // Get all subdirectories (subsections)
        const subsections = fs.readdirSync(aptitudePath).filter(item => {
            const itemPath = path.join(aptitudePath, item);
            return fs.statSync(itemPath).isDirectory();
        });

        console.log(`Found ${subsections.length} subsections in Apptitude folder`);

        let totalAdded = 0;
        let totalUpdated = 0;

        for (const subsection of subsections) {
            const subsectionPath = path.join(aptitudePath, subsection);
            const pdfFiles = fs.readdirSync(subsectionPath)
                .filter(file => file.endsWith('.pdf'))
                .sort(); // Sort files alphabetically

            console.log(`\nProcessing ${subsection}: ${pdfFiles.length} PDFs`);

            for (let i = 0; i < pdfFiles.length; i++) {
                const pdfFile = pdfFiles[i];
                const pdfPath = path.join(subsectionPath, pdfFile);
                const pdfBuffer = fs.readFileSync(pdfPath);
                
                // Generate title with sequential numbering
                const partNumber = i + 1;
                const title = `${subsection} - Part ${partNumber}`;

                // Check if already exists
                const existing = await LearningResource.findOne({
                    section: 'Aptitude',
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
                        section: 'Aptitude',
                        subsection: subsection,
                        data: pdfBuffer,
                        fileName: pdfFile,
                        size: pdfBuffer.length,
                        contentType: 'application/pdf'
                    });
                    console.log(`  ✓ Added: ${title}`);
                    totalAdded++;
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

importAptitudePdfs();
