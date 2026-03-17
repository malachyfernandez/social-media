# User Data Variables Tracking

## UserVariable Definitions

### Key: userData
- **Tracks**: User email, name, userId
- **Origin**: app/components/MainPage.tsx
- **Properties**: email, name, userId
- **Privacy**: PUBLIC
- **SearchKeys**: name

### Key: activeGameId
- **Tracks**: Currently active game ID
- **Origin**: app/components/MainPage.tsx
- **Properties**: string (game ID)
- **Privacy**: (not specified)

### Key: gamesTheyJoined
- **Tracks**: Array of game IDs user joined
- **Origin**: app/components/game/AllGamesPage.tsx
- **Properties**: string[] (game IDs)
- **Privacy**: (not specified)

## UserList Definitions

### Key: games
- **Tracks**: Game information per user
- **Origin**: app/components/MainPage.tsx (usage)
- **Properties**: id, name, description
- **Privacy**: PUBLIC
- **FilterKey**: id

### Key: playerTable
- **Tracks**: Player table data per game
- **Origin**: app/components/game/PlayerPageOPERATOR.tsx
- **Properties**: PlayerTableItem[] (email, role)
- **Privacy**: PUBLIC
- **ItemId**: gameId

### Key: userTable
- **Tracks**: User table data per game
- **Origin**: app/components/game/PlayerPageOPERATOR.tsx
- **Properties**: UserTableItem[] (userId, role, playerData, days)
- **Privacy**: PUBLIC
- **ItemId**: gameId

### Key: startingDate
- **Tracks**: Game start date per game
- **Origin**: app/components/game/PlayerPageOPERATOR.tsx
- **Properties**: string (date or "Unset")
- **Privacy**: PUBLIC
- **ItemId**: gameId

### Key: realDaysPerInGameDay
- **Tracks**: Real days per in-game day
- **Origin**: app/components/game/PlayerPageOPERATOR.tsx
- **Properties**: string (number as string)
- **Privacy**: PUBLIC
- **ItemId**: gameId

## Property Inconsistencies

### userData - Duplicate Definitions
- **MainPage.tsx**: email, name, userId, PUBLIC privacy, searchKeys: ["name"]
- **AllGamesPage.tsx**: email, name, userId, PUBLIC privacy, searchKeys: ["name"]
- **Status**: Identical properties - no inconsistency detected

### startingDate - Duplicate Definitions
- **PlayerPageOPERATOR.tsx**: string, PUBLIC privacy, defaultValue: "Unset"
- **ChangeDateInfo.tsx**: string, (privacy not specified), no defaultValue
- **GetStartedButton.tsx**: string, (privacy not specified), no defaultValue
- **Status**: Inconsistent privacy and defaultValue across files

### realDaysPerInGameDay - Duplicate Definitions
- **PlayerPageOPERATOR.tsx**: string, PUBLIC privacy, defaultValue: "2"
- **ChangeDateInfo.tsx**: string, (privacy not specified), defaultValue: "2"
- **GetStartedButton.tsx**: string, (privacy not specified), no defaultValue
- **Status**: Inconsistent privacy and defaultValue across files

## Notes
- MAX 10 tokens per definition as requested
