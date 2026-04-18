# Design Brief: SnapVault

**SnapVault** is a luxury photographer client delivery platform emphasizing image-forward, professional aesthetics with secure payment integration.

## Aesthetic Direction

Luxury photography studio meets minimalist fintech. Dark theme (nearly black backgrounds) with platinum/silver surfaces and warm amber CTAs. Photography-centric design emphasizes visual content and professional trustworthiness.

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| background | 0.97 0 0 (off-white) | 0.11 0 0 (near black) | Page background |
| foreground | 0.18 0 0 (charcoal) | 0.92 0 0 (platinum) | Body text |
| primary | 0.42 0.06 266 (slate blue) | 0.68 0.15 254 (cool periwinkle) | Buttons, links, primary actions |
| accent | 0.72 0.24 70 (warm amber) | 0.72 0.24 70 (warm amber) | Download, CTAs, highlights |
| secondary | 0.65 0.15 254 (cool blue) | 0.42 0.06 266 (slate blue) | Secondary actions, toggles |
| destructive | 0.62 0.26 22 (warm red) | 0.68 0.26 22 (warmer red) | Alerts, delete actions |
| muted | 0.92 0 0 / 0.18 0 0 | Disabled text, backgrounds |
| border | 0.88 0 0 / 0.22 0 0 | Card borders, dividers |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Fraunces (serif) | Headers, hero titles, branding |
| Body | GeneralSans (sans-serif) | Paragraphs, UI labels, forms |
| Mono | GeistMono (monospace) | Access codes, technical text, file paths |

**Type Scale:** 12px, 14px, 16px, 18px, 20px, 24px, 32px, 40px

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header | `bg-card` with `border-b border-border`, sticky nav | Clear separation, navigation anchor |
| Main Content | `bg-background` with alternating `bg-card` sections | Visual hierarchy, digestible chunks |
| Sidebar (Dashboard) | `bg-card` with `shadow-card` | Elevated drawer for navigation |
| Folder Cards | `bg-card` with `shadow-elevated` on hover | Image-forward surfaces, hover depth |
| Footer | `bg-muted/20` with `border-t` | Minimal, recessive footer |
| Payment Page | `bg-card` overlay on `bg-background` | Modal-like focus on Stripe form |

## Component Patterns

- **Cards**: `rounded-sm` (tight 0.25rem), 12px padding, consistent shadow
- **Buttons**: Primary (accent amber on blue), Secondary (slate on white/dark), Destructive (warm red)
- **Inputs**: `border-border`, `bg-input`, 8px padding, `focus:ring-2 ring-primary`
- **Access Code Display**: `font-mono`, background highlight, copy-to-clipboard button
- **Image Grid**: Folder view as 3-col grid (desktop), 2-col (tablet), 1-col (mobile) with metadata overlays

## Spacing & Rhythm

- Base unit: 4px
- Density: Generous internal padding (12px), moderate gaps (8px/16px), breathable sections
- Vertical rhythm: Consistent 24px section spacing

## Motion

- **Transition default**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for all interactive elements
- **Card hover**: Subtle 2px scale up, shadow elevation
- **Button states**: Opacity shift + color transition (no bounce)
- **Page load**: Staggered card fade-in (photography showcase reveal)

## Elevation & Depth

- **Layer 0**: `bg-background` (base)
- **Layer 1**: `bg-card` (cards, popovers) + `shadow-card`
- **Layer 2**: `shadow-elevated` (hovered cards, modals)
- **Accents**: Warm amber (0.72 0.24 70) stands out against dark, draws eyes to CTAs

## Dark Mode Only

SnapVault ships dark-mode-default. Light mode not implemented (photography aesthetic favors dark viewing environments).

## Signature Detail

**Access Code Box**: Monospace code in `font-mono`, background highlight with subtle 1px `border-accent`, one-click copy button. Communicates exclusivity and technical security.

## Anti-Patterns Avoided

- No generic blue CTAs (uses warm amber for download, slate blue for secondary)
- No default Tailwind shadows (custom `shadow-card`, `shadow-elevated`)
- No uniform border-radius (0.25rem tight grid, intentional)
- No scattered animations (coordinated motion per zone)
- No light mode (dark-only respects photography industry standard)

## Constraints

- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Max content width: 1400px container
- Image aspect ratios: Folders as 16:9, thumbnails as 4:3
- Accessibility: WCAG AA+ contrast, semantic HTML, keyboard navigation
- Performance: Font `font-display: swap`, lazy-load images, minimize motion on `prefers-reduced-motion`
