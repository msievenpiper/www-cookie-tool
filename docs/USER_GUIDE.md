# Cookie Tool - User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Basic Usage](#basic-usage)
4. [Advanced Features](#advanced-features)
5. [Tips & Best Practices](#tips--best-practices)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

## Introduction

Cookie Tool is a desktop application designed to help you quickly generate cookie-setting URLs for testing and development purposes. It supports multiple brands and TLDs, making it easy to create URLs that set cookies across different environments.

### What Does It Do?

The app generates URLs in this format:
```
https://www.{brand}.{tld}/global/cookie/set/{encoded-data}
```

When you visit these URLs, they will:
1. Set the specified cookies in your browser
2. Optionally redirect you to a destination URL

This is useful for:
- Testing cookie-based features
- Setting up test environments
- QA workflows
- Development debugging

## Getting Started

### Installation

1. Download the installer for your platform:
   - **macOS**: Download the `.dmg` file
   - **Windows**: Download the `.exe` installer

2. Install the application:
   - **macOS**: Open the DMG and drag the app to Applications
   - **Windows**: Run the installer and follow the prompts

3. Launch Cookie Tool

**⚠️ Important:** This app is unsigned and will show security warnings on first launch.

- **macOS**: Right-click the app → "Open" → "Open" in the dialog
- **Windows**: Click "More info" → "Run anyway"

📖 For detailed installation instructions with screenshots and troubleshooting, see [INSTALLATION.md](../INSTALLATION.md)

### First Launch

When you first open the app, you'll see:
- **Left side**: Configuration area (brand, TLD, cookies, destination)
- **Right side**: Results area (generated URL, presets, history)

All fields are empty except:
- TLD defaults to "qa.protected.net"
- One empty cookie input row is provided

## Basic Usage

### Generating Your First Cookie URL

Follow these steps to generate a cookie-setting URL:

#### Step 1: Select a Brand

Click the **Brand** dropdown and choose from 13 available brands:
- pcprotect
- scanguard
- speedycleaner
- totaladblock
- totalav
- totalbrowser
- totalcleaner
- totaldrive
- totalpassword
- totalvpn
- totalwebshield
- ultraantivirus
- ultravpn

#### Step 2: Select a TLD (Optional)

The TLD defaults to `qa.protected.net`. Change it if needed:
- **qa.protected.net** - QA environment
- **xyz** - XYZ domain
- **com** - Production domain

#### Step 3: Add Cookies

Enter at least one cookie:
1. In the **Cookie name** field, enter the cookie name (e.g., `user_id`)
2. In the **Cookie value** field, enter the value (e.g., `12345`)

To add more cookies:
- Click **Add Cookie** button
- Fill in the name and value
- Repeat as needed

To remove a cookie:
- Click the **Remove** button next to the cookie (only visible when you have more than one cookie)

#### Step 4: Add Destination (Optional)

If you want to be redirected after cookies are set:
1. Enter a full URL in the **Destination URL** field
2. Must include protocol (e.g., `https://www.example.com`)
3. Click **Clear** to remove the destination

#### Step 5: Generate URL

Click the **Generate URL** button. The generated URL will appear in the "Generated URL" section.

#### Step 6: Use the URL

You have two options:

**Copy to Clipboard**
- Click **Copy to Clipboard**
- Button will show "Copied!" for 2 seconds
- Paste the URL wherever you need it

**Open in Browser**
- Click **Open in Browser**
- Your default browser will open the URL
- Cookies will be set immediately

### Example Walkthrough

Let's create a URL to set a session cookie for TotalAV on QA:

1. **Brand**: Select "totalav"
2. **TLD**: Leave as "qa.protected.net"
3. **Cookie**:
   - Name: `session_id`
   - Value: `abc123xyz789`
4. **Destination**: `https://www.totalav.qa.protected.net/dashboard`
5. Click **Generate URL**

**Result:**
```
https://www.totalav.qa.protected.net/global/cookie/set/c%3Dn%3Dsession_id%26v%3Dabc123xyz789%7Cd%3DaHR0cHM6Ly93d3cudG90YWxhdi5xYS5wcm90ZWN0ZWQubmV0L2Rhc2hib2FyZA%3D%3D
```

When you open this URL:
1. Cookie `session_id=abc123xyz789` is set
2. You're redirected to the dashboard

## Advanced Features

### Using Presets

Presets let you save frequently used configurations for quick access.

#### Saving a Preset

1. Configure your brand, TLD, cookies, and destination
2. In the **Presets** section, click **Save Current Config**
3. Enter a descriptive name (e.g., "TotalAV QA Session")
4. Click **Save**

Your preset is now saved and will appear in the presets list.

#### Loading a Preset

1. Find your preset in the list
2. Click **Load** next to the preset name
3. All fields will be populated with the preset's configuration
4. You can modify any values before generating

#### Deleting a Preset

1. Click **Delete** next to the preset name
2. The preset is immediately removed (no confirmation)

#### Preset Best Practices

**Naming Conventions:**
- Use descriptive names: "QA Multi-Cookie Setup"
- Include environment: "Prod - TotalAV Login"
- Include purpose: "Debug Session Cookie"

**When to Use Presets:**
- Recurring test scenarios
- Complex cookie configurations
- Environment-specific setups
- Team workflows (export/import coming soon)

### URL History

The app automatically tracks the last 20 URLs you generate.

#### Viewing History

The **Recent URLs** section shows:
- Timestamp (when generated)
- Brand and TLD used
- Complete URL
- Copy button

#### Using History

1. Find the URL you want to reuse
2. Click **Copy** to copy it to clipboard
3. URLs are ordered newest first

#### Clearing History

Click **Clear History** to remove all entries. This action cannot be undone.

### Multiple Cookies

You can add as many cookies as you need to a single URL.

#### Adding Multiple Cookies

1. Fill in the first cookie
2. Click **Add Cookie**
3. Fill in the next cookie
4. Repeat as needed

#### Example: Multiple Cookies

**Configuration:**
- Brand: scanguard
- TLD: xyz
- Cookies:
  1. name=`user_id`, value=`12345`
  2. name=`session`, value=`abc123`
  3. name=`language`, value=`en-US`

**Generated URL:**
```
https://www.scanguard.xyz/global/cookie/set/c%3Dn%3Duser_id%26v%3D12345%2Cn%3Dsession%26v%3Dabc123%2Cn%3Dlanguage%26v%3Den-US
```

All three cookies will be set when you visit the URL.

### Special Characters in Cookies

The app automatically handles URL encoding, so you can use special characters:

**Supported Characters:**
- Spaces: `user name` → encoded automatically
- Symbols: `!@#$%^&*()` → encoded automatically
- Unicode: `名前` → encoded automatically

**Example:**
- Name: `user name`
- Value: `John Doe`

The app will properly encode spaces and special characters in the final URL.

## Tips & Best Practices

### Workflow Tips

1. **Start with Presets**: Create presets for common scenarios to save time

2. **Use Descriptive Cookie Names**:
   - Good: `user_session_id`, `auth_token`, `language_preference`
   - Bad: `c1`, `x`, `temp`

3. **Test in QA First**: Always test URLs in qa.protected.net before using .com

4. **Copy Before Opening**: Copy the URL to clipboard before opening in browser (in case you need it again)

5. **Review Before Generating**: Double-check brand, TLD, and cookie values before generating

### Cookie Value Tips

**Session IDs:**
- Use realistic formats: `abc123xyz789` not `test`
- Consider length: Match production session ID length

**Boolean Values:**
- Use consistent format: `true`/`false` or `1`/`0`
- Match your application's expected format

**JSON Values:**
- Can include JSON strings as cookie values
- Will be properly URL encoded
- Example: `{"user_id":123,"role":"admin"}`

**Timestamps:**
- Use Unix timestamps: `1706889600`
- Or ISO format: `2024-02-02T12:00:00Z`

### Destination URL Tips

**Always Include Protocol:**
- ✅ `https://www.example.com`
- ❌ `www.example.com`

**Match the Domain:**
- If setting cookies for totalav.qa.protected.net
- Destination should be totalav.qa.protected.net subdomain
- Example: `https://www.totalav.qa.protected.net/dashboard`

**Use Absolute Paths:**
- ✅ `https://www.totalav.com/products/antivirus`
- ⚠️ Relative paths won't work in the URL field

## Troubleshooting

### Common Issues

#### "Please select a brand" Error

**Cause:** No brand selected
**Solution:** Choose a brand from the dropdown before generating

#### "Please add at least one cookie" Error

**Cause:** Cookie name or value is empty
**Solution:** Fill in both name and value for at least one cookie

#### URL Not Setting Cookies

**Possible Causes:**
1. Browser blocking third-party cookies
2. URL not accessed via HTTPS
3. Cookie domain mismatch

**Solutions:**
1. Check browser cookie settings
2. Ensure you're using HTTPS
3. Verify the cookie endpoint is working

#### Copy Button Not Working

**Possible Causes:**
1. Clipboard permissions denied
2. App needs restart

**Solutions:**
1. Grant clipboard permissions to the app
2. Restart Cookie Tool
3. Manually select and copy the URL text

#### Presets Not Saving

**Possible Causes:**
1. Empty preset name
2. File permission issues

**Solutions:**
1. Enter a valid preset name
2. Check app has write permissions to:
   - macOS: `~/Library/Application Support/cookie-tool/`
   - Windows: `%APPDATA%\cookie-tool\`

#### App Won't Launch

**macOS:**
- Right-click app → Open (if security warning appears)
- System Settings → Privacy & Security → Allow app

**Windows:**
- Windows Defender may flag unknown publisher
- Click "More info" → "Run anyway"

### Performance Issues

**App Feels Slow:**
1. Restart the application
2. Check available system memory
3. Close unused applications

**Long URLs:**
- Many cookies create long URLs
- Most browsers support URLs up to 2000+ characters
- If issues persist, reduce number of cookies

## FAQ

### General Questions

**Q: What browsers are supported?**
A: All major browsers (Chrome, Firefox, Safari, Edge). The URLs open in your default browser.

**Q: Can I use this for production?**
A: The .com TLD option is available, but verify with your team before setting production cookies.

**Q: Is my data secure?**
A: All data is stored locally on your machine. Nothing is sent to external servers.

**Q: Can I share presets with teammates?**
A: Not directly yet. Export/import functionality is planned for a future release.

### Technical Questions

**Q: What encoding is used?**
A: URLs are percent-encoded (RFC 3986), destinations are base64 encoded.

**Q: Can I set cookie expiration?**
A: Not currently. Cookies are set by the server endpoint with its default expiration.

**Q: Can I set cookie flags (Secure, HttpOnly, SameSite)?**
A: No, these are controlled by the server endpoint.

**Q: What's the maximum number of cookies?**
A: No hard limit, but browser URL length limits apply (~2000 characters).

**Q: Can I set cookies for subdomains?**
A: Depends on the server endpoint's cookie domain setting.

### Workflow Questions

**Q: Can I edit a URL after generating?**
A: No, but you can modify the inputs and regenerate. Copy the URL first if needed.

**Q: Can I duplicate a preset?**
A: Load the preset, modify it slightly, then save with a new name.

**Q: How do I clear all presets?**
A: Delete each preset individually. Bulk delete is not yet available.

**Q: Where is my data stored?**
A:
- macOS: `~/Library/Application Support/cookie-tool/config.json`
- Windows: `%APPDATA%\cookie-tool\config.json`

**Q: Can I backup my presets?**
A: Yes, copy the config.json file from the storage location above.

### URL Format Questions

**Q: Why is the URL so long?**
A: Each cookie and the destination are encoded, which increases length. This is normal.

**Q: Can I decode a generated URL?**
A: The encoded portion is URL-encoded. The destination is base64-encoded. You can decode manually or use online tools.

**Q: What's the `|d=` part of the URL?**
A: That's the delimiter and prefix for the destination URL (base64 encoded).

**Q: Can I manually edit the generated URL?**
A: Not recommended. Regenerate with correct parameters instead.

## Keyboard Navigation

While there are no custom shortcuts, standard keyboard navigation works:

- **Tab**: Move between fields
- **Shift+Tab**: Move backwards
- **Enter**: Submit forms (when in input mode)
- **Cmd/Ctrl+C**: Copy selected text
- **Cmd/Ctrl+V**: Paste

## Getting Help

If you encounter issues not covered in this guide:

1. Check the README.md for technical details
2. Review ARCHITECTURE.md for system details
3. Open an issue on the project repository
4. Contact your team lead or administrator

## Updates

Check for new versions regularly. Future versions may include:
- Export/import presets
- Bulk URL generation
- Custom keyboard shortcuts
- Enhanced history features
- Dark mode

---

**Version:** 1.0.0
**Last Updated:** 2024-02-03
