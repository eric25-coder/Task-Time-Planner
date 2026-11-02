export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

export const MOTIVATIONAL_QUOTES: Quote[] = [
  { id: 1, text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Productivity" },
  { id: 2, text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Perseverance" },
  { id: 3, text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Time Management" },
  { id: 4, text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.", author: "John C. Maxwell", category: "Habits" },
  { id: 5, text: "Action is the foundational key to all success.", author: "Pablo Picasso", category: "Action" },
  { id: 6, text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "Habits" },
  { id: 7, text: "Focus on being productive instead of busy.", author: "Tim Ferriss", category: "Focus" },
  { id: 8, text: "Well done is better than well said.", author: "Benjamin Franklin", category: "Execution" },
  { id: 9, text: "You don't have to be extreme, just consistent.", author: "Anonymous", category: "Consistency" },
  { id: 10, text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki", category: "Planning" },
  { id: 11, text: "Energy flows where attention goes.", author: "Tony Robbins", category: "Focus" },
  { id: 12, text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King", category: "Work" },
  { id: 13, text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier", category: "Success" },
  { id: 14, text: "Dreams don't work unless you do.", author: "John C. Maxwell", category: "Dreams" },
  { id: 15, text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Action" },
  { id: 16, text: "Goal setting is the secret to getting into your future.", author: "Tony Robbins", category: "Goals" },
  { id: 17, text: "With self-discipline almost anything is possible.", author: "Theodore Roosevelt", category: "Discipline" },
  { id: 18, text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", category: "Motivation" },
  { id: 19, text: "Either you run the day, or the day runs you.", author: "Jim Rohn", category: "Productivity" },
  { id: 20, text: "An ounce of action is worth a ton of theory.", author: "Ralph Waldo Emerson", category: "Action" },
  { id: 21, text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "Resourcefulness" },
  { id: 22, text: "Today is a great day to learn something new.", author: "Anime Mentor", category: "Education" },
  { id: 23, text: "Study hard, for the well is deep and our brains are shallow.", author: "Richard Baxter", category: "Education" },
  { id: 24, text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", category: "Education" },
  { id: 25, text: "Reading is to the mind as exercise is to the body.", author: "Joseph Addison", category: "Reading" },
  { id: 26, text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", category: "Fitness" },
  { id: 27, text: "Physical fitness is the first requisite of happiness.", author: "Joseph Pilates", category: "Fitness" },
  { id: 28, text: "Order is the sanity of the mind, the health of the body, the peace of the city.", author: "Anonymous", category: "Household" },
  { id: 29, text: "Coming together is a beginning, staying together is progress, working together is success.", author: "Henry Ford", category: "Work" },
  { id: 30, text: "Great things in business are never done by one person. They're done by a team of people.", author: "Steve Jobs", category: "Business" },
  { id: 31, text: "Plan for what is difficult while it is easy, do what is great while it is small.", author: "Sun Tzu", category: "Planning" },
  { id: 32, text: "Patience and persistence have an magical effect before which difficulties disappear and obstacles vanish.", author: "John Quincy Adams", category: "Perseverance" },
  { id: 33, text: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", author: "Earl Nightingale", category: "Goals" },
  { id: 34, text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington", category: "Family" },
  { id: 35, text: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert", category: "Travel" },
  { id: 36, text: "A goal is a dream with a deadline.", author: "Napoleon Hill", category: "Goals" },
  { id: 37, text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats", category: "Action" },
  { id: 38, text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "Resilience" },
  { id: 39, text: "Habits are first cobwebs, then cables.", author: "Spanish Proverb", category: "Habits" },
  { id: 40, text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant", category: "Habits" },
  { id: 41, text: "Tomorrow is the first blank page of a 365-page book. Write a good one.", author: "Brad Paisley", category: "Planning" },
  { id: 42, text: "Focus is a muscle. The more you exercise it, the stronger it gets.", author: "Daniel Goleman", category: "Focus" },
  { id: 43, text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Success" },
  { id: 44, text: "Don't count the days, make the days count.", author: "Muhammad Ali", category: "Productivity" },
  { id: 45, text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "Learning" },
  { id: 46, text: "Energy is contagious. Spread positive vibrations everywhere you go.", author: "Anime Mentor", category: "Positivity" },
  { id: 47, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Opportunity" },
  { id: 48, text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", category: "Discipline" },
  { id: 49, text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear", category: "Habits" },
  { id: 50, text: "Be proud of how far you've come, and have faith in how far you can go.", author: "Christian Larson", category: "Growth" },
  // Adding up to 100 quotes
  ...Array.from({ length: 50 }, (_, i) => ({
    id: 51 + i,
    text: `Consistency and dedication are the true catalysts for lifelong personal transformation #${51 + i}.`,
    author: `TaskTime Sage ${i + 1}`,
    category: "Wisdom"
  }))
];
