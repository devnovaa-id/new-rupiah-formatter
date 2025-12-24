// backup.ts - Backup File Penting Proyek
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Mendapatkan __dirname dalam ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BackupOptions {
  rootDir: string;
  outputFile: string;
  includeItems: string[];
  excludeDirs: string[];
}

const defaultOptions: BackupOptions = {
  rootDir: process.cwd(),
  outputFile: 'project-backup.md',
  includeItems: [
    'src/',           // Folder src
    'tests/',         // Folder tests
    'index.html',     // File HTML
    'jest.config.js', // File config jest
    'package.json',   // Package config
    'tsconfig.json',  // TS config utama
    'tsconfig.build.json',
    'tsconfig.react.json',
    'tsconfig.jest.json'
  ],
  excludeDirs: ['node_modules', 'dist', 'coverage', '.git']
};

/**
 * Check if a file should be included based on includeItems
 */
function shouldIncludeFile(filePath: string, rootDir: string): boolean {
  const relativePath = path.relative(rootDir, filePath);
  
  // Check if file is directly in includeItems
  if (defaultOptions.includeItems.includes(relativePath)) {
    return true;
  }
  
  // Check if file is inside included directories
  for (const item of defaultOptions.includeItems) {
    if (item.endsWith('/') && relativePath.startsWith(item)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Get all files to backup
 */
function getFilesToBackup(rootDir: string, options: BackupOptions): string[] {
  const files: string[] = [];
  
  // Process each include item
  for (const item of options.includeItems) {
    const fullPath = path.join(rootDir, item);
    
    try {
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Recursively get files from directory
          files.push(...getFilesFromDirectory(fullPath, options));
        } else {
          // Add single file
          files.push(fullPath);
        }
      } else {
        console.warn(`⚠️  Item tidak ditemukan: ${item}`);
      }
    } catch (error) {
      console.warn(`⚠️  Error memproses ${item}:`, error instanceof Error ? error.message : String(error));
    }
  }
  
  return files.sort((a, b) => a.localeCompare(b));
}

/**
 * Get all files from a directory recursively
 */
function getFilesFromDirectory(dir: string, options: BackupOptions): string[] {
  const files: string[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Skip excluded directories
      if (options.excludeDirs.includes(item)) {
        continue;
      }
      
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Recursively process subdirectory
          files.push(...getFilesFromDirectory(fullPath, options));
        } else {
          // Add file
          files.push(fullPath);
        }
      } catch (err) {
        console.warn(`   ⚠️  Tidak bisa mengakses ${path.relative(dir, fullPath)}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error membaca direktori ${dir}:`, error);
  }
  
  return files;
}

/**
 * Read file content
 */
function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return `[ERROR READING FILE: ${error instanceof Error ? error.message : String(error)}]`;
  }
}

/**
 * Format file content for markdown
 */
function formatFileContent(filePath: string, rootDir: string): string {
  const relativePath = path.relative(rootDir, filePath);
  const content = readFileContent(filePath);
  
  return `//${relativePath}\n\n${content}\n\n`;
}

/**
 * Create backup
 */
