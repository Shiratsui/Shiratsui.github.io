# Portfolio Website

A simple, modern static portfolio website that can be deployed directly to GitHub Pages.

## Preview Locally

Open `index.html` in a browser, or run this from PowerShell:

```powershell
Start-Process .\index.html
```

No build step or dev server is required.

## Customize

Edit `index.html` to update:

- Your name and role
- The hero intro text
- Project names, descriptions, tags, and links
- Email, GitHub, and LinkedIn URLs

Edit `styles.css` to change:

- Colors
- Spacing
- Typography
- Responsive layout details

The hero illustration is stored at:

```text
assets/hero-workspace.svg
```

## Deploy to GitHub Pages

Create a new GitHub repository. For a personal site, name it:

```text
your-username.github.io
```

For a project site, any repository name is fine, such as:

```text
portfolio
```

Then push this project:

```powershell
git init
git add .
git commit -m "Create portfolio website"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

Replace `your-username` and `your-repo-name` with your real GitHub details.

## Enable Pages

On GitHub:

1. Open the repository.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Set `Branch` to `main`.
6. Set the folder to `/root`.
7. Save.

After GitHub publishes the site, it will be available at one of these URLs:

```text
https://your-username.github.io/
```

or:

```text
https://your-username.github.io/your-repo-name/
```

GitHub Pages can take a few minutes to publish after each push.
