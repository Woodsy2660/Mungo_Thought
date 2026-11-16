# Mungo Thought

Pop-up dinners and kitchen collaborations across Sydney and Griffith, cooked by the season.

This is the website: plain HTML, CSS and a small amount of JavaScript. It has no framework and no build step, so it deploys to Vercel as a static site.

## Pages

| URL | File | What's on it |
|---|---|---|
| `/` | `index.html` | The season field (it cycles through the months), "What is Mungo Thought", Pop-ups (past food, Coming up, Host a pop-up) |
| `/stories` | `stories/index.html` | Featured story, topic filter, story cards, what's in season now |
| `/stories/sea-urchin` | `stories/sea-urchin.html` | A story page |
| `/in-season` | `in-season.html` | Today's month and its produce, the month ruler, the year |
| `/lewis` | `lewis.html` | Lewis: portrait, film, notebook |
| (any other URL) | `404.html` | Not on the menu |

Shared files:
- `assets/css/site.css`: fonts, interaction states and phone overrides. Most layout is inline on the elements.
- `assets/js/site.js`: the months and the story filter.

## How the months work

- The site reads **today's date in the visitor's browser** to work out the current month. The year runs from December, because the seasons follow the NSW calendar: summer is Dec–Feb, autumn Mar–May, winter Jun–Aug, spring Sep–Nov.
- **Home:** the field starts on today's month and moves on one month every 5 seconds. When someone clicks a month, the cycle stops on that month for 15 seconds, then carries on from there. Cycling also pauses when the field is off-screen or the tab is hidden, and it's off for anyone who has reduced motion turned on.
- **In season:** opens on today's month and only changes when someone picks a month.
- To change the timings, edit `CYCLE_MS` and `PAUSE_MS` at the top of `assets/js/site.js`.

## Deploy on Vercel

1. In Vercel, go to **Add New… → Project** and import `Woodsy2660/Mungo_Thought`.
2. Set **Framework Preset** to **Other**, and leave the **Build Command** and **Output Directory** empty.
3. Deploy. Every push to `main` redeploys automatically.

`vercel.json` turns on clean URLs (`/lewis` rather than `/lewis.html`) and sets caching for `/assets`.

## Preview locally

```sh
npx serve .
```

`serve` handles clean URLs the same way Vercel does. Then open http://localhost:3000.

## Still to fill in

- Anything in [square brackets]: venues, guest chefs, growers, Lewis's facts and the notebook entries.
- The past pop-up names and dates, and the story copy, are samples.
- **Coming up** is a concept mock-up.
- Hosting enquiries go through Instagram ([@mungothought](https://www.instagram.com/mungothought/)) for now.

## Credits and licences

- **Type:** TeX Gyre Heros (GUST Font License), Courier Prime (SIL Open Font License) and Sorts Mill Goudy (SIL Open Font License). They're self-hosted in `assets/fonts`.
- **Logotype:** drawn from La Belle Aurore (SIL Open Font License).
- **Photography and film:** Mungo Thought's own.
