// Personal Information and Links Configuration
// Update these links with your actual URLs

export const personalInfo = {
    // Resume Configuration
    resume: {
        // Option 1: Google Drive Link (Recommended)
        // Make sure to set sharing to "Anyone with the link can view"
        googleDriveUrl: "https://drive.google.com/file/d/1yv4SDFcVSEYxuq_Y81Oig-xnEsbesY7V/view?usp=sharing",

        // Option 2: Direct PDF download from Google Drive
        // Replace YOUR_FILE_ID with your actual Google Drive file ID
        directDownloadUrl: "https://drive.google.com/file/d/1yv4SDFcVSEYxuq_Y81Oig-xnEsbesY7V/view?usp=sharing",

        // Option 3: Local file (if you want to host it locally)
        localPath: "/resume/fahad-khalid-resume.pdf",

        // Current active resume URL (change this to switch between options)
        activeUrl: "https://drive.google.com/file/d/1yv4SDFcVSEYxuq_Y81Oig-xnEsbesY7V/view?usp=sharing"
    },

    // Contact Information
    contact: {
        email: "fahadkhalid695@gmail.com",
        phone: "+92 300 4343753",
        location: "Pakistan"
    },

    // Social Media Links
    social: {
        github: "https://github.com/fahadkhalid695",
        linkedin: "https://www.linkedin.com/in/fahad-khalid-aa674430a/",
        twitter: "", // Add if you have Twitter
        portfolio: "", // Add if you have a separate portfolio site
    }
};

// Helper function to get the correct resume URL
export const getResumeUrl = () => personalInfo.resume.activeUrl;

// Helper function to check if resume opens in new tab or downloads
export const getResumeAction = () => {
    const url = personalInfo.resume.activeUrl;

    if (url.includes('drive.google.com') && url.includes('/view')) {
        return { action: 'view', target: '_blank' }; // Opens in new tab for viewing
    } else if (url.includes('drive.google.com') && url.includes('export=download')) {
        return { action: 'download', target: '_self' }; // Downloads directly
    } else {
        return { action: 'download', target: '_blank' }; // Default behavior
    }
};