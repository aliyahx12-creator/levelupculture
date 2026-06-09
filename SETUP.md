# The Level Up Culture — Setup Guide

## Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or yarn
- Expo Go app on your phone (iOS or Android) OR Android Studio / Xcode for emulators
- A free Supabase account (https://supabase.com)

---

## 1. Install dependencies

```bash
cd LevelUpCulture
npm install
```

---

## 2. Set up Supabase

1. Go to https://supabase.com and create a new project.
2. In the Supabase dashboard, go to **SQL Editor** and run the contents of `supabase/schema.sql`.
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key

4. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:
```
EXPO_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 3. Update the Discord link

In `app/(tabs)/community.tsx`, replace the Discord URL:

```ts
const DISCORD_URL = 'https://discord.gg/YOUR_INVITE_CODE';
```

---

## 4. Run the app

```bash
npx expo start
```

This opens the Expo developer menu. Then:
- **Phone:** Scan the QR code with the Expo Go app
- **Android Emulator:** Press `a`
- **iOS Simulator (Mac only):** Press `i`
- **Web browser:** Press `w`

---

## Project Structure

```
LevelUpCulture/
├── app/
│   ├── _layout.tsx          # Root layout (fonts, status bar)
│   ├── index.tsx            # Auth redirect
│   ├── (auth)/
│   │   ├── login.tsx        # Login screen
│   │   └── signup.tsx       # Sign up screen
│   └── (tabs)/
│       ├── index.tsx        # Home dashboard
│       ├── journal.tsx      # Gaming journal
│       ├── resources.tsx    # Resource library
│       ├── community.tsx    # Community + Discord
│       └── profile.tsx      # User profile
├── components/
│   ├── ui/                  # Button, Card, Input, Typography
│   ├── IdentityCard.tsx     # Daily identity statement
│   ├── ConfidenceTracker.tsx
│   └── XPBar.tsx
├── hooks/
│   └── useAuth.ts           # Supabase auth hook
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── theme.ts             # Colors, fonts, spacing
├── types/
│   └── index.ts             # TypeScript types
└── supabase/
    └── schema.sql           # Database schema
```

---

## Brand Colors
| Name | Hex |
|------|-----|
| Midnight Black | `#0D0D0D` |
| Level Up Purple | `#6E44FF` |
| Soft Ivory | `#F8F6F2` |
| Deep Plum | `#2D173D` |
| Charcoal Gray | `#2A2A2A` |

Font: **Montserrat** (loaded via `@expo-google-fonts/montserrat`)
