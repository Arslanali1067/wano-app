import type { BlogPost } from './blogPosts'

// Africa-wide scheduled posts (see blogPostsBatch2).
const GET = 'https://wanoafrica.com/get?by=blog'

export const batch2c: BlogPost[] = [
  {
    slug: 'christmas-across-africa',
    date: 'December 15, 2026',
    title: 'Christmas across Africa: how Nigeria, Ghana, Ethiopia, South Africa, Uganda and more celebrate',
    description: 'Watch Night in Ghana, masquerades in Nigeria, Genna on 7 January in Ethiopia, braais in a South African summer, and the trip home in Uganda.',
    imageUrl: '/images/About-4.webp',
    content: `
      <p>From Lagos to Addis Ababa to Cape Town, Christmas in Africa looks very different from one country to the next, but almost everywhere it means church, family and a big meal. Here is a tour.</p>

      <h2>Nigeria</h2>
      <p>Many families travel long distances to spend Christmas in their ancestral villages. Church services are lively, with drumming, dancing and colourful clothes, followed by feasts of jollof rice, fried plantain and goat stew. In Igbo areas, many communities still stage <em>mmanwu</em> masquerade performances.</p>

      <h2>Ghana</h2>
      <p>The season starts weeks early with music, street parades and fireworks. On Christmas Eve, people go to Watch Night services and children perform Nativity plays. On the table: fufu with light soup or chicken stew, and grilled meats.</p>

      <h2>Ethiopia: Christmas on 7 January</h2>
      <p>Ethiopian Christmas, <strong>Genna</strong>, falls on 7 January, following the Ethiopian Orthodox calendar. Many people keep a 43-day fast before it, eating one vegan meal a day. On Christmas Eve, services run through the night, and worshippers dressed in white cotton walk around the church with candles. The feast is <em>wat</em>, a thick spicy stew, eaten with injera. Men and boys traditionally play <em>genna</em>, a game like hockey played with a curved stick and a wooden ball. The greeting is <strong>Melikam Gena!</strong></p>

      <h2>Egypt</h2>
      <p>Coptic Christians also celebrate on 7 January, after a vegan fast.</p>

      <h2>South Africa: Christmas in summer</h2>
      <p>December is summer, so the holidays mean beach days, trips home and family braais (barbecues). Christmas lunch might include gammon, roast chicken, chakalaka, yellow rice and malva pudding.</p>

      <h2>Kenya</h2>
      <p>For many families it is beach time on the coast, at places like Mombasa and Diani, with Swahili-influenced feasts of seafood, pilau and chapati.</p>

      <h2>Uganda</h2>
      <p>Christmas, <strong>Ssekukkulu</strong> in Luganda, is a day for family, and many people travel to their ancestral homes to spend it with relatives. Midnight Mass is a favourite, and the meal is the big one: luwombo steamed in banana leaves, matooke, pilau and roasted goat with groundnut sauce. Both Christmas Day and Boxing Day are public holidays.</p>

      <h2>Cameroon</h2>
      <p>Households cook <em>ndol&eacute;</em>, grilled fish and puff-puff, and church choirs rehearse for weeks before Christmas.</p>

      <h2>Zambia and Zimbabwe</h2>
      <p>Christmas Eve church services are followed by community singing, drumming and dancing.</p>

      <h2>Send your wishes</h2>
      <p>Wish people a merry Christmas in their own language with our <a href="/post/christmas-new-year-wishes-luganda-swahili">wishes in Swahili, Luganda and Amharic</a>.</p>

      <h2>Show us your Christmas</h2>
      <p>Wherever you are, in Africa or in the diaspora, post your Christmas on Wano: the journey home, the cooking, the church, the dancing. Represent your city on Home Ground.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'how-to-make-jollof-rice',
    date: 'December 18, 2026',
    title: 'How to make jollof rice (and the Nigeria vs Ghana jollof war)',
    description: 'West Africa\'s party rice: where jollof comes from, how Nigerian and Ghanaian jollof differ, and a step-by-step recipe for a smoky pot.',
    imageUrl: '/images/Image2(1).webp',
    content: `
      <p>No West African party is complete without jollof: rice cooked in a rich tomato and pepper sauce until every grain is red and full of flavour. Here is where it comes from, why Nigeria and Ghana argue about it, and how to make it.</p>

      <h2>Where jollof comes from</h2>
      <p>Jollof is traced to Senegal, where its ancestor is <em>thieboudienne</em>, the fish-and-rice dish of the fishing communities of Saint-Louis. The name likely comes from the Wolof people and the old Jolof Empire, which covered parts of today&rsquo;s Senegal, The Gambia, Mali and Mauritania. In Senegal and The Gambia it is also called <em>ceebu j&euml;n</em> or <em>benachin</em>.</p>

      <h2>The jollof war</h2>
      <p>Nigeria and Ghana both claim the best jollof, a friendly rivalry that exploded online in the 2010s with cook-offs and social-media battles. There is even a World Jollof Day, on 22 August.</p>
      <ul>
        <li><strong>Ghanaian jollof</strong> usually uses fragrant jasmine rice, often with beef, goat or chicken, and is served with plantain and shito (a hot pepper sauce).</li>
        <li><strong>Nigerian jollof</strong> usually uses parboiled long-grain rice, which stays firm and doesn&rsquo;t go mushy, gets its heat from scotch bonnet peppers, and comes with fried plantain, moi-moi or coleslaw. The prized &ldquo;party jollof&rdquo; has a smoky taste from rice slightly caught at the bottom of the pot.</li>
      </ul>
      <p>Pick a side in the comments. Or just make both.</p>

      <h2>Ingredients (serves 6)</h2>
      <ul>
        <li>3 cups long-grain parboiled rice (or jasmine for the Ghanaian style)</li>
        <li>4 large tomatoes (or a 400 g tin of plum tomatoes)</li>
        <li>2 red bell peppers (tatashe)</li>
        <li>1 to 2 scotch bonnet peppers, to taste</li>
        <li>3 onions</li>
        <li>3 tablespoons tomato paste</li>
        <li>1/2 cup vegetable oil</li>
        <li>About 3 cups chicken stock</li>
        <li>1 teaspoon each dried thyme and curry powder, 2 bay leaves, 2 stock cubes, salt</li>
      </ul>

      <h2>Steps</h2>
      <ol>
        <li><strong>Make the pepper base.</strong> Blend the tomatoes, red peppers, scotch bonnet and 2 of the onions until smooth. Boil it down in a pot for about 20 minutes until thick and reduced by about half.</li>
        <li><strong>Fry.</strong> In a large heavy pot, heat the oil and fry the last onion, sliced, until soft. Add the tomato paste and fry for about 5 minutes, stirring, until it darkens. This is where the flavour comes from.</li>
        <li><strong>Add the base and season.</strong> Pour in the reduced pepper mix and fry for 10 minutes. Add thyme, curry powder, bay leaves, stock cubes and salt.</li>
        <li><strong>Add rice and stock.</strong> Wash the rice until the water runs clear, stir it into the sauce, then add stock until the liquid just covers the rice.</li>
        <li><strong>Steam, don&rsquo;t stir.</strong> Cover tightly (a sheet of foil under the lid helps) and cook on low heat for 25 to 30 minutes, until the rice is tender. Don&rsquo;t keep stirring; it breaks the grains.</li>
        <li><strong>The party taste.</strong> For the smoky flavour, turn the heat up for the last few minutes and let the bottom catch slightly, without burning.</li>
        <li><strong>Rest and fluff.</strong> Rest for 5 minutes, then fluff with a fork and serve with chicken, plantain and salad.</li>
      </ol>

      <h2>Show your jollof</h2>
      <p>Nigeria, Ghana, Senegal, Sierra Leone, The Gambia, Cameroon, Liberia: everybody&rsquo;s jollof is different. Post yours on Wano and let people judge.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'highlife-explained',
    date: 'January 5, 2027',
    title: 'What is highlife? Ghana\'s music that shaped African pop',
    description: 'Born in Ghana\'s coastal cities, named in the 1920s, led by E.T. Mensah, spread to Nigeria, and recognised by UNESCO in 2025: highlife explained.',
    imageUrl: '/images/Image1(1).webp',
    content: `
      <p>Before Afrobeat and Afrobeats, there was highlife. Ghana&rsquo;s great dance music shaped popular music across West Africa, and you can still hear it in today&rsquo;s hits.</p>

      <h2>Where it began</h2>
      <p>Highlife grew up in the coastal cities of what is now Ghana, then the British Gold Coast colony, from the late 19th century. It came out of palm-wine guitar music and brass bands, and later absorbed the foxtrot, calypso and jazz.</p>

      <h2>Why it is called highlife</h2>
      <p>The name appeared in the early 1920s. Bands played for wealthy, well-dressed audiences at exclusive clubs, and the people outside, who couldn&rsquo;t afford the entry fee or the dress code, called the music &ldquo;high life&rdquo;.</p>

      <h2>What it sounds like</h2>
      <p>African rhythms and melodies played on Western instruments: jazzy horns, bright guitar lines in a two-finger picking style, and a swinging dance beat. From the late 2010s, newer highlife has also gone uptempo and synth-driven.</p>

      <h2>Milestones</h2>
      <ul>
        <li><strong>1928:</strong> Jacob Sam and the Kumasi Trio recorded &ldquo;Yaa Amponsah&rdquo; in London, seen as one of the earliest guitar-band highlife recordings.</li>
        <li><strong>1940s:</strong> Highlife split into dance bands in the cities and guitar bands, led by E.K. Nyame and the Akan Trio.</li>
        <li><strong>1956:</strong> E.T. Mensah, the &ldquo;King of Highlife&rdquo;, performed with Louis Armstrong.</li>
        <li><strong>1960s:</strong> Igbo highlife became Nigeria&rsquo;s most popular music, with Rex Lawson and Victor Uwaifo among its pioneers.</li>
        <li><strong>2025:</strong> UNESCO recognised highlife as intangible cultural heritage.</li>
      </ul>

      <h2>Its children</h2>
      <p>Highlife spread to Sierra Leone, Liberia, Nigeria and The Gambia, and fed into makossa, Fela Kuti&rsquo;s <a href="/post/afrobeat-vs-afrobeats">Afrobeat</a> and Ghana&rsquo;s hiplife. Ghanaians in Germany created &ldquo;burger highlife&rdquo;, mixing it with funk, disco and synth-pop, and gospel highlife grew in Ghana&rsquo;s churches.</p>

      <h2>Play it for your elders</h2>
      <p>Put on a highlife classic for your parents or grandparents and film their reaction, then post it on Wano.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
]
