# Data Templates

This folder contains templates for easily adding new data to your portfolio. Simply copy the template, modify the values, and paste it into the respective data file.

## How to Add New Data

### 1. Projects
Copy the template from `project-template.ts` and add it to `src/data/projects.ts`

### 2. Skills
Copy the template from `skill-template.ts` and add it to `src/data/skills.ts`

### 3. Hackathons
Copy the template from `hackathon-template.ts` and add it to `src/data/hackathons.ts`

### 4. Certifications
Copy the template from `certification-template.ts` and add it to `src/data/certifications.ts`

## Important Notes

- **Always increment the `id` field** to be unique
- **Use proper image URLs** or local paths starting with `/`
- **Keep descriptions concise** but informative
- **Use consistent tag names** for better filtering
- **Test locally** after adding new data

## Auto-Generated Features

The website automatically:
- ✅ Generates filter tags from your project tags
- ✅ Calculates statistics (total projects, skills, etc.)
- ✅ Creates responsive layouts
- ✅ Handles any number of entries
- ✅ Maintains consistent styling