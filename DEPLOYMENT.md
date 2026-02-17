# Vercel Deployment Guide

## Quick Deploy (Recommended)

The easiest way to deploy is through the Vercel dashboard:

### Option 1: Deploy via Vercel Dashboard (No CLI needed)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Luxe Motors"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   
   ```
   DATABASE_URL=<your-production-database-url>
   NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
   NEXTAUTH_URL=<will-be-auto-set-by-vercel>
   ```

4. **Set up Database**
   - In Vercel dashboard, go to Storage tab
   - Create a Postgres database
   - Copy the DATABASE_URL to environment variables
   - Run migrations:
     ```bash
     npx prisma db push
     npx prisma db seed
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

---

## Option 2: Deploy via CLI (If npm cache is fixed)

### Fix npm cache first:
```bash
npm cache clean --force
```

### Then deploy:
```bash
# Install Vercel CLI
npm i -g vercel
# or use npx
npx vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? car_demo (or your choice)
# - Directory? ./
# - Override settings? No

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

---

## Important Notes

### Database Migration
⚠️ **SQLite won't work on Vercel**. You need a production database:

**Recommended: Vercel Postgres**
1. In Vercel dashboard → Storage → Create Database → Postgres
2. Copy connection string to DATABASE_URL
3. Run: `npx prisma db push && npx prisma db seed`

**Alternative: Supabase (Free tier)**
1. Go to [supabase.com](https://supabase.com)
2. Create project → Get connection string
3. Update DATABASE_URL in Vercel

### Image Uploads
⚠️ **Local file storage won't persist on Vercel**

Current uploads to `public/uploads` will be lost on each deployment.

**Solutions:**
- Use Vercel Blob Storage
- Use Cloudinary
- Use AWS S3
- Or keep using URL-based images (current seed data uses Unsplash URLs)

### Environment Variables
Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Verification Checklist

After deployment:
- [ ] Visit your Vercel URL
- [ ] Check homepage loads
- [ ] Verify inventory displays with images
- [ ] Test contact form
- [ ] Try admin login (admin@luxurycars.com / password123)
- [ ] Check database connectivity

---

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify DATABASE_URL is correct

**Database connection error?**
- Confirm DATABASE_URL format
- Check database is accessible from Vercel
- Run `npx prisma db push` after setting DATABASE_URL

**Images not loading?**
- Unsplash URLs should work fine
- Uploaded images won't persist (see Image Uploads section above)
