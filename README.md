# How Was Your Day? 🌻

A daily mood tracking application built with modern web technologies. Track your daily experiences, moods, and activities in a cozy interface.

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Drizzle ORM
- **API Layer**: tRPC
- **State Management**: React Query
- **UI Components**: Radix UI
- **Animations**: Tailwind Animate

## 🛠️ Getting Started

1. Clone the repository
```bash
git clone git@github.com:SebDiyx/how-was-your-day.git
cd how-was-your-day
```

2. Install dependencies
```bash
pnpm install
```

3. Set up your environment variables
```bash
cp .env.example .env
```

4. Init the DB
```bash
pnpm db:migrate
```

5. Run the development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format:write` - Format code with Prettier
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:push` - Push database changes
- `pnpm seed` - Seed the database with sample data


## 🙏 Acknowledgments

- Built with [create-t3-app](https://create.t3.gg/)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ and ☕