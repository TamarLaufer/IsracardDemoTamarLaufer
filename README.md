**IsracardDemoYourName (React Native)
**
Android demo app: Harry Potter books with favorites, search, sort, 24h cache, and i18n (he/en). Layout stays LTR.

Tech / Packages

State/Data: Redux Toolkit, react-redux, redux-persist (persist reducer)

Fetching: RTK Query (or React Query) — optional redux-saga if needed

Navigation: @react-navigation/native, native-stack

Lists: @shopify/flash-list

i18n: i18next, react-i18next, react-native-localize

Storage: @react-native-async-storage/async-storage

Project Guidelines

Create project: IsracardDemoYourName

Frequent commits with clear messages

Feature branches per feature (e.g., feat/i18n, feat/sort)

Run (Android)
yarn install
yarn start --reset-cache
yarn android

**App Structure
**
Tabs: Home, Favorites

Home

Fetch from: https://potterapi-fedeperin.vercel.app/en/books

Cache for 24h (then refetch)

List item: title, releaseDate, cover

Press → Book Details

Book Details

Show: title, releaseDate, cover, description, pages

Toggle Favorite

Favorites

Shows favorited books; removable

Persisted via storage (survives app restarts)

Search (both tabs)

Debounced search

Filter by title (both tabs)

In Favorites also filter by description

Sorting

Title A–Z

Pages

Release date

i18n (Bonus)

he/en via i18next; language switcher

Persist selected language

No RTL flip (layout always LTR)

Suggested Commits (Conventional)

feat(books): RTK Query with 24h cache

feat(favorites): persist favorites

feat(search): debounced title/description

feat(sort): title/pages/releaseDate

feat(i18n): he/en + switcher (LTR layout)

License

MIT
