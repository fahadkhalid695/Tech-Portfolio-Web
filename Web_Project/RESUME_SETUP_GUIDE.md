# 📄 Resume Button Setup Guide

Your resume button is now fully functional! Here's how to set it up with Google Drive.

## 🚀 Quick Setup (Recommended)

### Step 1: Upload Resume to Google Drive
1. Go to [Google Drive](https://drive.google.com)
2. Upload your resume PDF file
3. Right-click on the file → "Share"
4. Change access to **"Anyone with the link can view"**
5. Copy the sharing link

### Step 2: Get Your File ID
From your Google Drive link, extract the FILE_ID:
```
https://drive.google.com/file/d/1ABC123XYZ456DEF789/view?usp=sharing
                              ↑ This is your FILE_ID ↑
```

### Step 3: Update Your Portfolio
Open `src/data/personalInfo.ts` and replace `YOUR_FILE_ID` with your actual file ID:

```typescript
resume: {
  activeUrl: "https://drive.google.com/file/d/1ABC123XYZ456DEF789/view?usp=sharing"
}
```

## 🎯 Resume Link Options

### Option 1: View in Browser (Recommended)
```typescript
activeUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
```
- ✅ Opens resume in new tab for viewing
- ✅ Professional presentation
- ✅ No download required
- ✅ Works on all devices

### Option 2: Direct Download
```typescript
activeUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
```
- ✅ Downloads PDF directly
- ✅ Users get a copy immediately
- ⚠️ Some users prefer viewing first

### Option 3: Local File
```typescript
activeUrl: "/resume/fahad-khalid-resume.pdf"
```
- ✅ Fastest loading
- ✅ Full control
- ⚠️ Need to manage file updates

## 🎨 Button Behavior

The button automatically adapts based on your URL:

### Google Drive View Link
- **Button Text**: "View Resume"
- **Icon**: External Link
- **Action**: Opens in new tab

### Download Link
- **Button Text**: "Download Resume"
- **Icon**: Download
- **Action**: Downloads file

## 🔧 Testing Your Setup

1. **Local Test**: Run `npm run dev` and click the resume button
2. **Link Test**: Visit your Google Drive link directly
3. **Mobile Test**: Check on mobile devices
4. **Privacy Test**: Open in incognito mode to verify public access

## 📱 Mobile Optimization

Your resume button works perfectly on mobile:
- ✅ Touch-friendly size
- ✅ Proper spacing
- ✅ Responsive design
- ✅ Fast loading

## 🎯 Pro Tips

### For Best Results:
1. **File Name**: Use a professional name like "Fahad-Khalid-Resume-2024.pdf"
2. **File Size**: Keep under 2MB for fast loading
3. **Format**: PDF is preferred (universal compatibility)
4. **Updates**: Update the link when you revise your resume

### Google Drive Sharing Settings:
- ✅ **"Anyone with the link can view"** - Perfect for portfolios
- ❌ **"Restricted"** - Won't work for public access
- ❌ **"Anyone can edit"** - Security risk

## 🚨 Troubleshooting

### Button Not Working?
1. Check if `YOUR_FILE_ID` is replaced with actual ID
2. Verify Google Drive sharing is set to public
3. Test the direct Google Drive link

### Wrong Button Text?
The button automatically detects the link type. If it shows wrong text:
1. Check your URL format in `personalInfo.ts`
2. Make sure you're using the correct Google Drive URL format

### Mobile Issues?
1. Test on actual mobile devices
2. Check if PDF opens in mobile browser
3. Consider using Google Drive view link for better mobile experience

## 🎉 You're All Set!

Your resume button now:
- ✅ **Works perfectly** with Google Drive
- ✅ **Adapts automatically** to your link type
- ✅ **Looks professional** with proper styling
- ✅ **Mobile-friendly** design
- ✅ **Easy to update** when you revise your resume

Just update the file ID in `personalInfo.ts` and you're ready to impress recruiters! 🚀