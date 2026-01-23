

# NIP-05 Identifier Setup for neo@neo21.dev

## Overview

Create the required `nostr.json` file that will allow Nostr clients to verify the identifier `neo@neo21.dev` by looking up `https://neo21.dev/.well-known/nostr.json?name=neo`.

## Implementation

### Create `public/.well-known/nostr.json`

```json
{
  "names": {
    "neo": "f901616f00a63f4f9c7881d4871a03df3d4cee7291eafd7adcbeea7c95c58e27"
  },
  "relays": {
    "f901616f00a63f4f9c7881d4871a03df3d4cee7291eafd7adcbeea7c95c58e27": [
      "wss://relay.damus.io",
      "wss://relay.primal.net",
      "wss://nostr.land"
    ]
  }
}
```

## How It Works

| Component | Value |
|-----------|-------|
| Username | `neo` |
| Domain | `neo21.dev` |
| Full identifier | `neo@neo21.dev` |
| Lookup URL | `https://neo21.dev/.well-known/nostr.json?name=neo` |

When a Nostr client wants to verify `neo@neo21.dev`:
1. It fetches `https://neo21.dev/.well-known/nostr.json`
2. Looks up `names.neo` to get your hex pubkey
3. Optionally reads `relays` to discover your preferred relays

## Important Notes

- The file will work once you connect your custom domain `neo21.dev` to this Lovable project
- Vite serves files from `public/` at the root, so `public/.well-known/nostr.json` becomes `/.well-known/nostr.json`
- CORS headers are handled automatically by the hosting

## File Changes

| File | Action |
|------|--------|
| `public/.well-known/nostr.json` | Create new file |

