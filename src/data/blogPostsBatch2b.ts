import type { BlogPost } from './blogPosts'

// Scheduled posts, late Dec 2026 to end of Jan 2027 (see blogPostsBatch2).
const GET = 'https://wanoafrica.com/get?by=blog'

export const batch2b: BlogPost[] = [
  {
    slug: 'uganda-public-holidays-2027',
    date: 'December 22, 2026',
    title: 'Uganda public holidays 2027: the full list',
    description: 'Every public holiday in Uganda in 2027 with dates and days: Liberation Day, Janani Luwum Day, Easter, Martyrs\' Day, Heroes\' Day, Independence, Christmas and the Eids.',
    imageUrl: '/images/Section.webp',
    content: `
      <p>Planning trips home, school runs or a long weekend? Here is every public holiday in Uganda in 2027, with the day of the week.</p>

      <h2>All public holidays in 2027</h2>
      <table>
        <thead><tr><th>Date</th><th>Day</th><th>Holiday</th></tr></thead>
        <tbody>
          <tr><td>1 January</td><td>Friday</td><td>New Year&rsquo;s Day</td></tr>
          <tr><td>26 January</td><td>Tuesday</td><td>NRM Liberation Day</td></tr>
          <tr><td>16 February</td><td>Tuesday</td><td>Archbishop Janani Luwum Day</td></tr>
          <tr><td>8 March</td><td>Monday</td><td>International Women&rsquo;s Day</td></tr>
          <tr><td>around 9 March</td><td>Tuesday</td><td>Eid al-Fitr (end of Ramadan)*</td></tr>
          <tr><td>26 March</td><td>Friday</td><td>Good Friday</td></tr>
          <tr><td>29 March</td><td>Monday</td><td>Easter Monday</td></tr>
          <tr><td>1 May</td><td>Saturday</td><td>Labour Day</td></tr>
          <tr><td>around 16 May</td><td>Sunday</td><td>Eid al-Adha*</td></tr>
          <tr><td>3 June</td><td>Thursday</td><td>Martyrs&rsquo; Day</td></tr>
          <tr><td>9 June</td><td>Wednesday</td><td>National Heroes&rsquo; Day</td></tr>
          <tr><td>9 October</td><td>Saturday</td><td>Independence Day</td></tr>
          <tr><td>25 December</td><td>Saturday</td><td>Christmas Day</td></tr>
          <tr><td>26 December</td><td>Sunday</td><td>Boxing Day</td></tr>
        </tbody>
      </table>
      <p>*The two Eid dates follow the Islamic lunar calendar and depend on the sighting of the moon, so they can move by a day. The government confirms them closer to the time.</p>

      <h2>Long weekends in 2027</h2>
      <ul>
        <li><strong>New Year:</strong> Friday 1 January gives a three-day weekend.</li>
        <li><strong>Easter:</strong> Good Friday (26 March) to Easter Monday (29 March) is a four-day weekend.</li>
        <li><strong>Women&rsquo;s Day:</strong> Monday 8 March gives a three-day weekend, and Eid al-Fitr may fall the next day.</li>
      </ul>
      <p>Holidays that fall on a weekend in Uganda stay on that date; they are not moved to the Monday.</p>

      <h2>What the days mark</h2>
      <ul>
        <li><strong>Janani Luwum Day</strong> remembers Archbishop Janani Luwum, killed in 1977.</li>
        <li><strong>Martyrs&rsquo; Day</strong> brings pilgrims from across East Africa to Namugongo, near Kampala, to remember the Christian converts killed in 1886.</li>
        <li><strong>Independence Day</strong> marks independence from Britain on 9 October 1962.</li>
      </ul>

      <h2>Make the most of the days off</h2>
      <p>Long weekends are when people travel, visit family and post the most. Share yours on Wano and represent your town on Home Ground.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'creator-30-day-plan',
    date: 'December 29, 2026',
    title: 'Start the year posting: a 30-day plan for creators',
    description: 'A simple day-by-day plan to post every day for a month, find what works and grow, without burning out.',
    imageUrl: '/images/Creators-bg.webp',
    content: `
      <p>Most creators start the year with big plans and stop by February. The ones who grow keep posting long enough to learn what their audience wants. This plan gets you through the first month.</p>

      <h2>Before you start</h2>
      <ul>
        <li><strong>Pick one lane.</strong> Comedy, food, dance, faith, your city, your language: choose the one you could post about for a year.</li>
        <li><strong>Keep a list.</strong> Write every idea down the moment you have it. Our <a href="/post/december-video-ideas">25 video ideas</a> are a good start.</li>
        <li><strong>Learn the basics once.</strong> Light, sound and the first two seconds: <a href="/post/how-to-film-short-videos-on-your-phone">how to film great short videos on your phone</a>.</li>
      </ul>

      <h2>Week 1: just post</h2>
      <p>One short video a day. Don&rsquo;t judge them yet. The goal is the habit, and getting comfortable on camera.</p>

      <h2>Week 2: try different things</h2>
      <p>Same lane, different formats: a talking video, a skit, a tutorial, a day-in-the-life, a reply to a comment. Note which ones people watch to the end.</p>

      <h2>Week 3: do more of what worked</h2>
      <p>Look back at weeks 1 and 2. Which videos got watched, shared and commented on? Make three more like each of them. Reply to comments with videos.</p>

      <h2>Week 4: build a series</h2>
      <p>Turn your best idea into a series with a name: &ldquo;Rating Kampala rolexes, part 1&rdquo;. Series bring people back, and the people who liked part 1 come looking for part 2.</p>

      <h2>Days 29 and 30: look back</h2>
      <p>Write down your three best videos and why you think they worked. That is your plan for February.</p>

      <h2>How to not burn out</h2>
      <ul>
        <li>Film several videos in one session, then post one a day.</li>
        <li>Keep them short. 15 to 30 seconds is plenty.</li>
        <li>Done is better than perfect.</li>
      </ul>

      <h2>Where to post</h2>
      <p>On Wano you can reply to any video with your own, use trending sounds, mention friends with @, and see your stats: videos posted this month, views and likes. Every week our team picks the best for Wano Picks.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'nollywood-explained',
    date: 'January 8, 2027',
    title: 'Nollywood explained: how Nigeria built one of the world\'s biggest film industries',
    description: 'From Living in Bondage and the home-video boom to New Nollywood and YouTube: a short history of Nigerian cinema.',
    imageUrl: '/images/About-bg.webp',
    content: `
      <p>Nollywood, Nigeria&rsquo;s film industry, makes more films than almost anywhere on earth, and its stories are watched across Africa and the diaspora. Here is how it happened.</p>

      <h2>Shot on video, sold on cassette</h2>
      <p>Nigerian filmmakers had been experimenting with films released straight to video since the 1980s, but the boom is usually dated to 1992 and Kenneth Nnebue&rsquo;s <em>Living in Bondage</em>. He shot it on a video camera and released it on cassette. Cheap to make and easy to sell in markets, video films took off. At the peak, around 2008, the industry was releasing about 200 video films a month.</p>

      <h2>Second only to India</h2>
      <p>By the mid-2000s Nollywood was the world&rsquo;s second-largest film industry by number of films made, behind India, and UNESCO rated it second in output in 2009. In 2020 alone, 2,599 feature films were produced in Nigeria.</p>

      <h2>The problems</h2>
      <p>Piracy, little government support and rising costs hit the video era hard. Distribution, and getting paid when films are copied, are still the industry&rsquo;s biggest challenges.</p>

      <h2>New Nollywood</h2>
      <p>From around 2009, with Kunle Afolayan&rsquo;s <em>The Figurine</em>, a &ldquo;New Nollywood&rdquo; grew up: bigger budgets, longer shoots and cinema releases. Films like <em>Half of a Yellow Sun</em> (2013) and <em>The Wedding Party</em> (2016) became box-office records, and <em>Battle on Buka Street</em> (2022) was the highest-grossing Nigerian film as of 2023. <em>Mami Wata</em> won a Special Jury Award for cinematography at Sundance in 2023.</p>

      <h2>YouTube and streaming</h2>
      <p>Today many Nollywood producers release full films free on their own YouTube channels and earn from ads, while big streaming services commission Nigerian originals. Watch on official channels: it pays the people who made the film. See <a href="/post/where-to-watch-african-films">where to watch African films legally</a>.</p>

      <h2>African films on Wano TV</h2>
      <p>Wano TV is our home for African films and series, free in the Wano app. Filmmakers can <a href="/tv/submit">submit their films</a>.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-make-a-short-film-with-no-budget',
    date: 'January 12, 2027',
    title: 'How to make a short film with no budget',
    description: 'A filmmaker\'s step-by-step: write for what you have, cast friends, light with windows, record clean sound, edit on your phone, and get it seen.',
    imageUrl: '/images/VideoEditScreen.webp',
    content: `
      <p>You don&rsquo;t need money to make your first short film. You need a story you can shoot with what you already have. Here is how.</p>

      <h2>1. Write for what you have</h2>
      <p>Make a list first: the places you can film for free, the people who will act for you, the props in your house. Then write a story that only needs those things. One or two locations, two or three characters, five to ten minutes long. Limits make better stories.</p>

      <h2>2. One clear idea</h2>
      <p>A short film is one moment, not a whole life. One character wants something, something stands in the way, and something changes. If you can say your story in one sentence, you are ready.</p>

      <h2>3. Cast friends, rehearse twice</h2>
      <p>Pick people who are natural in front of you, not people who &ldquo;act&rdquo;. Rehearse the scenes twice before filming. Most bad acting is people who are nervous and unrehearsed.</p>

      <h2>4. Plan every shot</h2>
      <p>Write a shot list: every shot, where the camera is, what is in frame. On the day, you will be tired and rushed. The list keeps you from forgetting the shot you need.</p>

      <h2>5. Light with the sun and windows</h2>
      <p>Film by day near windows and in open shade. Keep the same time of day for one scene so the light matches. Avoid harsh midday sun on faces.</p>

      <h2>6. Sound is half the film</h2>
      <p>Audiences forgive a soft picture but not bad sound. Film in quiet places, keep the phone or microphone close to the actors, turn off fans and fridges, and record 30 seconds of the room&rsquo;s silence for the edit.</p>

      <h2>7. Shoot more than you need</h2>
      <p>Film each scene from a wide shot, then medium shots, then close-ups of faces and hands. That gives you choices in the edit.</p>

      <h2>8. Edit on your phone or laptop</h2>
      <p>Cut everything that doesn&rsquo;t move the story. Then cut more. Add music you have the rights to use, and English subtitles if the film is in another language.</p>

      <h2>9. Get it seen</h2>
      <p>Send it to festivals, put clips online and submit it to platforms. Our guide <a href="/post/how-to-get-your-african-film-seen">How to get your African film seen</a> covers festivals like FESPACO, Durban and Amakula, and Wano TV. Read each festival&rsquo;s rules before posting the full film online.</p>
      <p>Wano TV takes short films from 5 to 40 minutes. <a href="/tv/submit">Submitting is free and your film stays yours</a>.</p>
    `,
  },
  {
    slug: 'bongo-flava-explained',
    date: 'January 15, 2027',
    title: 'What is bongo flava? Tanzania\'s sound, explained',
    description: 'Bongo flava: born in Dar es Salaam in the 1990s from hip hop, taarab and dansi, sung in Swahili, and carried worldwide by Diamond Platnumz and Alikiba.',
    imageUrl: '/images/Creators2.webp',
    content: `
      <p>If you have danced to Diamond Platnumz or Alikiba, you have heard bongo flava. It is Tanzania&rsquo;s biggest music, and it is everywhere in East Africa.</p>

      <h2>Where it came from</h2>
      <p>Bongo flava grew up in Dar es Salaam in the 1990s. It started as <em>muziki wa kizazi kipya</em>, &ldquo;music of the new generation&rdquo;, among young people in the Kinondoni district, who took American hip hop and R&amp;B and mixed them with Tanzanian styles like taarab and dansi.</p>

      <h2>What the name means</h2>
      <p>In Swahili, <em>bongo</em> comes from <em>ubongo</em>, brain: big brains, wits, the smarts you need to survive in the city. It became a nickname for Dar es Salaam, and outside Tanzania it often means the whole country. <em>Flava</em> is flavour. So bongo flava is, roughly, the flavour of Dar.</p>

      <h2>What it sounds like</h2>
      <p>Bongo flava is sung mostly in Swahili, sometimes with English, over beats that carry its hip-hop and R&amp;B roots alongside Tanzanian taarab and dansi. Its biggest stars have also worked with <a href="/post/what-is-amapiano">amapiano</a>.</p>

      <h2>The names</h2>
      <ul>
        <li><strong>Diamond Platnumz</strong></li>
        <li><strong>Alikiba</strong></li>
        <li><strong>Juma Nature</strong></li>
      </ul>

      <h2>East Africa&rsquo;s shared sound</h2>
      <p>Bongo flava sits alongside Kenya&rsquo;s <a href="/post/gengetone-explained">gengetone</a> and Uganda&rsquo;s own pop and <a href="/post/luga-flow-ugandan-hip-hop">Luga Flow</a>. Swahili lyrics mean it travels across the region.</p>

      <h2>Dance to it</h2>
      <p>Find bongo flava in the trending sounds on Wano and post your moves.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-get-found-captions-hashtags-sounds',
    date: 'January 19, 2027',
    title: 'Captions, hashtags and sounds: how to get your videos found',
    description: 'Practical tips for short videos: writing captions people read, using a few right hashtags, picking trending sounds and posting when people watch.',
    imageUrl: '/images/Search.webp',
    content: `
      <p>A great video that nobody finds is a diary. These are the simple things that help the right people find your videos.</p>

      <h2>Captions: one clear line</h2>
      <ul>
        <li>Say what the video is about, in the words people would search: &ldquo;Making a rolex at home&rdquo; beats &ldquo;Sunday vibes&rdquo;.</li>
        <li>Ask a question to get comments: &ldquo;Which stall makes the best rolex in Kampala?&rdquo;</li>
        <li>Keep it short. The video does the work.</li>
      </ul>

      <h2>Text on the video</h2>
      <p>Many people watch with the sound off. Put a short line of text on screen in the first second so they know why to keep watching.</p>

      <h2>Hashtags: a few good ones</h2>
      <ul>
        <li>Use 3 to 5 relevant hashtags, not 30.</li>
        <li>Mix one big tag (#kampala, #comedy), one specific tag (#rolex, #luwombo) and one for your series.</li>
        <li>Use the hashtag suggestions the app shows you; they come from what people are already using.</li>
      </ul>

      <h2>Sounds: ride the trend, make it yours</h2>
      <p>Trending sounds help a video travel because people are already searching and watching them. Use them, but add something only you can: your language, your city, your family.</p>

      <h2>Post when people watch</h2>
      <p>Post when your audience is free: early morning, lunchtime and evenings are common. On Wano, your stats show the best time to post for you.</p>

      <h2>Reply, mention, collaborate</h2>
      <ul>
        <li>Reply to comments with a video. It shows you are listening and makes a second video out of the first.</li>
        <li>Mention friends who appear in the video with @ so their followers see it.</li>
        <li>Duet or reply to bigger creators in your lane.</li>
      </ul>

      <h2>Represent a place</h2>
      <p>On Wano, pick your Home Ground and your videos count for your city in the weekly battles, and show up for people nearby.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'gengetone-explained',
    date: 'January 22, 2027',
    title: 'What is gengetone? Kenya\'s street sound, explained',
    description: 'Gengetone grew out of Nairobi\'s genge, sung in Sheng, and exploded with Ethic Entertainment\'s Lamba Lolo in 2018. The groups and the sound.',
    imageUrl: '/images/Creators1.webp',
    content: `
      <p>Loud, playful and made for the matatu, gengetone is the sound of Kenya&rsquo;s young people in the late 2010s.</p>

      <h2>From genge to gengetone</h2>
      <p>Gengetone grew out of <strong>genge</strong>, a Kenyan hip-hop style influenced by dancehall that started in Nairobi in the 1990s. Gengetone is its younger offshoot, made mostly by groups of young men rather than solo stars.</p>

      <h2>The song that started the wave</h2>
      <p>The subgenre&rsquo;s rise is tied to <strong>&ldquo;Lamba Lolo&rdquo;</strong> by Ethic Entertainment, released in June 2018, which passed 4 million views on YouTube. Group after group followed.</p>

      <h2>Sheng</h2>
      <p>Gengetone is performed in <strong>Sheng</strong>, Nairobi&rsquo;s street mix of Swahili, English and other local languages. That is part of its sound: fast, slangy and full of in-jokes.</p>

      <h2>The groups</h2>
      <ul>
        <li><strong>Ethic Entertainment</strong></li>
        <li><strong>Boondocks Gang</strong></li>
        <li><strong>Sailors Gang</strong></li>
        <li><strong>Ochungulo Family</strong></li>
        <li><strong>Wakali Wao</strong>, <strong>Angry Panda</strong>, <strong>Wakadinali</strong>, <strong>Vintage Clan</strong> and <strong>Rico Gang</strong></li>
      </ul>

      <h2>East Africa&rsquo;s neighbours</h2>
      <p>Gengetone sits next to Tanzania&rsquo;s <a href="/post/bongo-flava-explained">bongo flava</a> and Uganda&rsquo;s <a href="/post/luga-flow-ugandan-hip-hop">Luga Flow</a>: three countries, three street sounds in their own languages.</p>

      <h2>Post your moves</h2>
      <p>Find the sounds on Wano and represent your city.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'luga-flow-ugandan-hip-hop',
    date: 'January 26, 2027',
    title: 'Luga Flow: Ugandan hip hop in Luganda',
    description: 'What Luga Flow is, how Babaluku and the Bataka Squad helped build rap in Luganda, and why rapping in your own language matters.',
    imageUrl: '/images/Profile2.webp',
    content: `
      <p>Hip hop arrived in Uganda in English. Luga Flow made it Ugandan: rap in Luganda, about life in Uganda.</p>

      <h2>What Luga Flow is</h2>
      <p>Luga Flow is rap performed in Luganda. Rapping in your own language changes everything: the rhymes, the jokes and the proverbs come from home, and the audience at home hears itself in the music.</p>

      <h2>Babaluku and the Bataka Squad</h2>
      <p>One of the pioneers of Luga Flow is <strong>Babaluku</strong> (Silas Babaluku Balabyekkubo), born in Kampala in 1979. He moved to Canada at 12, studied sound engineering in Vancouver, and began his music career in 1994. He is a member of the <strong>Bataka Squad</strong> and raps in Luganda.</p>
      <p>He also founded the <strong>Bavubuka Foundation</strong>, which equips young people with leadership skills.</p>

      <h2>Why it matters</h2>
      <p>Music in your own language keeps the language alive for the next generation, the same way <a href="/post/highlife-explained">highlife</a> carried Ghanaian languages and rhythms into modern music.</p>

      <h2>East Africa raps in its own languages</h2>
      <p>Across the region, young artists do the same thing: Swahili in Tanzania&rsquo;s <a href="/post/bongo-flava-explained">bongo flava</a> and Sheng in Kenya&rsquo;s <a href="/post/gengetone-explained">gengetone</a>.</p>

      <h2>Rap in your language</h2>
      <p>Write a verse in Luganda, or your own language, and post it on Wano. Wano means &ldquo;here&rdquo; in Luganda, and it was built for exactly this.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-make-a-documentary-on-your-phone',
    date: 'January 29, 2027',
    title: 'How to make a documentary on your phone',
    description: 'Find a real story, earn trust, record great interviews, film the life around them, and shape it in the edit. A filmmaker\'s guide.',
    imageUrl: '/images/Image2(1).webp',
    content: `
      <p>The best documentaries are not about the camera. They are about a person or a place you care about, and the patience to film it honestly. A phone is enough to start.</p>

      <h2>1. Find a story close to you</h2>
      <p>Start with someone you can reach and come back to: a market trader, a choir, a boda rider, a grandparent with a story. Access matters more than a famous subject.</p>

      <h2>2. Earn trust, then film</h2>
      <p>Spend time with people before the camera comes out. Explain what you are making and where it will be shown, and ask permission to film and to share it. People who trust you forget the camera; that is when real moments happen.</p>

      <h2>3. Record a strong interview</h2>
      <ul>
        <li>Choose a quiet place. Turn off fans, radios and fridges.</li>
        <li>Put the phone or a clip-on microphone close to the speaker.</li>
        <li>Sit them facing a window for soft light.</li>
        <li>Ask open questions: &ldquo;Tell me about the day&hellip;&rdquo; not &ldquo;Was it hard?&rdquo;</li>
        <li>Then be quiet. The best answers often come after a pause.</li>
      </ul>

      <h2>4. Film the life around the words</h2>
      <p>Interviews tell; the rest of your footage shows. Film hands at work, places, routines and small details. You will cover the interview with these shots in the edit, so you need lots of them.</p>

      <h2>5. Keep the phone steady and the shots varied</h2>
      <p>Hold steady with both hands or rest the phone on something. For every scene, get a wide shot, a medium shot and close-ups.</p>

      <h2>6. Find the story in the edit</h2>
      <p>Watch everything and write down the best moments. Ask what changes from the start to the end; that is your structure. Start strong, cut anything that repeats, and keep it shorter than you think.</p>

      <h2>7. Respect the people in it</h2>
      <p>Show them the film before it goes public if you can. Their trust is the most valuable thing you have, for this film and the next.</p>

      <h2>Show it</h2>
      <p>Share short clips to build an audience, send it to festivals, and submit it to Wano TV, which takes documentaries of all lengths. Read <a href="/post/how-to-get-your-african-film-seen">How to get your African film seen</a> first. <a href="/tv/submit">Submit your film</a>.</p>
    `,
  },
]