export async function createTargetedBackup(): Promise<void> {
  console.log('📦 MEMULAI BACKUP FILE PENTING\n');
  console.log('🎯 FILE YANG AKAN DIBACKUP:');
  defaultOptions.includeItems.forEach(item => {
    console.log(`   • ${item}`);
  });
  console.log('\n🚫 DIEXCLUDE:');
  defaultOptions.excludeDirs.forEach(dir => {
    console.log(`   • ${dir}/`);
  });
  
  const files = getFilesToBackup(defaultOptions.rootDir, defaultOptions);
  
  if (files.length === 0) {
    console.log('\n❌ Tidak ada file yang ditemukan untuk di-backup');
    return;
  }
  
  console.log(`\n📊 Ditemukan ${files.length} file`);
  
  // Calculate total size
  let totalSize = 0;
  const fileStats: Array<{path: string, size: number}> = [];
  
  for (const file of files) {
    try {
      const stat = fs.statSync(file);
      totalSize += stat.size;
      fileStats.push({
        path: path.relative(defaultOptions.rootDir, file),
        size: stat.size
      });
    } catch {
      // Skip error
    }
  }
  
  console.log(`📦 Total ukuran: ${Math.round(totalSize / 1024)} KB\n`);
  
  // Start backup
  console.log('📝 MEMBUAT BACKUP...\n');
  
  let markdownContent = `# BACKUP PROYEK - FILE PENTING\n\n`;
  markdownContent += `**Dibuat:** ${new Date().toLocaleString('id-ID')}\n`;
  markdownContent += `**Direktori:** ${defaultOptions.rootDir}\n`;
  markdownContent += `**Total File:** ${files.length}\n`;
  markdownContent += `**Total Ukuran:** ${Math.round(totalSize / 1024)} KB\n\n`;
  
  // List of included items
  markdownContent += `## 📋 ITEM YANG DIBACKUP\n\n`;
  markdownContent += `\`\`\`\n`;
  defaultOptions.includeItems.forEach(item => {
    markdownContent += `${item}\n`;
  });
  markdownContent += `\`\`\`\n\n`;
  
  // File list
  markdownContent += `## 📄 DAFTAR FILE\n\n`;
  fileStats.forEach((stat, index) => {
    const sizeKB = Math.round(stat.size / 1024 * 100) / 100;
    markdownContent += `${index + 1}. \`${stat.path}\` (${sizeKB} KB)\n`;
  });
  
  markdownContent += `\n---\n\n`;
  markdownContent += `## 📝 KONTEN FILE\n\n`;
  
  // Add file contents
  let processed = 0;
  for (const file of files) {
    processed++;
    const relativePath = path.relative(defaultOptions.rootDir, file);
    
    if (processed <= 5 || processed % 10 === 0) {
      console.log(`   [${processed}/${files.length}] ${relativePath}`);
    }
    
    markdownContent += formatFileContent(file, defaultOptions.rootDir);
    markdownContent += `---\n\n`;
    
    // Show progress
    if (processed === files.length) {
      console.log(`   ✅ Selesai: ${processed} file diproses`);
    }
  }
  
  // Footer
  markdownContent += `## ✅ BACKUP SELESAI\n\n`;
  markdownContent += `Backup berhasil dibuat pada ${new Date().toLocaleString('id-ID')}\n`;
  
  // Write to file
  try {
    fs.writeFileSync(defaultOptions.outputFile, markdownContent);
    
    console.log('\n✅ BACKUP BERHASIL DIBUAT!');
    console.log(`📁 File: ${defaultOptions.outputFile}`);
    console.log(`📊 Ukuran: ${Math.round(markdownContent.length / 1024)} KB`);
    
    console.log('\n📋 DETAIL FILE:');
    console.log('   📁 src/          - Semua file dalam folder src');
    console.log('   📁 tests/        - Semua file dalam folder tests');
    console.log('   📄 index.html    - File HTML utama');
    console.log('   ⚙️  jest.config.js - Konfigurasi Jest');
    console.log('   📦 package.json  - Konfigurasi package');
    console.log('   ⚙️  tsconfig.json - Konfigurasi TypeScript utama');
    console.log('   ⚙️  tsconfig.build.json');
    console.log('   ⚙️  tsconfig.react.json');
    console.log('   ⚙️  tsconfig.jest.json');
    
    console.log('\n📖 Contoh format backup:');
    console.log(`
//src/core/validator.ts
[isi file lengkap]

//package.json
[isi file lengkap]
    `);
    
  } catch (error) {
    console.error('❌ Gagal menulis file backup:', error);
  }
}

// Run if executed directly
const isMainModule = process.argv[1] === __filename;

if (isMainModule) {
  console.log('========================================');
  console.log('   BACKUP FILE PENTING PROYEK');
  console.log('========================================\n');
  
  createTargetedBackup()
    .then(() => {
      console.log('\n========================================');
      console.log('            BACKUP SELESAI');
      console.log('========================================');
    })
    .catch(error => {
      console.error('\n❌ ERROR:', error);
    });
}

// Export for use in other scripts
export default {
  createTargetedBackup,
  defaultOptions
};
