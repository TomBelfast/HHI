# HHI CRM System - Demo Application

## 🏗️ Projekt Demo

Kompletny system CRM dla Home Improvements Northern Ireland (HHI) z realistycznymi danymi demo i pełną funkcjonalnością zarządzania klientami, projektami i analityką.

## ✨ Funkcjonalności

### 📊 Dashboard
- **Metryki w czasie rzeczywistym**: Klienci, projekty, przychody, aktywne projekty
- **Ostatnie projekty**: Lista 5 najnowszych projektów z statusami
- **Najlepsi klienci**: Top 5 klientów według wartości projektów
- **Tabela wszystkich projektów**: Z paginacją i sortowaniem

### 👥 Zarządzanie Klientami
- **Lista klientów**: 10 realistycznych klientów z pełnymi danymi
- **Filtrowanie**: Według oddziału, wyszukiwanie tekstowe
- **Sortowanie**: Według nazwy, wartości, oceny, daty rejestracji
- **Statystyki**: Całkowita wartość, średnia ocena, liczba projektów

### 🔨 Zarządzanie Projektami
- **Lista projektów**: 5 projektów w różnych statusach
- **Filtrowanie**: Według oddziału, statusu, kategorii
- **Wyszukiwanie**: W nazwie projektu, opisie, adresie
- **Metryki**: Aktywne projekty, całkowita wartość, średnia wartość

### 📈 Analityka
- **Wykresy**: BarChart (wydajność oddziałów), PieChart (kategorie)
- **Porównanie oddziałów**: Tabela z metrykami wydajności
- **Metryki firmy**: Projekty, przychody, konwersja, satysfakcja
- **Wydajność kategorii**: Analiza projektów według typu

### 📋 Raporty
- **6 typów raportów**: Miesięczny, satysfakcja klientów, pipeline, finanse, porównanie oddziałów, podwykonawcy
- **Generowanie raportów**: Symulacja generowania PDF
- **Szablony**: Raporty miesięczne i kwartalne
- **Status generowania**: Informacje o ostatnio wygenerowanych raportach

## 🛠️ Technologie

- **Framework**: Next.js 15.4.1 z TypeScript
- **Styling**: Tailwind CSS z custom HHI theme
- **Komponenty**: shadcn/ui + custom components
- **Wykresy**: Recharts
- **Mock Data**: MSW (Mock Service Worker)
- **API**: Custom API service z CRUD operations
- **Routing**: Next.js App Router

## 🎨 Design System

### Kolorystyka HHI
```css
--primary: oklch(0.8664 0.0728 12.3312);        /* Warm Orange */
--secondary: oklch(0.7973 0.0831 235.0238);     /* Professional Blue */
--accent: oklch(0.9517 0.2169 115.6724);        /* Success Green */
--background: oklch(0.9809 0.0025 228.7836);    /* Light Gray */
```

### Typografia
- **Fonty**: Poppins (sans-serif), Georgia (serif), Roboto Mono (monospace)
- **Skala**: H1-H4, body-lg, body, body-sm, caption
- **Responsywność**: Mobile-first design

## 📊 Mock Data

### Klienci (10)
- **Mrs. Sarah Connor** - Belfast, 2 projekty, £15,800
- **Mr. John Smith** - Newtownabbey, 1 projekt, £8,500
- **Mrs. Mary Johnson** - Lisburn, 1 projekt, £12,200
- **Mr. David Wilson** - Bangor, 3 projekty, £22,400
- **Mrs. Emma Brown** - Coleraine, 1 projekt, £6,800
- **Mr. Robert Taylor** - Belfast, 2 projekty, £18,900
- **Mrs. Lisa Anderson** - Newtownabbey, 1 projekt, £9,750
- **Mr. Michael O'Brien** - Lisburn, 2 projekty, £16,200
- **Mrs. Patricia Clarke** - Bangor, 1 projekt, £7,400
- **Mr. James Murphy** - Coleraine, 2 projekty, £13,600

### Projekty (5)
- **Complete Bathroom Refurbishment** - £8,500, Installation Completed
- **Kitchen Installation** - £12,200, Quote Sent
- **Composite Front Door & Windows** - £5,800, Materials Received
- **HD Decking Installation** - £4,200, Repair Completed
- **PVC Fascia & Guttering** - £3,400, Installation Scheduled

