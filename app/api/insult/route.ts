import { NextRequest, NextResponse } from 'next/server';

// Family-friendly insults organized by category
const insults = {
  wit: [
    "Your message has all the charm of a parking meter that's run out of time.",
    "I've seen more wit in a broken fortune cookie.",
    "Your words have the depth of a puddle in the desert.",
    "That message has the creativity of elevator music.",
    "You type like a dictionary that's given up on life.",
    "Your thoughts flow like molasses in a snowstorm.",
    "I've seen more originality in a copy machine.",
    "Your message has the spark of a wet matchstick."
  ],
  sarcasm: [
    "Oh wow, what a absolutely groundbreaking observation.",
    "I'm sure that sounded much better in your head.",
    "Congratulations, you've mastered the art of stating the obvious.",
    "What a delightfully unique perspective... said no one ever.",
    "I'm genuinely impressed by your ability to use so many words to say so little.",
    "Your message is like a participation trophy - technically an achievement.",
    "That's certainly... a collection of words arranged in order.",
    "I admire your confidence in sharing thoughts that incomplete."
  ],
  gentle: [
    "Your message reminds me of a soup sandwich - technically possible but questionable.",
    "You have the communication skills of a mime having an existential crisis.",
    "That message has the energy of a sloth on vacation.",
    "You write like a GPS that's lost its signal.",
    "Your words have the impact of a whisper in a hurricane.",
    "I've seen more enthusiasm from a dial tone.",
    "Your message has the punch of decaffeinated coffee.",
    "You communicate like a broken telephone in a library."
  ],
  creative: [
    "Your message is like a jigsaw puzzle missing half the pieces and the box.",
    "You have the literary flair of a grocery list written in crayon.",
    "That thought process moves like a three-legged turtle in peanut butter.",
    "Your words dance together like two left feet in concrete shoes.",
    "I've seen more coherence in alphabet soup.",
    "Your message flows like a river... a river that's forgotten how to be wet.",
    "You express yourself like a rainbow that's colorblind.",
    "That's the kind of logic that makes philosophers weep into their coffee."
  ]
};

// Contextual responses based on message characteristics
const getContextualInsult = (message: string) => {
  const msgLength = message.length;
  const hasNumbers = /\d/.test(message);
  const isAllCaps = message === message.toUpperCase() && message.length > 3;
  const hasLotsOfPunctuation = (message.match(/[!?.,;:]/g) || []).length > 3;
  
  // Length-based responses
  if (msgLength < 5) {
    return "Ah, the strong silent type... or just out of things to say?";
  }
  
  if (msgLength > 200) {
    return "I admire your ability to use 200 words where 20 would have sufficed.";
  }
  
  // Style-based responses
  if (isAllCaps) {
    return "SOMEONE DISCOVERED THE CAPS LOCK KEY AND DECIDED TO MAKE IT EVERYONE ELSE'S PROBLEM.";
  }
  
  if (hasNumbers) {
    return "Mixing numbers into your message like a confused math textbook.";
  }
  
  if (hasLotsOfPunctuation) {
    return "Your punctuation usage suggests you're either very excited or very confused... possibly both.";
  }
  
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid message' },
        { status: 400 }
      );
    }
    
    // Try to get a contextual insult first
    const contextualInsult = getContextualInsult(message.trim());
    
    if (contextualInsult) {
      return NextResponse.json({ insult: contextualInsult });
    }
    
    // Otherwise, pick a random category and insult
    const categories = Object.keys(insults) as Array<keyof typeof insults>;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryInsults = insults[randomCategory];
    const randomInsult = categoryInsults[Math.floor(Math.random() * categoryInsults.length)];
    
    return NextResponse.json({ insult: randomInsult });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong generating your insult' },
      { status: 500 }
    );
  }
}