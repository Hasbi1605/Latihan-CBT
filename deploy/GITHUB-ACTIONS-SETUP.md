# Setup GitHub Actions Deploy — Latihan-CBT

## Secrets (Settings → Secrets and variables → Actions)

| Secret | Contoh | Keterangan |
|--------|--------|------------|
| `DEPLOY_HOST` | `178.128.98.86` | IP Droplet |
| `DEPLOY_USER` | `root` | User SSH |
| `DEPLOY_SSH_KEY` | *(private key)* | Pasangan pubkey di `~/.ssh/authorized_keys` droplet |
| `AUTH_SECRET` | *(string acak panjang)* | Sama dengan produksi |

## Environment (opsional)

Buat environment `production` di GitHub repo dan pasang secrets di atas.

## Trigger

- Otomatis: setiap push ke `main`
- Manual: Actions → **Deploy Production (DigitalOcean)** → Run workflow

## Manual SSH (darurat)

```bash
ssh root@<IP>
export AUTH_SECRET='...'
cd /opt/latihan-cbt
bash deploy/remote-deploy.sh
```
