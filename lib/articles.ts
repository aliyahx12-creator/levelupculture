export interface ContentBlock {
  type: 'body' | 'heading' | 'tip' | 'callout' | 'list';
  text?: string;
  items?: string[];
}

export interface ArticleContent {
  id: string;
  readTime: number;
  intro: string;
  blocks: ContentBlock[];
}

export const ARTICLES: ArticleContent[] = [
  {
    id: '1',
    readTime: 5,
    intro:
      "The biggest obstacle for new gamers isn't skill — it's identity. Before you ever land a headshot or execute a perfect strategy, you have to decide what kind of player you are. And most beginners get this completely wrong.",
    blocks: [
      {
        type: 'heading',
        text: 'The "I\'m Bad at Gaming" Trap',
      },
      {
        type: 'body',
        text:
          'The moment you say "I\'m just bad at gaming," you\'ve turned a temporary skill gap into a permanent identity. You stop seeing losses as feedback and start seeing them as proof of something wrong with you. That single mental shift is the difference between players who improve and players who quit.',
      },
      {
        type: 'body',
        text:
          "Here's the truth: everyone who is good at something was once bad at it. Every pro gamer you\'ve watched had a first match. Every streamer with thousands of hours had a first hour. The only thing separating you from them is time and the right mindset.",
      },
      {
        type: 'callout',
        text: '"I\'m not bad — I\'m new. There\'s a massive difference."',
      },
      {
        type: 'heading',
        text: 'Switch From Performing to Learning',
      },
      {
        type: 'body',
        text:
          "Most beginners approach gaming in performance mode — they care about whether they win or lose, whether they look good, whether others judge them. This is exhausting and counterproductive. Instead, try shifting into learning mode.",
      },
      {
        type: 'body',
        text:
          "In learning mode, every match is a lab experiment. You're not trying to prove yourself — you're trying to discover things. What did I do when I got caught in the open? Why did that approach not work? What did the player who beat me do differently? This curiosity is what drives fast improvement.",
      },
      {
        type: 'tip',
        text:
          'After every session, ask yourself one question: "What is one thing I noticed about my gameplay today?" Not how many kills you got — what did you actually observe?',
      },
      {
        type: 'heading',
        text: 'Stop Comparing Your Beginning to Someone Else\'s Middle',
      },
      {
        type: 'body',
        text:
          "Comparison is one of the fastest ways to kill your enjoyment. When you watch a skilled player and immediately compare yourself, you're comparing your week one to their year three. That's not a fair or useful comparison.",
      },
      {
        type: 'body',
        text:
          "The only comparison that matters is you versus you from last week. Are you slightly more aware? Does the game feel slightly more natural? Are you making slightly better decisions? That's progress — and it's the only scoreboard that counts.",
      },
      {
        type: 'heading',
        text: 'Build an Identity That Grows',
      },
      {
        type: 'body',
        text:
          "Instead of saying \"I'm a gamer\" (a fixed identity that you either are or aren't), try saying \"I'm a gamer who is learning.\" This small shift builds in permission to be imperfect. It makes growth part of who you are, not a destination you're trying to reach.",
      },
      {
        type: 'list',
        items: [
          "Say: \"I'm learning how to play this game\" instead of \"I'm bad at this game\"",
          'Celebrate small wins: first objective captured, first clutch moment, first time you remembered a mechanic',
          'Treat losses as tuition — you paid for that lesson, extract the value from it',
          'Find one thing each session you did better than last time',
        ],
      },
      {
        type: 'callout',
        text: 'Patience is a skill. The players who master it improve the fastest.',
      },
      {
        type: 'heading',
        text: 'The Bottom Line',
      },
      {
        type: 'body',
        text:
          "Gaming skills are learnable. Reaction time improves with practice. Game sense develops with exposure. Strategy knowledge grows with study. None of it requires innate talent — it requires showing up consistently with the right mental framework.",
      },
      {
        type: 'body',
        text:
          "You don't have to be good to start. You have to start to be good. The mindset you build right now — in your first weeks — will determine how far you go. Choose curiosity over judgment, learning over performance, and progress over perfection.",
      },
    ],
  },
  {
    id: '2',
    readTime: 4,
    intro:
      'Every gamer tilts. The ones who improve fastest are the ones who recognize it early and have a system to reset. Tilt is not a character flaw — it\'s a predictable emotional response. And like any predictable response, it can be managed.',
    blocks: [
      {
        type: 'heading',
        text: 'What Tilt Actually Is',
      },
      {
        type: 'body',
        text:
          "Tilt comes from poker — it describes when a player lets emotion override strategy. In gaming, it means you're making decisions from frustration rather than judgment. You start playing reactively, rushing, or making reckless choices to \"get back\" at the game or at opponents.",
      },
      {
        type: 'body',
        text:
          "Tilt happens to everyone. You're not weak for feeling it. But staying in a tilted state and continuing to queue is one of the most reliable ways to turn a bad session into a genuinely harmful one for your mental state and your progress.",
      },
      {
        type: 'heading',
        text: 'Signs You\'re Tilting Right Now',
      },
      {
        type: 'list',
        items: [
          "You're playing faster and more aggressively than usual without a reason",
          "You're thinking about the last match instead of the current one",
          "You're blaming your teammates for everything",
          "You typed something in chat you wouldn't normally say",
          "You felt a hot flash of frustration at losing and immediately queued again",
          "You\'re no longer thinking — you\'re just reacting",
        ],
      },
      {
        type: 'tip',
        text: 'If two or more of those sound familiar right now — stop. Close the queue screen. Take five.',
      },
      {
        type: 'heading',
        text: 'The 5-Minute Rule',
      },
      {
        type: 'body',
        text:
          "After a bad match — especially one that made you angry — wait five minutes before queuing again. Set a timer. This isn't weakness; it's smart resource management. Your performance in the next match depends heavily on your emotional state in the first 30 seconds.",
      },
      {
        type: 'body',
        text:
          "Research on decision-making under stress shows that emotional states carry over for at least several minutes after the triggering event. Your nervous system doesn't reset the moment the match ends. Give it time.",
      },
      {
        type: 'callout',
        text: 'One reset minute is worth more than five tilted matches.',
      },
      {
        type: 'heading',
        text: 'Physical Resets That Actually Work',
      },
      {
        type: 'body',
        text:
          "Your body and mind are connected. Physical resets directly change your emotional state — faster than trying to think your way out of frustration.",
      },
      {
        type: 'list',
        items: [
          'Stand up and walk to another room, even for 60 seconds',
          'Drink a full glass of water (dehydration amplifies irritability)',
          'Do 10 slow, deep breaths — exhale longer than you inhale',
          'Stretch your neck and shoulders (you\'re probably tensed up)',
          'Splash cold water on your face if the frustration is intense',
        ],
      },
      {
        type: 'heading',
        text: 'Mental Resets: Reframe What Just Happened',
      },
      {
        type: 'body',
        text:
          "Once you've done the physical reset, do a quick mental one. Instead of replaying the bad moment, ask: \"What\'s one thing I could have done differently?\" This moves your brain from victim mode to analyst mode.",
      },
      {
        type: 'body',
        text:
          "If you can\'t answer that question without getting frustrated again, it means you need more time. That\'s okay. Some sessions need to end early.",
      },
      {
        type: 'heading',
        text: 'When to Stop for the Day',
      },
      {
        type: 'body',
        text:
          "Sometimes the right call is to close the game entirely. Knowing when to stop is a skill — one that separates players who protect their mental health from players who chase losses into exhaustion.",
      },
      {
        type: 'list',
        items: [
          "You've lost three matches in a row and you're still feeling the same frustration",
          "You're gaming past midnight and you're tired but still queuing",
          "You feel genuine anger, not just competitive frustration",
          "Gaming has stopped feeling fun and started feeling like punishment",
        ],
      },
      {
        type: 'tip',
        text:
          'Set a "tilt limit" for yourself before you start playing. Something like: if I lose three in a row and I\'m frustrated, I stop for tonight. Pre-deciding removes the in-the-moment willpower battle.',
      },
      {
        type: 'body',
        text:
          "Gaming is supposed to be enjoyable. Tilt management isn\'t just about improving your rank — it\'s about protecting your relationship with a hobby you care about. Every time you quit on a good note, you come back the next day with more energy and better focus.",
      },
    ],
  },
  {
    id: '3',
    readTime: 5,
    intro:
      "You\'ve seen the debate everywhere: controller vs. mouse and keyboard. People argue about it like it\'s a war. The truth is much simpler — neither is objectively better. The best setup is the one that fits your games, your body, and your goals.",
    blocks: [
      {
        type: 'heading',
        text: 'What Each Setup Was Designed For',
      },
      {
        type: 'body',
        text:
          "Controllers were designed for console gaming — primarily games where you\'re on a couch, playing at a comfortable distance, with games that were built around analog input. Mouse and keyboard (M&K) were designed for computer tasks that require precision, and they became the standard for PC gaming because of the speed and accuracy they enable.",
      },
      {
        type: 'body',
        text:
          "Neither evolved to be \'the best\' — they evolved to be excellent at different things. Matching your input to your game type is far more impactful than picking the \'superior\' tool.",
      },
      {
        type: 'heading',
        text: 'The Case for Controllers',
      },
      {
        type: 'list',
        items: [
          'More comfortable for long sessions — thumbs rest naturally on analog sticks',
          'Built-in haptic feedback adds immersion',
          'Analog triggers are essential for racing, sports, and action games',
          'Designed for console games — games built around controllers feel best on them',
          'Lower barrier to entry — the controls feel familiar even if gaming is new',
          'Better for platformers, action RPGs, fighting games, and sports titles',
        ],
      },
      {
        type: 'heading',
        text: 'The Case for Mouse & Keyboard',
      },
      {
        type: 'list',
        items: [
          'Significantly faster and more precise for aiming in first-person games',
          'More keys means more available shortcuts and abilities',
          'Faster camera movement — critical in real-time strategy games',
          'The standard for competitive play in FPS, MOBA, and RTS genres',
          'More ergonomic options available (split keyboards, trackballs, etc.)',
          'Better for games with complex UI (strategy, simulation, MMORPGs)',
        ],
      },
      {
        type: 'callout',
        text: 'If you\'re playing a game that was designed for M&K, use M&K. If it was designed for a controller, use a controller. Start there.',
      },
      {
        type: 'heading',
        text: 'Genre Guide: What Works Best',
      },
      {
        type: 'list',
        items: [
          'FPS (Call of Duty, Valorant, CS2): M&K for competitive play, controller for casual',
          'Battle Royale (Fortnite, Warzone): M&K at higher levels, controller works fine casually',
          'MOBA (League of Legends, Dota 2): M&K is essential — not really playable on controller',
          'Action RPG (Elden Ring, Diablo): Controller feels natural and intentional',
          'Sports (FIFA, Rocket League): Controller is the standard',
          'Racing (Forza, Gran Turismo): Controller (ideally a wheel if serious)',
          'RTS (Age of Empires, StarCraft): M&K is the only real option',
          'Casual/Indie games: Either works — go with what\'s comfortable',
        ],
      },
      {
        type: 'heading',
        text: 'The "Switching" Question',
      },
      {
        type: 'body',
        text:
          "Many beginners ask: should I switch from controller to M&K (or vice versa) to improve? The answer depends on what you\'re playing and what your goals are.",
      },
      {
        type: 'body',
        text:
          "If you\'re playing competitive FPS and seriously want to improve, yes — M&K will give you a meaningful advantage. But expect two to four weeks of feeling worse before you feel better. The muscle memory transfer is real and takes time.",
      },
      {
        type: 'body',
        text:
          "If you\'re playing for fun across multiple genres, stick with what\'s comfortable. Comfort = more time playing = faster improvement overall.",
      },
      {
        type: 'tip',
        text:
          'Try both setups for the same game over a week each before deciding. One session isn\'t enough data. Your body needs time to adapt to new input before you can fairly judge it.',
      },
      {
        type: 'heading',
        text: 'The Real Answer',
      },
      {
        type: 'body',
        text:
          "The best gaming setup is the one you\'re comfortable with, that matches the genre you\'re playing, and that you\'ll actually use consistently. Comfort leads to more playtime, more playtime leads to more learning, and more learning leads to improvement. Don\'t let anyone tell you one tool is universally superior — context is everything.",
      },
    ],
  },
  {
    id: '4',
    readTime: 5,
    intro:
      "Aim is a skill, not a talent. Like typing speed or handwriting, it responds directly to deliberate practice. You don\'t need to grind for years — you need the right exercises done consistently. Here\'s everything a beginner needs to know.",
    blocks: [
      {
        type: 'heading',
        text: 'Why Aim Matters (And When It Doesn\'t)',
      },
      {
        type: 'body',
        text:
          "Aim is critical in first-person shooters and matters in third-person action games. But it\'s worth saying clearly: aim is not the most important skill for beginners. Game sense — knowing where to be, when to push, how to use the map — matters more at lower levels. Bad positioning will get you killed before you even get a chance to aim.",
      },
      {
        type: 'body',
        text:
          "Start developing your aim, but don\'t obsess over it at the expense of learning the fundamentals of your game. Think of aim training as something you build alongside game knowledge, not instead of it.",
      },
      {
        type: 'heading',
        text: 'Your Aim Training Toolkit',
      },
      {
        type: 'list',
        items: [
          'Aim Lab (free on Steam): The best free option. Built for beginners. Has structured playlists for specific games.',
          'KovaaK\'s ($10 on Steam): More customizable, used by professionals. Worth it if you\'re serious.',
          'In-game practice modes: Many FPS games have shooting ranges built in — use them.',
          'Custom lobbies / bots: Play against AI to practice mechanics without the pressure of live matches.',
        ],
      },
      {
        type: 'tip',
        text: 'Start with Aim Lab\'s beginner playlist before buying anything. 20 minutes a day, 3–4 days a week, for a month. You\'ll feel the difference.',
      },
      {
        type: 'heading',
        text: 'Understanding Sensitivity',
      },
      {
        type: 'body',
        text:
          "Mouse sensitivity is the single most impactful hardware setting for aim. Too high and your movements are twitchy and hard to control. Too low and you can\'t turn fast enough in close-range fights.",
      },
      {
        type: 'body',
        text:
          "Two numbers matter: your mouse\'s DPI (hardware sensitivity) and your in-game sensitivity multiplier. Multiply them together to get your effective sensitivity. Most FPS players land between 400–1600 eDPI (effective DPI). Beginners almost always start too high.",
      },
      {
        type: 'list',
        items: [
          'Start at 800 DPI on your mouse',
          'Set in-game sensitivity to 0.4–0.6 and try it for a week',
          'Lower sensitivity = more control but more physical movement required',
          'Use a larger mousepad if you go lower sensitivity',
          "Don't chase a \"perfect\" sensitivity — find comfortable and stay there",
        ],
      },
      {
        type: 'callout',
        text: "Stop changing your sensitivity every week. Consistency builds muscle memory. Muscle memory is what makes aim feel automatic.",
      },
      {
        type: 'heading',
        text: '3 Exercises to Start With',
      },
      {
        type: 'body',
        text:
          "These three exercises build the core components of aim: tracking (following a moving target), flicking (snapping to a target), and micro-adjustment (small precise corrections).",
      },
      {
        type: 'list',
        items: [
          'Gridshot (Aim Lab, 5 min): Builds reaction speed and general clicking accuracy. Great warm-up.',
          'Sphere Track (Aim Lab, 5 min): Smooth tracking practice. Teaches you to match a target\'s movement.',
          'Micro-flicking (Aim Lab, 5 min): Short precise snaps. Builds the adjustment skills used most in actual games.',
        ],
      },
      {
        type: 'heading',
        text: 'Consistency Over Intensity',
      },
      {
        type: 'body',
        text:
          "Fifteen focused minutes of aim training daily is more effective than two hours on a Saturday. Aim is a motor skill — it develops through repetition spaced out over time, not through single long sessions.",
      },
      {
        type: 'body',
        text:
          "Treat it like brushing your teeth. Short, consistent, non-negotiable. You won\'t notice dramatic improvement day to day, but compare yourself after 30 days and the difference will be clear.",
      },
      {
        type: 'tip',
        text:
          "Warm up in Aim Lab for 10–15 minutes before jumping into ranked matches. Warmed-up aim is noticeably better than cold aim — especially in the first few minutes of a session.",
      },
      {
        type: 'body',
        text:
          "Aim training is a multiplier, not a substitute. Combine it with game-specific practice and the fundamentals of your game. Aim gets you the kill — positioning and game sense get you the match.",
      },
    ],
  },
  {
    id: '5',
    readTime: 4,
    intro:
      "The players who plateau aren\'t usually lacking talent. They\'re running on broken foundations: poor sleep, no breaks, bad posture, and hours of unfocused grinding. The unsexy truth is that physical habits determine your performance ceiling.",
    blocks: [
      {
        type: 'heading',
        text: 'Sleep: The #1 Performance Factor Nobody Talks About',
      },
      {
        type: 'body',
        text:
          "Reaction time, decision-making, emotional regulation, and focus all degrade significantly with sleep deprivation. Studies show that 17–19 hours of being awake produces cognitive impairment equivalent to a 0.05% blood alcohol level. You wouldn\'t game drunk — don\'t game sleep-deprived.",
      },
      {
        type: 'body',
        text:
          "The best players in the world prioritize sleep like professionals. Most aim for 8 hours. When pros go into bootcamps for tournaments, sleep schedules are taken seriously. Treat yours the same way.",
      },
      {
        type: 'callout',
        text: "Gaming late to squeeze in one more match will cost you more in tomorrow\'s performance than it gains you tonight.",
      },
      {
        type: 'heading',
        text: 'Hydration: Dehydration Slows You Down',
      },
      {
        type: 'body',
        text:
          "Being even mildly dehydrated (1–2% of body weight) measurably reduces focus, increases irritability, and slows reaction time. Most people sit down to game and don\'t drink anything for hours.",
      },
      {
        type: 'tip',
        text:
          "Keep a water bottle at your desk. Every time you load into a match, take a sip. You\'ll end up hitting your daily intake without thinking about it.",
      },
      {
        type: 'heading',
        text: 'The 20-20-20 Rule for Your Eyes',
      },
      {
        type: 'body',
        text:
          "Screen fatigue is real and it degrades your ability to track movement and read visual information. Every 20 minutes, look at something 20 feet away for 20 seconds. This gives your eye muscles — which are held tense while focusing on a near screen — a chance to relax.",
      },
      {
        type: 'body',
        text:
          "It sounds minor. The difference in late-session visual sharpness is not minor. Eyes that aren\'t fatigued catch more information.",
      },
      {
        type: 'heading',
        text: 'Breaks Between Sessions',
      },
      {
        type: 'list',
        items: [
          'Take a 10-minute break every 60–90 minutes of continuous play',
          'Stand up during breaks — don\'t just switch to your phone',
          'Stretch your wrists, forearms, and neck (these bear the most strain)',
          'Short breaks feel like a waste of time and pay back double in the next hour',
        ],
      },
      {
        type: 'heading',
        text: 'Posture: The Slow Problem',
      },
      {
        type: 'body',
        text:
          "Bad posture doesn\'t hurt immediately. It hurts three years from now when you have chronic neck and back pain that limits how long you can sit and play. Getting it right early is cheap insurance.",
      },
      {
        type: 'list',
        items: [
          'Monitor at eye level — not looking down or craning up',
          'Chair height so forearms are roughly parallel to the desk',
          'Back supported, not hunched forward',
          'Feet flat on the floor or on a footrest',
          'Mouse and keyboard close enough that your shoulders are relaxed',
        ],
      },
      {
        type: 'heading',
        text: 'The Session Length Sweet Spot',
      },
      {
        type: 'body',
        text:
          "Research on deliberate practice suggests that 90 minutes to 2 hours of fully focused, engaged activity is close to the human performance ceiling for a single session. Beyond that, quality degrades faster than quantity grows.",
      },
      {
        type: 'body',
        text:
          "Two hours of engaged, reflective gameplay where you\'re actively learning beats six hours of semi-checked-out grinding. Quality always wins in the long run.",
      },
      {
        type: 'tip',
        text:
          "Set a session intention before you start: \"Today I\'m focusing on positioning\" or \"I want to practice this mechanic.\" Focused sessions accelerate improvement far faster than unfocused ones.",
      },
    ],
  },
  {
    id: '6',
    readTime: 4,
    intro:
      "Ping and lag are two words that get used as if they mean the same thing — they don\'t. Understanding the difference helps you troubleshoot the right problem instead of chasing ghosts. Here\'s a clear, jargon-free breakdown.",
    blocks: [
      {
        type: 'heading',
        text: 'What Ping Actually Is',
      },
      {
        type: 'body',
        text:
          "Ping is the round-trip time it takes for data to travel from your device to the game server and back. It\'s measured in milliseconds (ms). A ping of 30ms means your device and the server are exchanging information in 30 thousandths of a second.",
      },
      {
        type: 'body',
        text:
          "Lower is always better. Ping is determined by physical distance to the server, the quality of your internet connection, and how busy the path between you and the server is.",
      },
      {
        type: 'list',
        items: [
          'Under 30ms: Excellent. Essentially unnoticeable.',
          '30–50ms: Great. Competitive play is comfortable.',
          '50–100ms: Good. Casual and most competitive play is fine.',
          '100–150ms: Noticeable. You\'ll feel slight delays in fast-paced games.',
          '150ms+: Difficult. Fast reactions become unreliable.',
          '200ms+: Severely impaired. Most competitive play is not viable.',
        ],
      },
      {
        type: 'heading',
        text: 'What Lag Actually Is',
      },
      {
        type: 'body',
        text:
          "Lag is the symptom — it\'s what you experience when ping is high or unstable. It shows up as: movements feeling delayed, positions of players appearing wrong, actions not registering when you expected, or the dreaded rubber-banding where you seem to teleport back.",
      },
      {
        type: 'body',
        text:
          "Lag can also be caused by frame rate drops (your GPU/CPU struggling) or input lag (the delay between pressing a button and the screen updating). High ping is one cause of lag — not the only one.",
      },
      {
        type: 'heading',
        text: 'Wired vs. Wireless',
      },
      {
        type: 'body',
        text:
          "A wired ethernet connection is almost always lower latency and more stable than Wi-Fi. Wi-Fi introduces packet variation — your ping might average 40ms but spike to 120ms irregularly. Those spikes cause lag even if your average looks fine.",
      },
      {
        type: 'tip',
        text:
          "If you can run an ethernet cable to your setup, do it. A 10-meter ethernet cable costs less than a month of game pass and will noticeably stabilize your connection.",
      },
      {
        type: 'body',
        text:
          "If Wi-Fi is unavoidable: use 5GHz over 2.4GHz when you\'re close to the router, and minimize the number of walls between you and the router. A Wi-Fi extender or powerline adapter can help in difficult setups.",
      },
      {
        type: 'heading',
        text: 'Choosing the Right Server Region',
      },
      {
        type: 'body',
        text:
          "Most games let you choose or automatically assign a server region. Choose the region geographically closest to you. Don\'t play on North American servers if you\'re in Europe — you\'re adding unnecessary distance (and therefore latency) for no reason.",
      },
      {
        type: 'heading',
        text: 'What You Can\'t Control',
      },
      {
        type: 'list',
        items: [
          'ISP routing decisions — your internet provider chooses the path your data takes',
          'Server load — popular games during peak hours have busier servers',
          'Physical distance from the nearest server location',
          'The internet infrastructure between you and the server',
        ],
      },
      {
        type: 'callout',
        text: "If your connection is stable and you\'re on the right region, don\'t obsess over 20ms differences. Focus on what you can control: your gameplay.",
      },
      {
        type: 'heading',
        text: 'Quick Fixes to Try First',
      },
      {
        type: 'list',
        items: [
          'Close background applications using bandwidth (downloads, streaming, video calls)',
          'Restart your router if it\'s been running for weeks without a reboot',
          'Use ethernet instead of Wi-Fi if at all possible',
          'Check if the game\'s servers are having issues (check their status page)',
          'Select your closest server region in game settings',
          'Call your ISP if you have consistently high ping on a wired connection',
        ],
      },
    ],
  },
  {
    id: '7',
    readTime: 5,
    intro:
      "In the 1980s, psychologist Carol Dweck discovered something that changed how we understand learning and potential. Her research on mindset applies everywhere — and it applies powerfully to gaming. Here\'s how to use it.",
    blocks: [
      {
        type: 'heading',
        text: 'The Two Mindsets',
      },
      {
        type: 'body',
        text:
          "Dweck identified two fundamental beliefs people hold about their own abilities. In a fixed mindset, you believe your skills are basically set — you either have talent or you don\'t, and effort just reveals what was already there. In a growth mindset, you believe abilities are developed through effort, good strategies, and learning from others.",
      },
      {
        type: 'body',
        text:
          "These aren\'t personality types — they\'re beliefs. And beliefs can be changed. The implications for gaming are enormous.",
      },
      {
        type: 'heading',
        text: 'How Fixed Mindset Shows Up in Gaming',
      },
      {
        type: 'list',
        items: [
          '"I just don\'t have good reflexes" — treating a learnable skill as a fixed trait',
          '"Some people are naturally good at games, I\'m not one of them"',
          'Avoiding trying new games or harder difficulty settings to protect the ego',
          'Quitting after early losses instead of pushing through the learning curve',
          'Focusing on the outcome (win/loss) instead of what was learned',
          'Interpreting feedback or criticism as an attack on identity',
        ],
      },
      {
        type: 'callout',
        text: "Fixed mindset protects your ego in the short term. Growth mindset builds your skills in the long term.",
      },
      {
        type: 'heading',
        text: 'How Growth Mindset Changes Everything',
      },
      {
        type: 'body',
        text:
          "When you adopt a growth mindset, losses become data. A bad match doesn\'t mean you\'re bad — it means you were in a situation you haven\'t adapted to yet. Every death is answering the question: what didn\'t work here, and why?",
      },
      {
        type: 'body',
        text:
          "Growth mindset also changes how you react to skilled players. Instead of feeling diminished by someone better than you, you feel curious. How did they do that? What would I need to learn to do the same? That curiosity is fuel.",
      },
      {
        type: 'heading',
        text: 'The Power of "Yet"',
      },
      {
        type: 'body',
        text:
          "One of Dweck\'s simplest and most practical tools is adding the word \"yet\" to any statement of current inability.",
      },
      {
        type: 'list',
        items: [
          '"I can\'t win any ranked matches" → "I can\'t win ranked matches YET"',
          '"I don\'t understand how the economy system works" → "I don\'t understand it YET"',
          '"I always choke in high-pressure moments" → "I still choke sometimes — I haven\'t figured out my reset routine YET"',
        ],
      },
      {
        type: 'body',
        text:
          "\"Yet\" converts a conclusion into a work in progress. It keeps the door open. It makes improvement feel possible rather than aspirational.",
      },
      {
        type: 'heading',
        text: 'Deliberate Practice vs. Grinding',
      },
      {
        type: 'body',
        text:
          "Hours played does not equal improvement. Unthinking repetition of the same patterns reinforces those patterns — including the bad ones. Deliberate practice is the growth mindset version of practice: specific, intentional, and focused on the edge of your ability.",
      },
      {
        type: 'list',
        items: [
          'Identify the specific skill you\'re trying to improve before you start',
          'Focus on that skill consciously during play — not just play and hope it gets better',
          'Seek feedback: review gameplay footage, ask for input from better players',
          'Embrace discomfort — if it\'s hard, you\'re growing',
          'After each session, note what changed and what you\'re working on next',
        ],
      },
      {
        type: 'tip',
        text:
          "Use your Level Up Culture journal after each session. Writing \"what I\'m working on\" and \"what I noticed\" is deliberate practice in text form — it forces conscious reflection.",
      },
      {
        type: 'heading',
        text: 'The Long Game',
      },
      {
        type: 'body',
        text:
          "Growth mindset isn\'t a feeling — it\'s a practice. Some days you\'ll slip into fixed mindset thinking, especially after bad losses. That\'s normal. The work is noticing it and redirecting.",
      },
      {
        type: 'body',
        text:
          "The players who reach their potential — in gaming and in life — aren\'t the ones with the most talent at the start. They\'re the ones who stayed curious the longest, treated setbacks as information, and kept showing up to learn.",
      },
    ],
  },
  {
    id: '8',
    readTime: 5,
    intro:
      "One of the biggest mistakes new gamers make is forcing themselves to play whatever\'s popular instead of finding what\'s actually right for them. The right game changes everything — it determines whether gaming feels like a grind or a joy.",
    blocks: [
      {
        type: 'heading',
        text: 'Why Game Choice Matters More Than You Think',
      },
      {
        type: 'body',
        text:
          "Most beginners start with whatever their friends play or whatever is trending on Twitch. That\'s fine as a starting point. But if you\'re not enjoying it, don\'t assume \"gaming isn\'t for you.\" Assume you haven\'t found your game yet.",
      },
      {
        type: 'body',
        text:
          "The right game is one where the core gameplay loop naturally holds your attention, where failure feels interesting rather than frustrating, and where the learning curve feels like climbing rather than being knocked back. That combination exists — you just have to find it.",
      },
      {
        type: 'heading',
        text: 'A Beginner\'s Genre Guide',
      },
      {
        type: 'list',
        items: [
          'FPS (First-Person Shooter): Fast-paced, aim-focused, lots of action. Examples: Valorant, CS2, Overwatch 2. Great if you like quick sessions and competitive play.',
          'Battle Royale: 100 players, last one standing. Examples: Fortnite, PUBG, Apex Legends. Good mix of strategy and shooting. More forgiving early — one loss = new game.',
          'MOBA (Multiplayer Online Battle Arena): Team strategy, complex mechanics. Examples: League of Legends, Dota 2. Steep learning curve but deeply rewarding. Best if you love strategy.',
          'RPG / Action RPG: Story-driven, character progression, exploration. Examples: Elden Ring, Zelda, Baldur\'s Gate. Great if you prefer your own pace and love narrative.',
          'Sports / Racing: Real-world sports simulated. Examples: FIFA, Rocket League, Forza. Best if sports interest you or you want something you can explain to non-gamers.',
          'Strategy: Management and planning. Examples: Civilization, Age of Empires, StarCraft. Perfect for analytical thinkers who enjoy complex systems.',
          'Indie / Casual: Lower stakes, creative, experimental. Examples: Stardew Valley, Minecraft, Hollow Knight. Great if you want to explore without pressure.',
        ],
      },
      {
        type: 'heading',
        text: 'Personality Matching: What Kind of Player Are You?',
      },
      {
        type: 'list',
        items: [
          'You like to compete and improve rankings → FPS or MOBA',
          'You enjoy stories and worlds → RPG or open-world games',
          'You prefer relaxed, creative, and self-paced → Sandbox or simulation games',
          'You love the thrill of high-stakes moments → Battle Royale or competitive FPS',
          'You like complex systems and thinking ahead → Strategy or MOBA',
          'You want quick matches that end cleanly → FPS, sports, or battle royale',
          'You love playing with friends more than competing → Co-op games, casual multiplayer',
        ],
      },
      {
        type: 'tip',
        text:
          "You\'re allowed to like more than one genre. Many players have a \"main\" game for serious sessions and a \"comfort\" game for relaxed evenings. There\'s no rule that says you have to pick one.",
      },
      {
        type: 'heading',
        text: 'How to Try Games Without Breaking the Bank',
      },
      {
        type: 'list',
        items: [
          'Game Pass (Xbox/PC) and PlayStation Plus give you a large rotating library for a monthly fee',
          'Steam Sales: Steam has massive sales multiple times a year — wishlist games and wait',
          'Free-to-play: Fortnite, Apex Legends, Valorant, and many more are completely free',
          'Free weekends: Many games offer temporary free access — watch for announcements',
          'Demos: Check Steam\'s demo section — many games offer free trial versions',
          'Borrow from friends or check your local library (yes, libraries stock games)',
        ],
      },
      {
        type: 'heading',
        text: 'The 10-Hour Rule',
      },
      {
        type: 'body',
        text:
          "Most games don\'t show you their best side in the first hour. The first hour is often tutorial, setup, or onboarding. Give any game at least 10 hours before deciding it\'s not for you.",
      },
      {
        type: 'body',
        text:
          "Many games that eventually become people\'s favorites felt confusing or unenjoyable in the first hour. The game sense that makes complex games click takes time to develop. Give it that time.",
      },
      {
        type: 'heading',
        text: 'Signs You\'ve Found Your Game',
      },
      {
        type: 'list',
        items: [
          'You lose track of time when playing',
          'You think about it when you\'re not playing',
          'Losing makes you want to try again, not quit',
          'You naturally want to learn more about it — guides, lore, strategies',
          'You have moments of genuine excitement, not just relief when you win',
          'You find yourself recommending it to others',
        ],
      },
      {
        type: 'callout',
        text: "The goal isn\'t to find the best game. The goal is to find YOUR game. They\'re different things.",
      },
    ],
  },
];
