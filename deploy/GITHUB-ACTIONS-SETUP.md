# Setup GitHub Actions Deploy — Latihan-CBT

## Secrets (Settings → Secrets and variables → Actions)

Tambahkan di **Repository secrets** (bukan environment):

| Secret | Contoh | Keterangan |
|--------|--------|------------|
| `DEPLOY_HOST` | `178.128.98.86` | IP Droplet |
| `DEPLOY_USER` | `root` | User SSH |
| `DEPLOY_SSH_KEY` | *(private key)* | Pubkey harus ada di `~/.ssh/authorized_keys` droplet |
| `AUTH_SECRET` | *(string acak panjang)* | Kunci sesi JWT produksi |

> Secrets sudah dikonfigurasi otomatis via `gh secret set`. Jika deploy gagal dengan `missing server host`, cek secrets ini.

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
