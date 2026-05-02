# Deployment Flow

Recommended production workflow:

```text
Local change
-> GitHub feature/dev branch
-> Review and approve
-> Merge to main
-> VPS deploy from main
-> Live website updated
```

## Why GitHub first

- Every change has history and rollback.
- Live VPS does not receive unfinished code.
- Secrets stay on the VPS in `.env`, not in GitHub.
- You can review changes before publishing.

## Branch plan

- `main`: production-ready code only.
- `dev`: testing branch for new features.
- `codex/*`: work branches for individual changes.

## VPS plan

On the VPS:

```bash
git clone YOUR_REPO_URL Siddhi-SMS
cd Siddhi-SMS
cp .env.example .env
npm start
```

For production process management, use `pm2`, `systemd`, or your hosting panel.

## Future auto deploy

After the repo exists, add GitHub Actions or VPS webhook deployment:

1. Push code to GitHub.
2. Review/approve changes.
3. Merge to `main`.
4. GitHub Action SSHs into VPS.
5. VPS pulls latest `main` and restarts the Node app.

Do not commit real bKash, Nagad, SMS gateway, database, email or admin secrets.
