# GameExplorer - Delivery Plan (Team of 4)

## 1. Project Objective

Build a React SPA that consumes the RAWG API and allows users to:

1. Discover trending games from the landing page
2. Browse and filter a paginated games catalog
3. View full game details
4. View a game's developers team
5. Browse creators
6. View creator profiles

The app must handle asynchronous states consistently on every API-driven page:
- loading
- error
- empty results

---

## 2. Team Composition and Ownership

| Team Member | Primary Scope | Secondary Scope |
|---|---|---|
| Dev A (Lead/Architecture) | App scaffold, routing, shared layout, API client setup | Integration support, reviews |
| Dev B (Games Domain) | `/games` page: cards, pagination, search, filters | Landing trending cards |
| Dev C (Game Details Domain) | `/games/:game_id` and `/games/:game_id/developers-team` | Data mapping/normalization |
| Dev D (Creators Domain + UX States) | `/creators` and `/creators/:creator_id`, reusable async states | QA and demo preparation |

---

## 3. Scope Breakdown (from spec)

## Required Pages and Routes

1. `/` - Landing page  
   - Hero section with button **Browse Games** -> `/games`
   - Trending Games section (6 games from API)
   - Click game -> `/games/{game_id}`

2. `/games` - Games list  
   - Card fields: image, name, rating, release date
   - Pagination (`page=1,2,...`)
   - Search by game name
   - Filter by genre
   - Tags filter (optional)
   - Click game -> `/games/{game_id}`

3. `/games/{game_id}` - Game detail  
   - name, image, description, rating, release date, genres, platforms
   - Button **View Developers** -> `/games/{game_id}/developers-team`

4. `/games/{game_id}/developers-team` - Development team  
   - Creators list with name and role (developer, designer, etc.)
   - Data from dedicated endpoint

5. `/creators` - Creators list  
   - name, image (if available)
   - Click creator -> `/creators/{creator_id}`

6. `/creators/{creator_id}` - Creator profile  
   - name, description, associated games (if available)

## Global UI
- Navbar links:
  - Home -> `/`
  - Games -> `/games`
  - Creators -> `/creators`

---

## 4. Technical Architecture

## Suggested Stack
- React
- React Router
- Fetch API or Axios
- `useState` + `useEffect` for async data management

## Suggested Folder Structure
```txt
src/
  app/
    router.jsx
    layout/
  api/
    client.js
    endpoints.js
    mappers.js
  pages/
    Home/
    Games/
    GameDetail/
    DevelopersTeam/
    Creators/
    CreatorDetail/
  components/
    Navbar/
    Hero/
    GameCard/
    CreatorCard/
    Pagination/
    SearchBar/
    Filters/
    states/
      LoadingState/
      ErrorState/
      EmptyState/
  hooks/
    useFetch.js
  utils/
    constants.js
    formatters.js
```

## API Strategy
1. Centralize API base URL and key in one client module.
2. Keep endpoint builders in `endpoints.js`.
3. Normalize API responses in `mappers.js`.
4. Avoid direct API calls inside deeply nested UI components.
5. Use consistent query parameter handling for pagination/search/filters.

---

## 5. Work Plan by Phase (5 days)

## Day 1 - Foundation
- Dev A:
  - Initialize app structure
  - Configure React Router with all required routes
  - Build navbar and shared layout
  - Set up API client and environment variables
- Dev B:
  - Build reusable `GameCard`
  - Scaffold `/games` page UI shell
- Dev C:
  - Scaffold `/games/:game_id` page shell
  - Prepare detail data model mapping
- Dev D:
  - Scaffold creators pages
  - Build reusable `LoadingState`, `ErrorState`, `EmptyState` components

## Day 2 - Core Features
- Dev A:
  - Implement landing Hero
  - Implement Trending Games (6 items)
- Dev B:
  - Implement games list API integration
  - Add pagination
  - Add search by name
- Dev C:
  - Implement game detail data rendering
  - Wire **View Developers** navigation
- Dev D:
  - Implement creators list and navigation to profile

## Day 3 - Secondary Features and Integration
- Dev B:
  - Add genre filtering
  - Add optional tags filter (if feasible without instability)
- Dev C:
  - Implement developers-team page from dedicated endpoint
- Dev D:
  - Implement creator profile details and associated games
- Dev A:
  - Cross-page integration and shared bug fixes

## Day 4 - Stabilization and UX Hardening
- Team:
  - Fix bugs and edge cases
  - Ensure all pages handle loading/error/empty states
  - Ensure consistent card/UI formatting
  - Improve responsive behavior
  - Final integration pass

## Day 5 - Finalization and Submission
- Team:
  - End-to-end walkthrough rehearsal
  - Prepare assessment flow:
    - 5 min presentation
    - 5 min demonstration
    - 15 min technical Q&A
  - Validate all deliverables are ready:
    - Trello link
    - Presentation link
    - GitHub link
    - Figma link

---

## 6. Task Allocation (Actionable Backlog)

## Dev A (Lead/Architecture)
1. Setup router and route guards/fallback
2. Build shared layout + navbar
3. Create API client and endpoint utility layer
4. Implement landing page integration
5. Coordinate merge strategy and reviews

## Dev B (Games Domain)
1. Build game cards and list grid
2. Implement pagination state and controls
3. Implement search input and query sync
4. Implement genre filter (required)
5. Implement tags filter (optional)

## Dev C (Game Details Domain)
1. Build game detail page UI and data binding
2. Map all required fields from API payload
3. Build developers-team page and role display
4. Handle missing data cases safely

## Dev D (Creators Domain + UX)
1. Build creators list page and cards
2. Build creator detail page and associated games section
3. Implement shared loading/error/empty components
4. Validate consistent async handling across all pages

---

## 7. Git and Collaboration Workflow

1. Branch strategy:
   - `main` (stable)
   - `feature/<scope-name>` for each task
2. Every feature goes through pull request review before merge.
3. Use clear commit prefixes:
   - `feat:`
   - `fix:`
   - `refactor:`
   - `chore:`
4. Keep PRs small and focused by page/feature.
5. Integrate frequently to reduce merge conflicts near deadline.

---

## 8. Quality Gates (Definition of Done)

A feature is considered done only when:

1. Route and navigation are functional.
2. Required API data is displayed correctly.
3. Loading, error, and empty states are implemented.
4. No blocking runtime errors.
5. UI remains usable across standard screen sizes.
6. Code is reviewed and merged via PR.

---

## 9. Risks and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| RAWG endpoint shape mismatch | Broken rendering | Use mappers and null-safe rendering |
| API rate limits / failures | Incomplete data display | Add clear error states and retry affordance |
| Merge conflicts late in project | Delivery delay | Daily integration and scoped branches |
| Over-scoping optional features | Core scope risk | Keep tags filter optional and last priority |

---

## 10. Assessment-Oriented Demo Flow

1. Home page: Hero + trending games.
2. Navigate to games list with search/filter/pagination.
3. Open game detail and show full metadata.
4. Open developers-team route.
5. Navigate to creators list and creator profile.
6. Highlight async state handling and routing logic.
