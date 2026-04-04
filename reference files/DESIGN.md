# Design System Document

## 1. Overview & Creative North Star: "The Modern Scholar"
This design system moves away from the cluttered, "gamified" feel of traditional trackers to embrace an editorial, high-end aesthetic. The Creative North Star is **The Modern Scholar**: an environment that feels like a private, sun-drenched library where technology serves as a silent, sophisticated curator. 

To achieve this, we break the "standard app template" by using intentional asymmetry, generous white space (inspired by high-end book margins), and a focus on tonal depth rather than structural lines. We prioritize the "deep work" state by removing visual noise and using a hierarchy that honors the written word.

---

## 2. Colors: Tonal Depth & Soul
Our palette transitions from the profound depth of a midnight sky to the warmth of aged parchment.

### The Palette
- **Primary (`#031632`)**: Our "Deep Navy." Used for primary actions and deep-focus backgrounds.
- **Secondary (`#775a19`)**: Our "Scholarly Gold." Used for achievement, high-value highlights, and "active learning" states.
- **Surface & Background (`#f9f9f9`)**: A crisp, off-white that prevents eye strain during long reading sessions.

### Signature Rules
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Contrast must be achieved through background shifts. For example, a `surface-container-low` list sits directly on a `surface` background. The change in tone *is* the boundary.
- **Glass & Gradient Rule:** For floating elements (like a navigation bar or a "Currently Reading" overlay), use `surface-container-lowest` at 80% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** Use a subtle linear gradient for primary CTAs: `primary` (#031632) to `primary_container` (#1a2b48) at a 135° angle. This adds a "silk" sheen to digital buttons.

---

## 3. Typography: The Editorial Voice
We use a high-contrast pairing to evoke the feeling of a premium literary journal.

- **Display & Headline (Newsreader):** This serif font is our scholarly voice. Use `display-lg` (3.5rem) for milestone achievements and `headline-sm` (1.5rem) for book titles. The tight letter-spacing and elegant serifs command authority.
- **Body & Label (Manrope):** Our sans-serif utility. It provides a clean, modern counterpoint. Use `body-lg` (1rem) for book summaries to ensure maximum legibility.
- **Hierarchy Hint:** Always lead with the serif for content headers, and use the sans-serif for metadata (labels, dates, page numbers) to create a clear "Content vs. Data" distinction.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "pop"; we use them to create "atmosphere."

- **The Layering Principle:** Stack containers to define hierarchy. 
    *   *Level 0:* `surface` (The floor)
    *   *Level 1:* `surface-container-low` (Content sections)
    *   *Level 2:* `surface-container-lowest` (Interactive cards/modals)
- **Ambient Shadows:** When a card must float, use a shadow with a 32px blur, 0px spread, and 6% opacity of the `on-surface` color. It should feel like the card is resting on a cloud, not a table.
- **The "Ghost Border" Fallback:** If a boundary is visually required for accessibility, use `outline-variant` at 15% opacity. Never use a 100% opaque border.

---

## 5. Components: Custom Editorial Elements

### Book Cards
*   **Structure:** No borders. Use `surface-container-lowest` for the card body. 
*   **Layout:** Asymmetric. Place the book jacket slightly overlapping the top-left edge of the card container to break the grid.
*   **Typography:** Book title in `title-md` (Newsreader).

### Streak Counters & Progress
*   **Style:** Use `secondary` (Gold) for active streaks. 
*   **Visual:** Instead of a circular ring, use a thin, elegant horizontal line at the bottom of a book card. Use `secondary_container` as the track and `secondary` as the progress.

### "Active Learning" Quiz Prompts
*   **Styling:** These should feel like "interventions." Use a `primary_container` background with `on_primary_container` text.
*   **Input:** Text fields should be "borderless," using only a bottom stroke of `outline_variant` (20% opacity) that becomes `secondary` (Gold) on focus.

### Buttons & Chips
*   **Primary Button:** `primary` fill, `on_primary` text, `xl` (0.75rem) corner radius. Use the "Silk Gradient" mentioned in Section 2.
*   **Filter Chips:** Use `surface-container-high` for unselected and `secondary_fixed` for selected states. Forbid hard outlines.
*   **Lists:** Forbid divider lines. Use `spacing-6` (2rem) between items to let the content breathe.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. A wider left margin (e.g., `spacing-8`) creates a "manuscript" feel.
*   **Do** use `secondary` (Gold) sparingly. It is a reward, not a utility.
*   **Do** prioritize vertical rhythm. Use the `spacing-4` (1.4rem) increment as your baseline for all text blocks.

### Don't
*   **Don't** use pure black (#000000). Always use `primary` (#031632) for deep values.
*   **Don't** use standard "Material Design" shadows. They are too heavy for this scholarly aesthetic.
*   **Don't** cram information. If a screen feels full, increase the spacing scale by one increment. High-end design is defined by what you leave out.