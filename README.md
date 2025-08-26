## EGABI Events (Assessment)

A feature-driven React Native app (TypeScript) to browse and manage events.
Users can search by city/keyword, view event details with a map preview, mark favourites, toggle between English/Arabic (RTL), and manage login/signup locally.

### Folder Structure

```
src/
  common/
    utils/
      i18n.ts
    components/
      Button.tsx
      Input.tsx
  navigation/
    index.tsx
  screens/
    splash/
      SplashScreen.tsx
    home/
      HomeScreen.tsx
      api/eventsApi.ts
    eventDetails/
      EventDetailsScreen.tsx
    profile/
      ProfileScreen.tsx
    login/
      LoginScreen.tsx
    signup/
      SignupScreen.tsx
  shared/
    storage/
      favourites.ts
      user.ts

```

### Assumptions

- Events API: TicketMaster `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}`.
- Map preview via `react-native-maps`; set up the API key for ios and android on my own account.
- Authentication: Login/Signup handled only via local storage (AsyncStorage). No backend integration.

### Setup

```sh
npm install
# iOS only (macOS):
cd ios && pod install && cd ..
```

### Run

```sh
npm start
npm run android
# or on macOS
npm run ios
```

### Features

- Search Events → by keyword + city
- Event Details → hero image, venue info, description, performers, date/time, and interactive map preview
- Favourites → persist locally via AsyncStorage
- Language Toggle → English ↔ Arabic (RTL layout support)
- Profile → login/logout/signup (local storage only), view user info, change app locale
- Navigation Flow → Splash → Home → Event Details → Profile

### Notes

- Designed for assessment purposes (offline/local storage, no backend).
- Can be extended with real authentication & persistent backend.
- Local only; no hosted live link — run using commands above.

### Live link

- Local only; run with commands above.
