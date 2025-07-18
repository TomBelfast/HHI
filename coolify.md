# 🔑 DANE DOSTĘPOWE COOLIFY

## Web Interface:
- **URL:** http://192.168.0.25:8000
- **Email:** aiwbiznesiepl@gmail.com
- **Password:** Swiat1976@#$

## API Access:
- **API Token:** 1|qqpabrF0YyPOkoSr3ACyVdCedqX2wxUv4bej7pQS580c20d9
- **Base URL:** http://192.168.0.25:8000/api/v1/

## Container SSH (jeśli potrzebne):
- **SSH:** ssh root@192.168.0.25
- **Container ID:** LXC 116 na Proxmox 1

## Quick Access Links:
- **Dashboard:** http://192.168.0.25:8000/dashboard
- **Applications:** http://192.168.0.25:8000/applications
- **Projects:** http://192.168.0.25:8000/projects

---

## 🚀 Ready to login and configure environment variables for HHI deployment!

### Deployment Steps:
1. **Login to Coolify:** http://192.168.0.25:8000
2. **Find HHI project** in Applications/Projects
3. **Trigger deployment** or check if auto-deployment is enabled
4. **Monitor deployment logs** for any issues
5. **Verify application** is running correctly

### Environment Variables (if needed):
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=http://192.168.0.25:3000`
- Database connection strings (if applicable)
- API keys and secrets

### Troubleshooting:
- Check deployment logs in Coolify dashboard
- Verify container resources and networking
- Ensure all environment variables are set correctly 