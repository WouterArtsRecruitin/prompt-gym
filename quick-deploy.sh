#!/bin/bash

# 🏋️ THE PROMPT GYM - QUICK DEPLOY SCRIPT
# This script helps you deploy to GitHub + Vercel in minutes!

set -e

echo "🏋️ THE PROMPT GYM - QUICK DEPLOY"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found!${NC}"
    echo "Please run this script from the prompt-gym directory"
    echo ""
    echo "Example:"
    echo "  tar -xzf prompt-gym-ready.tar.gz"
    echo "  cd prompt-gym"
    echo "  chmod +x quick-deploy.sh"
    echo "  ./quick-deploy.sh"
    exit 1
fi

echo -e "${BLUE}Step 1/3: GitHub Setup${NC}"
echo "======================"
echo ""

# Ask for GitHub username
echo -e "${YELLOW}What's your GitHub username?${NC}"
read -p "Username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ Error: GitHub username required${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ GitHub user: $GITHUB_USER${NC}"
echo ""

echo -e "${YELLOW}📝 Action Required:${NC}"
echo "1. Open: https://github.com/new"
echo "2. Repository name: prompt-gym"
echo "3. Keep it private or public (your choice)"
echo "4. Do NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
read -p "Press ENTER when you've created the repository..."

echo ""
echo -e "${BLUE}Step 2/3: Pushing to GitHub${NC}"
echo "============================"
echo ""

# Add remote and push
REPO_URL="https://github.com/$GITHUB_USER/prompt-gym.git"
echo "Adding remote: $REPO_URL"

git remote add origin $REPO_URL 2>/dev/null || git remote set-url origin $REPO_URL

echo "Pushing code..."
git push -u origin main --force

echo ""
echo -e "${GREEN}✅ Code pushed to GitHub!${NC}"
echo ""

echo -e "${BLUE}Step 3/3: Vercel Deployment${NC}"
echo "==========================="
echo ""

echo -e "${YELLOW}Choose deployment method:${NC}"
echo ""
echo "A) Via Vercel Website (Recommended)"
echo "B) Via Vercel CLI (if installed)"
echo ""
read -p "Choice (A or B): " DEPLOY_METHOD

if [ "$DEPLOY_METHOD" = "A" ] || [ "$DEPLOY_METHOD" = "a" ]; then
    echo ""
    echo -e "${YELLOW}📝 Action Required:${NC}"
    echo "1. Open: https://vercel.com"
    echo "2. Click 'Add New' → 'Project'"
    echo "3. Import your 'prompt-gym' repository"
    echo "4. Keep all default settings"
    echo "5. Click 'Deploy'"
    echo ""
    echo "Wait 2-3 minutes → You'll get your URL!"
    echo ""
    read -p "Press ENTER when deployment is complete..."
    
elif [ "$DEPLOY_METHOD" = "B" ] || [ "$DEPLOY_METHOD" = "b" ]; then
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo ""
        echo -e "${YELLOW}Installing Vercel CLI...${NC}"
        npm i -g vercel
    fi
    
    echo ""
    echo -e "${YELLOW}Deploying with Vercel CLI...${NC}"
    echo ""
    vercel --prod
    
else
    echo -e "${RED}❌ Invalid choice${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${YELLOW}📍 Your links:${NC}"
echo "GitHub: https://github.com/$GITHUB_USER/prompt-gym"
echo "Vercel: Check dashboard or CLI output above"
echo ""
echo -e "${YELLOW}🎮 Next steps:${NC}"
echo "1. Test your game at the Vercel URL"
echo "2. Share URL with your team"
echo "3. Watch them become prompt masters!"
echo ""
echo -e "${GREEN}✨ Happy training!${NC}"
