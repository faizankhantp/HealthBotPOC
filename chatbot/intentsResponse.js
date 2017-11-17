'use strict';

module.exports.all = {
  None: {
    reply: {
      default: {
        reply: [`I didn't get what you are trying to say.`, `Can you rephrase that?`]
      }
    }
  },
  about_welcome_messages: {
    contextIn: [],
      reply:{
        default:{
          reply: ['Hello there', 'Hi there! Nice to meet you', 'Hey there!']
        }
      },
      contextNecessary: false
  },
  about_the_disease: {
    defaultFunc: (arg = '') => {
      return 'dementia';
    },
    contextIn: [],
    reply: {
      dementia: {
        reply: [`Dementia is not a specific disease. It's an overall term that describes a wide range of symptoms associated with a decline in memory or other thinking skills severe enough to reduce a person's ability to perform everyday activities.`]
      },
      alzheimer: {
        reply: [`progressive mental deterioration that can occur in middle or old age, due to generalized degeneration of the brain. It is the most common cause of premature senility.`]
      }
    },
    contextNecessary: false
  },
  about_the_system: {
    contextIn: [],
    reply: {
      default: {
        reply: [`I am here to answer you queries related to health care giving and about a particular health issues related to elderly.`,
                `I will guide you in getting help related to health care giving and about a particular health issues related to elderly.`,
                `You can ask me questions related to health care giving and about a particular health issues related to elderly.`],
        contextSet: 'curious'
      }
    },
    contextNecessary: false
  },
  about_the_patient: {
    contextIn: ['curious'],
    reply: {
      curious: {
        reply: ['Can you tell me about the condition'],
        contextSet: 'condition'
      },
      default: {
        reply: ['Tell me more about the condition'],
        contextSet: 'condition'
      },
      contextNecessary: false
    }
  },
  about_the_symptoms: {
    contextIn: ['condition'],
    reply: {
      condition: {
        defaultFunc: (arg) => {
          return 'anxiety';
        },
        reply: [`Can you tell me about the Patient's age?`],
        contextSet: 'describeAge'
      },
      contextNecessary: true
    }
  },
  about_the_age: {
    contextIn: ['describeAge'],
    reply: {
      describeAge: {
        defaultFunc: (arg) => {
          return '45'
        },
        reply: ['Has the Patient ever had a head injury?'],
        contextSet: 'describeHeadInjury',
      }
    },
    contextNecessary: true
  },
  about_positive_response: {
    contextIn: ['describeHeadInjury'],
    reply: {
      describeHeadInjury: {
        reply: [`He could be suffering from Dementia. I would suggest you to consult a Doctor immediately.`],
        contextSet: 'dementiaEnd'
      }
    },
    contextNecessary: true
  },
  about_negative_response: {
    contextIn: ['describeHeadInjury'],
    reply: {
      describeHeadInjury: {
        reply: [`If the problem persists in the long run then I would suggest you to consult a Doctor.`],
        contextSet: 'dementiaEnd'
      }
    },
    contextNecessary: true
  },
  about_the_thanks: {
    defaultFunc: (arg) => {
      return 'thanks';
    },
    contextIn: ['dementiaEnd'],
    reply: {
      dementiaEnd: {
        reply: ['Happy to help. Anything else?'],
        contextSet: ''
      },
      default: {
        reply: ['Happy to help!']
      }
    },
    contextNecessary: false
  },
  about_the_bye: {
    contextIn: ['dementiaEnd'],
    reply: {
      dementiaEnd: {
        reply: ['Good Bye']
      },
      default: {
        reply: ['Good Bye']
      }
    },
    contextNecessary: false
  }
}
