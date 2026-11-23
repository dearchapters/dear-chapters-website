# Subscriber database setup (about 10 minutes)

The website is hosted on GitHub Pages, which can only serve static files. To save signups
we use **Supabase**, a free hosted database. The website talks to it directly, so there is no
server to run.

## 1. Create the database

1. Go to https://supabase.com and create a free account, then click **New project**.
2. Name it `dear-chapters`, choose a region close to Malaysia (for example **Southeast Asia (Singapore)**) and set a database password. Save the password somewhere safe.
3. When the project is ready, open **SQL Editor > New query**, paste the whole contents of `supabase/schema.sql` and click **Run**.
4. Open **Table Editor**. You should see three tables: `subscribers`, `love_letters` and `love_letter_sends`.

## 2. Connect the website

1. In Supabase, open **Project Settings > API**.
2. Copy the **Project URL** and the **anon public** key.
3. Open `script.js`, find `SUBSCRIBE_CONFIG` and paste them in:

```js
const SUBSCRIBE_CONFIG = {
  supabaseUrl: "https://YOUR-PROJECT.supabase.co",
  supabaseAnonKey: "YOUR-ANON-PUBLIC-KEY"
};
```

4. Commit the change. The site updates in about a minute.

The anon key is meant to be public. Row Level Security in `schema.sql` means visitors can only
**add** a signup. They cannot read or change the list. Never put the **service_role** key in `script.js`.

Until you do this step, the form still works: it opens a pre-filled email to dearchapters.co@gmail.com
so no signup is lost.

## 3. Test it

Subscribe with your own email on the live site, then check **Table Editor > subscribers**.
You can delete the test row afterwards.

## What is in the database

| Table | What it holds |
| --- | --- |
| `subscribers` | email, name, whether they want launch updates and/or the weekly love letter, status (active or unsubscribed), unsubscribe token |
| `love_letters` | your weekly letters: subject, body, date to send, draft/scheduled/sent |
| `love_letter_sends` | a log of which subscriber received which letter |

## Sending the emails

Supabase stores the list. It does not send email. When you are ready:

- **Launch announcement:** export the active launch subscribers (see the queries at the bottom of `schema.sql`, use **Table Editor > Export to CSV**) and import them into an email tool such as MailerLite, Brevo or Mailchimp, then send one campaign.
- **Weekly love letter:** do the same with the `wants_love_letter` subscribers and schedule a weekly campaign in that tool. Keep each letter in the `love_letters` table so you have a record.
- Every email must include an unsubscribe link (all of those tools add one automatically). When someone unsubscribes, set their `status` to `unsubscribed` here, or keep the list in sync from the email tool.

If you would like, this can be automated later so new signups flow straight into your email tool.

## Privacy

The form tells visitors what they will receive and that they can unsubscribe. Consider adding a short
privacy note to the site saying you store their name and email only to send the emails they chose.
