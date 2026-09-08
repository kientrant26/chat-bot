export const TEST_DATA = {
  meta: {
    title: 'Business English Practice Test',
    level: 'CEFR Level B (Intermediate / Office English)',
    durationSeconds: 20 * 60, // đổi thời gian làm bài ở đây
    passThreshold: 70, // % để Pass
  },
  grammarQuestions: [
    {
      id: 1,
      question:
        'Mr. David ________ the quarterly financial report when the power went out yesterday afternoon.',
      options: ['prepares', 'was preparing', 'has prepared', 'is preparing'],
      correct: 1,
      explanation:
        "💡 Past Continuous: Describes an action that was in progress ('was preparing') when interrupted by another action in the simple past ('went out').",
    },
    {
      id: 2,
      question:
        "If we receive the client's confirmation by 3 PM, we ________ shipping the order immediately.",
      options: ['start', 'will start', 'started', 'would start'],
      correct: 1,
      explanation:
        '💡 First Conditional: Used for real/possible future situations. Formula: If + Present Simple, Will + Verb.',
    },
    {
      id: 3,
      question:
        'The new marketing strategy was successfully ________ by the international sales team.',
      options: ['implemented', 'implementing', 'implement', 'implements'],
      correct: 0,
      explanation:
        "💡 Passive Voice: Structure Was/Were + Past Participle ('implemented') to show action done to the subject.",
    },
    {
      id: 4,
      question:
        'Ms. Sarah has been working as a senior project manager ________ over five years.',
      options: ['since', 'for', 'during', 'from'],
      correct: 1,
      explanation:
        "💡 For vs. Since: Use 'for' with a duration/period of time ('over five years'). Use 'since' for a specific starting point.",
    },
    {
      id: 5,
      question:
        "Neither the regional manager nor the team leads ________ available for today's emergency meeting.",
      options: ['is', 'are', 'was', 'be'],
      correct: 1,
      explanation:
        "💡 Subject-Verb Agreement: With 'Neither... nor...', the verb agrees with the closer subject ('team leads' = plural -> 'are').",
    },
    {
      id: 6,
      question:
        'We need to look ________ alternative vendors to reduce operating costs this quarter.',
      options: ['into', 'at', 'for', 'over'],
      correct: 0,
      explanation:
        "💡 Phrasal Verb: 'Look into' means to investigate or explore possibilities.",
    },
    {
      id: 7,
      question:
        'By the time the conference starts tomorrow, the presentation slides ________ finalized.',
      options: ['will have been', 'have been', 'will be', 'were'],
      correct: 0,
      explanation:
        '💡 Future Perfect Passive: Indicates an action completed before a specific point in the future (Will have been + Past Participle).',
    },
    {
      id: 8,
      question:
        'The director suggested ________ the quarterly budget review meeting to next Friday.',
      options: ['to postpone', 'postponing', 'postpone', 'postponed'],
      correct: 1,
      explanation:
        "💡 Verb Patterns: The verb 'suggest' is directly followed by a gerund (Verb + -ing).",
    },
  ],
  listeningTasks: [
    {
      id: 9,
      script:
        'Hello Mr. Henderson, this is Lisa from Human Resources. I am calling to confirm our interview schedule for tomorrow at 10 AM. Please remember to bring two copies of your updated resume and your portfolio.',
      question: "What is the primary purpose of Lisa's phone call?",
      options: [
        'To cancel a job interview',
        'To confirm an interview time and required items',
        'To offer Mr. Henderson a new position',
        'To ask for salary expectations',
      ],
      correct: 1,
      explanation:
        "💡 Lisa states: 'calling to confirm our interview schedule... remember to bring two copies...'.",
    },
    {
      id: 10,
      script:
        'Attention all floor staff. Due to unexpected maintenance work on the central server, all internal network drives will be offline from 6 PM to 8 PM tonight. Please make sure to save your work and log off before 5:45 PM.',
      question: 'What action are employees required to take before 5:45 PM?',
      options: [
        'Attend an urgent team meeting',
        'Contact the IT support service desk',
        'Save their work and log off systems',
        'Complete all daily sales reports',
      ],
      correct: 2,
      explanation:
        "💡 The speaker requests: 'Please make sure to save your work and log off before 5:45 PM.'",
    },
  ],
  speakingScenarios: [
    {
      id: 1,
      title: 'Scenario 1: Rescheduling a Client Meeting',
      prompt:
        'You have a sudden schedule conflict and need to postpone a meeting with an important client to next week. Record or write your response politely proposing a new time.',
      sample:
        'Dear [Client Name], I am writing to sincerely apologize, but due to an urgent conflict, I will need to reschedule our meeting scheduled for today. Would you be available next Tuesday at 10 AM instead? Please let me know if that works for you.',
      rubric:
        '✔️ Key Elements: Polite apology, clear explanation, proposal of specific new date/time, call to action.',
    },
    {
      id: 2,
      title: 'Scenario 2: Handling a Client Complaint',
      prompt:
        'A client calls complaining about a delayed project deadline. Respond professionally to de-escalate the situation and offer a solution.',
      sample:
        'I completely understand your frustration regarding this delay, and I apologize for the inconvenience caused. We are actively resolving the issue, and I will send you an updated progress report by 3 PM today.',
      rubric:
        '✔️ Key Elements: Empathy/acknowledgment, sincere apology, clear action step/solution, timeline assurance.',
    },
    {
      id: 3,
      title: 'Scenario 3: Giving Constructive Feedback',
      prompt:
        'Provide constructive feedback to a colleague whose recent project presentation lacked sufficient key market data.',
      sample:
        "Great job on the presentation layout! To make it even stronger for the board, I suggest including more recent market data in section two. Let me know if you'd like me to share some recent statistics.",
      rubric:
        '✔️ Key Elements: Positive opening, specific constructive recommendation, offer of support.',
    },
    {
      id: 4,
      title: 'Scenario 4: Requesting Budget Approval',
      prompt:
        'Explain to your department manager why you need additional budget for a new software tool for your team.',
      sample:
        "Hi [Manager Name], I'd like to request approval for a $200 monthly budget for a new project management tool. It will help automate our routine reporting and increase overall team productivity by 15%.",
      rubric:
        '✔️ Key Elements: Clear request amount, tangible justification, expected ROI/benefit.',
    },
    {
      id: 5,
      title: 'Scenario 5: Directing a Team Discussion',
      prompt:
        'You are leading a meeting that has drifted off-topic. Politely steer the discussion back to the original agenda.',
      sample:
        "Thank you all for these valuable points. However, in the interest of time, let's bring our focus back to today's main agenda item: approving the product launch schedule.",
      rubric:
        '✔️ Key Elements: Polite acknowledgment of current discussion, clear redirection to original agenda.',
    },
  ],
}
