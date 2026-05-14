Hey! So I spent some time digging through the FlexPrice frontend and pulling out all the reusable UI pieces into this Storybook. It's basically a living style guide for how I'd build FlexPrice-style interfaces.

🔗 Links 
Live Storybook: https://flexprice-frontend-assignment.vercel.app/

GitHub Repo: https://github.com/vid123ver/-flexprice-frontend-assignment


**Run it locally:**
npm install
npm run storybook
Then just hit http://localhost:6006 and you'll see everything. Tweak the controls, break things, see how components behave — that's what it's there for.

What I Built (17 Components Total) , 10 Atoms , 4 Molecules , 3 Organisms

**1.)Atoms — The Small Stuff (10)**
These are your basic building blocks. Nothing fancy, just solid components that do one thing well.

Component	What It Does
Button	Primary, secondary, ghost, danger — plus small/medium/large sizes, loading states, and you can slap an icon on it
Badge	Status chips for plans (active/archived), invoices (paid/draft/void), subscriptions — you get the idea
Spinner	Loading indicators. Small, medium, large. Does what it says on the tin.
Tooltip	Hover over something, get extra info. You can tweak the delay and position.
Input	Text + number inputs with labels, error messages, and yes — a currency prefix like $
Select	Dropdown with radio-style selection and search. No more scrolling through 50 options.
Chip	Little status tags — success, warning, failed, info. Good for quick visual scanning.
Checkbox	Your standard checkbox, but with label and optional description text underneath
CodeBlock	Shows code with syntax highlighting. Comes with a copy button because nobody wants to manually select and CMD+C.
DateRangePicker	Pick a date range. Has timezone support because not everyone lives in UTC.

**2.)Molecules — The Medium Stuff (4)
**These combine atoms into slightly more useful things.

PricingTierTable — Shows tiered pricing in a clean table. Good for plans with volume discounts.
InvoiceTable — Invoice list with status chips. You can instantly spot who paid and who didn't.
CommandPalette — Hit CMD+K (or CTRL+K on Windows) and search through whatever you want. Fancy.
Pagination — Handles lots of pages without looking like a mess. Those ellipsis (...) do the heavy lifting.

**3.)Organisms — The Big Stuff (3)
**These are chunky components that could almost be entire sections of a page.
SidebarNav — Collapsible navigation that highlights where you currently are. Icons + labels, as God intended.
EmptyState — What you show when there's no data. Friendly icon, helpful text, a button to do something. No sad blank screens.
SubscriptionTable — Sortable subscription list with status filtering built in. Click a column header, things rearrange themselves.

Tech Stack
React + TypeScript + Vite — standard setup

Storybook 8 — for the component playground

Lucide Icons — clean icons


