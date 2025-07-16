# Setup Instructions

## 1. Sklonuj repozytorium
```bash
git clone https://github.com/TomBelfast/HHI.git
cd HHI
```

## 2. Zainstaluj zależności
```bash
npm install
```

## 3. Skonfiguruj zmienne środowiskowe

### Skopiuj przykładowy plik:
```bash
cp .env.example .env.local
```

### Edytuj `.env.local` i uzupełnij:

**Wymagane do uruchomienia:**
- `DATABASE_URL` - połączenie z PostgreSQL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - klucz publiczny Clerk
- `CLERK_SECRET_KEY` - klucz sekretny Clerk

**Opcjonalne:**
- `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_TENANT_ID` - integracja OneDrive
- `RESEND_API_KEY` - wysyłanie emaili
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` - płatności

## 4. Uruchom bazę danych PostgreSQL
```bash
# Użyj Docker lub zainstaluj lokalnie
docker run --name hhi-db -e POSTGRES_PASSWORD=hhi123 -e POSTGRES_USER=hhi -e POSTGRES_DB=hhi_dashboard -p 5432:5432 -d postgres
```

## 5. Uruchom aplikację
```bash
npm run dev
```

Aplikacja będzie dostępna na: http://localhost:3000

## Funkcjonalności
- ✅ Dashboard z KPI i zarządzaniem projektami
- ✅ Autoryzacja Clerk (sign-in/sign-up)
- ✅ Internationalization (i18n)
- ✅ TypeScript
- ✅ Tailwind CSS + Shadcn UI
- ✅ Responsive design

## Troubleshooting
- Upewnij się, że PostgreSQL działa na porcie 5432
- Sprawdź czy klucze Clerk są poprawne
- Jeśli błędy z middleware - sprawdź czy next-intl jest skonfigurowany