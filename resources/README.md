# Tray Icon Resources

This folder contains the system tray icon for Cookie Tool.

## Files

- `tray-icon.svg` - Colored cookie icon (not used for tray, kept for reference)
- `trayTemplate.svg` - Monochrome template icon for macOS system tray

## Template Icons (macOS)

On macOS, tray icons use "Template" images which are monochrome (black on transparent). The system automatically adapts these icons for light/dark mode:
- Light mode: Icon appears dark
- Dark mode: Icon appears light

The filename pattern `trayTemplate.svg` signals to Electron that this is a template image.

## Creating PNG Versions (Optional)

If you need PNG versions (for better compatibility), you can convert the SVG:

```bash
# Using ImageMagick (install via: brew install imagemagick)
# 16x16 for standard displays
magick resources/trayTemplate.svg -resize 16x16 resources/trayTemplate.png

# 32x32 for Retina displays
magick resources/trayTemplate.svg -resize 32x32 resources/trayTemplate@2x.png
```

Or use an online converter like https://svgtopng.com/

## Customizing the Icon

To customize the cookie icon:
1. Edit `trayTemplate.svg` in any vector graphics editor
2. Keep it monochrome (black #000000 on transparent)
3. Ensure it's legible at 16x16 pixels
4. Simple designs work best for tray icons
