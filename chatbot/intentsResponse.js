'use strict';

module.exports.all = {
  None: {
    contextIn:[],
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
  get_name: {
    contextIn: [],
    reply:{
      default: {
        reply: function(session,response,intent){
          console.log(response);
          console.log(session.message.text);
          return 'None';
        }
      }
    },
    contextNecessary: false
  },
  about_the_disease: {
    contextIn: [],
    reply: {
      default:{
        reply: function(session,response,intent){

          const definitions = {
            dementia: {
              words: ['dementia','dimentia'],
              reply: `Dementia is not a specific disease. It's an overall term that describes a wide range of symptoms associated with a decline in memory or other thinking skills severe enough to reduce a person's ability to perform everyday activities.`
            },
            alzheimer: {
              words: ['alzheimer','alzheimer',`alzheimer's`,'alzeimer'],
              reply: `Progressive mental deterioration that can occur in middle or old age, due to generalized degeneration of the brain. It is the most common cause of premature senility.`
            },
            cancer: {
              words: ['cancer'],
              reply: 'The disease caused by an uncontrolled division of abnormal cells in a part of the body.'
            },
            aging: {
              words: ['aging'],
              reply: ['The process of growing old']
            },
            ailment: {
              words: ['ailment'],
              reply: 'A physical disorder or illness, especially of a minor or chronic nature. Origin of ailment'
            },
            arthritis: {
              words: ['arthritis'],
              reply: 'Arthritis is a joint disorder featuring inflammation.'
            }
          }

          let entities = response.entities;
          let resp = '';

          entities.forEach(entity => {
            let definitionkeys = Object.keys(definitions);
            definitionkeys.forEach(key => {
              if(definitions[key].words.includes(entity.entity)){
                resp = definitions[key].reply;
              }
            })
          })
          return resp;
        }
      },
      dementia: {
        reply: []
      },
      alzheimer: {

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
        reply: [`Can you tell me about the Patient's age?`],
        contextSet: 'describeAge'
      },
      default: {
        reply: [`Can you tell me about the Patient's age?`],
        contextSet: 'describeAge'
      },
      contextNecessary: false
    }
  },
  about_the_age: {
    contextIn: ['describeAge'],
    reply: {
      describeAge: {
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
    contextIn: [],
    reply: {
      default: {
        reply: ['Good Bye'],
        contextSet: ''
      }
    },
    contextNecessary: false
  }
}
