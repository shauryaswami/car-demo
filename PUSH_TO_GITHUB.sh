#!/bin/bash

# Push to GitHub Script
# Run this script in your terminal to push the project to GitHub

echo "Pushing to git@github.com:shauryaswami/car-demo.git..."

# Add all changes
git add .

# Commit (if needed)
git commit -m "Deployment ready version" || echo "Nothing to commit"

# Ensure main branch is set
git branch -M main

# Add remote if not exists
git remote add origin git@github.com:shauryaswami/car-demo.git 2>/dev/null || git remote set-url origin git@github.com:shauryaswami/car-demo.git

# Push to main
echo "You may be prompted for your GitHub username and password/token..."
git push -u origin main

echo "Done!"
