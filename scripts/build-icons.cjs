#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const svgPath = path.join(__dirname, '../build/icon.svg');
const buildDir = path.join(__dirname, '../build');
const iconsetDir = path.join(buildDir, 'icon.iconset');

// Create iconset directory for macOS
if (!fs.existsSync(iconsetDir)) {
  fs.mkdirSync(iconsetDir, { recursive: true });
}

// Icon sizes needed for macOS .icns
const sizes = [
  { size: 16, name: 'icon_16x16.png' },
  { size: 32, name: 'icon_16x16@2x.png' },
  { size: 32, name: 'icon_32x32.png' },
  { size: 64, name: 'icon_32x32@2x.png' },
  { size: 128, name: 'icon_128x128.png' },
  { size: 256, name: 'icon_128x128@2x.png' },
  { size: 256, name: 'icon_256x256.png' },
  { size: 512, name: 'icon_256x256@2x.png' },
  { size: 512, name: 'icon_512x512.png' },
  { size: 1024, name: 'icon_512x512@2x.png' },
];

async function generateIcons() {
  console.log('Generating app icons...');

  const svgBuffer = fs.readFileSync(svgPath);

  // Generate all icon sizes for macOS iconset
  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsetDir, name));
    console.log(`✓ Created ${name} (${size}x${size})`);
  }

  // Also create standalone icon.png (512x512) for Linux
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(buildDir, 'icon.png'));
  console.log('✓ Created icon.png (512x512)');

  // Create .icns file for macOS using iconutil
  try {
    execSync(`iconutil -c icns "${iconsetDir}" -o "${path.join(buildDir, 'icon.icns')}"`, {
      stdio: 'inherit'
    });
    console.log('✓ Created icon.icns');
  } catch (err) {
    console.error('Failed to create .icns file:', err.message);
  }

  // For Windows .ico, we'll use electron-builder's built-in conversion
  // It will automatically convert icon.png to icon.ico during build

  console.log('\n✅ App icons generated successfully!');
  console.log('Files created in build/ directory:');
  console.log('  - icon.png (for Linux and Windows conversion)');
  console.log('  - icon.icns (for macOS)');
}

generateIcons().catch(console.error);
