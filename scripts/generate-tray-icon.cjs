#!/usr/bin/env node
// Simple script to create a tray icon PNG using canvas
const fs = require('fs');
const path = require('path');

// Check if sharp is available, otherwise provide instructions
try {
  const sharp = require('sharp');

  const svgBuffer = fs.readFileSync(
    path.join(__dirname, '../resources/trayTemplate.svg')
  );

  // Generate 16x16 template icon
  sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(__dirname, '../resources/trayTemplate.png'))
    .then(() => {
      console.log('✓ Created trayTemplate.png (16x16)');
    });

  // Generate 32x32 for Retina
  sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../resources/trayTemplate@2x.png'))
    .then(() => {
      console.log('✓ Created trayTemplate@2x.png (32x32)');
    });

} catch (err) {
  console.log('Sharp not installed. Installing...');
  console.log('Run: npm install --save-dev sharp');
  console.log('\nOr use ImageMagick:');
  console.log('  magick resources/trayTemplate.svg -resize 16x16 resources/trayTemplate.png');
  console.log('  magick resources/trayTemplate.svg -resize 32x32 resources/trayTemplate@2x.png');
}
