import type { BlogPost } from './blogPosts'
import { batch2b } from './blogPostsBatch2b'
import { batch2c } from './blogPostsBatch2c'

// Scheduled posts, Mondays and Thursdays, late Nov 2026 to end of Jan 2027.
// Each appears on its date (see publishedPosts). Facts were checked against
// sources when written; keep them true when editing.
const GET = 'https://wanoafrica.com/get?by=blog'

const batch2a: BlogPost[] = [
  {
    slug: 'how-to-make-ugandan-rolex',
    date: 'November 24, 2026',
    title: 'How to make a Ugandan rolex at home (easy recipe)',
    description: 'The Kampala street classic in your own kitchen: soft chapati, a vegetable omelette, rolled up. Ingredients, steps and tips.',
    imageUrl: '/images/image1.webp',
    content: `
      <p>A rolex is Uganda&rsquo;s most famous street food: an omelette rolled up in a chapati. The name is a play on &ldquo;rolled eggs&rdquo;. Kampala stalls make them in minutes, and you can too. This makes 2 rolexes.</p>

      <h2>Ingredients</h2>
      <h3>For the chapati (makes 2 large)</h3>
      <ul>
        <li>1 cup (about 130 g) plain flour, plus a little for rolling</li>
        <li>A pinch of salt</li>
        <li>1 tablespoon cooking oil, plus a little for frying</li>
        <li>About 1/3 cup warm water</li>
      </ul>
      <h3>For the egg</h3>
      <ul>
        <li>4 eggs</li>
        <li>1 small onion, finely chopped</li>
        <li>1 tomato, finely chopped</li>
        <li>A handful of finely shredded cabbage (or kale)</li>
        <li>A little green pepper or carrot, finely chopped (optional)</li>
        <li>Salt, and chilli if you like it</li>
      </ul>

      <h2>Steps</h2>
      <ol>
        <li><strong>Make the dough.</strong> Mix flour and salt, add the oil, then add warm water a little at a time until you have a soft dough that doesn&rsquo;t stick to your hands. Knead for 5 minutes, cover and rest for 15 minutes.</li>
        <li><strong>Roll and fry the chapati.</strong> Divide the dough in two, roll each into a thin circle about the size of your pan, and cook in a hot dry pan for about a minute on each side. Brush with a little oil and cook until golden spots appear. Keep warm under a cloth.</li>
        <li><strong>Mix the egg.</strong> Beat 2 eggs per rolex with salt, then stir in half the onion, tomato, cabbage and pepper.</li>
        <li><strong>Cook the omelette.</strong> Heat a little oil in the pan, pour in the egg mix and spread it to the size of the chapati. Cook until almost set.</li>
        <li><strong>Join them.</strong> While the top of the egg is still slightly soft, lay a chapati on top and press gently so it sticks. Flip, cook for 30 seconds, then slide it out with the egg side up.</li>
        <li><strong>Roll it.</strong> Roll the chapati up tightly around the egg. Wrap the bottom in paper, the way the stalls do, and eat it hot.</li>
      </ol>

      <h2>Tips from the stalls</h2>
      <ul>
        <li>Chop the vegetables very small so the rolex rolls without breaking.</li>
        <li>Rest the dough. It makes soft, layered chapati instead of hard ones.</li>
        <li>Some stalls add minced meat or sausage. Try it.</li>
        <li>Cut chapati into pieces and mix it with beans and you have kikomando, another Kampala favourite.</li>
      </ul>

      <h2>Made one? Post it</h2>
      <p>Film your rolex from dough to first bite and post it on Wano. Kampala creators share their favourite stalls there too.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'afrobeat-vs-afrobeats',
    date: 'November 27, 2026',
    title: 'Afrobeat vs Afrobeats: what is the difference?',
    description: 'One "s" separates two different sounds: Fela Kuti\'s 1970s Afrobeat and today\'s Afrobeats of Wizkid, Davido, Burna Boy and Tems.',
    imageUrl: '/images/Creators1.webp',
    content: `
      <p>People use them as if they mean the same thing, but Afrobeat and Afrobeats are different music from different times. Here is the short version.</p>

      <h2>Afrobeat (no &ldquo;s&rdquo;): the 1960s and 70s</h2>
      <p>Afrobeat came out of Nigeria in the 1960s and 70s. Fela Kuti coined the name. It mixed fuji and highlife with American jazz and funk, played by big bands with long instrumental solos and complex, jazzy rhythms. Songs could run for many minutes, and Fela&rsquo;s lyrics often attacked politicians and power.</p>

      <h2>Afrobeats (with an &ldquo;s&rdquo;): the 2000s to now</h2>
      <p>Afrobeats grew up in Nigeria, Ghana and the UK in the 2000s and 2010s. It is less one style than an umbrella for many: hiplife, highlife, dancehall, hip hop, soca and R&amp;B, with the beat at the centre. Songs are shorter, made for dancing and radio, and usually stay away from politics.</p>

      <h2>Where the &ldquo;s&rdquo; came from</h2>
      <p>The London DJ DJ Abrantee is credited with adding the &ldquo;s&rdquo; to market the new sound to British audiences. The name took off after his Choice FM radio show launched in April 2011.</p>

      <h2>The names to know</h2>
      <ul>
        <li><strong>Afrobeat:</strong> Fela Kuti, who created and named it.</li>
        <li><strong>Afrobeats:</strong> Wizkid, Davido, Burna Boy, D&rsquo;banj, Mr Eazi, Rema, Tems, Ayra Starr, CKay and Fireboy DML, among many others.</li>
      </ul>

      <h2>How Afrobeats went global</h2>
      <ul>
        <li>D&rsquo;banj&rsquo;s &ldquo;Oliver Twist&rdquo; reached the UK top 10 in 2012.</li>
        <li>Wizkid featured on Drake&rsquo;s &ldquo;One Dance&rdquo;, which passed a billion streams on Spotify, and in 2017 became the first African artist to sell out London&rsquo;s Royal Albert Hall.</li>
        <li>In 2023, Burna Boy&rsquo;s <em>I Told Them</em> became the first album by an African artist to debut at number one on the UK Albums Chart.</li>
        <li>The Grammys added a Best African Music Performance award in 2024. Tems won it in 2025.</li>
      </ul>

      <h2>So which is it?</h2>
      <p>If you mean Fela and long horn-driven grooves, say Afrobeat. If you mean what is on the radio and in the club today, say Afrobeats. Both are on Wano: find the trending sounds in the app and post your own moves.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-make-soft-chapati',
    date: 'December 1, 2026',
    title: 'How to make soft chapati: the East African way',
    description: 'Soft, layered chapati like the ones at the stall: the right dough, the coil trick for layers, and how to keep them soft.',
    imageUrl: '/images/image2.webp',
    content: `
      <p>Chapati is everyday bread across East Africa, and the base of the rolex and kikomando. Hard, dry chapati is a common problem. These steps give you soft, layered ones. Makes 6.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>3 cups (about 400 g) plain flour, plus extra for rolling</li>
        <li>1 teaspoon salt</li>
        <li>1 tablespoon sugar (optional, helps browning)</li>
        <li>3 tablespoons cooking oil, plus more for layering and frying</li>
        <li>About 1 cup warm water</li>
      </ul>

      <h2>Steps</h2>
      <ol>
        <li><strong>Mix.</strong> Combine flour, salt and sugar. Add the oil and rub it in with your fingers until the flour looks like breadcrumbs.</li>
        <li><strong>Add water slowly.</strong> Pour in warm water a little at a time and mix until you have a soft dough. Soft dough means soft chapati; if it feels stiff, add a spoon more water.</li>
        <li><strong>Knead.</strong> Knead for about 10 minutes, until smooth and stretchy.</li>
        <li><strong>Rest.</strong> Cover and leave for at least 30 minutes. Don&rsquo;t skip this; it is what makes them soft.</li>
        <li><strong>Make the layers.</strong> Divide into 6 balls. Roll one out thin, brush with oil, then roll it up like a rope and coil the rope into a snail shape. Do the same with the rest and rest them for 10 minutes.</li>
        <li><strong>Roll out.</strong> Flatten each coil and roll it into a circle about the size of your pan.</li>
        <li><strong>Cook.</strong> In a hot dry pan, cook until bubbles appear, flip, then brush with a little oil, flip again and press the edges with a spoon so it puffs. Cook until golden spots appear on both sides.</li>
        <li><strong>Keep soft.</strong> Stack the cooked chapati under a clean cloth or in a covered container. The steam keeps them soft.</li>
      </ol>

      <h2>Common problems</h2>
      <ul>
        <li><strong>Hard chapati:</strong> dough too stiff, not rested, or cooked too long on low heat. Use a hotter pan and cook faster.</li>
        <li><strong>No layers:</strong> skip the coil and you get a single flat sheet. Oil plus coiling makes the layers.</li>
        <li><strong>Pale:</strong> the pan isn&rsquo;t hot enough.</li>
      </ul>

      <h2>What to make with them</h2>
      <p>Wrap an omelette for a <a href="/post/how-to-make-ugandan-rolex">rolex</a>, cut them up with beans for kikomando, or eat them with tea. Film your chapati and post it on Wano.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'december-video-ideas',
    date: 'December 4, 2026',
    title: '25 short video ideas for December',
    description: 'Festive, funny and easy video ideas for the holidays: going home, Christmas food, family, New Year and more. Ready to film on your phone.',
    imageUrl: '/images/Profile2.webp',
    content: `
      <p>December is the month everyone is home, everyone is cooking and everyone has a phone out. Here are 25 ideas you can film this month, no special gear needed. For filming tips, see <a href="/post/how-to-film-short-videos-on-your-phone">how to film great short videos on your phone</a>.</p>

      <h2>Going home</h2>
      <ol>
        <li>The journey home in 30 seconds: bus park, road, arrival.</li>
        <li>&ldquo;What my village looks like vs what people think it looks like.&rdquo;</li>
        <li>The first meal Mum makes when you arrive.</li>
        <li>Relatives&rsquo; questions every December, acted out.</li>
        <li>What you pack vs what you actually use.</li>
      </ol>

      <h2>Food</h2>
      <ol start="6">
        <li>Christmas cooking from start to finish, sped up.</li>
        <li>Your family&rsquo;s Christmas dish and the story behind it.</li>
        <li>Rate the Christmas plates at every house you visit.</li>
        <li>Making <a href="/post/how-to-make-ugandan-rolex">a rolex</a> or <a href="/post/how-to-make-soft-chapati">chapati</a> with a grandparent.</li>
        <li>A street food tour of your town on one budget.</li>
      </ol>

      <h2>Family and funny</h2>
      <ol start="11">
        <li>Teach your grandparents a dance trend.</li>
        <li>&ldquo;Types of people at a family gathering.&rdquo;</li>
        <li>Kids explain what Christmas is about.</li>
        <li>The cousin who arrives last and eats first.</li>
        <li>Dad&rsquo;s reaction to your Christmas outfit.</li>
      </ol>

      <h2>Music and dance</h2>
      <ol start="16">
        <li>Your village&rsquo;s best dancer, introduced like a celebrity.</li>
        <li>Church choir moments (ask first).</li>
        <li>A dance challenge with the whole family.</li>
        <li>Your top 5 songs of the year.</li>
        <li>An old song your parents love, with their dance moves.</li>
      </ol>

      <h2>New Year</h2>
      <ol start="21">
        <li>Your year in 20 seconds: one clip per month.</li>
        <li>Goals for next year, then check them in December.</li>
        <li>What 31 December looks like in your town.</li>
        <li>Wishes in your language: <a href="/post/christmas-new-year-wishes-luganda-swahili">Christmas and New Year wishes in Luganda and Swahili</a>.</li>
        <li>&ldquo;Things I&rsquo;m leaving in this year.&rdquo;</li>
      </ol>

      <h2>A few rules</h2>
      <ul>
        <li>Ask people before you film them, especially at church and with children.</li>
        <li>Start with the best moment, keep it short, and add a line of text.</li>
        <li>Represent your town: pick your Home Ground on Wano so your videos count for it.</li>
      </ul>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'things-to-do-in-kampala',
    date: 'December 8, 2026',
    title: 'Things to do in Kampala: 10 places for the holidays',
    description: 'Home for the holidays or visiting? Kasubi Tombs, the Gaddafi Mosque minaret, Ndere Centre, Namugongo, the Bahá\'í Temple, the Royal Mile and more.',
    imageUrl: '/images/About-1.webp',
    content: `
      <p>December fills Kampala with people home from abroad and visitors from everywhere. If you want more than malls and traffic, here are ten places worth your time. Opening hours and fees change, so check before you go.</p>

      <h2>1. Kasubi Tombs</h2>
      <p>The royal burial ground of the Kabakas (kings) of Buganda, on Kasubi Hill about 5 km from the city centre. It is a UNESCO World Heritage Site, and its great thatched house is one of the most remarkable buildings made purely from plant materials in sub-Saharan Africa. A fire in 2010 destroyed major buildings; they were rebuilt, and in 2023 the site came off UNESCO&rsquo;s &ldquo;in danger&rdquo; list.</p>

      <h2>2. The Gaddafi Mosque minaret</h2>
      <p>The Uganda National Mosque at Old Kampala, often called the Gaddafi Mosque. Climb the minaret for one of the best views over Kampala&rsquo;s hills. Women are asked to cover their heads; scarves are provided.</p>

      <h2>3. Ndere Cultural Centre</h2>
      <p>An evening show of dance and music from across Uganda and Africa. A good first night for visitors and a good night out for families.</p>

      <h2>4. Namugongo, the Uganda Martyrs&rsquo; shrine</h2>
      <p>The pilgrimage site where Christian converts were killed in 1886. Pilgrims arrive from across East Africa for Martyrs&rsquo; Day on 3 June, but it is worth a visit any time, with a museum on site.</p>

      <h2>5. The Bahá&rsquo;í Temple</h2>
      <p>On a quiet, tree-covered hill at Kikaya, this was the first Bahá&rsquo;í House of Worship in Africa. A peaceful place for a walk and a view.</p>

      <h2>6. The Royal Mile</h2>
      <p>A straight, tree-lined road between the Bulange (the Buganda parliament) and the Lubiri, the Kabaka&rsquo;s palace at Mengo. Good for photos and a walk through Buganda&rsquo;s history.</p>

      <h2>7. Uganda Museum</h2>
      <p>Uganda&rsquo;s national museum on Kira Road, with traditional instruments, crafts and history. It has been closed for refurbishment, so check it has reopened before you go.</p>

      <h2>8. Downtown markets</h2>
      <p>Nakasero and the downtown markets for fruit, fabric and everything else. Go early, keep your phone close and bargain politely.</p>

      <h2>9. Street food</h2>
      <p>Rolex, gonja, muchomo and more. Our <a href="/post/kampala-street-food-guide">Kampala street food guide</a> explains what everything is.</p>

      <h2>10. A day trip to Jinja</h2>
      <p>East of Kampala, Jinja sits where the Nile leaves Lake Victoria. Popular for boat trips on the Nile and a change from the city.</p>

      <h2>Getting around</h2>
      <p>Boda bodas (motorbike taxis) are fastest in traffic; wear a helmet. Taxis (minibuses) are cheapest on fixed routes, and &ldquo;special hire&rdquo; cars take you alone at an agreed price. See <a href="/post/luganda-phrases-and-ugandan-english">Luganda phrases and Ugandan English</a> before you go.</p>
      <p>Film your Kampala days and post them on Wano. <a href="${GET}">Get Wano free</a>.</p>
    `,
  },
  {
    slug: 'christmas-new-year-wishes-luganda-swahili',
    date: 'December 11, 2026',
    title: 'Christmas and New Year wishes in Swahili, Luganda and Amharic',
    description: 'Ready-to-send Christmas and New Year messages in Swahili, Luganda and Amharic, with English, for family, friends and WhatsApp status.',
    imageUrl: '/images/About-3.webp',
    content: `
      <p>A message in someone&rsquo;s own language means more. Here are Christmas and New Year wishes in Swahili, spoken across East and Central Africa, in Luganda and in Amharic, with English, ready to copy into WhatsApp.</p>

      <h2>Luganda</h2>
      <p>In Luganda, Christmas is <strong>Ssekukkulu</strong>, a word for a great feast day.</p>
      <ul>
        <li><strong>Ssekukkulu ennungi!</strong> Merry Christmas!</li>
        <li><strong>Omwaka omuggya omulungi!</strong> Happy New Year!</li>
        <li><strong>Mbagaliza Ssekukkulu ennungi n&rsquo;omwaka omuggya omulungi.</strong> I wish you (all) a merry Christmas and a happy New Year.</li>
        <li><strong>Katonda abawe emikisa mu mwaka omuggya.</strong> May God bless you in the new year.</li>
        <li><strong>Weebale nnyo olw&rsquo;omwaka guno.</strong> Thank you so much for this year.</li>
      </ul>

      <h2>Swahili</h2>
      <ul>
        <li><strong>Krismasi njema!</strong> Merry Christmas!</li>
        <li><strong>Heri ya Krismasi!</strong> Happy Christmas!</li>
        <li><strong>Heri ya mwaka mpya!</strong> Happy New Year!</li>
        <li><strong>Nakutakia mwaka mpya wenye furaha tele.</strong> I wish you a new year full of happiness.</li>
        <li><strong>Nakutakia wewe na familia yako mwaka mpya mzuri.</strong> I wish you and your family a good new year.</li>
        <li><strong>Mwaka mpya wa furaha kwako!</strong> A joyful new year to you!</li>
      </ul>

      <h2>Amharic</h2>
      <p>In Ethiopia, Christmas is <strong>Genna</strong>, celebrated on 7 January.</p>
      <ul>
        <li><strong>Melikam Gena!</strong> Merry Christmas!</li>
      </ul>
      <p>More on how Christmas looks from Lagos to Addis Ababa in <a href="/post/christmas-across-africa">Christmas across Africa</a>.</p>

      <h2>Ready-made messages</h2>
      <h3>For family</h3>
      <p><em>Ssekukkulu ennungi! Thank you for everything this year. Mbagaliza omwaka omuggya omulungi.</em></p>
      <h3>For friends</h3>
      <p><em>Krismasi njema! Thanks for the laughs this year. Heri ya mwaka mpya!</em></p>
      <h3>For a WhatsApp status</h3>
      <p><em>Ssekukkulu ennungi / Krismasi njema / Merry Christmas to everyone who made this year. See you in the new one.</em></p>

      <h2>Say it, don&rsquo;t just type it</h2>
      <p>A voice note in your own voice beats any text. Record your wishes as a Quick post on Wano, a voice note in the ring around your profile picture, and everyone who follows you hears it for 24 hours.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
]

export const batch2: BlogPost[] = [...batch2b, ...batch2c, ...batch2a]
