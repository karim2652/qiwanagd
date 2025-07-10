import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// تكوين الأحجام المختلفة
const sizes = {
  mobile: { width: 480, height: 320 },
  tablet: { width: 768, height: 512 },
  desktop: { width: 1200, height: 800 },
  large: { width: 1920, height: 1280 }
};

// جودة WebP
const webpQuality = 80;

// دالة لتحسين الصور
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // إنشاء مجلد الإخراج إذا لم يكن موجوداً
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // تحسين الصورة الأصلية
    const originalOutput = path.join(outputDir, `${filename}.webp`);
    await image
      .webp({ quality: webpQuality })
      .toFile(originalOutput);
    
    console.log(`✅ تم تحسين: ${filename}.webp`);
    
    // إنشاء نسخ بأحجام مختلفة
    for (const [sizeName, size] of Object.entries(sizes)) {
      const resizedOutput = path.join(outputDir, `${filename}-${sizeName}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: webpQuality })
        .toFile(resizedOutput);
      
      console.log(`✅ تم إنشاء: ${filename}-${sizeName}.webp`);
    }
    
  } catch (error) {
    console.error(`❌ خطأ في تحسين ${filename}:`, error.message);
  }
}

// دالة لمعالجة مجلد كامل
async function processDirectory(inputDir, outputDir) {
  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`📁 معالجة ${imageFiles.length} صورة في ${inputDir}`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const filename = path.parse(file).name;
      
      await optimizeImage(inputPath, outputDir, filename);
    }
    
    console.log(`🎉 تم الانتهاء من معالجة ${inputDir}`);
    
  } catch (error) {
    console.error(`❌ خطأ في معالجة المجلد ${inputDir}:`, error.message);
  }
}

// المجلدات المراد معالجتها
const directories = [
  {
    input: 'src/assets/images/home',
    output: 'public/assets/images/home'
  },
  {
    input: 'src/assets/images/projects/Exterior design',
    output: 'public/assets/images/projects/Exterior design'
  },
  {
    input: 'src/assets/images/projects/Interior design',
    output: 'public/assets/images/projects/Interior design'
  },
  {
    input: 'src/assets/images/projects/Otherdesign',
    output: 'public/assets/images/projects/Otherdesign'
  }
];

// تشغيل التحسين
async function main() {
  console.log('🚀 بدء تحسين الصور...');
  
  for (const dir of directories) {
    if (fs.existsSync(dir.input)) {
      await processDirectory(dir.input, dir.output);
    } else {
      console.log(`⚠️ المجلد غير موجود: ${dir.input}`);
    }
  }
  
  console.log('✨ تم الانتهاء من تحسين جميع الصور!');
}

main().catch(console.error); 