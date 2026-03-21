<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3afbfa42-7fe2-4474-b3d4-f42fb86e2f5b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

Merging to `main` now triggers a GitHub Actions workflow that builds the Vite app and deploys the generated `dist` output to GitHub Pages.

After the workflow completes, open:
`https://glendell03.github.io`

GitHub Pages can take a minute or two to finish publishing after deploy.
