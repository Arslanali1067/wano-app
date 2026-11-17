import type { BlogPost } from './blogPosts'

// First batch of search-led posts (Nov 2026). Every fact here was checked
// against a source when written; keep them true when editing.
const GET = 'https://wanoafrica.com/get?by=blog'

export const batch1: BlogPost[] = [
  {
    slug: 'kampala-street-food-guide',
    date: 'November 17, 2026',
    title: 'Kampala street food: 10 things to eat and what they are',
    description: 'Rolex, kikomando, katogo, nsenene, gonja and more: a plain guide to what you will find on Kampala streets and at the stalls.',
    imageUrl: '/images/image1.webp',
    content: `
      <p>Walk through Kampala at almost any hour and you will smell charcoal, frying dough and roasting meat. Street food here is cheap, filling and part of everyday life. If you are visiting, coming home after years away, or just curious, here are ten things to know and try.</p>

      <h2>1. Rolex</h2>
      <p>The most famous one. A rolex is an omelette rolled up inside a chapati, usually with onions, tomatoes and cabbage or kale cooked into the egg. Some vendors add minced meat. The name is a play on &ldquo;rolled eggs&rdquo;.</p>
      <p>The dish is traced to the Busoga region of eastern Uganda, and it spread to Kampala through Wandegeya, near Makerere University, where students made it popular. The chapati itself came to East Africa with Indian workers brought in during the colonial era to build the Uganda Railway. Kampala now holds a yearly Rolex Festival, supported by the Uganda Tourism Board.</p>

      <h2>2. Kikomando</h2>
      <p>Chapati cut into pieces and mixed with beans. Fast, filling and cheap. The name is said to come from a commando eating quickly in the field, and people also use it for someone who happily eats street food with their hands.</p>

      <h2>3. Chapati (chapo)</h2>
      <p>The flatbread behind both of the dishes above: flour, salt and water, kneaded, rolled flat and fried on a hot pan. On its own it is a snack, with tea it is breakfast.</p>

      <h2>4. Katogo</h2>
      <p>A traditional Ugandan breakfast. Katogo is matooke (green bananas) cooked together with a sauce, most often offal, though beef and beans are common too. Some versions use cassava, Irish potatoes or sweet potatoes instead of matooke. You will find it in small local restaurants, which Ugandans often call &ldquo;hotels&rdquo;.</p>

      <h2>5. Muchomo</h2>
      <p>Grilled meat: goat, beef, chicken or pork, marinated and cooked slowly over charcoal, usually on a stick. Evening is the time, often with roasted plantain or cassava on the side.</p>

      <h2>6. Gonja</h2>
      <p>Plantain, roasted or fried. Sweet, smoky and sold from small grills along the road.</p>

      <h2>7. Nsenene</h2>
      <p>Grasshoppers, fried until crisp, often with salt, onion or chilli, and sold in small packets or paper cones. Nsenene are seasonal: they come with the rains, and November is the season people look forward to most, with a smaller one around May. Catching them at night with bright lights is a tradition in places like Masaka.</p>

      <h2>8. Mandazi</h2>
      <p>A fried dough snack, sometimes sweet and sometimes plain. Good with tea in the morning.</p>

      <h2>9. Samosa</h2>
      <p>Fried pastry triangles filled with beef, chicken or vegetables. Another favourite with tea.</p>

      <h2>10. Kabalagala</h2>
      <p>Small pancakes made from very ripe sweet bananas and flour.</p>

      <h2>Sit-down Ugandan food worth knowing</h2>
      <ul>
        <li><strong>Matooke</strong>: green bananas, steamed and mashed, eaten with groundnut (peanut) sauce, beans, fish or meat.</li>
        <li><strong>Luwombo</strong>: a Buganda dish where chicken, beef, fish or mushrooms are stewed and steamed inside banana leaves.</li>
        <li><strong>Posho</strong>: maize meal cooked thick, eaten with beans or meat. Kenyans call it ugali.</li>
      </ul>

      <h2>Watch it, then go find it</h2>
      <p>Kampala creators post their favourite rolex stands, night markets and home cooking on Wano. Watch, or post your own favourite spot so others can find it.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'luganda-phrases-and-ugandan-english',
    date: 'November 17, 2026',
    title: 'Luganda phrases and Ugandan English you will hear in Kampala',
    description: 'Oli otya, weebale, nkwagala, plus Ugandan English like "extend", "pop", "1k" and "boda boda". What they mean and how to use them.',
    imageUrl: '/images/About-2.webp',
    content: `
      <p>English is an official language in Uganda, but in Kampala the language of the street is often Luganda, the language of the Baganda. Mix in Ugandan English, with its own words and meanings, and a first-time visitor can feel a step behind. These are the phrases you will hear every day.</p>

      <h2>Greetings in Luganda</h2>
      <ul>
        <li><strong>Oli otya?</strong> How are you? (to one person). To a group: <strong>Muli mutya?</strong></li>
        <li><strong>Bulungi</strong>: fine, good. <strong>Gyendi</strong>: I am fine. Then ask back: <strong>Ate ggwe?</strong> And you?</li>
        <li><strong>Wasuze otya?</strong> Good morning (literally, how did you sleep?)</li>
        <li><strong>Osiibye otya?</strong> Good afternoon or good evening (how has your day been?)</li>
        <li><strong>Ki kati?</strong> or <strong>Ogamba ki?</strong> What&rsquo;s up? Casual.</li>
        <li><strong>Sula bulungi</strong>: good night.</li>
        <li><strong>Tukusanyukidde</strong>: welcome.</li>
      </ul>
      <p>Greetings matter in Uganda. Jumping straight to business without asking how someone is can come across as rude, even in a shop.</p>

      <h2>Everyday words</h2>
      <ul>
        <li><strong>Weebale</strong>: thank you (to one person). <strong>Weebale nnyo</strong>: thank you very much. To several people: <strong>Mwebale</strong>. The reply is <strong>Kale</strong>.</li>
        <li><strong>Yee</strong>: yes. <strong>Nedda</strong>: no.</li>
        <li><strong>Mwattu</strong>: please.</li>
        <li><strong>Nsonyiwa</strong>: sorry, forgive me.</li>
        <li><strong>Kigula ssente mmeka?</strong> How much does it cost?</li>
        <li><strong>Sitegeera</strong>: I don&rsquo;t understand.</li>
        <li><strong>Weeraba</strong>: goodbye. <strong>Tunaalabagana</strong>: see you later.</li>
        <li><strong>Nkwagala</strong>: I love you.</li>
      </ul>
      <p>&ldquo;Wano&rdquo;, by the way, means &ldquo;here&rdquo; in Luganda.</p>

      <h2>Ugandan English: same words, different meanings</h2>
      <ul>
        <li><strong>Extend</strong>: move over and make space so someone can sit.</li>
        <li><strong>Pop</strong>: used for &ldquo;come&rdquo; or &ldquo;bring&rdquo;. Also a soda.</li>
        <li><strong>Branch</strong>: turn (&ldquo;branch at the petrol station&rdquo;).</li>
        <li><strong>Give someone a push</strong>: walk part of the way home with them.</li>
        <li><strong>Bounce</strong>: go to meet someone and not find them.</li>
        <li><strong>Lost</strong>: you have not been seen in a long time. &ldquo;You are lost!&rdquo;</li>
        <li><strong>Sleep outside</strong>: said of a car that stays outside the compound at night.</li>
        <li><strong>Hotel</strong>: a small local restaurant.</li>
        <li><strong>Taxi</strong>: a minibus on a fixed route. <strong>Special hire</strong>: a car that takes you alone, price agreed.</li>
        <li><strong>Boda boda</strong>: a motorbike (or bicycle) taxi.</li>
        <li><strong>1k, 2k</strong>: 1,000 and 2,000 shillings.</li>
        <li><strong>Zibbs</strong>: problems, from the Luganda <em>ebizibu</em>.</li>
        <li><strong>Proggie</strong>: your plans. &ldquo;What&rsquo;s the proggie tonight?&rdquo;</li>
        <li><strong>Irish potatoes</strong>: ordinary potatoes. <strong>Chips</strong>: French fries.</li>
      </ul>

      <h2>Hear it the way people say it</h2>
      <p>The fastest way to pick up Luganda and Ugandan English is to hear it in real life: comedy, street interviews and people just talking. That is what Kampala creators post on Wano every day.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-save-mobile-data-android-iphone',
    date: 'November 17, 2026',
    title: 'How to save mobile data on Android and iPhone: the settings that work',
    description: 'Step by step: Data Saver on Android, Low Data Mode on iPhone, and the WhatsApp, YouTube, TikTok and Play Store settings that stop your bundle disappearing.',
    imageUrl: '/images/Section2.webp',
    content: `
      <p>If you buy data in bundles, you know the feeling: you top up, and a day later it is gone. Most of that data is not spent on what you chose to watch. It goes on apps working in the background, videos that download before you tap them, and updates you never asked for. These settings fix most of it. Menu names can differ slightly between phones; if you can&rsquo;t find one, search for it in your Settings app.</p>

      <h2>1. Turn on Data Saver (Android)</h2>
      <p>Go to <strong>Settings &gt; Network &amp; internet &gt; Data Saver</strong> and switch it on. Apps then stop using mobile data in the background; they can only do that on Wi-Fi. If one app must keep working in the background (maps, for example), add it under <strong>Unrestricted data</strong>.</p>

      <h2>2. Turn on Low Data Mode (iPhone)</h2>
      <p>Go to <strong>Settings &gt; Cellular (or Mobile Data) &gt; Cellular Data Options</strong> and turn on <strong>Low Data Mode</strong>. On 5G, it is under <strong>Data Mode</strong>. With two SIMs, tap the line you use first.</p>
      <p>Low Data Mode pauses background app refresh, automatic downloads and backups, and iCloud Photos updates, and it lowers streaming quality. App Store auto-updates and video autoplay in the App Store are switched off.</p>

      <h2>3. Stop WhatsApp downloading everything</h2>
      <p>Group chats are the biggest hidden cost. In WhatsApp, open <strong>Settings &gt; Storage and data</strong>. Under <strong>Media auto-download</strong>, tap <strong>When using mobile data</strong> and untick photos, audio, videos and documents. Media then only downloads when you tap it.</p>
      <p>In the same screen, turn on <strong>Use less data for calls</strong>.</p>

      <h2>4. Set YouTube to Data saver</h2>
      <p>In the YouTube app, tap your profile picture, then <strong>Settings &gt; Video quality preferences</strong>. Under mobile networks, choose <strong>Data saver</strong>. Videos play at lower quality on mobile data and stay as they are on Wi-Fi.</p>

      <h2>5. Turn on TikTok Data Saver</h2>
      <p>Open TikTok, go to your <strong>Profile</strong>, tap the menu (&#9776;), then <strong>Settings and privacy &gt; Data Saver</strong>, and switch it on.</p>

      <h2>6. Update apps on Wi-Fi only (Android)</h2>
      <p>App updates can be hundreds of megabytes. Open the <strong>Play Store</strong>, tap your profile picture, then <strong>Settings &gt; Network preferences &gt; Auto-update apps</strong>, and choose <strong>Over Wi-Fi only</strong>. On iPhone, Low Data Mode already stops automatic App Store updates on mobile data.</p>

      <h2>7. Download on Wi-Fi, watch later</h2>
      <p>If you have Wi-Fi at work, school or a caf&eacute;, use it for the heavy things: app updates, downloading films and backing up photos.</p>

      <h2>8. Check what is eating your data</h2>
      <p>Both Android and iPhone show how much mobile data each app used, under the network or mobile data section of Settings. Look at it once a week. The app at the top is often a surprise.</p>

      <h2>Choose apps that respect your bundle</h2>
      <p>Some apps are simply lighter than others. Wano was built for mobile bundles: profile pictures arrive as small copies (about 10 KB instead of up to 2 MB), and each page of the feed is compressed to about 7 KB instead of 34 KB, so your data goes on the videos you actually watch. <a href="/post/wano-is-light-on-your-data">Read how</a>.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-much-data-does-video-use',
    date: 'November 17, 2026',
    title: 'How much data does video use? MB per minute, explained',
    description: 'A simple way to work out how many MB a minute of video costs, what 480p, 720p and HD really use, and how long 1 GB lasts.',
    imageUrl: '/images/Search.webp',
    content: `
      <p>&ldquo;How much data does a video use?&rdquo; has a real answer, and once you know the trick you can work it out for any app.</p>

      <h2>The one rule</h2>
      <p>Video quality is measured in <strong>bitrate</strong>: megabits per second (Mbps). Data bundles are sold in megabytes (MB). There are 8 bits in a byte and 60 seconds in a minute, so:</p>
      <p><strong>MB per minute = Mbps &times; 7.5</strong></p>
      <p>A video playing at 1 Mbps uses about 7.5 MB a minute. At 3 Mbps, about 22 MB a minute. At 5 Mbps, about 37 MB a minute.</p>

      <h2>What quality levels usually mean</h2>
      <p>Apps change quality as your connection changes, so these are rough, but they show the scale:</p>
      <ul>
        <li><strong>Low (around 360p)</strong>: often under 1 Mbps, so a few MB a minute.</li>
        <li><strong>Standard (480p)</strong>: around 1.5 to 3 Mbps, roughly 11 to 22 MB a minute.</li>
        <li><strong>HD (720p)</strong>: around 3 to 5 Mbps, roughly 22 to 37 MB a minute.</li>
        <li><strong>Full HD (1080p) and above</strong>: more again.</li>
      </ul>
      <p>Netflix publishes its own limits: on its Low setting, up to 0.3 GB an hour; in standard definition, up to 1 GB an hour; in HD, up to 3 GB an hour. That is about 5, 17 and 50 MB a minute.</p>

      <h2>How long does 1 GB last?</h2>
      <p>1 GB is about 1,000 MB. So:</p>
      <ul>
        <li>At 7.5 MB a minute (low quality): a bit over 2 hours.</li>
        <li>At 22 MB a minute (standard): about 45 minutes.</li>
        <li>At 37 MB a minute (HD): under half an hour.</li>
      </ul>
      <p>On a small phone screen, the difference between standard and HD is much smaller than the difference in data. Dropping one quality level can double how long your bundle lasts.</p>

      <h2>Why short videos can cost more than you think</h2>
      <ul>
        <li><strong>Preloading.</strong> Short-video apps download the next videos before you swipe, so they start instantly. If you swipe past, that data is already spent.</li>
        <li><strong>Loops.</strong> A short clip that loops several times while you read the comments may be downloaded again each time.</li>
        <li><strong>Everything around the video.</strong> Pictures, profile photos and page data add up, especially in feeds that send full-size images.</li>
      </ul>

      <h2>What you can do</h2>
      <ul>
        <li>Turn on the data saver setting in each video app (we list them in <a href="/post/how-to-save-mobile-data-android-iphone">How to save mobile data on Android and iPhone</a>).</li>
        <li>Watch films and long videos on Wi-Fi when you can.</li>
        <li>Pick apps that are built for mobile bundles. On Wano, a profile picture is about 10 KB instead of up to 2 MB, and a feed page about 7 KB instead of 34 KB, so more of your data goes on the videos themselves.</li>
      </ul>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-film-short-videos-on-your-phone',
    date: 'November 17, 2026',
    title: 'How to film great short videos on your phone: a creator guide',
    description: 'Light, sound, framing and the first two seconds. Practical tips from a filmmaker for making short videos people finish and share.',
    imageUrl: '/images/VideoEditScreen.webp',
    content: `
      <p>You don&rsquo;t need a camera to make videos people watch to the end. Your phone is enough. What separates videos that travel from videos that don&rsquo;t is usually not the phone; it is light, sound and the first two seconds.</p>

      <h2>1. Shoot vertical, and fill the frame</h2>
      <p>Short videos are watched on phones held upright, so film vertically (9:16). Get close enough that faces and hands fill the screen. Leave a little space at the top and bottom, because the app puts names, captions and buttons there.</p>

      <h2>2. Light: face the light, not away from it</h2>
      <p>The single biggest upgrade is free: stand facing a window or open shade. Light from in front of you makes skin look good and the image clean. Light behind you turns you into a silhouette. Midday sun straight overhead is harsh; early morning and late afternoon are softer and warmer. At night, a lamp or a phone torch bounced off a white wall beats overhead bulbs.</p>

      <h2>3. Sound matters more than picture</h2>
      <p>People forgive a soft picture. They scroll past bad sound. Get the phone close to whoever is speaking, step away from traffic, wind and generators, and record a few seconds of quiet first to check. If you talk to camera a lot, a cheap clip-on microphone is the best money you will spend.</p>

      <h2>4. Hold it still</h2>
      <p>Hold the phone with both hands and your elbows against your body, or rest it on something. Move with your whole body, not your wrists. Use the main (back) camera when you can; it is usually better than the selfie camera.</p>

      <h2>5. The first two seconds decide everything</h2>
      <p>Start with the most interesting moment, not the build-up. Say what the video is about, show the result first, or start mid-action. &ldquo;Watch what happens when&hellip;&rdquo; works because it makes people wait for the answer.</p>

      <h2>6. Keep it tight</h2>
      <p>Cut every pause, every &ldquo;hi guys&rdquo;, every second where nothing happens. If a video can be 20 seconds instead of 40, make it 20. People rewatch short videos; they rarely finish long, slow ones.</p>

      <h2>7. Add text for people watching without sound</h2>
      <p>Many people scroll with sound off, on a bus or at work. A short line of text on screen, or captions, keeps them watching.</p>

      <h2>8. Make it yours</h2>
      <p>The videos that travel furthest are specific: your neighbourhood, your language, your family&rsquo;s food, the jokes only your city gets. Specific is what makes people stop scrolling, and it is what Wano is built for.</p>

      <h2>9. Post regularly, then look at what worked</h2>
      <p>Post often enough to learn. Then look at which videos people watched to the end and shared, and make more of those.</p>

      <h2>Where to post</h2>
      <p>On Wano you can reply to any video with your own, use trending sounds, mention friends with @, and represent your city on Home Ground. Every week our team picks the best videos for Wano Picks.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-get-your-african-film-seen',
    date: 'November 17, 2026',
    title: 'How to get your African film seen: festivals, streaming and Wano TV',
    description: 'A practical path for African and diaspora filmmakers: FESPACO, Durban, Amakula, the Uganda Film Festival, YouTube and Wano TV, and what to prepare first.',
    imageUrl: '/images/Feature2.webp',
    content: `
      <p>Finishing a film is hard. Getting people to watch it can feel harder. The good news for African and diaspora filmmakers is that there are more doors now than ever: festivals on the continent, streaming, YouTube, and new homes for African stories. Here is how to think about it, and what to prepare.</p>

      <h2>First, get these ready</h2>
      <ul>
        <li><strong>A screener link</strong>: a private online link to the full film (with a password), for festivals and platforms to watch.</li>
        <li><strong>A trailer</strong> of one to two minutes, and a few strong stills.</li>
        <li><strong>A short synopsis</strong> (two or three lines) and a longer one (a paragraph).</li>
        <li><strong>English subtitles</strong> if the film is in another language. Many festivals require them.</li>
        <li><strong>Your rights in writing</strong>: music, locations and actors cleared, so you can show the film anywhere.</li>
      </ul>

      <h2>Festivals: where African film gets noticed</h2>
      <p>Festivals bring press, awards and buyers. Some to know:</p>
      <ul>
        <li><strong>FESPACO</strong> (Ouagadougou, Burkina Faso): the biggest festival of African cinema, held every two years. The 30th edition is set for 20 to 27 March 2027.</li>
        <li><strong>Durban International Film Festival</strong> (South Africa): submissions go through FilmFreeway. For the 2027 edition, the regular deadline is 15 January 2027. Features and documentaries must be from African countries; shorts are open to all. Films must be completed after 1 January 2026 and not yet shown publicly or online.</li>
        <li><strong>Amakula International Film Festival</strong> (Uganda): organised by the Bayimba Cultural Foundation, with open-air screenings. Its 2026 edition ran from 30 October to 1 November on Lunkulu Island, taking features, shorts, documentaries, animation and student films.</li>
        <li><strong>Uganda Film Festival</strong>: run by the Uganda Communications Commission (UCC). The 2026 festival took place from 21 to 28 August, with screenings, workshops and an awards gala. Watch UCC&rsquo;s announcements for the next call for entries.</li>
      </ul>
      <p>Always read each festival&rsquo;s rules before you put your film online. Many festivals, Durban included, will not take a film that has already been shown publicly or streamed.</p>

      <h2>YouTube: your own channel</h2>
      <p>In Nigeria, many filmmakers now release full films free on YouTube and earn from ads, and some top actors run their own channels. YouTube has no gatekeeper, but you have to build the audience yourself, and a film posted there usually can&rsquo;t go to festivals afterwards. Many filmmakers do festivals first, then YouTube.</p>

      <h2>Streaming: Wano TV</h2>
      <p>Wano TV is a curated home for films, documentaries and series from Africa and the diaspora, free to watch inside the Wano app. We look at short films (5 to 40 minutes), features and documentaries (40 to 120+ minutes) and docuseries.</p>
      <ul>
        <li>Submitting is free.</li>
        <li>You keep ownership of your film; submitting does not transfer your copyright to Wano.</li>
        <li>If your film is selected, distribution and licensing terms are agreed with you before it appears on Wano TV.</li>
      </ul>
      <p><a href="/tv/submit">Submit your film to Wano TV</a>.</p>

      <h2>Promote it like a release</h2>
      <p>Whatever route you choose, plan the release: post short clips, behind-the-scenes moments and cast interviews before and after. Short vertical clips are where audiences discover films now.</p>
    `,
  },
  {
    slug: 'where-to-watch-african-films',
    date: 'November 17, 2026',
    title: 'Where to watch African films and Ugandan movies, legally',
    description: 'Where to find African films and series, including Ugandan classics like Queen of Katwe and Wakaliwood\'s Who Killed Captain Alex?, and why watching the official copy matters.',
    imageUrl: '/images/About-bg.webp',
    content: `
      <p>African film has never been easier to find, or easier to find in the wrong place. Here is where to watch African and Ugandan films and series, and why the official copy is worth it.</p>

      <h2>Wano TV: free in the Wano app</h2>
      <p>Wano TV is our home for African films and series, free inside the Wano app. Browse the Top 10 of the week and rows by genre, use Continue watching to pick up where you stopped, and save titles to My List. <a href="${GET}">Get Wano</a> and open Wano TV.</p>

      <h2>YouTube: official channels</h2>
      <p>A huge number of Nollywood films are now released free on YouTube by their own producers, on channels such as iBAKATV, and many actors run channels too. Check that the channel belongs to the producer or a known distributor. Re-uploads by strangers take money away from the people who made the film.</p>

      <h2>Global streaming services</h2>
      <p>The big subscription services carry African films and series, including originals made on the continent. Catalogues differ by country, so search the service where you live.</p>

      <h2>Ugandan films worth knowing</h2>
      <ul>
        <li><strong>Queen of Katwe</strong> (2016): Mira Nair&rsquo;s Disney film about Phiona Mutesi, a girl from Katwe in Kampala who becomes a chess champion. Starring Madina Nalwanga, Lupita Nyong&rsquo;o and David Oyelowo, and filmed partly in Katwe. Available to buy or rent on major digital stores.</li>
        <li><strong>Who Killed Captain Alex?</strong> (2010): the action film from Wakaliwood, Nabwana I.G.G.&rsquo;s studio in Wakaliga, Kampala, made for a tiny budget. The trailer went viral, and Wakaliwood posted the full film on its own YouTube channel in 2015, where it has passed 10 million views. The online version has commentary by VJ Emmie.</li>
      </ul>
      <p>Ugandan filmmakers are making new work every year. The Uganda Film Festival, run by the Uganda Communications Commission, and the Amakula International Film Festival are good places to discover them.</p>

      <h2>Why the official copy matters</h2>
      <ul>
        <li>The money reaches the filmmakers, so they can make the next film.</li>
        <li>Pirate sites are full of ads, pop-ups and malware.</li>
        <li>Official copies have proper picture, sound and subtitles.</li>
      </ul>

      <h2>Filmmakers</h2>
      <p>If you have made a film, <a href="/tv/submit">submit it to Wano TV</a>. Submitting is free and you keep ownership of your work.</p>
    `,
  },
  {
    slug: 'what-is-amapiano',
    date: 'November 17, 2026',
    title: 'What is amapiano? The sound, where it came from and who made it big',
    description: 'Amapiano explained: South African township roots, the log drum, Kabza De Small, and how Tyla\'s Water took it to the Grammys.',
    imageUrl: '/images/Creators2.webp',
    content: `
      <p>If you have heard a deep, rolling bass under soft piano chords at a party anywhere from Kampala to London, you have heard amapiano. In less than a decade it went from South African townships to the world&rsquo;s biggest stages.</p>

      <h2>Where amapiano came from</h2>
      <p>Amapiano grew up in the townships of Gauteng province, South Africa, around Pretoria and Johannesburg, in the mid-2010s. Its start is usually dated to around 2014, though no single person or moment is credited, and people still argue over whether Pretoria or Johannesburg came first. Young producers made it on cheap laptops and free software, blending deep house, jazz and kwaito.</p>
      <p>The name comes from the Zulu for &ldquo;the pianos&rdquo;, after the piano melodies at its heart.</p>

      <h2>What it sounds like</h2>
      <ul>
        <li><strong>The log drum</strong>: the signature deep, bouncing bass. It isn&rsquo;t a real drum; it is a synthesised sound made to imitate one. Kabza De Small credits the producer MDU aka TRP with bringing it into the genre.</li>
        <li><strong>Piano chords</strong>: soft, jazzy keys over the groove.</li>
        <li><strong>A slower tempo</strong>: often around 110 to 120 beats per minute, slower than most club music, which gives it that relaxed, rolling feel.</li>
      </ul>

      <h2>The names behind it</h2>
      <ul>
        <li><strong>Kabza De Small</strong>, often called the King of Amapiano, who also works with DJ Maphorisa as the Scorpion Kings.</li>
        <li><strong>MDU aka TRP</strong>, credited with the log drum.</li>
        <li><strong>DJs and artists</strong> such as Uncle Waffles, DBN Gogo and Focalistic, whose song with Davido, &ldquo;Champion Sound&rdquo;, helped carry amapiano across Africa.</li>
      </ul>

      <h2>From townships to the Grammys</h2>
      <p>By 2019 amapiano was firmly mainstream in South Africa, and major labels were signing its artists. Then Tyla&rsquo;s amapiano-influenced &ldquo;Water&rdquo; went global: it reached the US Billboard Hot 100, the first song by a South African solo artist to do so in more than five decades, and in 2024 it won the very first Grammy for Best African Music Performance. On TikTok, the #amapiano hashtag has passed 10 billion views, and DBN Gogo became the first amapiano DJ to play Tomorrowland.</p>

      <h2>Amapiano in East Africa</h2>
      <p>The sound has travelled well beyond South Africa: Tanzania&rsquo;s Diamond Platnumz is among the stars who have worked with it, and amapiano nights and dance videos are everywhere from Dar es Salaam to Kampala and Nairobi.</p>

      <h2>Dance to it, post it</h2>
      <p>Find the trending sounds in the Wano app, post your own amapiano moves, and represent your city on Home Ground.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
]