### Analityka
- **Całkowite projekty**: 127
- **Aktywne projekty**: 45
- **Przychody miesięczne**: £245,000
- **Stopa konwersji**: 28.5%
- **Średnia wartość projektu**: £8,750

## 🚀 Instalacja i Uruchomienie

### Wymagania
- Node.js 18+
- npm 9+

### Instalacja
```bash
# Klonowanie repozytorium
git clone <repository-url>
cd hhi

# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev
```

### Dostępne Skrypty
```bash
npm run dev          # Serwer deweloperski (http://localhost:3000)
npm run build        # Build produkcyjny
npm run start        # Serwer produkcyjny
npm run lint         # ESLint
```

## 📁 Struktura Projektu

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard
│   ├── customers/         # Strona klientów
│   ├── projects/          # Strona projektów
│   ├── analytics/         # Strona analityki
│   └── reports/           # Strona raportów
├── components/            # Komponenty React
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utilities i API
│   ├── api.ts           # API service
│   └── mock-data.ts     # Mock data
└── styles/              # Global styles
```

## 🔧 API Service

### Endpoints
- `getCustomers()` - Lista klientów z filtrowaniem i sortowaniem
- `getProjects()` - Lista projektów z filtrowaniem i sortowaniem
- `getAnalytics()` - Dane analityczne
- `getDashboardSummary()` - Podsumowanie dashboardu
- `getUsers()` - Lista użytkowników

### Funkcje
- **Paginacja**: Automatyczna paginacja wyników
- **Filtrowanie**: Według oddziału, statusu, kategorii, daty
- **Sortowanie**: Dowolne pole, kierunek asc/desc
- **Wyszukiwanie**: Tekstowe wyszukiwanie w polach

## 🎯 Scenariusze Demo

### 1. Administrator Dashboard
- Przegląd metryk firmy
- Porównanie wydajności oddziałów
- Analiza trendów projektów

### 2. Zarządzanie Klientami
- Filtrowanie klientów według oddziału
- Sortowanie według wartości projektów
- Wyszukiwanie klientów

### 3. Zarządzanie Projektami
- Filtrowanie projektów według statusu
- Analiza pipeline projektów
- Śledzenie postępów

### 4. Analityka
- Wykresy wydajności oddziałów
- Analiza kategorii projektów
- Porównanie metryk

### 5. Raporty
- Generowanie różnych typów raportów
- Pobieranie raportów PDF
- Szablony raportów

## 📱 Responsywność

Aplikacja jest w pełni responsywna i działa na:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔒 Bezpieczeństwo

- **Mock Authentication**: Symulacja logowania użytkowników
- **Data Validation**: Walidacja danych wejściowych
- **Error Handling**: Obsługa błędów API
- **Type Safety**: Pełne typowanie TypeScript

## 📈 Wydajność

- **Next.js 15**: Najnowsza wersja z Turbopack
- **Code Splitting**: Automatyczne dzielenie kodu
- **Image Optimization**: Optymalizacja obrazów
- **Lazy Loading**: Leniwe ładowanie komponentów

## 🧪 Testowanie

### Testowane Funkcjonalności
- ✅ Dashboard z metrykami
- ✅ Lista klientów z filtrowaniem
- ✅ Lista projektów z sortowaniem
- ✅ Analityka z wykresami
- ✅ Raporty z generowaniem
- ✅ Responsywność na różnych urządzeniach
- ✅ Nawigacja między stronami

### Status Testów
- **Wszystkie strony**: 200 OK
- **Mock API**: Działa poprawnie
- **Komponenty UI**: Renderują się bez błędów
- **Wykresy**: Wyświetlają dane poprawnie

## 🚀 Deployment

### Vercel (Zalecane)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Wsparcie

### Dokumentacja
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/

### Kontakt
- **Developer**: AI Assistant
- **Project**: HHI CRM Demo System
- **Version**: 1.0.0

## 📝 Licencja

Projekt demo - do użytku wewnętrznego HHI.

---

**HHI CRM System** - Profesjonalne zarządzanie projektami home improvements w Irlandii Północnej.
