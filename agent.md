# The “Client-Side Backend” Idea

## Core Vision

Imagine you could write a React component **as if it were local state**, but under the hood it’s a **real-time, cloud-persisted, searchable, socially-aware data store**—without writing any backend code.

You don’t create tables, API endpoints, or manage indexes manually. You just declare:

```tsx
const [profile, setProfile] = useUserVariable({
  key: "profile",
  defaultValue: { name: "Alice", bio: "Loves beans" },
  privacy: "PUBLIC",
  searchKeys: ["name", "bio"],
});
```

And the system automatically:

- Persists it to the cloud.
- Syncs it across devices.
- Makes it searchable by anyone (if `privacy: "PUBLIC"`).
- Lets you share with specific users (whitelist).
- Shows “last updated” and “created” timestamps.
- Handles permissions, indexing, and scalability for you.

---

## Why This Is Powerful

### 1. **Zero Backend Boilerplate**

Normally, to store a “profile,” you’d:
- Design a database schema.
- Write API endpoints: `GET /profile`, `PATCH /profile`.
- Add search endpoints.
- Add permissions logic.
- Wire up real-time subscriptions.

Here, you **declare intent** in the component and the system generates all that for you.

### 2. **Real-Time, Persistent State**

`useState` is local and disappears on refresh. `useUserVariable` behaves like `useState` but:

- Data survives page reloads.
- Changes sync instantly across all your devices.
- You can show “syncing” spinners while it saves.

### 3. **Built-In Social Features**

You don’t manually manage “who can see this.” You just say:

```tsx
privacy: "PUBLIC"          // anyone can read
privacy: "PRIVATE"         // only you
privacy: ["friend1", "friend2"] // whitelist
```

The system enforces it automatically and efficiently, even with millions of users.

### 4. **Search and Filtering Without Writing Queries**

You don’t write SQL/Convex queries. You pass:

```tsx
const results = useUserVariableGet({
  key: "profile",
  searchFor: "Alice",
  filterFor: "Green",
  userIds: friendsList,
});
```

And the system:
- Full-text searches across names/bios.
- Filters by an exact field (e.g., “Green” beans).
- Limits to your friends.
- Respects privacy and permissions.

---

## The “Magic” Under the Hood

### 1. **Rich Documents, Not Just Key-Value**

Each variable is a **document** with:

- `value`: your actual data.
- `lastModified`: when it was last changed.
- `createdAt`: when it was first created.
- `privacy`: PUBLIC/PRIVATE/whitelist.
- `filterKey`/`searchKeys`: how to index this variable.
- `filterString`/`searchString`: computed values for fast queries.

This means you can sort feeds, search, and filter **without touching the value**.

### 2. **Scalable Permissions**

Whitelists can’t be stored as arrays on each document (that would require scanning every row). Instead:

- A separate `permissions` table maps `varId → allowedUserId`.
- To find “everything shared with me,” we query `permissions` by `allowedUserId` (O(1)).
- Then fetch those docs by ID.

This scales to millions of users and variables.

### 3. **Smart Indexing**

- **Owner access**: `(userToken, key)` → instant.
- **Public feeds**: `(key, privacy, lastModified)` → sorted by time.
- **Search**: full-text index on `searchString` + filters for `key`, `privacy`.

All queries stay fast even as data grows.

### 4. **Privacy by Default**

- Nothing is public unless you say so.
- Whitelists are explicit lists of user IDs.
- Private data never leaves your account.

---

## Developer Experience

### 1. **Familiar `useState` Shape**

```tsx
const [count, setCount] = useUserVariable({ key: "count", defaultValue: 0 });
```

- `count` is an object: `{ value, lastModified, timeCreated, userId, state }`.
- You render `count.value`.
- You call `setCount(5)` to update.

### 2. **Optional Configuration**

You can add search, filtering, and sharing later without breaking existing code:

```tsx
const [beans, setBeans] = useUserVariable({
  key: "beans",
  defaultValue: { name: "Bean", color: "green" },
  // Later add:
  privacy: "PUBLIC",
  searchKeys: ["name"],
  filterKey: "color",
});
```

### 3. **Read Hook for Social Feeds**

```tsx
const greenBeans = useUserVariableGet({
  key: "beans",
  filterFor: "Green",
  returnTop: 20,
});
```

This automatically:
- Respects privacy.
- Applies filters.
- Sorts by time.
- Returns full documents so you can show `bean.value`, `bean.lastModified`, etc.

---

## What This Enables

- **Instant prototyping**: Add new persistent, searchable, shareable state in one line.
- **Social apps**: User profiles, shared notes, game scores, inventories.
- **Real-time collaboration**: Edit a document together, see changes live.
- **Privacy-first design**: Nothing is shared unless you opt in.
- **Scalable architecture**: Works at thousands or millions of users without custom backend work.

---

## TL;DR

You’re building **“useState for the cloud”**:

- Write components like you always have.
- Data is stored, synced, searchable, and socially-aware automatically.
- No backend code, no manual indexing, no permission plumbing.
- Just declare intent, and the system does the rest.

This is the **client-side backend** philosophy: let developers focus on UI and product logic, while the framework handles persistence, real-time sync, search, and privacy.
